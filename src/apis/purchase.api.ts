import { SuccessResponse } from 'src/types/response.type'
import { PurchaseType } from 'src/types/purchase.type'
import http from 'src/utils/http'

type addToCartBody = {
  product_id: string
  buy_count: number
}

const addToCart = (body: addToCartBody) => http.post<SuccessResponse<PurchaseType>>('purchases/add-to-cart', body)

const getPurchases = ({ status }: { status: number }) =>
  http.get<SuccessResponse<PurchaseType[]>>('purchases', {
    params: { status }
  })

const updatePurchases = (body: addToCartBody) => http.put('purchases/update-purchase', body)

const deletePurchases = (body: string[]) =>
  http.delete('purchases', {
    data: body
  })

const buyPurchase = (body: addToCartBody[]) =>
  http.post<SuccessResponse<{ message: string }>>('purchases/buy-products', body)

const purchasesApi = {
  addToCart,
  getPurchases,
  updatePurchases,
  deletePurchases,
  buyPurchase
}
export default purchasesApi
