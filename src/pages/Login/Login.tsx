import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import routes from 'src/constants/routes'
import { LoginSchema, type LoginSchemaType } from 'src/utils/schema'
import Input from 'src/components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import isGenericsAxiosError from 'src/utils/isGenericsAxiosError'
import { ErrorResponse } from 'src/types/response.type'
import { AppContext } from 'src/context/appContext'
import Button from 'src/components/Button'

export default function Register() {
  const { t } = useTranslation('header')
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const loginMutation = useMutation({
    mutationFn: authApi.logIn
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema)
  })
  const onSubmit: SubmitHandler<LoginSchemaType> = (data: LoginSchemaType) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        reset()
      },
      onError: (error) => {
        if (isGenericsAxiosError<ErrorResponse<LoginSchemaType>>(error)) {
          const data = error.response?.data.data as LoginSchemaType
          for (const [key, value] of Object.entries(data)) {
            if (value) setError(key as keyof LoginSchemaType, { message: value })
          }
        }
      }
    })
  }

  return (
    <div className='bg-primary'>
      <div className='container flex items-center justify-center px-2 py-20 lg:justify-around lg:py-0'>
        <div className='bg-brand-register bg-no-repeat lg:h-[600px] lg:w-full' />
        <form
          className='w-full max-w-lg rounded bg-white p-8 text-sm shadow-sm'
          noValidate
          onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        >
          <div className='mb-8 text-xl'>{t('loginPage.login')}</div>
          <div className='mb-4'>
            <Input<LoginSchemaType>
              register={register}
              name='email'
              type='email'
              className='w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
              placeholder='Email'
            />
            <span className='text-sx mt-0.5 block min-h-5 text-red-500'>{errors.email?.message}</span>
          </div>
          <div className='mb-4'>
            <Input<LoginSchemaType>
              register={register}
              name='password'
              type='password'
              className='w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
              placeholder={t('registerPage.password')}
              autoComplete='on'
            />
            <span className='text-sx mt-0.5 block min-h-5 text-red-500'>{errors.password?.message}</span>
          </div>
          <div>
            <Button
              type='submit'
              className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600 disabled:opacity-80'
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending && (
                <span className='mr-1.5 aspect-square w-4 animate-spin rounded-full border-l-2 border-t-2 border-gray-400' />
              )}
              {t('loginPage.login')}
            </Button>
          </div>
          <div className='mt-8 flex items-center justify-center'>
            <span className='text-gray-400'>{t('loginPage.new')}</span>
            <Link className='ml-1 text-red-400' to={routes.register}>
              {t('registerPage.register')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
