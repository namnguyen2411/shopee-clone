import { Link } from 'react-router-dom'
import { useContext } from 'react'

import Popover from '../Popover'
import Button from '../Button'
import routes from 'src/constants/routes'
import { AppContext } from 'src/context/appContext'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'

export default function NavHeader() {
  const { isAuthenticated, profile } = useContext(AppContext)

  const logOutMutation = useMutation({
    mutationFn: authApi.logOut,
    onSuccess: () => {
      window.location.reload()
    }
  })

  return (
    <div className='flex items-center justify-between'>
      <div className='flex text-sm'>
        <Link to='https://shopee.vn/web' target='_blank' className='border-r border-l-white pr-2'>
          Tải ứng dụng
        </Link>
        <div className='px-2'>Kết nối</div>
      </div>
      <div className='flex justify-end text-sm'>
        <Popover
          className='flex cursor-pointer items-center py-1 hover:text-gray-300'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <div className='flex flex-col gap-2 py-2 pl-3 pr-28 text-black'>
                <Button className='px-3 py-2 text-left hover:text-primary'>Tiếng Việt</Button>
                <Button className='px-3 py-2 text-left hover:text-primary'>English</Button>
              </div>
            </div>
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
            />
          </svg>
          <span className='mx-1'>Tiếng Việt</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </Popover>
        {/* authenticated */}
        {isAuthenticated && (
          <Popover
            className='z-20 ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'
            renderPopover={
              <div className='relative rounded-sm border border-gray-200 bg-white text-black shadow-md'>
                <Link
                  to={routes.profile}
                  className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  Tài khoản của tôi
                </Link>
                <Link
                  to={routes.purchases}
                  className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  Đơn mua
                </Link>
                <Button
                  onClick={() => logOutMutation.mutate()}
                  className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  Đăng xuất
                </Button>
              </div>
            }
          >
            <div className='mr-2 h-6 w-6 flex-shrink-0'>
              <img
                src='https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <div>{profile?.email}</div>
          </Popover>
        )}
        {/* unauthenticated */}
        {!isAuthenticated && (
          <div className='flex items-center'>
            <Link to={routes.register} className='mx-3 capitalize hover:text-gray-300'>
              Đăng ký
            </Link>
            <div className='h-4 border-r-2 border-gray-300' />
            <Link to={routes.login} className='mx-3 capitalize hover:text-gray-300'>
              Đăng Nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
