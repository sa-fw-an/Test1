import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

const App = () => {
  useEffect(() => {
    // Scroll to top on route change
    const unsubscribe = router.subscribe(() => {
      window.scrollTo(0, 0);
    });

    // Handle redirection from 404.html
    const handleRedirect = () => {
      const redirectPath = sessionStorage.getItem('gh_redirect');
      if (redirectPath) {
        console.log('Restoring route:', redirectPath);
        
        // Clear the redirect to prevent loops
        sessionStorage.removeItem('gh_redirect');
        
        // Use the router to navigate
        setTimeout(() => {
          router.navigate(redirectPath);
        }, 100);
      }
    };

    // Run the redirect handler
    handleRedirect();

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;