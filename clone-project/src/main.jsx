import { StrictMode, useEffect, useState, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Loader from './components/Loader/Loader'; // Import the Loader component

// Lazy load components
const Layout = lazy(() => import('./views/Layout/Layout'));
const Home = lazy(() => import('./views/Home/Home'));
const Video = lazy(() => import('./views/Video/Video'));
const SearchPage = lazy(() => import('./views/SearchPage/SearchPage'));
const Auth = lazy(() => import('./views/Auth/Auth'));

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false); // Global loading state

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('authToken'));
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // Create router with loading handlers
  const router = createBrowserRouter([
    {
      path: '/auth',
      element: (
        <Suspense fallback={<Loader />}>
          <Auth onAuthSuccess={handleAuthSuccess} />
        </Suspense>
      ),
    },
    {
      path: '/',
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: '/video/:categoryId/:videoId',
          element: (
            <Suspense fallback={<Loader />}>
              <Video />
            </Suspense>
          ),
        },
        {
          path: '/results',
          element: (
            <Suspense fallback={<Loader />}>
              <SearchPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  // Hook into navigation events to manage loading state
  const handleStartLoading = () => setLoading(true);
  const handleStopLoading = () => setLoading(false);

  // Use RouterProvider's built-in events to detect navigation changes
  useEffect(() => {
    router.subscribe((state) => {
      if (state.state === 'loading') {
        handleStartLoading();
      } else {
        handleStopLoading();
      }
    });
  }, [router]);

  return (
    <>
      {loading && <Loader />} {/* Show the loader if loading is true */}
      <RouterProvider router={router} />
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
