import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import purchaseStatus from 'src/constants/purchaseStatus'
import purchaseApi from 'src/apis/purchase.api'
import routes from 'src/constants/routes'
import { formatCurrency, generateNameId } from 'src/utils/helper'
import Button from 'src/components/Button'

export default function Purchase() {
  const navigate = useNavigate()
  const { data: purchasesResponse } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.completed }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.completed })
  })
  const purchasesData = purchasesResponse?.data.data

  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })

  const handleBuyNow = (productId: string) => {
    addToCartMutation.mutate(
      {
        product_id: productId,
        buy_count: 1
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

  if (!purchasesData) return null
  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='border-b border-b-gray-200 py-6'>
            <h1 className='pb-1 text-xl font-medium capitalize text-gray-900'>Đơn mua hoàn Thành</h1>
          </div>
          <div>
            {purchasesData.map((purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white text-black shadow-sm'>
                <Link
                  to={`${routes.products}/${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex border border-transparent border-b-gray-200 p-6'
                >
                  {/* Product Image */}
                  <div className='flex-shrink-0 border border-gray-200'>
                    <img className='h-20 w-20 object-cover' src={purchase.product.image} alt={purchase.product.name} />
                  </div>
                  {/* Product Details */}
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate text-base'>{purchase.product.name}</div>
                    <div className='mt-2'>Số lượng: {purchase.buy_count}</div>
                  </div>
                  <div className='ml-10 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-primary'>₫{formatCurrency(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='bg-stone-50 p-6'>
                  <div className='flex justify-end'>
                    <span className='inline-flex items-center gap-1.5'>
                      <svg
                        className='aspect-square w-5'
                        viewBox='0 0 253 263'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M126.5 0.389801C126.5 0.389801 82.61 27.8998 5.75 26.8598C5.08763 26.8507 4.43006 26.9733 3.81548 27.2205C3.20091 27.4677 2.64159 27.8346 2.17 28.2998C1.69998 28.7657 1.32713 29.3203 1.07307 29.9314C0.819019 30.5425 0.688805 31.198 0.689995 31.8598V106.97C0.687073 131.07 6.77532 154.78 18.3892 175.898C30.003 197.015 46.7657 214.855 67.12 227.76L118.47 260.28C120.872 261.802 123.657 262.61 126.5 262.61C129.343 262.61 132.128 261.802 134.53 260.28L185.88 227.73C206.234 214.825 222.997 196.985 234.611 175.868C246.225 154.75 252.313 131.04 252.31 106.94V31.8598C252.31 31.1973 252.178 30.5414 251.922 29.9303C251.667 29.3191 251.292 28.7649 250.82 28.2998C250.35 27.8358 249.792 27.4696 249.179 27.2225C248.566 26.9753 247.911 26.852 247.25 26.8598C170.39 27.8998 126.5 0.389801 126.5 0.389801Z'
                          fill='#ee4d2d'
                        />
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M207.7 149.66L119.61 107.03C116.386 105.472 113.914 102.697 112.736 99.3154C111.558 95.9342 111.772 92.2235 113.33 88.9998C114.888 85.7761 117.663 83.3034 121.044 82.1257C124.426 80.948 128.136 81.1617 131.36 82.7198L215.43 123.38C215.7 120.38 215.85 117.38 215.85 114.31V61.0298C215.848 60.5592 215.753 60.0936 215.57 59.6598C215.393 59.2232 215.128 58.8281 214.79 58.4998C214.457 58.1705 214.063 57.909 213.63 57.7298C213.194 57.5576 212.729 57.4727 212.26 57.4798C157.69 58.2298 126.5 38.6798 126.5 38.6798C126.5 38.6798 95.31 58.2298 40.71 57.4798C40.2401 57.4732 39.7735 57.5602 39.3376 57.7357C38.9017 57.9113 38.5051 58.1719 38.1709 58.5023C37.8367 58.8328 37.5717 59.2264 37.3913 59.6604C37.2108 60.0943 37.1186 60.5599 37.12 61.0298V108.03L118.84 147.57C121.591 148.902 123.808 151.128 125.129 153.884C126.45 156.64 126.797 159.762 126.113 162.741C125.429 165.72 123.755 168.378 121.363 170.282C118.972 172.185 116.006 173.221 112.95 173.22C110.919 173.221 108.915 172.76 107.09 171.87L40.24 139.48C46.6407 164.573 62.3785 186.277 84.24 200.16L124.49 225.7C125.061 226.053 125.719 226.24 126.39 226.24C127.061 226.24 127.719 226.053 128.29 225.7L168.57 200.16C187.187 188.399 201.464 170.892 209.24 150.29C208.715 150.11 208.2 149.9 207.7 149.66Z'
                          fill='#fff'
                        />
                      </svg>
                      Thành tiền:
                    </span>
                    <span className='ml-4 text-2xl text-primary'>
                      ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                  <Button
                    onClick={() => handleBuyNow(purchase.product._id)}
                    className='ml-auto mt-5 flex h-9 min-w-[8rem] items-center justify-center rounded-sm bg-primary px-5 text-base capitalize text-white shadow-sm outline-none hover:bg-primary/90'
                  >
                    Mua Lại
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
