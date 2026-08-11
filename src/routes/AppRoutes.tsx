import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicRoutes } from './PublicRoutes'
import { AdminRoutes } from './AdminRoutes'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}
