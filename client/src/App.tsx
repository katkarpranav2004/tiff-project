import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import { Spinner } from './components/ui/Primitives';

// Layouts + landing page load eagerly (needed for first paint).
import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/public/Home';

// Public secondary pages — code-split.
const About = lazy(() => import('./pages/public/About'));
const Incubatees = lazy(() => import('./pages/public/Incubatees'));
const IncubateeStory = lazy(() => import('./pages/public/IncubateeStory'));
const Courses = lazy(() => import('./pages/public/Courses'));
const CourseDetail = lazy(() => import('./pages/public/CourseDetail'));
const Events = lazy(() => import('./pages/public/Events'));
const EventDetail = lazy(() => import('./pages/public/EventDetail'));
const EventStory = lazy(() => import('./pages/public/EventStory'));
const Certificates = lazy(() => import('./pages/public/Certificates'));
const Contact = lazy(() => import('./pages/public/Contact'));
const AnnualReports = lazy(() => import('./pages/public/AnnualReports'));
const IncubeInAction = lazy(() => import('./pages/public/IncubeInAction'));
const NationalStartupDay = lazy(() => import('./pages/public/NationalStartupDay'));
const NotFound = lazy(() => import('./pages/public/NotFound'));

// Admin — code-split so public visitors never download the admin bundle.
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminCertificates = lazy(() => import('./pages/admin/AdminCertificates'));
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses'));
const AdminEvents = lazy(() => import('./pages/admin/AdminEvents'));
const AdminIncubatees = lazy(() => import('./pages/admin/AdminIncubatees'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const AdminBoard = lazy(() => import('./pages/admin/AdminBoard'));
const AdminMentors = lazy(() => import('./pages/admin/AdminMentors'));
const AdminFaqs = lazy(() => import('./pages/admin/AdminFaqs'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60_000, // 1 min: avoid refetching the same public data on every mount
    },
  },
});

const PageFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <Spinner className="h-8 w-8 text-brand" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              {/* Public */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/incubatees" element={<Incubatees />} />
                <Route path="/incubatees/:slug" element={<IncubateeStory />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:slug" element={<CourseDetail />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/story/:slug" element={<EventStory />} />
                <Route path="/events/:slug" element={<EventDetail />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/certificates/verify" element={<Certificates />} />
                <Route path="/annual-reports" element={<AnnualReports />} />
                <Route path="/incube-in-action" element={<IncubeInAction />} />
                <Route path="/national-startup-day" element={<NationalStartupDay />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin auth */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin protected */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="certificates" element={<AdminCertificates />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="incubatees" element={<AdminIncubatees />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="board" element={<AdminBoard />} />
                <Route path="mentors" element={<AdminMentors />} />
                <Route path="faqs" element={<AdminFaqs />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
