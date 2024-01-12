import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import omit from 'lodash/omit'

import ChevronLeftSVG from 'src/components/ChevronLeftSVG'
import ChevronRightSVG from 'src/components/ChevronRightSVG'
import { QueryProductsOptionsType } from 'src/types/queryProductsOptions.type'
import { sortBy, orderBy } from 'src/constants/queryProductsOptions'
import routes from 'src/constants/routes'

type SortButtonsProps = {
  queryProductsOptions: QueryProductsOptionsType
  pageSize: number
}

export default function SortButtons({ queryProductsOptions, pageSize }: SortButtonsProps) {
  const { sort_by = sortBy.createdAt, order = '' } = queryProductsOptions
  const page = Number(queryProductsOptions.page)
  const navigate = useNavigate()

  const handleChangeSortValue = (value: Exclude<keyof typeof sortBy, 'price'>) => {
    navigate({
      pathname: routes.home,
      search: createSearchParams(
        omit(
          {
            ...(queryProductsOptions as Record<string, string>),
            sort_by: value as string
          },
          'order'
        )
      ).toString()
    })
  }

  const handleSortByPrice = (priceOrder: keyof typeof orderBy) => {
    navigate({
      pathname: routes.home,
      search: createSearchParams({
        ...(queryProductsOptions as Record<string, string>),
        sort_by: sortBy.price,
        order: priceOrder,
        page: '1'
      }).toString()
    })
  }

  return (
    <div className='bg-[#ededed]'>
      <div className='flex items-center justify-between px-5 py-3 text-sm'>
        <div>
          <ul className='flex items-center gap-4'>
            <span>Sắp xếp theo</span>
            {/* SORT BY VIEW BUTTON */}
            <li>
              <button
                className={clsx('rounded px-4 py-1.5 shadow-sm', {
                  'bg-primary text-white': sort_by === sortBy.view,
                  'bg-white text-black': sort_by !== sortBy.view
                })}
                onClick={() => handleChangeSortValue(sortBy.view)}
              >
                Phổ biến
              </button>
            </li>
            {/* END SORT BY VIEW BUTTON */}

            {/* SORT BY CREATED DAY BUTTON */}
            <li>
              <button
                className={clsx('rounded px-4 py-1.5 shadow-sm', {
                  'bg-primary text-white': sort_by === sortBy.createdAt,
                  'bg-white text-black': sort_by !== sortBy.createdAt
                })}
                onClick={() => handleChangeSortValue(sortBy.createdAt)}
              >
                Mới Nhất
              </button>
            </li>
            {/* END SORT BY CREATED DAY BUTTON */}

            {/* SORT BY SOLD BUTTON */}
            <li>
              <button
                className={clsx('rounded px-4 py-1.5 shadow-sm', {
                  'bg-primary text-white': sort_by === sortBy.sold,
                  'bg-white text-black': sort_by !== sortBy.sold
                })}
                onClick={() => handleChangeSortValue(sortBy.sold)}
              >
                Bán Chạy
              </button>
            </li>
            {/* END SORT BY SOLD BUTTON */}

            {/* SORT BY PRICE BUTTON */}
            <li>
              <div className='relative md:w-52'>
                <select
                  id='id-04'
                  required
                  className={clsx(
                    'peer relative h-[32px] w-full appearance-none rounded border bg-white px-4 outline-none transition-all autofill:bg-white focus:border-primary focus-visible:outline-none focus:focus-visible:outline-none',
                    {
                      'text-primary': !!queryProductsOptions.order === true,
                      'text-black': !!queryProductsOptions.order === false
                    }
                  )}
                  onChange={(e) => handleSortByPrice(e.target.value as keyof typeof orderBy)}
                  value={order}
                >
                  <option value='' hidden>
                    Giá
                  </option>
                  <option value={orderBy.asc}>Giá: Thấp đến Cao</option>
                  <option value={orderBy.desc}>Giá: Cao đến Thấp</option>
                </select>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='pointer-events-none absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 fill-slate-400 transition-all peer-focus:fill-primary peer-disabled:cursor-not-allowed'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-labelledby='title-04 description-04'
                  role='graphics-symbol'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </li>
            {/* END SORT BY PRICE BUTTON */}
          </ul>
        </div>

        {/* MINI PAGE CONTROLLER */}
        <div className='flex items-center gap-6 bg-[#ededed]'>
          <div>
            <span className='font-medium text-primary'>{page}</span>/<span>{pageSize}</span>
          </div>
          <div className='flex items-center shadow-sm'>
            {page === 1 ? (
              <div className='bg-white p-3'>
                <ChevronLeftSVG className='h-3 w-3 text-gray-400' />
              </div>
            ) : (
              <Link
                to={{
                  pathname: routes.home,
                  search: createSearchParams({
                    ...(queryProductsOptions as Record<string, string>),
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='border border-gray-300 bg-transparent p-3 hover:bg-white'
              >
                <ChevronLeftSVG className='h-3 w-3 text-black' />
              </Link>
            )}

            {page === pageSize ? (
              <div className='bg-white p-3'>
                <ChevronRightSVG className='h-3 w-3 text-gray-400' />
              </div>
            ) : (
              <Link
                to={{
                  pathname: routes.home,
                  search: createSearchParams({
                    ...(queryProductsOptions as Record<string, string>),
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='border border-gray-300 bg-transparent p-3 hover:bg-white'
              >
                <ChevronRightSVG className='h-3 w-3 text-black' />
              </Link>
            )}
          </div>
        </div>
        {/* END MINI PAGE CONTROLLER */}
      </div>
    </div>
  )
}
