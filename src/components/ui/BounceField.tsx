import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { sound } from '../../lib/sound';
import { cn } from '../../lib/utils';

export interface BounceItem {
  label: string;
  icon: React.ReactNode;
  /** Classes for the round icon badge. */
  badge: string;
  /** Colour of the wall flash and sparks when this chip hits something. */
  color: string;
}

interface BounceFieldProps {
  items: readonly BounceItem[];
  /** Accessible name for the list of chips. */
  label: string;
  className?: string;
  /** Decoration drawn behind the chips. */
  children?: React.ReactNode;
}

interface Body {
  el: HTMLLIElement;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  /** Speed the chip settles back to after a throw. */
  cruise: number;
  squash: number;
  axis: 'x' | 'y';
  held: boolean;
  hovered: boolean;
  /** Seconds left during which hits count as hard: sparks and sound. */
  thrown: number;
}

interface Spark {
  el: HTMLSpanElement;
  glow: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  peak: number;
}

interface Pointer {
  down: (event: React.PointerEvent<HTMLLIElement>, index: number) => void;
  move: (event: React.PointerEvent<HTMLLIElement>) => void;
  up: (event: React.PointerEvent<HTMLLIElement>) => void;
  hover: (event: React.PointerEvent<HTMLLIElement>, index: number, on: boolean) => void;
}

/** Field area each chip needs, so small screens show fewer chips instead of a traffic jam. */
const AREA_PER_CHIP = 10000;
const MIN_CHIPS = 3;
const SPARKS = 40;
const MAX_THROW = 1400;
const TAP_SPEED = 560;
const HARD_HIT = 180;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A random diagonal heading, so a chip never crawls along a wall. */
const heading = (speed: number) => {
  const angle = ((25 + Math.random() * 40) * Math.PI) / 180;
  return {
    vx: Math.cos(angle) * speed * (Math.random() < 0.5 ? -1 : 1),
    vy: Math.sin(angle) * speed * (Math.random() < 0.5 ? -1 : 1),
  };
};

const overlaps = (a: Body, b: Body, gap = 0) =>
  a.x < b.x + b.w + gap && b.x < a.x + a.w + gap && a.y < b.y + b.h + gap && b.y < a.y + a.h + gap;

/** Drop chips at random spots, retrying until they don't touch. */
function scatter(bodies: Body[], width: number, height: number) {
  bodies.forEach((body, index) => {
    let best = { x: 0, y: 0, hits: Infinity };
    for (let attempt = 0; attempt < 80 && best.hits > 0; attempt += 1) {
      body.x = Math.random() * Math.max(0, width - body.w);
      body.y = Math.random() * Math.max(0, height - body.h);
      const hits = bodies.slice(0, index).filter((other) => overlaps(body, other, 10)).length;
      if (hits < best.hits) best = { x: body.x, y: body.y, hits };
    }
    body.x = best.x;
    body.y = best.y;
  });
}

/**
 * Chips that drift and bounce off the walls and each other, like the ball in Breakout.
 * Hover a chip to stop it, drag to throw it, or tap to smack it away.
 * Physics runs in one requestAnimationFrame loop that writes transforms directly,
 * pauses while the field is off screen, and stays still for reduced-motion visitors.
 */
