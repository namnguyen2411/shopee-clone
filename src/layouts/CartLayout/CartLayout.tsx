import { Outlet } from 'react-router-dom'
import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'

export default function CartLayout() {
  return (
    <div>
      <CartHeader />
      <Outlet />
      <Footer />
    </div>
  )
}
