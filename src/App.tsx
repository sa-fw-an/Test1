import { RouterProvider } from 'react-router-dom';
import router from './routes';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
