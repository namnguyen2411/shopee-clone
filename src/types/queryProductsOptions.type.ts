import { orderBy, sortBy } from 'src/constants/queryProductsOptions'

export type QueryProductsOptionsType = {
  page?: number
  limit?: number
  order?: keyof typeof orderBy
  sort_by?: keyof typeof sortBy
  category?: string
  exclude?: string
  rating_filter?: number
  price_max?: number
  price_min?: number
  name?: string
}
