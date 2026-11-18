import React from 'react';

const noise =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Fixed ambient layer: soft colour fields, a faint grid fading from the top, and film grain. */
export const Backdrop: React.FC = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -top-56 left-1/2 h-[680px] w-[1000px] -translate-x-1/2 rounded-full bg-indigo-600/[0.18] blur-[150px]" />
    <div className="absolute -right-48 top-[38%] h-[520px] w-[520px] rounded-full bg-emerald-500/[0.08] blur-[150px]" />
    <div className="absolute -left-48 bottom-[-10%] h-[520px] w-[620px] rounded-full bg-sky-500/[0.08] blur-[150px]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
    <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay" style={{ backgroundImage: noise }} />
  </div>
);
