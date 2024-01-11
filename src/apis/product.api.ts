import http from 'src/utils/http'
import { ProductType, Pagination } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/response.type'
import { QueryProductsOptionsType } from 'src/types/queryProductsOptions.type'

type ProductsRespone = {
  products: ProductType[]
  pagination: Pagination
}

const getProducts = (params: QueryProductsOptionsType) =>
  http.get<SuccessResponse<ProductsRespone>>('/products', {
    params
  })
const getProductDetail = (id: string) => http.get<SuccessResponse<ProductType>>(`/products/${id}`, { params: { id } })

const productApi = {
  getProducts,
  getProductDetail
}

export default productApi
