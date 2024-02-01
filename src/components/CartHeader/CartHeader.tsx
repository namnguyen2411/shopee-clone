import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import NavHeader from '../NavHeader'
import LogoSVG from '../LogoSVG'
import routes from 'src/constants/routes'
import useSearchProducts from 'src/hooks/useSearchProducts'

export default function CartHeader() {
  const { register, onSubmit } = useSearchProducts()
  const { t } = useTranslation('cart')

  return (
    <div className='bg-primary text-white shadow-md'>
      <div className='container'>
        <NavHeader />
      </div>
      <div className='bg-white py-6'>
        <div className='container'>
          <nav className='md:flex md:items-center md:justify-between'>
            {/* Logo */}
            <Link to={routes.home} className='flex flex-shrink-0 items-end'>
              <div>
                <LogoSVG className='h-10 fill-primary' />
              </div>
              <div className='mx-4 h-6 w-[1px] bg-primary md:h-8' />
              <div className='capitalize text-primary md:text-xl'>{t('title')}</div>
            </Link>
            {/* Search */}
            <form className='mt-3 md:mt-0 md:w-[50%]' onSubmit={(e) => void onSubmit(e)}>
              <div className='flex rounded-sm border-2 border-primary'>
                <input
                  type='text'
                  className='w-full flex-grow border-none bg-transparent px-3 py-1 text-black outline-none'
                  placeholder='Free Ship Đơn Từ 0Đ'
                  {...register('productName')}
                />
                <button className='flex-shrink-0 rounded-sm bg-primary px-8 py-2 hover:opacity-90'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5 stroke-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                  </svg>
                </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </div>
  )
}
