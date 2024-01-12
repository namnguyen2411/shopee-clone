import { Link } from 'react-router-dom'
import StarSVG from 'src/components/StarSVG'
import { ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/helper'

type ProductProps = {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { _id, image, name, price, sold, rating } = product

  return (
    <Link
      to={`products/${product._id}`}
      key={_id}
      className='col-span-1 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg'
    >
      <div className='relative w-full pt-[100%]'>
        <img src={image} alt={name} className='absolute inset-0 h-full w-full object-contain' />
      </div>
      <div className='p-2 text-xs'>
        <p className='line-clamp-2'>{name}</p>
        <p className='mt-3 text-sm text-primary'>
          <span className='mb-auto'>₫</span>
          {formatCurrency(price)}
        </p>
        <div className='mt-3 flex items-center'>
          {Array(Math.ceil(rating))
            .fill(0)
            .map((_, index) => {
              return <StarSVG key={index} fillColor={'#ffce3d'} className='h-3 w-3' />
            })}
          <p className='ml-1.5'>Đã bán {formatNumberToSocialStyle(sold)}</p>
        </div>
      </div>
    </Link>
  )
}
