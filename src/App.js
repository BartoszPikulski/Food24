import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/routes';
import AuthProvider from './context/AuthProvider';
import ProductProvider from './context/ProductProvider';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <RouterProvider router={router} />
        <Toaster></Toaster>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
