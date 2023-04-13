import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { AuthProvider } from './providers/auth.provider';
import { ToastContainer } from 'react-toastify';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './redux-ts';
import { ProtectedRoute } from './routes/protected.route';
import Login from './features/login/login.page';
import ErrorPage from './routes/error.page';
import { Configurations } from './features/configs/config.page';
import { Propaganda } from './features/propaganda/propaganda.page';
import RegisterClient from './features/register-client/register-client.page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/config",
    element: (<ProtectedRoute> <Configurations /> </ProtectedRoute>),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/',
    // element: <Propaganda />
    element: <RegisterClient />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          pauseOnFocusLoss={false}
          hideProgressBar
        />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
