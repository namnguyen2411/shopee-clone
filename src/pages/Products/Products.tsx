import AsideFilter from './components/AsideFilter'
import Pagination from './components/Pagination'
import Product from './components/Product'
import SortButtons from './components/SortButtons'

export default function Products() {
  return (
    <section>
      <div className='grid grid-cols-12'>
        <aside className='col-span-2 mr-5'>
          <AsideFilter />
        </aside>

        <div className='col-span-10'>
          <SortButtons />
          <div className='mt-2 grid grid-cols-2 gap-2.5 px-1 shadow-sm md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {Array(30)
              .fill(0)
              .map((_, index) => (
                <Product key={index} />
              ))}
          </div>
          <Pagination />
        </div>
      </div>
    </section>
  )
}
