import type { RouteObject } from 'react-router-dom'
import WebsiteLayout from '../layouts/WebsiteLayout'
import HomePage from '../pages/website/HomePage'
import AboutPage from '../pages/website/AboutPage'
import DirectorPage from '../pages/website/DirectorPage'
import DepartmentsPage from '../pages/website/DepartmentsPage'
import ResearchProgramsPage from '../pages/website/ResearchProgramsPage'
import ProjectsPage from '../pages/website/ProjectsPage'
import PublicationsPage from '../pages/website/PublicationsPage'
import NewsPage from '../pages/website/NewsPage'
import EventsPage from '../pages/website/EventsPage'
import GalleryPage from '../pages/website/GalleryPage'
import ContactPage from '../pages/website/ContactPage'

export const websiteRoutes: RouteObject[] = [
  {
    path: '/',
    element: <WebsiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'director', element: <DirectorPage /> },
      { path: 'departments', element: <DepartmentsPage /> },
      { path: 'research-programs', element: <ResearchProgramsPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'publications', element: <PublicationsPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
]
