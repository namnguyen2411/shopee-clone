import omitBy from 'lodash/omitBy'
import { useSearchParams } from 'react-router-dom'
import { QueryProductsOptionsType } from 'src/types/queryProductsOptions.type'

const useQueryProductsOptions = () => {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const queryProductsOptions: QueryProductsOptionsType = omitBy(
    {
      page: params.page || 1,
      limit: params.limit,
      order: params.order,
      sort_by: params.sort_by,
      category: params.category,
      exclude: params.exclude,
      rating_filter: params.rating_filter,
      price_max: params.price_max,
      price_min: params.price_min,
      name: params.name
    },
    (value) => value === undefined
  )

  return queryProductsOptions
}

export default useQueryProductsOptions
