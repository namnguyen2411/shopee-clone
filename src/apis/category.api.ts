import { CategoryType } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/response.type'
import http from 'src/utils/http'

const getCategories = () => http.get<SuccessResponse<CategoryType[]>>('/categories')
const getCategory = (id: string) => http.get<SuccessResponse<CategoryType>>(`/categories/${id}`, { params: { id } })

const categoryApi = {
  getCategories,
  getCategory
}

export default categoryApi
