import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import UserSideNav from 'src/components/UserSideNav'

export default function UserLayout() {
  return (
    <div>
      <Header />
      <div className='bg-neutral-100 py-5 text-sm text-gray-600'>
        <div className='container'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
            <div className='md:col-span-3 lg:col-span-2'>
              <UserSideNav />
            </div>
            <div className='md:col-span-9 lg:col-span-10'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
