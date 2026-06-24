import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router keeps the window scroll position across client-side navigations,
// so a new page can open already scrolled down. This resets scroll to the top
// whenever the route (pathname) changes. Must be rendered inside <Router>.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
