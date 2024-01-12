import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
// layouts
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
// pages
import Login from './pages/Login'
import routes from './constants/routes'
import Register from './pages/Register'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<RegisterLayout />}>
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.login} element={<Login />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path={routes.home} element={<Products />} />
        <Route path={routes.product} element={<ProductDetail />} />
      </Route>
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}
