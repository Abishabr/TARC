import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import LoginPage from '../pages/auth/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import { protectedRoutes } from './protected.routes'
import { websiteRoutes } from './website.routes'

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [{ path: 'login', element: <LoginPage /> }],
  },
  ...websiteRoutes,
  ...protectedRoutes,
  { path: '*', element: <NotFoundPage /> },
])
