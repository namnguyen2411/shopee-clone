import { useLayoutEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom'

const ScrollToTop = () => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return <Outlet />
}

export default ScrollToTop
