import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/* Container                                                          */
/* ------------------------------------------------------------------ */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={clsx('mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section — vertical rhythm + tonal backgrounds                      */
/* ------------------------------------------------------------------ */
type Tone = 'default' | 'alt' | 'muted' | 'navy' | 'brand';

const toneClasses: Record<Tone, string> = {
  default: 'bg-white text-ink',
  alt: 'bg-surface-alt text-ink',
  muted: 'bg-surface-muted text-ink',
  navy: 'bg-navy text-white',
  brand: 'bg-brand text-white',
};

export function Section({
  tone = 'default',
  className,
  containerClassName,
  children,
  id,
}: {
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={clsx('py-20 md:py-28', toneClasses[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Eyebrow — small uppercase kicker                                    */
/* ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  className,
  onDark = false,
}: {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]',
        onDark ? 'text-gold' : 'text-gold-mute',
        className
      )}
    >
      <span className="h-px w-6 bg-current opacity-60" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeading                                                      */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'center' && 'mx-auto max-w-2xl',
        className
      )}
    >
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2
        className={clsx(
          'font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]',
          onDark ? 'text-white' : 'text-ink'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            'max-w-2xl text-base leading-relaxed sm:text-lg',
            onDark ? 'text-white/70' : 'text-slate-600'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark shadow-sm border border-gold/40',
  secondary: 'bg-white text-ink border border-slate-200 hover:border-slate-300 hover:bg-slate-50',
  ghost: 'text-ink hover:bg-slate-100',
  dark: 'bg-navy text-white hover:bg-navy-light',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
};

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  target?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled,
  className,
  children,
  target,
}: ButtonProps) {
  const cls = clsx(base, variants[variant], sizes[size], className);

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */
export function Card({
  className,
  children,
  hover = false,
}: {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-slate-200 bg-white',
        hover && 'transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pill / tag                                                          */
/* ------------------------------------------------------------------ */
export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-dark',
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* States: loading / empty                                             */
/* ------------------------------------------------------------------ */
export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={clsx('animate-spin', className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
      />
    </svg>
  );
}

export function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-surface-alt px-6 py-16 text-center">
      {icon && <div className="mb-4 text-slate-400">{icon}</div>}
      <h3 className="font-heading text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={clsx('animate-pulse rounded-xl border border-slate-200 bg-white p-5', className)}>
      <div className="mb-4 h-40 w-full rounded-lg bg-slate-100" />
      <div className="mb-2 h-4 w-2/3 rounded bg-slate-100" />
      <div className="h-3 w-full rounded bg-slate-100" />
      <div className="mt-2 h-3 w-4/5 rounded bg-slate-100" />
    </div>
  );
}
