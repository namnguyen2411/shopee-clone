import { Link, useLocation } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import routes from 'src/constants/routes'
import { RegisterSchemaRefined, type RegisterSchema } from 'src/utils/schema'
import Input from 'src/components/Input'
import authApi from 'src/apis/auth.api'
import isGenericsAxiosError from 'src/utils/isGenericsAxiosError'
import { ErrorResponse } from 'src/types/response.type'

export default function Register() {
  const location = useLocation()
  const isRegister = location.pathname.endsWith(routes.register)

  const registerMutation = useMutation({
    mutationFn: authApi.register
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchemaRefined)
  })
  const onSubmit: SubmitHandler<RegisterSchema> = (data: RegisterSchema) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        reset()
      },
      onError: (error) => {
        if (isGenericsAxiosError<ErrorResponse<RegisterSchema>>(error)) {
          const data = error.response?.data.data as RegisterSchema
          for (const [key, value] of Object.entries(data)) {
            if (value) setError(key as keyof RegisterSchema, { message: value })
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
          <div className='text-xl'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</div>
          <Input<RegisterSchema>
            register={register}
            name='email'
            type='email'
            className='mt-1 w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
            placeholder='Email'
            errorMessage={errors.email?.message}
          />
          <Input<RegisterSchema>
            register={register}
            name='password'
            type='password'
            className='mt-1 w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
            placeholder='Mật khẩu'
            autoComplete='on'
            errorMessage={errors.password?.message}
          />
          <Input<RegisterSchema>
            register={register}
            name='confirmPassword'
            type='password'
            className='mt-1 w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
            placeholder='Xác nhận mật khẩu'
            autoComplete='on'
            errorMessage={errors.confirmPassword?.message}
          />
          <div className='mt-1'>
            <button
              type='submit'
              className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
            >
              Đăng ký
            </button>
          </div>
          <div className='mt-8 flex items-center justify-center'>
            <span className='text-gray-400'>Bạn đã có tài khoản?</span>
            <Link className='ml-1 text-red-400' to={routes.login}>
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
