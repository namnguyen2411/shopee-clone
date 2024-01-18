import { Link } from 'react-router-dom'
import routes from 'src/constants/routes'
import ProductRatings from 'src/pages/ProductDetail/components/ProductRatings'
import { ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/helper'

type ProductProps = {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { _id, image, name, price, sold, rating } = product

  return (
    <Link
      to={`${routes.products}/${generateNameId({ name: product.name, id: product._id })}`}
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
          <ProductRatings
            rating={rating}
            activeClassName='text-yellowStar aspect-square w-3.5'
            nonActiveClassName='text-[#d5d5d5] w-3.5 aspect-square'
            nonActiveStroke='#d5d5d5'
          />
          <p className='ml-1.5'>Đã bán {formatNumberToSocialStyle(sold)}</p>
        </div>
      </div>
    </Link>
  )
}
