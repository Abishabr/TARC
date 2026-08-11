import type { RouteObject } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import { dashboardPageRoutes } from './dashboard.routes'

export const protectedRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: dashboardPageRoutes,
  },
]
