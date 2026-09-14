import { AnimatePresence, motion } from 'framer-motion';
import { Coffee, Eraser, Hand, Sparkles, Stamp } from 'lucide-react';
import React, { useRef, useState } from 'react';

const COLS = 16;
const ROWS = 8;

type Cell = 0 | 1 | 2;

const replies = [
  { id: 'wave', label: 'Wave', icon: Hand, text: 'Hey. Thanks for stopping by.' },
  { id: 'coffee', label: 'Coffee?', icon: Coffee, text: 'Always up for a short chat.' },
  { id: 'hire', label: 'Hiring?', icon: Sparkles, text: 'Open to it. Email is the fastest way.' },
] as const;

const empty = () => Array.from({ length: COLS * ROWS }, () => 0 as Cell);

const swatch = (cell: Cell) => {
  if (cell === 1) return 'bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.7)]';
  if (cell === 2) return 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]';
  return 'bg-slate-800/80 hover:bg-slate-700';
};

export const Playground: React.FC = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState<1 | 2>(1);
  const [cells, setCells] = useState<Cell[]>(empty);
  const [reply, setReply] = useState<(typeof replies)[number] | null>(null);
  const [stamps, setStamps] = useState<{ name: string; cells: Cell[] }[]>([]);
  const painting = useRef(false);

  const who = name.trim() || 'You';

  const paint = (index: number) => {
    setCells((current) => {
      if (current[index] === color) return current;
      const next = current.slice();
      next[index] = color;
      return next;
    });
  };

  const stamp = () => {
    if (!cells.some(Boolean)) return;
    setStamps((current) => [{ name: who, cells: cells.slice() }, ...current].slice(0, 4));
    setCells(empty());
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-24" id="play">
      <div className="mb-10">
        <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-white">
          <Hand className="text-emerald-400" />
          Say hi
        </h2>
        <p className="max-w-xl text-slate-400">Tap a button, or paint the grid. It’s just for you.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <label className="block text-sm text-slate-400">
            Your name
            <input
              value={name}
              onChange={(event) => setName(event.target.value.slice(0, 18))}
              placeholder="optional"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white placeholder:text-slate-600 focus:border-indigo-400 focus:outline-none"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-2">
            {replies.map((item) => {
              const Icon = item.icon;
              const active = reply?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setReply(item)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                    active
                      ? 'border-indigo-400 bg-indigo-500/15 text-white'
                      : 'border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 min-h-28" aria-live="polite">
            <AnimatePresence mode="wait">
              {reply && (
                <motion.div
                  key={reply.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4"
                >
                  <p className="text-sm text-indigo-200">
                    {name.trim() ? `${who}, ${reply.text.charAt(0).toLowerCase()}${reply.text.slice(1)}` : reply.text}
                  </p>
                  {reply.id === 'hire' && (
                    <a href="mailto:sibinthekkel@gmail.com" className="mt-3 inline-block text-sm text-white underline-offset-4 hover:underline">
                      sibinthekkel@gmail.com
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-400">Click or drag to paint</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Indigo"
                aria-pressed={color === 1}
                onClick={() => setColor(1)}
                className={`h-7 w-7 rounded-full bg-indigo-400 ${color === 1 ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950' : ''}`}
              />
              <button
                type="button"
                aria-label="Emerald"
                aria-pressed={color === 2}
                onClick={() => setColor(2)}
                className={`h-7 w-7 rounded-full bg-emerald-400 ${color === 2 ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950' : ''}`}
              />
              <button
                type="button"
                onClick={() => setCells(empty())}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                <Eraser className="h-3.5 w-3.5" />
                Clear
              </button>
            </div>
          </div>

          <div
            className="grid touch-none gap-1"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            onPointerLeave={() => {
              painting.current = false;
            }}
            onPointerUp={() => {
              painting.current = false;
            }}
          >
            {cells.map((cell, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Cell ${index + 1}`}
                className={`aspect-square rounded-[3px] transition-colors ${swatch(cell)}`}
                onPointerDown={(event) => {
                  painting.current = true;
                  event.currentTarget.releasePointerCapture?.(event.pointerId);
                  paint(index);
                }}
                onPointerEnter={() => {
                  if (painting.current) paint(index);
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={stamp}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            <Stamp className="h-4 w-4" />
            Stamp it
          </button>

          {stamps.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3">
              {stamps.map((stampItem, index) => (
                <li key={`${stampItem.name}-${index}`} className="rounded-xl border border-slate-800 bg-slate-950/60 p-2">
                  <p className="mb-1 px-1 text-[11px] text-slate-400">{stampItem.name}</p>
                  <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${COLS}, 4px)` }}>
                    {stampItem.cells.map((cell, cellIndex) => (
                      <span
                        key={cellIndex}
                        className={`h-1 w-1 ${cell === 1 ? 'bg-indigo-400' : cell === 2 ? 'bg-emerald-400' : 'bg-slate-800'}`}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};
