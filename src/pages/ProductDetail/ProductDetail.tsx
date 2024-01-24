import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { toast } from 'react-toastify'

import QuantityController from 'src/components/QuantityController'
import CartSVG from './components/CartSVG'
import ChevronLeftSVG from 'src/components/ChevronLeftSVG'
import ChevronRightSVG from 'src/components/ChevronRightSVG'
import Product from '../Products/components/Product'
import ProductRatings from './components/ProductRatings'
import productApi from 'src/apis/product.api'
import { QueryProductsOptionsType } from 'src/types/queryProductsOptions.type'
import { discountPercentage, formatCurrency, formatNumberToSocialStyle, getIdFromNameId } from 'src/utils/helper'
import purchasesApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import routes from 'src/constants/routes'

const NUMBER_OF_SLIDES = 5

export default function ProductDetail() {
  // get product id from custom url
  const id = getIdFromNameId(useParams().id as string)
  const [activeSlideIndex, setActiveSlideIndex] = useState({
    first: 0,
    last: NUMBER_OF_SLIDES
  })
  const [activeImage, setActiveImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const productDetailRespone = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id)
  })
  const product = productDetailRespone.data?.data.data
  const slideLength = product?.images.length

  // You may also like feature
  const queryProductsOptions: QueryProductsOptionsType = {
    page: 1,
    category: product?.category._id
  }
  const { data: productsRespone } = useQuery({
    queryKey: ['products', queryProductsOptions],
    queryFn: () => productApi.getProducts(queryProductsOptions),
    staleTime: 1000 * 60,
    enabled: Boolean(product)
  })
  const products = productsRespone?.data.data.products

  const addToCartMutation = useMutation({
    mutationFn: purchasesApi.addToCart
  })

  const handleSlideIndexChange = (action: 'increase' | 'decrease') => {
    setActiveSlideIndex((prev) => {
      if (action === 'decrease') {
        if (prev.first - 1 >= 0) return { first: prev.first - 1, last: prev.last - 1 }
        return prev
      }

      if (prev.last + 1 <= (slideLength as number)) return { first: prev.first + 1, last: prev.last + 1 }
      return prev
    })
  }

  const handleHoverActiveImage = (imageUrl: string) => {
    setActiveImage(imageUrl)
  }

  const handleQuantityChange = (
    value: number,
    min: number,
    max: number,
    action: 'increase' | 'decrease' | 'change'
  ) => {
    setQuantity(() => {
      if (action === 'decrease') {
        if (value - 1 < min) return min
        return value - 1
      } else if (action === 'increase') {
        if (value + 1 > max) return max
        return value + 1
      } else {
        if (value < min) return min
        else if (value > max) return max
        else return value
      }
    })
  }

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      {
        product_id: product?._id as string,
        buy_count: quantity
      },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, {
            position: 'top-center',
            autoClose: 3000
          })
          void queryClient.invalidateQueries({ queryKey: ['purchases'] })
        },
        onError: (error) => {
          console.log(error)
        }
      }
    )
  }

  const handleBuyNow = () => {
    addToCartMutation.mutate(
      {
        product_id: product?._id as string,
        buy_count: quantity
      },
      {
        onSuccess: (data) => {
          const purchaseId = data.data.data._id
          navigate(routes.cart, {
            state: {
              purchaseId
            }
          })
        }
      }
    )
  }

  if (!product) return null
  return (
    <div className='py-6'>
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              {/* Product Images */}
              <div className='relative w-full pt-[100%] shadow'>
                <img
                  src={activeImage || product.images[0]}
                  alt={product.name}
                  className='absolute left-0 top-0 h-full w-full bg-white object-cover'
                />
              </div>
              {/* Product Images Slider */}
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <Button
                  className='absolute left-0 top-1/2 z-10 h-10 w-6 -translate-y-1/2 bg-black/30'
                  onClick={() => handleSlideIndexChange('decrease')}
                >
                  <ChevronLeftSVG className='h-7 w-7 text-white' />
                </Button>
                {product.images.slice(activeSlideIndex.first, activeSlideIndex.last).map((image) => {
                  const isActive = activeImage ? activeImage === image : product.images[0] === image
                  return (
                    <div className='relative w-full cursor-pointer pt-[100%]' key={image}>
                      <img
                        src={image}
                        alt={product.name}
                        className='absolute left-0 top-0 h-full w-full bg-white object-cover'
                        onMouseEnter={() => handleHoverActiveImage(image)}
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-primary' />}
                    </div>
                  )
                })}
                <Button
                  className='absolute right-0 top-1/2 z-10 h-10 w-6 -translate-y-1/2 bg-black/30 text-white'
                  onClick={() => handleSlideIndexChange('increase')}
                >
                  <ChevronRightSVG className='h-7 w-7 text-white' />
                </Button>
              </div>
            </div>
            {/* Product Details */}
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-primary text-lg text-primary'>{product.rating}</span>
                  <ProductRatings rating={product.rating} activeClassName='aspect-square w-4 text-primary' />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-primary'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-primary px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {discountPercentage(product.price_before_discount, product.price)}% giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='mr-6 capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  value={quantity}
                  onIncrease={(value) => handleQuantityChange(value, 1, product.quantity, 'increase')}
                  onDecrease={(value) => handleQuantityChange(value, 1, product.quantity, 'decrease')}
                  onChange={(value) => handleQuantityChange(value, 1, product.quantity, 'change')}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <Button
                  onClick={handleAddToCart}
                  className='flex h-12 items-center justify-center gap-2.5 rounded-sm border border-primary bg-primary/10 px-5 capitalize text-primary shadow-sm hover:bg-primary/5'
                >
                  <CartSVG />
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-primary px-5 capitalize text-white shadow-sm outline-none hover:bg-primary/90'
                >
                  Mua ngay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product Description */}
      <div className='mt-8 bg-white p-4 shadow'>
        <div className='rounded bg-gray-50 p-4 text-xl font-semibold uppercase text-slate-700'>Mô tả sản phẩm</div>
        <div className='mx-4 mb-4 mt-7 text-sm leading-loose'>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description)
            }}
          />
        </div>
      </div>

      {/* You may also like feature */}
      <div>
        <div className='mt-10 text-lg font-semibold uppercase text-gray-400'>Có thể bạn cũng thích</div>
        {products && (
          <div className='mt-2 grid grid-cols-2 gap-2.5 px-1 shadow-sm md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
            {products.slice(0, 17).map((p) => {
              if (p._id === product?._id) return null
              return (
                <div className='col-span-1' key={p._id}>
                  <Product product={p} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
