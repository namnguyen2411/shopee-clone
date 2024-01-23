import { ProductType } from './product.type'

export type PurchaseType = {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: number
  user: string
  product: ProductType
  createdAt: string
  updatedAt: string
}
