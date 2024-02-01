import { useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { AppContext } from 'src/context/appContext'
import Popover from '../Popover'
import routes from 'src/constants/routes'
import purchasesApi from 'src/apis/purchase.api'
import { formatCurrency, generateNameId } from 'src/utils/helper'
import Button from '../Button'
import noProduct from 'src/assets/images/no-product.png'
import Input from '../Input'
import NavHeader from '../NavHeader'
import LogoSVG from '../LogoSVG'
import useSearchProducts from 'src/hooks/useSearchProducts'
import useQueryProductsOptions from 'src/hooks/useQueryProductsOptions'

const NUMBER_OF_DISPLAY_PURCHASES = 5

export default function Header() {
  const { isAuthenticated } = useContext(AppContext)
  const { name } = useQueryProductsOptions()
  const navigate = useNavigate()
  const { register, onSubmit, reset } = useSearchProducts()
  const { t } = useTranslation('header')

  const { data: purchasesResponse } = useQuery({
    queryKey: ['purchases'],
    queryFn: () => purchasesApi.getPurchases({ status: -1 }),
    enabled: Boolean(isAuthenticated)
  })
  const purchasesData = purchasesResponse?.data.data

  const handleClickPurchase = ({ name, id }: { name: string; id: string }) => {
    navigate(`${routes.products}/${generateNameId({ name, id })}`)
  }

  useEffect(() => {
    window.addEventListener('category_changed', () => {
      reset()
    })

    return () => {
      window.removeEventListener('category_changed', () => {
        reset()
      })
    }
  }, [reset])

  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5 pt-1 text-white'>
      <div className='container'>
        <NavHeader />
        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          {/* Logo */}
          <Link to='/' className='col-span-2'>
            <LogoSVG />
          </Link>
          {/* Search */}
          <form className='col-span-9' onSubmit={(e) => void onSubmit(e)}>
            <div className='flex rounded-sm bg-white p-1'>
              <Input
                type='text'
                name='productName'
                defaultValue={name}
                register={register}
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
                placeholder={t('searchPlaceholder')}
              />
              <Button className='flex-shrink-0 rounded-sm bg-primary px-6 py-2 hover:opacity-90' type='submit'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </Button>
            </div>
          </form>
          {/* Cart */}
          <div className='z-10 col-span-1 mr-3 justify-self-end'>
            <Popover
              renderPopover={
                <>
                  {isAuthenticated && purchasesData && purchasesData.length > 0 && (
                    <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                      <div className='p-3 capitalize text-gray-400'>{t('cart.recentlyAdded')}</div>
                      {purchasesData.slice(0, NUMBER_OF_DISPLAY_PURCHASES).map(({ _id, price, product }) => {
                        return (
                          <Button
                            onClick={() => handleClickPurchase({ name: product.name, id: product._id })}
                            key={_id}
                            className='block w-full'
                          >
                            <div className='p-1 hover:bg-gray-100'>
                              <div className='mb-3 flex'>
                                <div className='flex-shrink-0'>
                                  <img src={product.image} alt={product.name} className='h-11 w-11 object-cover' />
                                </div>
                                <div className='ml-2 flex-grow overflow-hidden'>
                                  <div className='truncate text-black'>{product.name}</div>
                                </div>
                                <div className='ml-10 mr-0.5 flex-shrink-0'>
                                  <span className='text-primary'>₫{formatCurrency(price)}</span>
                                </div>
                              </div>
                            </div>
                          </Button>
                        )
                      })}
                      <div className='flex items-center justify-between p-3'>
                        <div className='text-xs capitalize text-gray-500'>
                          {purchasesData &&
                            purchasesData.length - 5 > 0 &&
                            `${purchasesData.length - 5} Thêm hàng vào giỏ`}
                        </div>
                        <Link
                          to={routes.cart}
                          className='rounded-sm bg-primary px-4 py-2 capitalize text-white hover:bg-opacity-90'
                        >
                          {t('cart.viewCart')}
                        </Link>
                      </div>
                    </div>
                  )}
                  {(!isAuthenticated || (purchasesData && purchasesData.length <= 0)) && (
                    <div className='flex h-[240px] w-[400px] flex-col items-center justify-center bg-white'>
                      <img src={noProduct} alt='no-product' className='aspect-square w-[100px]' />
                      <p className='mt-2 text-black'>{t('cart.noProducts')}</p>
                    </div>
                  )}
                </>
              }
            >
              <Link to={routes.cart} className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-8 w-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                {isAuthenticated && purchasesData && purchasesData.length > 0 && (
                  <span className='absolute -right-2 -top-2 grid h-5 w-6 place-items-center rounded-3xl bg-white text-sm text-red-500'>
                    {purchasesData.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
