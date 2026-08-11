import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminLayout } from '@/components/layout/AdminLayout'
import DashboardPage from '@/features/admin/dashboard/DashboardPage'
import StaffPage from '@/features/admin/staff/StaffPage'
import DepartmentsPage from '@/features/admin/departments/DepartmentsPage'
import ProjectsPage from '@/features/admin/projects/ProjectsPage'
import PublicationsPage from '@/features/admin/publications/PublicationsPage'
import NewsPage from '@/features/admin/news/NewsPage'
import ResearchProgramsPage from '@/features/admin/research-programs/ResearchProgramsPage'
import EventsPage from '@/features/admin/events/EventsPage'
import GalleryPage from '@/features/admin/gallery/GalleryPage'
import VehiclesPage from '@/features/admin/vehicles/VehiclesPage'
import MessagesPage from '@/features/admin/messages/MessagesPage'
import SettingsPage from '@/features/admin/settings/SettingsPage'
import ProfilePage from '@/features/admin/profile/ProfilePage'

export function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="" element={<DashboardPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="research-programs" element={<ResearchProgramsPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="publications" element={<PublicationsPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate replace to="/admin" />} />
      </Routes>
    </AdminLayout>
  )
}