export const BounceField: React.FC<BounceFieldProps> = ({ items, label, className, children }) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLLIElement | null)[]>([]);
  const sparkRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pointer = useRef<Pointer | null>(null);
  const [reduced] = useState(prefersReducedMotion);
  const [count, setCount] = useState(items.length);

  const fit = useCallback(
    (width: number, height: number) => clamp(Math.floor((width * height) / AREA_PER_CHIP), MIN_CHIPS, items.length),
    [items.length],
  );

  // Decide how many chips fit before the first paint.
  useLayoutEffect(() => {
    const field = fieldRef.current;
    if (field) setCount(fit(field.clientWidth, field.clientHeight));
  }, [fit]);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return undefined;
    let width = field.clientWidth;
    let height = field.clientHeight;

    const bodies: Body[] = chipRefs.current.slice(0, count).flatMap((el, index) => {
      if (!el) return [];
      const cruise = 34 + Math.random() * 22;
      return [
        {
          el,
          color: items[index].color,
          x: 0,
          y: 0,
          ...heading(cruise),
          w: el.offsetWidth,
          h: el.offsetHeight,
          cruise,
          squash: 0,
          axis: 'x' as const,
          held: false,
          hovered: false,
          thrown: 0,
        },
      ];
    });
    scatter(bodies, width, height);

    const sparks: Spark[] = sparkRefs.current.flatMap((el) =>
      el ? [{ el, glow: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, size: 0, peak: 0 }] : [],
    );
    let nextSpark = 0;
    const takeSpark = () => {
      const spark = sparks[nextSpark];
      nextSpark = (nextSpark + 1) % sparks.length;
      return spark;
    };

    /** A soft glow where a chip touches the wall. */
    const flash = (x: number, y: number, color: string, strength: number) => {
      const spark = takeSpark();
      if (!spark) return;
      Object.assign(spark, { glow: true, x, y, vx: 0, vy: 0, life: 0.45, max: 0.45, size: 72, peak: 0.3 + 0.6 * strength });
      spark.el.style.width = spark.el.style.height = '72px';
      spark.el.style.background = `radial-gradient(circle, ${color}80 0%, ${color}00 68%)`;
      spark.el.style.boxShadow = 'none';
    };

    /** Bits flying off a hard hit, the closest a chip gets to breaking a brick. */
    const burst = (x: number, y: number, nx: number, ny: number, color: string, strength: number) => {
      const pieces = 4 + Math.round(strength * 5);
      for (let i = 0; i < pieces; i += 1) {
        const spark = takeSpark();
        if (!spark) return;
        const out = 60 + Math.random() * 240 * strength;
        const side = (Math.random() - 0.5) * 300;
        const size = 2 + Math.random() * 2.5;
        const life = 0.35 + Math.random() * 0.35;
        Object.assign(spark, { glow: false, x, y, vx: nx * out - ny * side, vy: ny * out + nx * side, life, max: life, size, peak: 1 });
        spark.el.style.width = spark.el.style.height = `${size}px`;
        spark.el.style.background = color;
        spark.el.style.boxShadow = `0 0 6px ${color}`;
      }
    };

    const squash = (body: Body, axis: 'x' | 'y', strength: number) => {
      body.squash = Math.max(body.squash, 0.3 + strength * 0.7);
      body.axis = axis;
    };

    const hitWall = (body: Body, axis: 'x' | 'y', speed: number, x: number, y: number, nx: number, ny: number) => {
      const strength = clamp(speed / 900, 0, 1);
      squash(body, axis, strength);
      flash(x, y, body.color, strength);
      if (body.thrown > 0 && speed > HARD_HIT) {
        burst(x, y, nx, ny, body.color, strength);
        sound.bounce(strength);
      }
    };

    const keepInside = (body: Body) => {
      body.x = clamp(body.x, 0, Math.max(0, width - body.w));
      body.y = clamp(body.y, 0, Math.max(0, height - body.h));
    };

    const step = (dt: number) => {
      for (const body of bodies) {
        body.thrown = Math.max(0, body.thrown - dt);
        body.squash = Math.max(0, body.squash - dt * 5);
        if (body.held || (body.hovered && body.thrown === 0)) continue;

        // Ease back to cruising speed after a throw or a crash.
        let speed = Math.hypot(body.vx, body.vy);
        if (speed < 1) {
          Object.assign(body, heading(body.cruise));
          speed = body.cruise;
        }
        const target = body.cruise + (speed - body.cruise) * Math.exp(-dt * 1.3);
        body.vx *= target / speed;
        body.vy *= target / speed;
        body.x += body.vx * dt;
        body.y += body.vy * dt;

        const maxX = Math.max(0, width - body.w);
        const maxY = Math.max(0, height - body.h);
        if (body.x < 0 && body.vx < 0) {
          hitWall(body, 'x', -body.vx, 0, body.y + body.h / 2, 1, 0);
          body.vx = -body.vx;
        } else if (body.x > maxX && body.vx > 0) {
          hitWall(body, 'x', body.vx, width, body.y + body.h / 2, -1, 0);
          body.vx = -body.vx;
        }
        if (body.y < 0 && body.vy < 0) {
          hitWall(body, 'y', -body.vy, body.x + body.w / 2, 0, 0, 1);
          body.vy = -body.vy;
        } else if (body.y > maxY && body.vy > 0) {
          hitWall(body, 'y', body.vy, body.x + body.w / 2, height, 0, -1);
          body.vy = -body.vy;
        }
        body.x = clamp(body.x, 0, maxX);
        body.y = clamp(body.y, 0, maxY);
      }

      // Chip against chip: push apart along the shallower overlap and trade speeds, like equal balls.
      for (let i = 0; i < bodies.length; i += 1) {
        for (let j = i + 1; j < bodies.length; j += 1) {
          const a = bodies[i];
          const b = bodies[j];
          const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (ox <= 0 || oy <= 0) continue;
          const aFixed = a.held || (a.hovered && a.thrown === 0);
          const bFixed = b.held || (b.hovered && b.thrown === 0);
          if (aFixed && bFixed) continue;

          const axis = ox < oy ? 'x' : 'y';
          const p = axis === 'x' ? 'x' : 'y';
          const v = axis === 'x' ? 'vx' : 'vy';
          const size = axis === 'x' ? 'w' : 'h';
          const overlap = axis === 'x' ? ox : oy;
          // Direction `a` has to move to get out of `b`.
          const dir = a[p] + a[size] / 2 < b[p] + b[size] / 2 ? -1 : 1;
          if (aFixed) b[p] -= dir * overlap;
          else if (bFixed) a[p] += dir * overlap;
          else {
            a[p] += (dir * overlap) / 2;
            b[p] -= (dir * overlap) / 2;
          }
          keepInside(a);
          keepInside(b);

          const av = aFixed ? 0 : a[v];
          const bv = bFixed ? 0 : b[v];
          const closing = (av - bv) * -dir;
          if (closing <= 0) continue;
          if (aFixed) b[v] = -b[v];
          else if (bFixed) a[v] = -a[v];
          else [a[v], b[v]] = [b[v], a[v]];

          const strength = clamp(closing / 900, 0, 1);
          squash(a, axis, strength);
          squash(b, axis, strength);
          if ((a.thrown > 0 || b.thrown > 0) && closing > HARD_HIT) sound.bounce(strength * 0.7);
        }
      }

      for (const spark of sparks) {
        if (spark.life <= 0) continue;
        spark.life -= dt;
        spark.x += spark.vx * dt;
        spark.y += spark.vy * dt;
        const drag = Math.exp(-dt * 4);
        spark.vx *= drag;
        spark.vy *= drag;
      }
    };

    const render = () => {
      for (const body of bodies) {
        const s = body.squash;
        const sx = body.axis === 'x' ? 1 - 0.14 * s : 1 + 0.07 * s;
        const sy = body.axis === 'x' ? 1 + 0.07 * s : 1 - 0.14 * s;
        // Whole pixels while a chip is still, so its text stays sharp.
        const still = body.held || body.hovered;
        const x = still ? Math.round(body.x) : body.x;
        const y = still ? Math.round(body.y) : body.y;
        body.el.style.transform = s > 0 ? `translate3d(${x}px, ${y}px, 0) scale(${sx}, ${sy})` : `translate3d(${x}px, ${y}px, 0)`;
      }
      for (const spark of sparks) {
        if (spark.life <= 0) {
          if (spark.el.style.opacity !== '0') spark.el.style.opacity = '0';
          continue;
        }
        const t = spark.life / spark.max;
        const scale = spark.glow ? 0.6 + (1 - t) * 0.8 : 1;
        spark.el.style.opacity = String(spark.glow ? spark.peak * t * t : t);
        spark.el.style.transform = `translate3d(${spark.x - spark.size / 2}px, ${spark.y - spark.size / 2}px, 0) scale(${scale})`;
      }
    };

    let raf = 0;
    let last = 0;
    const frame = (now: number) => {
      const dt = last ? Math.min(0.033, (now - last) / 1000) : 0;
      last = now;
      step(dt);
      render();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || reduced) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    render();
    bodies.forEach((body) => (body.el.style.opacity = '1'));

    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    visibility.observe(field);

    const resize = new ResizeObserver(() => {
      width = field.clientWidth;
      height = field.clientHeight;
      const fits = fit(width, height);
      if (fits !== count) {
        setCount(fits);
        return;
      }
      for (const body of bodies) {
        body.w = body.el.offsetWidth;
        body.h = body.el.offsetHeight;
        body.x = clamp(body.x, 0, Math.max(0, width - body.w));
        body.y = clamp(body.y, 0, Math.max(0, height - body.h));
      }
      render();
    });
    resize.observe(field);
    bodies.forEach((body) => resize.observe(body.el));

    const drag = { body: null as Body | null, id: -1, ox: 0, oy: 0, sx: 0, sy: 0, moved: false, samples: [] as { t: number; x: number; y: number }[] };

    pointer.current = {
      down(event, index) {
        const body = bodies[index];
        if (!body || reduced || event.button !== 0) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        const rect = field.getBoundingClientRect();
        Object.assign(drag, {
          body,
          id: event.pointerId,
          ox: event.clientX - rect.left - body.x,
          oy: event.clientY - rect.top - body.y,
          sx: event.clientX,
          sy: event.clientY,
          moved: false,
          samples: [{ t: performance.now(), x: event.clientX, y: event.clientY }],
        });
        body.held = true;
        body.vx = 0;
        body.vy = 0;
      },
      move(event) {
        const body = drag.body;
        if (!body || event.pointerId !== drag.id) return;
        const rect = field.getBoundingClientRect();
        body.x = clamp(event.clientX - rect.left - drag.ox, 0, Math.max(0, width - body.w));
        body.y = clamp(event.clientY - rect.top - drag.oy, 0, Math.max(0, height - body.h));
        const now = performance.now();
        drag.samples.push({ t: now, x: event.clientX, y: event.clientY });
        while (drag.samples.length > 2 && now - drag.samples[0].t > 90) drag.samples.shift();
        if (Math.hypot(event.clientX - drag.sx, event.clientY - drag.sy) > 5) drag.moved = true;
      },
      up(event) {
        const body = drag.body;
        if (!body || event.pointerId !== drag.id) return;
        drag.body = null;
        body.held = false;
        body.hovered = false;
        body.thrown = 1.8;

        if (!drag.moved) {
          // A tap smacks the chip away like a ball.
          Object.assign(body, heading(TAP_SPEED));
          return;
        }
        const first = drag.samples[0];
        const latest = drag.samples[drag.samples.length - 1];
        const seconds = Math.max(16, latest.t - first.t) / 1000;
        // Holding still before letting go is a gentle drop, not a throw.
        const fresh = performance.now() - latest.t < 80;
        let vx = fresh ? (latest.x - first.x) / seconds : 0;
        let vy = fresh ? (latest.y - first.y) / seconds : 0;
        const speed = Math.hypot(vx, vy);
        if (speed > MAX_THROW) {
          vx *= MAX_THROW / speed;
          vy *= MAX_THROW / speed;
        }
        if (speed < body.cruise) Object.assign(body, heading(body.cruise));
        else Object.assign(body, { vx, vy });
      },
      hover(event, index, on) {
        const body = bodies[index];
        if (body && event.pointerType === 'mouse') body.hovered = on;
      },
    };

    return () => {
      stop();
      visibility.disconnect();
      resize.disconnect();
      pointer.current = null;
    };
  }, [count, fit, items, reduced]);

  return (
    <div ref={fieldRef} className={cn('relative overflow-hidden', className)}>
      {children}

      {Array.from({ length: SPARKS }, (_, index) => (
        <span
          key={index}
          ref={(el) => (sparkRefs.current[index] = el)}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 rounded-full opacity-0"
        />
      ))}

      <ul aria-label={label}>
        {items.slice(0, count).map((item, index) => (
          <li
            key={item.label}
            ref={(el) => (chipRefs.current[index] = el)}
            onPointerDown={(event) => pointer.current?.down(event, index)}
            onPointerMove={(event) => pointer.current?.move(event)}
            onPointerUp={(event) => pointer.current?.up(event)}
            onPointerCancel={(event) => pointer.current?.up(event)}
            onPointerEnter={(event) => pointer.current?.hover(event, index, true)}
            onPointerLeave={(event) => pointer.current?.hover(event, index, false)}
            className={cn(
              'absolute left-0 top-0 flex select-none items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-ink-900/90 py-1.5 pl-1.5 pr-3.5 text-xs font-medium text-slate-200 opacity-0 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.8)] transition-[opacity,border-color,background-color] duration-300 will-change-transform hover:border-white/25 hover:bg-ink-800',
              !reduced && 'cursor-grab touch-none active:cursor-grabbing',
            )}
          >
            <span className={cn('grid h-6 w-6 place-items-center rounded-full', item.badge)}>{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
