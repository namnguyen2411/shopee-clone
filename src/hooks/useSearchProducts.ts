import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import routes from 'src/constants/routes'
import { ProductSchema, ProductSchemaType } from 'src/utils/schema'
import { sortBy } from 'src/constants/queryProductsOptions'

const useSearchProducts = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, reset } = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema)
  })

  const onSubmit = handleSubmit((data: ProductSchemaType) => {
    const searchParams = new URLSearchParams({
      name: data.productName,
      sort_by: sortBy.relevance
    })
    navigate({
      pathname: routes.home,
      search: searchParams.toString()
    })
  })

  return { register, onSubmit, reset }
}

export default useSearchProducts
