import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import DeviceList from './pages/DeviceList';
import Messages from './pages/Messages';
import Account from './pages/Account';
import Maps from './pages/Maps';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import { Navigate } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'devices', element: <DeviceList /> },
      { path: 'messages', element: <Messages /> },
      { path: 'maps', element: <Maps height='91'/> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> }
    ]
  },
]);

export default routes;
