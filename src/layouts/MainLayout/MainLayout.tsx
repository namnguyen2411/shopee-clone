import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

export default function MainLayout() {
  return (
    <div className='bg-gray-100'>
      <Header />
      <div className='container'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
