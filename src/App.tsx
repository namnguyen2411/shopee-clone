import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppContext } from './context/appContext'
import routes from './constants/routes'
import { localStorageEventTarget } from './utils/auth'
// layouts
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
// pages
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Profile from './pages/User/components/Profile'
import Purchase from './pages/User/components/Purchase'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'
import UserLayout from './layouts/UserLayout'
import Password from './pages/User/components/Password'

export default function App() {
  const { isAuthenticated, reset } = useContext(AppContext)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<RegisterLayout />}>
          <Route path={routes.register} element={isAuthenticated ? <Navigate to={routes.home} /> : <Register />} />
          <Route path={routes.login} element={isAuthenticated ? <Navigate to={routes.home} /> : <Login />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path={routes.home} element={<Products />} />
          <Route path={routes.product} element={<ProductDetail />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path={routes.purchases} element={isAuthenticated ? <Purchase /> : <Navigate to={routes.login} />} />
          <Route path={routes.profile} element={isAuthenticated ? <Profile /> : <Navigate to={routes.login} />} />
          <Route
            path={routes.changePassword}
            element={isAuthenticated ? <Password /> : <Navigate to={routes.login} />}
          />
        </Route>
        <Route element={<CartLayout />}>
          <Route path={routes.cart} element={isAuthenticated ? <Cart /> : <Navigate to={routes.login} />} />
        </Route>
      </Route>
    )
  )

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLocalStorage', reset)

    return () => {
      localStorageEventTarget.removeEventListener('clearLocalStorage', reset)
    }
  }, [reset])

  return (
    <div className='App'>
      <ToastContainer
        className={'mt-5 min-w-fit text-center text-lg'}
        theme='dark'
        closeOnClick
        pauseOnHover={false}
        closeButton={false}
        hideProgressBar={true}
      />
      <RouterProvider router={router} />
    </div>
  )
}
