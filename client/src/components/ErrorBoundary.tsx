import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

/**
 * Catches render errors anywhere below it and shows a recoverable fallback
 * instead of a blank white screen.
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log for diagnostics; swap for a real reporter (Sentry) in production.
    // eslint-disable-next-line no-console
    console.error('Render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-warm-ivory p-6 text-center">
          <h1 className="font-serif text-2xl font-bold text-foundation-dark">Something went wrong</h1>
          <p className="max-w-md text-sm text-stone-slate">
            An unexpected error occurred. Please reload the page. If it keeps happening, try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-foundation-green px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-warm-ivory transition-colors hover:bg-foundation-dark"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
