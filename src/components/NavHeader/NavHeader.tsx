import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import Popover from '../Popover'
import Button from '../Button'
import routes from 'src/constants/routes'
import { AppContext } from 'src/context/appContext'
import authApi from 'src/apis/auth.api'
import { getAvatarUrl, setLanguageToLocalStorage } from 'src/utils/helper'
import { locales } from 'src/i18n/i18n'
import languages from 'src/constants/language'

export default function NavHeader() {
  const { isAuthenticated, profile, reset } = useContext(AppContext)
  const { i18n, t } = useTranslation('header')
  const currentLanguage = locales[i18n.language as keyof typeof locales]

  const logOutMutation = useMutation({
    mutationFn: authApi.logOut,
    onSuccess: () => {
      reset()
    }
  })

  const handleChangeLanguage = async (language: keyof typeof languages) => {
    try {
      await i18n.changeLanguage(language)
      setLanguageToLocalStorage(language)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2 text-sm'>
        <Link to='https://shopee.vn/web' target='_blank'>
          {t('download')}
        </Link>
        <div className='h-4 border-r-2 border-gray-300' />
        <div className='flex items-center gap-1.5'>
          {t('follow')}
          {/* Facebook */}
          <Link to='https://www.facebook.com/ShopeeVN' target='_blank'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              viewBox='0,0,256,256'
              className='aspect-square w-5'
            >
              <g
                fill='#fff'
                strokeWidth={1}
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit={10}
                style={{ mixBlendMode: 'normal' }}
              >
                <g transform='scale(8.53333,8.53333)'>
                  <path d='M15,3c-6.627,0 -12,5.373 -12,12c0,6.016 4.432,10.984 10.206,11.852v-8.672h-2.969v-3.154h2.969v-2.099c0,-3.475 1.693,-5 4.581,-5c1.383,0 2.115,0.103 2.461,0.149v2.753h-1.97c-1.226,0 -1.654,1.163 -1.654,2.473v1.724h3.593l-0.487,3.154h-3.106v8.697c5.857,-0.794 10.376,-5.802 10.376,-11.877c0,-6.627 -5.373,-12 -12,-12z' />
                </g>
              </g>
            </svg>
          </Link>
          {/* Instagram */}
          <Link to='https://www.instagram.com/Shopee_VN/' target='_blank'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30' className='aspect-square w-5 fill-white'>
              <path d='M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z' />
            </svg>
          </Link>
        </div>
      </div>
      <div className='flex justify-end text-sm'>
        <Popover
          className='flex cursor-pointer items-center py-1 hover:text-gray-300'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <div className='flex flex-col gap-2 py-2 pl-3 pr-28 text-black'>
                <Button
                  className='px-3 py-2 text-left hover:text-primary'
                  onClick={() => void handleChangeLanguage('vi')}
                >
                  Tiếng Việt
                </Button>
                <Button
                  className='px-3 py-2 text-left hover:text-primary'
                  onClick={() => void handleChangeLanguage('en')}
                >
                  English
                </Button>
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
          <span className='mx-1'>{currentLanguage}</span>
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
              <div className='relative min-w-36 rounded-sm border border-gray-200 bg-white text-black shadow-md'>
                <Link
                  to={routes.profile}
                  className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  {t('profile.myAccount')}
                </Link>
                <Link
                  to={routes.purchase}
                  className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  {t('profile.myPurchase')}
                </Link>
                <Button
                  onClick={() => logOutMutation.mutate()}
                  className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  {t('profile.logout')}
                </Button>
              </div>
            }
          >
            <div className='mr-2 h-6 w-6 flex-shrink-0'>
              <img
                src={getAvatarUrl(profile?.avatar)}
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
              {t('registerPage.register')}
            </Link>
            <div className='h-4 border-r-2 border-gray-300' />
            <Link to={routes.login} className='mx-3 capitalize hover:text-gray-300'>
              {t('loginPage.login')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
