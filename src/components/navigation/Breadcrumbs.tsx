import { useLocation, Link } from 'react-router-dom'

export function Breadcrumbs() {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)

  return (
    <nav className="text-sm text-slate-500">
      <Link to="/">Home</Link>
      {segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/')
        return (
          <span key={path}>
            {' / '}
            <Link to={path}>{segment.replace(/-/g, ' ')}</Link>
          </span>
        )
      })}
    </nav>
  )
}
