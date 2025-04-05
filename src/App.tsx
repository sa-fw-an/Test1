import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

const App = () => {
  useEffect(() => {
    // Handle scrolling to top on route change
    const unsubscribe = router.subscribe(() => {
      window.scrollTo(0, 0);
    });

    // Handle redirects from 404.html
    const handleRedirect = () => {
      const redirectPath = sessionStorage.getItem('redirectPath');

      if (redirectPath) {
        console.log('Handling redirect to:', redirectPath);
        // Remove the redirectPath from sessionStorage to prevent loops
        sessionStorage.removeItem('redirectPath');

        // Navigate to the stored path
        try {
          router.navigate(redirectPath);
        } catch (err) {
          console.error('Navigation error:', err);
          // Fallback to root if navigation fails
          if (window.location.pathname !== '/') {
            window.location.href = '/';
          }
        }
      }
    };

    // Execute redirect handling after a slight delay to ensure the router is ready
    const timeoutId = setTimeout(handleRedirect, 300);

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
