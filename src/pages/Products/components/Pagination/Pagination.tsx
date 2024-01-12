import { Link, createSearchParams } from 'react-router-dom'
import clsx from 'clsx'

import ChevronLeftSVG from 'src/components/ChevronLeftSVG'
import ChevronRightSVG from 'src/components/ChevronRightSVG'
import { QueryProductsOptionsType } from 'src/types/queryProductsOptions.type'
import routes from 'src/constants/routes'

type PaginationProps = {
  queryProductsOptions: QueryProductsOptionsType
  pageSize: number
}

export default function Pagination({ queryProductsOptions, pageSize }: PaginationProps) {
  const page = Number(queryProductsOptions.page)

  return (
    <div className='mt-10'>
      <div className='flex items-center justify-center gap-10'>
        {page === 1 ? (
          <ChevronLeftSVG className='h-6 w-6' />
        ) : (
          <Link
            to={{
              pathname: routes.home,
              search: createSearchParams({
                ...(queryProductsOptions as Record<string, string>),
                page: (page - 1).toString()
              }).toString()
            }}
          >
            <ChevronLeftSVG className='h-6 w-6' />
          </Link>
        )}

        <nav className='flex justify-center gap-5'>
          {Array(pageSize)
            .fill(0)
            .map((_, index) => {
              const pageNumber = index + 1
              return (
                <Link
                  to={{
                    pathname: routes.home,
                    search: createSearchParams({
                      ...(queryProductsOptions as Record<string, string>),
                      page: pageNumber.toString()
                    }).toString()
                  }}
                  key={pageNumber}
                  className={clsx('rounded-sm px-4 py-1 text-lg', {
                    'bg-primary text-white': page === pageNumber,
                    'text-gray-400': page !== pageNumber
                  })}
                >
                  {pageNumber}
                </Link>
              )
            })}
        </nav>

        {page === pageSize ? (
          <ChevronRightSVG className='h-6 w-6' />
        ) : (
          <Link
            to={{
              pathname: routes.home,
              search: createSearchParams({
                ...(queryProductsOptions as Record<string, string>),
                page: (page + 1).toString()
              }).toString()
            }}
          >
            <ChevronRightSVG className='h-6 w-6' />
          </Link>
        )}
      </div>
    </div>
  )
}
