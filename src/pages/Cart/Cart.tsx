import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import purchaseApi, { ExtendedPurchase } from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import routes from 'src/constants/routes'
import { formatCurrency, generateNameId } from 'src/utils/helper'
import noProduct from 'src/assets/images/no-product.png'
import { AppContext } from 'src/context/appContext'
import purchaseStatus from 'src/constants/purchaseStatus'

const DEBOUNCE_TIME = 600

export default function Cart() {
  const { t } = useTranslation('cart')
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const location = useLocation()
  const buyNowPurchaseId = (location.state as { purchaseId: string | null })?.purchaseId

  const timerRef = useRef(-1)
  const myDebounce = (cb: (purchaseIndex: number, buy_count: number) => void, delayTime: number) => {
    return function (purchaseIndex: number, buy_count: number) {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        cb(purchaseIndex, buy_count)
      }, delayTime)
    }
  }

  const { data: purchasesResponse, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart })
  })
  const purchasesData = purchasesResponse?.data.data

  const updatePurchasesMutation = useMutation({
    mutationFn: purchaseApi.updatePurchases,
    onSuccess: () => {
      void refetch()
    }
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchases,
    onSuccess: () => {
      void refetch()
    }
  })

  const buyMutation = useMutation({
    mutationFn: purchaseApi.buyPurchase,
    onSuccess: (data) => {
      void refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: false
      })
    }
  })

  const isAllPurchasesChecked: boolean = useMemo(
    () => extendedPurchases.every((purchase) => purchase.isChecked),
    [extendedPurchases]
  )

  const checkedPurchases = useMemo(
    () => extendedPurchases.filter((purchase) => purchase.isChecked),
    [extendedPurchases]
  )

  const totalAmountOfMoney = useMemo(
    () =>
      checkedPurchases.reduce((total, purchase) => {
        return total + purchase.price * purchase.buy_count
      }, 0),
    [checkedPurchases]
  )

  const savedMoney = useMemo(
    () =>
      checkedPurchases.reduce((total, purchase) => {
        return total + (purchase.price_before_discount - purchase.price) * purchase.buy_count
      }, 0),
    [checkedPurchases]
  )

  useEffect(() => {
    if (purchasesData) {
      setExtendedPurchases((prev) => {
        const extendedPurchasesObj = keyBy(prev, '_id')
        return purchasesData.map((purchase) => {
          const isBuyNowPurchaseId = buyNowPurchaseId === purchase._id
          return {
            ...purchase,
            isChecked: Boolean(extendedPurchasesObj[purchase._id]?.isChecked) || isBuyNowPurchaseId,
            isDisabled: false
          }
        })
      })
    }
  }, [buyNowPurchaseId, purchasesData, setExtendedPurchases])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  })

  const handleCheckPurchase = (purchaseId: string) => {
    setExtendedPurchases(
      extendedPurchases.map((purchase) => {
        if (purchaseId === purchase._id) {
          return {
            ...purchase,
            isChecked: !purchase.isChecked
          }
        }
        return purchase
      })
    )
  }

  const handleCheckAllPurchases = () => {
    setExtendedPurchases((prev) => {
      return prev.map((purchase) => {
        return {
          ...purchase,
          isChecked: !isAllPurchasesChecked
        }
      })
    })
  }

  const handleBlur = (purchaseIndex: number, value: number) => {
    if (value === purchasesData?.[purchaseIndex].buy_count) return
    updatePurchasesMutation.mutate({
      product_id: extendedPurchases[purchaseIndex].product._id,
      buy_count: value
    })
  }

  const handleChangeQuantity = (
    purchaseIndex: number,
    value: number,
    min: number,
    max: number,
    action: 'increase' | 'decrease' | 'change'
  ) => {
    const debouncedHandleChangeQuantity = myDebounce((purchaseIndex: number, buy_count: number) => {
      handleBlur(purchaseIndex, buy_count)
    }, DEBOUNCE_TIME)

    switch (action) {
      case 'decrease':
        if (value - 1 < min) return
        value--
        debouncedHandleChangeQuantity(purchaseIndex, value)
        break
      case 'increase':
        if (value + 1 > max) return
        value++
        debouncedHandleChangeQuantity(purchaseIndex, value)
        break
      case 'change':
        if (value < min) value = min
        else if (value > max) value = max
        break
      default:
        throw new Error('Invalid action')
    }
    setExtendedPurchases((prev) => {
      return prev.map((purchase, index) => {
        if (index === purchaseIndex) {
          return {
            ...purchase,
            buy_count: value
          }
        }
        return purchase
      })
    })
  }

  const handleDeletePurchases = (arg: string | ExtendedPurchase[]) => {
    if (typeof arg === 'string') deletePurchasesMutation.mutate([arg])
    else {
      const purchaseIdList = arg.map((purchase) => {
        return purchase._id
      })
      deletePurchasesMutation.mutate(purchaseIdList)
    }
  }

  const handleBuyNow = () => {
    if (checkedPurchases.length > 0) {
      const purchaseList = checkedPurchases.map((purchase) => {
        return { product_id: purchase.product._id, buy_count: purchase.buy_count }
      })
      buyMutation.mutate(purchaseList)
    } else {
      toast('Bạn vẫn chưa chọn sản phẩm nào để mua', {
        position: 'top-center',
        autoClose: false
      })
    }
  }

  if (purchasesData?.length === 0) {
    return (
      <div className=' bg-neutral-100'>
        <div className='container'>
          <div className='flex h-80 flex-col items-center justify-center gap-4'>
            <img src={noProduct} alt='no-product' className='aspect-square w-[100px]' />
            <p className='text-black'>{t('empty')}</p>
            <Link
              to={routes.home}
              className='flex h-10 min-w-[10rem] items-center justify-center rounded-sm bg-primary text-base uppercase text-white shadow-sm outline-none hover:bg-primary/90'
            >
              {t('shoppingNow')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <Helmet>
        <title>{t('title')} | Shoppe Clone</title>
        <meta name='description' content={t('title')} />
      </Helmet>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-primary'
                      checked={isAllPurchasesChecked}
                      onChange={handleCheckAllPurchases}
                    />
                  </div>
                  <div className='flex-grow text-black'>{t('product')}</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>{t('unitPrice')}</div>
                  <div className='col-span-1'>{t('quantity')}</div>
                  <div className='col-span-1'>{t('totalPrice')}</div>
                  <div className='col-span-1'>{t('actions')}</div>
                </div>
              </div>
            </div>
            {/* Purchase Item */}
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchases.map((purchase, index) => {
                return (
                  <div
                    key={purchase._id}
                    className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                  >
                    <div className='col-span-6'>
                      <div className='flex'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-primary'
                            checked={purchase.isChecked}
                            onChange={() => handleCheckPurchase(purchase._id)}
                          />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex'>
                            <Link
                              className='h-20 w-20 flex-shrink-0'
                              to={`${routes.products}/${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                            >
                              <img alt={purchase.product.name} src={purchase.product.image} />
                            </Link>
                            <div className='flex-grow px-2 pb-2 pt-1'>
                              <Link
                                to={`${routes.products}/${generateNameId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`}
                                className='line-clamp-2 text-left'
                              >
                                {purchase.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='text-gray-300 line-through'>
                              ₫{formatCurrency(purchase.product.price_before_discount)}
                            </span>
                            <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <Button className='disabled:opacity-50' disabled={purchase.isDisabled}>
                            <QuantityController
                              value={purchase.buy_count}
                              onDecrease={(value) =>
                                handleChangeQuantity(index, value, 1, purchase.product.quantity, 'decrease')
                              }
                              onIncrease={(value) =>
                                handleChangeQuantity(index, value, 1, purchase.product.quantity, 'increase')
                              }
                              onChange={(value) =>
                                handleChangeQuantity(index, value, 1, purchase.product.quantity, 'change')
                              }
                              onBlur={(value) => handleBlur(index, value)}
                            />
                          </Button>
                        </div>
                        <div className='col-span-1 ml-4'>
                          <span className='text-primary'>
                            ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                        <div className='col-span-1'>
                          <Button
                            className='bg-none text-black transition-colors hover:text-primary'
                            onClick={() => handleDeletePurchases(purchase._id)}
                          >
                            {t('delete')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* Check Out Now */}
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                id='selectAll'
                className='h-5 w-5 accent-primary'
                checked={isAllPurchasesChecked}
                onChange={handleCheckAllPurchases}
              />
            </div>
            <label htmlFor='selectAll' className='mx-3 border-none bg-none'>
              {`${t('selectAll')} (${purchasesData?.length as number})`}
            </label>
            <Button className='mx-3 border-none bg-none' onClick={() => handleDeletePurchases(checkedPurchases)}>
              {t('delete')}
            </Button>
          </div>

          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>
                  {`${t('total')} (${checkedPurchases.length} ${
                    checkedPurchases.length > 1 ? t('item') + 's' : t('item')
                  })`}
                  :
                </div>
                <div className='ml-2 text-2xl text-primary'>₫{formatCurrency(totalAmountOfMoney)}</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>{t('saved')}</div>
                <div className='ml-6 text-primary'>₫{formatCurrency(savedMoney)}</div>
              </div>
            </div>
            <Button
              className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
              onClick={handleBuyNow}
              disabled={buyMutation.isPending}
            >
              {t('checkOut')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
