import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import HomePage from '@/features/public/home/HomePage'
import AboutPage from '@/features/public/about/AboutPage'
import DepartmentsPage from '@/features/public/departments/DepartmentsPage'
import ResearchProgramsPage from '@/features/public/research-programs/ResearchProgramsPage'
import ProjectsPage from '@/features/public/projects/ProjectsPage'
import PublicationsPage from '@/features/public/publications/PublicationsPage'
import NewsPage from '@/features/public/news/NewsPage'
import EventsPage from '@/features/public/events/EventsPage'
import GalleryPage from '@/features/public/gallery/GalleryPage'
import ContactPage from '@/features/public/contact/ContactPage'

export function PublicRoutes() {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="research-programs" element={<ResearchProgramsPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="publications" element={<PublicationsPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Routes>
    </PublicLayout>
  )
}
