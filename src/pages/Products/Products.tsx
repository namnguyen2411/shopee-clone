import { useQuery } from '@tanstack/react-query'

import AsideFilter from './components/AsideFilter'
import SortButtons from './components/SortButtons'
import Product from './components/Product'
import Pagination from './components/Pagination'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import useQueryProductsOptions from 'src/hooks/useQueryProductsOptions'

export default function Products() {
  const queryProductsOptions = useQueryProductsOptions()

  const { data: categoriesRespone } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories()
  })
  const categories = categoriesRespone?.data?.data

  const { data: productsRespone } = useQuery({
    queryKey: ['products', queryProductsOptions],
    queryFn: () => productApi.getProducts(queryProductsOptions),
    staleTime: 1000 * 60
  })
  const products = productsRespone?.data.data.products
  const pageSize = productsRespone?.data.data.pagination.page_size

  return (
    <section className='grid grid-cols-12'>
      <aside className='col-span-2 mr-5'>
        {categories && <AsideFilter categories={categories} queryProductsOptions={queryProductsOptions} />}
      </aside>

      {products && (
        <div className='col-span-10'>
          <SortButtons queryProductsOptions={queryProductsOptions} pageSize={pageSize as number} />
          <div className='mt-2 grid grid-cols-2 gap-2.5 px-1 shadow-sm md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5'>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <Pagination queryProductsOptions={queryProductsOptions} pageSize={pageSize as number} />
        </div>
      )}
    </section>
  )
}
