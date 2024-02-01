import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import omit from 'lodash/omit'
import { useTranslation } from 'react-i18next'

import routes from 'src/constants/routes'
import { CategoryType } from 'src/types/category.type'
import { QueryProductsOptionsType } from 'src/types/queryProductsOptions.type'
import { priceSchemaRefined, PriceSchema } from 'src/utils/schema'
import TriangleRightSVG from './components/TriangleRightSVG'
import MenuSVG from './components/MenuSVG'
import FilterSVG from './components/FilterSVG'
import StarSVG from 'src/components/StarSVG'
import Button from 'src/components/Button'
import { useEffect } from 'react'

type AsideFilterProps = {
  categories: CategoryType[]
  queryProductsOptions: QueryProductsOptionsType
}

const STARS_RATING_OPTIONS = [5, 4, 3, 2, 1]
const MAX_NUMBER_OF_STAR = STARS_RATING_OPTIONS[0]

const categoryChangedEvent = new Event('category_changed')

export default function AsideFilter({ categories, queryProductsOptions }: AsideFilterProps) {
  const { t } = useTranslation('products')
  const navigate = useNavigate()
  const { category = '', rating_filter } = queryProductsOptions

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset
  } = useForm<PriceSchema>({
    resolver: zodResolver(priceSchemaRefined),
    shouldFocusError: false
  })

  useEffect(() => {
    window.addEventListener('clear_all_filters', () => reset())

    return () => {
      window.removeEventListener('clear_all_filters', () => reset())
    }
  }, [reset])

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors('price_min')
    const value = e.target.value
    if (/^\d+$/.test(value) || value === '') e.target.value = value
    else e.target.value = value.slice(0, -1)
  }

  const onSubmit = (data: PriceSchema) => {
    navigate({
      pathname: routes.home,
      search: createSearchParams({
        ...(queryProductsOptions as Record<string, string>),
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  }

  const handleClearAllFilters = () => {
    reset()
    navigate({
      pathname: routes.home,
      search: createSearchParams(
        omit(
          {
            ...(queryProductsOptions as Record<string, string>),
            page: '1'
          },
          ['price_min', 'price_max', 'rating_filter']
        )
      ).toString()
    })
  }

  const handleChangeCategory = () => {
    reset()
    dispatchEvent(categoryChangedEvent)
  }

  return (
    <aside>
      {/* CATEGORY FILTER */}
      <div>
        <div className='mb-2.5 flex h-[51px] items-center border-b border-b-gray-200'>
          <div className='flex items-baseline gap-2 text-lg font-semibold'>
            <MenuSVG />
            {t('asideFilter.category')}
          </div>
        </div>
        <ul>
          <li className='py-1.5 pl-3'>
            <Link
              to={routes.home}
              onClick={handleChangeCategory}
              className={clsx('relative', {
                'font-semibold text-primary': category === '',
                'font-medium text-black': category !== ''
              })}
            >
              {t('asideFilter.categories.all')}
              {category === '' && <TriangleRightSVG className='absolute -left-3 top-1/4 h-2 w-2 fill-primary' />}
            </Link>
          </li>
          {categories.map(({ _id, name }) => {
            return (
              <li className='py-1.5 pl-3' key={_id}>
                <Link
                  to={{
                    pathname: routes.home,
                    search: createSearchParams({
                      category: _id
                    }).toString()
                  }}
                  onClick={handleChangeCategory}
                  className={clsx('relative', {
                    'font-semibold text-primary': category === _id,
                    'font-medium text-black': category !== _id
                  })}
                >
                  {name}
                  {category === _id && <TriangleRightSVG className='absolute -left-3 top-1/4 h-2 w-2 fill-primary' />}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {/* END CATEGORY FILTER */}

      <div className='mt-8 flex items-baseline gap-2 text-lg font-semibold'>
        <FilterSVG />
        {t('asideFilter.searchFilter')}
      </div>

      {/* PRICE FILTER */}
      <div className='border-b border-b-gray-200 pb-5'>
        <div className='my-5 capitalize'>{t('asideFilter.searchFilterOptions.priceRange')}</div>
        <form noValidate onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <div className='relative flex items-center justify-between gap-8'>
            <input
              type='text'
              {...register('price_min', {
                onChange: handlePriceChange
              })}
              className='w-1/2 rounded-sm border border-gray-400 p-1 text-sm shadow-sm'
              placeholder={t('asideFilter.searchFilterOptions.min')}
            />
            <span className='absolute left-1/2 top-1/2 h-[1px] w-2.5 -translate-x-1/2 -translate-y-1/2 bg-gray-400' />
            <input
              type='text'
              {...register('price_max', {
                onChange: handlePriceChange
              })}
              className='w-1/2 rounded-sm border border-gray-400 p-1 text-sm shadow-sm'
              placeholder={t('asideFilter.searchFilterOptions.max')}
            />
          </div>
          <span className='mt-2 block text-center text-xs text-red-500'>{errors.price_min?.message}</span>
          <Button className='mt-5 w-full rounded-sm bg-primary py-1.5 text-center text-sm text-white'>
            {t('asideFilter.searchFilterOptions.apply')}
          </Button>
        </form>
      </div>
      {/* END PRICE FILTER */}

      {/* RATING FILTER */}
      <div className='border-b border-b-gray-200 pb-5'>
        <div className='mb-2.5 mt-5 capitalize'>{t('asideFilter.searchFilterOptions.rating')}</div>
        <ul>
          {STARS_RATING_OPTIONS.map((option, index) => {
            const isActive = Number(rating_filter) === option
            return (
              <li key={index} className='py-1'>
                <Link
                  to={{
                    pathname: routes.home,
                    search: createSearchParams({
                      ...(queryProductsOptions as Record<string, string>),
                      rating_filter: option.toString()
                    }).toString()
                  }}
                  className={clsx('flex w-fit items-center gap-1 rounded-2xl px-3 py-1', {
                    'bg-neutral-200': isActive,
                    'bg-transparent': !isActive
                  })}
                >
                  {Array(MAX_NUMBER_OF_STAR)
                    .fill(0)
                    .map((_, starIndex) => {
                      return (
                        <StarSVG
                          key={starIndex}
                          stroke='#ffce3d'
                          className={clsx('aspect-square h-3.5', {
                            'text-yellowStar': MAX_NUMBER_OF_STAR - index > starIndex,
                            'text-[#f5f5f5]': MAX_NUMBER_OF_STAR - index <= starIndex
                          })}
                        />
                      )
                    })}
                  {index !== 0 && <span className='ml-1 text-sm'>{t('asideFilter.searchFilterOptions.up')}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {/* END RATING FILTER */}

      {/* CLEAR ALL FILTERS BUTTON */}
      <Button
        className='mt-5 w-full rounded-sm bg-primary py-1.5 text-center text-sm uppercase text-white'
        onClick={handleClearAllFilters}
      >
        {t('asideFilter.searchFilterOptions.clearAll')}
      </Button>
    </aside>
  )
}
