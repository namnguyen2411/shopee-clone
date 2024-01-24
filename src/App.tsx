import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppContext } from './context/appContext'
import routes from './constants/routes'
// layouts
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
// pages
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Profile from './pages/Profile'
import Purchase from './pages/Purchase'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'

export default function App() {
  const { isAuthenticated } = useContext(AppContext)

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
          <Route path={routes.purchases} element={isAuthenticated ? <Purchase /> : <Navigate to={routes.login} />} />
          <Route path={routes.profile} element={isAuthenticated ? <Profile /> : <Navigate to={routes.login} />} />
        </Route>
        <Route element={<CartLayout />}>
          <Route path={routes.cart} element={isAuthenticated ? <Cart /> : <Navigate to={routes.login} />} />
        </Route>
      </Route>
    )
  )
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
