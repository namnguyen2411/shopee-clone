import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { useContext, useEffect, lazy, Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppContext } from './context/appContext'
import routes from './constants/routes'
import { localStorageEventTarget } from './utils/auth'
import ErrorBoundary from './components/ErrorBoundary'
import Loading from './components/Loading'
// layouts
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import CartLayout from './layouts/CartLayout'
import UserLayout from './layouts/UserLayout'
// pages
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Profile = lazy(() => import('./pages/User/components/Profile'))
const Purchases = lazy(() => import('./pages/User/components/Purchase'))
const Cart = lazy(() => import('./pages/Cart'))
const Password = lazy(() => import('./pages/User/components/Password'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const { isAuthenticated, reset } = useContext(AppContext)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorBoundary />}>
        <Route element={<RegisterLayout />}>
          <Route
            path={routes.register}
            element={
              isAuthenticated ? (
                <Navigate to={routes.home} />
              ) : (
                <Suspense fallback={<Loading />}>
                  <Register />
                </Suspense>
              )
            }
          />

          <Route
            path={routes.login}
            element={
              isAuthenticated ? (
                <Navigate to={routes.home} />
              ) : (
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              )
            }
          />
        </Route>
        <Route element={<MainLayout />}>
          <Route
            path={routes.home}
            element={
              <Suspense fallback={<Loading />}>
                <Products />
              </Suspense>
            }
          />

          <Route
            path={routes.product}
            element={
              <Suspense fallback={<Loading />}>
                <ProductDetail />
              </Suspense>
            }
          />
        </Route>
        <Route element={<UserLayout />}>
          <Route
            path={routes.purchase}
            element={
              isAuthenticated ? (
                <Suspense fallback={<Loading />}>
                  <Purchases />
                </Suspense>
              ) : (
                <Navigate to={routes.login} />
              )
            }
          />
          <Route
            path={routes.profile}
            element={
              isAuthenticated ? (
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              ) : (
                <Navigate to={routes.login} />
              )
            }
          />
          <Route
            path={routes.changePassword}
            element={
              isAuthenticated ? (
                <Suspense fallback={<Loading />}>
                  <Password />
                </Suspense>
              ) : (
                <Navigate to={routes.login} />
              )
            }
          />
        </Route>
        <Route element={<CartLayout />}>
          <Route
            path={routes.cart}
            element={
              isAuthenticated ? (
                <Suspense fallback={<Loading />}>
                  <Cart />
                </Suspense>
              ) : (
                <Navigate to={routes.login} />
              )
            }
          />
        </Route>
        <Route element={<MainLayout />}>
          <Route
            path='*'
            element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            }
          />
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
