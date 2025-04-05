import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Handle any redirects from 404.html
    const redirectPath = sessionStorage.getItem('redirectPath');

    if (redirectPath) {
      // Clear the stored path to prevent infinite loops
      sessionStorage.removeItem('redirectPath');

      // Create a history entry for the redirected path
      window.history.replaceState(null, '', redirectPath);
    }

    // Mark app as ready to render
    setIsReady(true);

    // Set up scroll to top on navigation
    const unsubscribe = router.subscribe(() => {
      window.scrollTo(0, 0);
    });

    return () => unsubscribe();
  }, []);

  // Show loading state while handling redirects
  if (!isReady) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
