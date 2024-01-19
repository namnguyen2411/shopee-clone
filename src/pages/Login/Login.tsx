import { Link, useLocation } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import routes from 'src/constants/routes'
import { LoginSchema, type LoginSchemaType } from 'src/utils/schema'
import Input from 'src/components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import isGenericsAxiosError from 'src/utils/isGenericsAxiosError'
import { ErrorResponse } from 'src/types/response.type'

export default function Register() {
  const location = useLocation()
  const isLogin = location.pathname.endsWith(routes.login)

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
      onSuccess: () => {
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
          className='w-full max-w-lg space-y-4 rounded bg-white p-9 text-sm shadow-sm'
          noValidate
          onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        >
          <div className='text-xl'>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</div>
          <Input<LoginSchemaType>
            register={register}
            name='email'
            type='email'
            className='mt-1 w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
            placeholder='Email'
            errorMessage={errors.email?.message}
          />
          <Input<LoginSchemaType>
            register={register}
            name='password'
            type='password'
            className='mt-1 w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
            placeholder='Mật khẩu'
            autoComplete='on'
            errorMessage={errors.password?.message}
          />
          <div className='mt-1'>
            <button
              type='submit'
              className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
            >
              Đăng nhập
            </button>
          </div>
          <div className='mt-8 flex items-center justify-center'>
            <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
            <Link className='ml-1 text-red-400' to={routes.register}>
              Đăng kí
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
