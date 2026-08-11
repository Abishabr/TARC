import type { RouteObject } from 'react-router-dom'
import DashboardPage from '../pages/dashboard/DashboardPage'
import StaffPage from '../pages/dashboard/StaffPage'
import DepartmentsPage from '../pages/dashboard/DepartmentsPage'
import ResearchProgramsPage from '../pages/dashboard/ResearchProgramsPage'
import ProjectsPage from '../pages/dashboard/ProjectsPage'
import PublicationsPage from '../pages/dashboard/PublicationsPage'
import NewsPage from '../pages/dashboard/NewsPage'
import EventsPage from '../pages/dashboard/EventsPage'
import GalleryPage from '../pages/dashboard/GalleryPage'
import VehiclesPage from '../pages/dashboard/VehiclesPage'
import MessagesPage from '../pages/dashboard/MessagesPage'
import SettingsPage from '../pages/dashboard/SettingsPage'
import ProfilePage from '../pages/dashboard/ProfilePage'

export const dashboardPageRoutes: RouteObject[] = [
  { index: true, element: <DashboardPage /> },
  { path: 'staff', element: <StaffPage /> },
  { path: 'departments', element: <DepartmentsPage /> },
  { path: 'research-programs', element: <ResearchProgramsPage /> },
  { path: 'projects', element: <ProjectsPage /> },
  { path: 'publications', element: <PublicationsPage /> },
  { path: 'news', element: <NewsPage /> },
  { path: 'events', element: <EventsPage /> },
  { path: 'gallery', element: <GalleryPage /> },
  { path: 'vehicles', element: <VehiclesPage /> },
  { path: 'messages', element: <MessagesPage /> },
  { path: 'settings', element: <SettingsPage /> },
  { path: 'profile', element: <ProfilePage /> },
]
