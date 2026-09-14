import { motion } from 'framer-motion';
import { LayoutGrid, RotateCcw } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

const solvedOf = (size: number) =>
  Array.from({ length: size * size }, (_, index) => (index + 1) % (size * size));

const neighbors = (index: number, size: number) => {
  const row = Math.floor(index / size);
  const col = index % size;
  const next: number[] = [];
  if (row > 0) next.push(index - size);
  if (row < size - 1) next.push(index + size);
  if (col > 0) next.push(index - 1);
  if (col < size - 1) next.push(index + 1);
  return next;
};

const shuffle = (size: number) => {
  const board = solvedOf(size);
  let empty = board.indexOf(0);
  let previous = -1;

  for (let step = 0; step < size * 28; step += 1) {
    const options = neighbors(empty, size).filter((index) => index !== previous);
    const pick = options[Math.floor(Math.random() * options.length)];
    board[empty] = board[pick];
    board[pick] = 0;
    previous = empty;
    empty = pick;
  }

  return board;
};

const isSolved = (board: number[], size: number) =>
  board.every((tile, index) => tile === (index + 1) % (size * size));

const glyphs = ['◆', '●', '▲', '■', '✦', '✚', '⬟', '◉'];

const shuffleMemory = () => {
  const deck = glyphs.flatMap((glyph) => [glyph, glyph]);
  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[swap]] = [deck[swap], deck[index]];
  }
  return deck;
};

const MemoryPuzzle: React.FC = () => {
  const [deck, setDeck] = useState(shuffleMemory);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const won = matched.length === glyphs.length;

  useEffect(() => {
    if (open.length < 2) return;
    const [first, second] = open;
    setLock(true);
    const same = deck[first] === deck[second];
    const timer = window.setTimeout(() => {
      if (same) setMatched((current) => [...current, deck[first]]);
      setOpen([]);
      setLock(false);
    }, same ? 280 : 700);
    return () => window.clearTimeout(timer);
  }, [open, deck]);

  const flip = (index: number) => {
    if (lock || won || open.includes(index) || matched.includes(deck[index])) return;
    const next = [...open, index];
    setOpen(next);
    if (next.length === 2) setMoves((count) => count + 1);
  };

  const reset = () => {
    setDeck(shuffleMemory());
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setLock(false);
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">Flip two boxes. Find the pairs.</p>
        <p className="text-sm text-slate-400">{moves} moves</p>
      </div>
      <div className="grid grid-cols-4 gap-2" aria-label="Memory puzzle">
        {deck.map((glyph, index) => {
          const shown = open.includes(index) || matched.includes(glyph);
          return (
            <button
              key={`${glyph}-${index}`}
              type="button"
              onClick={() => flip(index)}
              aria-label={shown ? `Card ${glyph}` : 'Hidden card'}
              className={`aspect-square rounded-xl text-2xl font-bold transition-colors ${
                matched.includes(glyph)
                  ? 'bg-emerald-600 text-white'
                  : shown
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-800 text-transparent hover:bg-slate-700'
              }`}
            >
              {shown ? glyph : '·'}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-emerald-300" aria-live="polite">
          {won ? `All pairs found in ${moves} moves.` : 'Match every symbol.'}
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Shuffle
        </button>
      </div>
    </>
  );
};

export const Puzzle: React.FC = () => {
  const [mode, setMode] = useState<'slide' | 'memory'>('slide');
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState(() => shuffle(3));
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const empty = board.indexOf(0);
  const canMove = useMemo(() => new Set(neighbors(empty, size)), [empty, size]);

  const reset = (nextSize = size) => {
    setSize(nextSize);
    setBoard(shuffle(nextSize));
    setMoves(0);
    setWon(false);
  };

  const slide = (index: number) => {
    if (won || !canMove.has(index)) return;
    const next = board.slice();
    next[empty] = next[index];
    next[index] = 0;
    setBoard(next);
    setMoves((count) => count + 1);
    if (isSolved(next, size)) setWon(true);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const row = Math.floor(empty / size);
    const col = empty % size;
    const target =
      event.key === 'ArrowLeft' && col < size - 1
        ? empty + 1
        : event.key === 'ArrowRight' && col > 0
          ? empty - 1
          : event.key === 'ArrowUp' && row < size - 1
            ? empty + size
            : event.key === 'ArrowDown' && row > 0
              ? empty - size
              : -1;

    if (target < 0) return;
    event.preventDefault();
    slide(target);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24" id="puzzle">
      <div className="mb-10">
        <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-white">
          <LayoutGrid className="text-indigo-400" />
          Puzzles
        </h2>
        <p className="max-w-xl text-slate-400">
          {mode === 'slide' ? 'Slide a box into the gap. Put them in order.' : 'Flip two boxes and find the matching pairs.'}
        </p>
      </div>

      <div className="max-w-md rounded-3xl border border-slate-800 bg-slate-900/40 p-5 md:p-6">
        <div className="mb-4 flex gap-2">
          {([
            ['slide', 'Slide'],
            ['memory', 'Memory'],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`rounded-full border px-3 py-1.5 text-xs ${
                mode === id
                  ? 'border-indigo-400 bg-indigo-500/15 text-white'
                  : 'border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {mode === 'memory' ? (
          <MemoryPuzzle />
        ) : (
          <>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {[3, 4].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => reset(option)}
                className={`rounded-full border px-3 py-1.5 text-xs ${
                  size === option
                    ? 'border-indigo-400 bg-indigo-500/15 text-white'
                    : 'border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {option}×{option}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-400">{moves} moves</p>
        </div>

        <div
          role="group"
          aria-label="Sliding puzzle"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="grid gap-2 rounded-2xl bg-slate-950/70 p-2 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {board.map((tile, index) =>
            tile === 0 ? (
              <motion.div
                key="gap"
                layout
                className="aspect-square rounded-xl border border-dashed border-slate-700"
              />
            ) : (
              <motion.button
                key={tile}
                layout
                type="button"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                disabled={!canMove.has(index) || won}
                onClick={() => slide(index)}
                aria-label={`Box ${tile}`}
                className={`aspect-square rounded-xl text-lg font-bold text-white shadow-lg disabled:cursor-default ${
                  canMove.has(index) && !won
                    ? 'bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600'
                    : 'bg-slate-800 text-slate-200'
                }`}
              >
                {tile}
              </motion.button>
            ),
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm text-emerald-300" aria-live="polite">
            {won ? `Solved in ${moves} moves.` : 'The empty space is the gap.'}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Shuffle
          </button>
        </div>
          </>
        )}
      </div>
    </section>
  );
};
