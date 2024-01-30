import { useContext } from 'react'
import clsx from 'clsx'
import { NavLink, Link } from 'react-router-dom'
import { AppContext } from 'src/context/appContext'
import routes from 'src/constants/routes'
import { getAvatarUrl } from 'src/utils/helper'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)

  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link
          to={routes.profile}
          className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
        >
          <img src={getAvatarUrl(profile?.avatar)} alt='avatar' className='h-full w-full object-cover' />
        </Link>
        <div className='flex-grow pl-2'>
          <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.name}</div>
          <Link to={routes.profile} className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <div>
          <Link to={routes.profile} className='flex flex-col capitalize transition-colors'>
            <div className='flex items-center'>
              <div className='mr-3 h-[22px] w-[22px]'>
                <img
                  src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4'
                  alt=''
                  className='h-full w-full'
                />
              </div>
              Tài khoản của tôi
            </div>
          </Link>
          <div className='ml-[34px]'>
            <NavLink
              to={routes.profile}
              className={({ isActive }) =>
                clsx('mt-4 block capitalize transition-colors', {
                  'text-primary': isActive
                })
              }
            >
              Hồ sơ
            </NavLink>
            <NavLink
              to={routes.changePassword}
              className={({ isActive }) =>
                clsx('mt-4 block capitalize text-gray-600 transition-colors', {
                  'text-primary': isActive
                })
              }
            >
              Đổi mật khẩu
            </NavLink>
          </div>
        </div>

        <NavLink
          to={routes.purchases}
          className={({ isActive }) =>
            clsx('mt-4 flex items-center capitalize text-gray-600 transition-colors', {
              'text-primary': isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078'
              alt='don mua'
              className='h-full w-full'
            />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}
