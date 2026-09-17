import { Container, Button } from '../../components/ui/Primitives';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="font-heading text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 max-w-md text-slate-600">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/"><Home className="h-4 w-4" /> Back home</Button>
        <Button to="/certificates" variant="secondary"><ArrowLeft className="h-4 w-4" /> Verify a certificate</Button>
      </div>
    </Container>
  );
};

export default NotFound;
