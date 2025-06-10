import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Feed from '../pages/Feed/Feed';
import Create from '../pages/Create/Create';
import Messages from '../pages/Messages/Messages';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Feed />
      },
      {
        path: '/create',
        element: <Create />
      },
      {
        path: '/messages',
        element: <Messages />
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]); 