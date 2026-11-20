import { ArrowUp, Check, Copy, Github, Linkedin, Mail, Phone } from 'lucide-react';
import React, { useState } from 'react';
import { profile } from '../../data/profile';
import { ButtonLink, IconLink } from '../ui/Button';
import { ResumeButton } from '../ui/ResumeButton';
import { Reveal } from '../ui/Reveal';

const CopyEmail: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${profile.email}`}
      className="inline-flex h-11 max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 font-mono text-[13px] text-slate-200 transition duration-300 hover:border-white/20 hover:bg-white/[0.08]"
    >
      <span className="truncate">{profile.email}</span>
      {copied ? <Check size={15} className="text-emerald-300" /> : <Copy size={15} className="text-slate-400" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email copied' : ''}
      </span>
    </button>
  );
};

export const Contact: React.FC = () => (
  <section id="contact" aria-labelledby="contact-title" className="relative mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 md:pt-32">
    <Reveal>
      <div className="relative overflow-hidden rounded-[2rem] p-px">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-indigo-400/35 via-white/[0.06] to-emerald-300/25" />
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-ink-900 px-6 py-16 text-center sm:px-12 md:py-24">
          <div aria-hidden className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[100px]" />
          <p className="eyebrow relative">Contact</p>
          <h2 id="contact-title" className="relative mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl md:text-6xl">
            Let&apos;s build something <span className="text-gradient">useful.</span>
          </h2>
          <p className="relative mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            I&apos;m open to backend engineering opportunities, freelance projects and collaborations. If you need help with APIs,
            database development, backend integrations or building a complete application, let&apos;s talk.
          </p>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={`mailto:${profile.email}`} icon={<Mail size={16} />}>
              Email me
            </ButtonLink>
            <CopyEmail />
            <ResumeButton />
          </div>
          <ul className="relative mt-8 flex items-center justify-center gap-3">
            <li>
              <IconLink href={profile.linkedin} label="LinkedIn">
                <Linkedin size={17} />
              </IconLink>
            </li>
            <li>
              <IconLink href={profile.github} label="GitHub">
                <Github size={17} />
              </IconLink>
            </li>
            <li>
              <IconLink href={profile.phoneHref} label={`Call ${profile.phone}`}>
                <Phone size={17} />
              </IconLink>
            </li>
          </ul>
        </div>
      </div>
    </Reveal>
  </section>
);

export const Footer: React.FC = () => (
  <footer className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/[0.06] px-5 py-10 text-sm text-slate-400 sm:flex-row sm:px-8">
    <p>
      © {new Date().getFullYear()} {profile.name} · {profile.role}
    </p>
    <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
      Back to top
      <ArrowUp size={14} />
    </a>
  </footer>
);
