import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Volume2, VolumeX, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { navLinks, profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { sound } from '../../lib/sound';
import { cn } from '../../lib/utils';
import { ButtonLink } from '../ui/Button';

const sectionIds = navLinks.map((link) => link.href.slice(1));

interface NavbarProps {
  /** Clicking the logo plays the opening cut again (with sound, if it is on). */
  onReplay: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplay }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(sound.enabled);
  const active = useActiveSection(sectionIds);

  const toggleSound = () => {
    const next = !soundOn;
    sound.setEnabled(next);
    setSoundOn(next);
    sound.slice();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-full border py-2 pl-5 pr-2 transition-all duration-500',
          scrolled || open
            ? 'border-white/[0.08] bg-ink-900/70 shadow-soft backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <a
          href="#top"
          title="Replay intro"
          onClick={(event) => {
            event.preventDefault();
            setOpen(false);
            onReplay();
          }}
          className="font-display text-lg font-bold tracking-tight text-white"
        >
          {profile.firstName.toLowerCase()}
          <span className="text-gradient">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative isolate block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/10"
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
            title={soundOn ? 'Sound on' : 'Sound off'}
            className={cn(
              'grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/[0.06]',
              soundOn ? 'text-indigo-200' : 'text-slate-500 hover:text-white',
            )}
          >
            {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
          <ButtonLink href={`mailto:${profile.email}`} className="hidden h-9 px-4 text-[13px] sm:inline-flex">
            Let&apos;s talk
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center rounded-full text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="surface mx-auto mt-2 max-w-6xl p-2 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
