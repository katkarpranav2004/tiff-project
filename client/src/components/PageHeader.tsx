import type { ReactNode } from 'react';
import { Container, Eyebrow } from './ui/Primitives';

const PageHeader = ({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) => {
  return (
    <div className="relative overflow-hidden border-b border-slate-200 bg-surface-alt pt-32 pb-14 md:pt-36 md:pb-16">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,#000_40%,transparent_100%)]" />
      <Container className="relative">
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{description}</p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </div>
  );
};

export default PageHeader;
