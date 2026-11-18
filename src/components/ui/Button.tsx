import React from 'react';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  icon?: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-white text-ink-950 shadow-[0_10px_40px_-12px_rgba(165,180,252,0.7)] hover:bg-indigo-50 hover:shadow-[0_14px_50px_-12px_rgba(165,180,252,0.9)]',
  secondary: 'border border-white/10 bg-white/[0.04] text-white backdrop-blur hover:border-white/20 hover:bg-white/[0.08]',
  ghost: 'text-slate-400 hover:text-white',
};

const isExternal = (href?: string) => !!href && /^https?:\/\//.test(href);

/** Every call to action on this site navigates, so buttons render as anchors. */
export const ButtonLink: React.FC<ButtonLinkProps> = ({ variant = 'primary', icon, className, children, href, ...props }) => (
  <a
    href={href}
    {...(isExternal(href) ? { target: '_blank', rel: 'noreferrer' } : {})}
    className={cn(
      'group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300',
      variants[variant],
      className,
    )}
    {...props}
  >
    {children}
    {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
  </a>
);

interface IconLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
}

export const IconLink: React.FC<IconLinkProps> = ({ label, href, className, children, ...props }) => (
  <a
    href={href}
    aria-label={label}
    title={label}
    {...(isExternal(href) ? { target: '_blank', rel: 'noreferrer' } : {})}
    className={cn(
      'grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-400 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-white',
      className,
    )}
    {...props}
  >
    {children}
  </a>
);
