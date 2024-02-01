import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import omit from 'lodash/omit'
import { useTranslation } from 'react-i18next'

import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { PasswordSchemaType, passwordSchema } from 'src/utils/schema'
import EyeSVG from 'src/components/EyeSVG'
import EyeSlashSVG from 'src/components/EyeSlashSVG'
import { useMutation } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import { toast } from 'react-toastify'
import isGenericsAxiosError from 'src/utils/isGenericsAxiosError'
import { ErrorResponse } from 'src/types/response.type'

export default function Password() {
  const { t } = useTranslation('user')
  const [showPassword, setShowPassword] = useState({
    new_password: false,
    password: false,
    confirm_password: false
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      new_password: '',
      password: '',
      confirm_password: ''
    }
  })

  const changePasswordMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const onSubmit = handleSubmit((data: PasswordSchemaType) => {
    changePasswordMutation.mutate(omit(data, ['confirm_password']), {
      onSuccess: (data) => {
        toast.success(data.data.message, {
          position: 'top-center',
          autoClose: 3000
        })
        reset()
      },
      onError: (error) => {
        if (isGenericsAxiosError<ErrorResponse<PasswordSchemaType>>(error)) {
          const data = error.response?.data.data as PasswordSchemaType
          for (const [key, value] of Object.entries(data)) {
            if (value) setError(key as keyof PasswordSchemaType, { message: value })
          }
        }
      }
    })
  })

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='pb-1 text-lg font-medium capitalize text-gray-900'>{t('changePassword.changePassword')}</h1>
      </div>
      {/* User Profile */}
      <form className='mr-auto mt-8 max-w-3xl' onSubmit={(e) => void onSubmit(e)} noValidate>
        <div className='flex-grow md:mt-0 md:pr-12'>
          {/* Current Password */}
          <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              {t('changePassword.currentPassword')}
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='relative'>
                <Input
                  className={clsx('w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:shadow-sm', {
                    'border-red-500 bg-primary/5': errors.password
                  })}
                  type={showPassword.password ? 'text' : 'password'}
                  register={register}
                  name='password'
                  placeholder={t('changePassword.currentPassword')}
                />
                <Button
                  type='button'
                  onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                >
                  {showPassword.password ? (
                    <EyeSlashSVG className='absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer' />
                  ) : (
                    <EyeSVG className='absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer' />
                  )}
                </Button>
              </div>
              <span className='text-sx mt-0.5 block min-h-5 text-red-500'>{errors.password?.message}</span>
            </div>
          </div>
          {/* New Password */}
          <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('changePassword.newPassword')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='relative'>
                <Input
                  className={clsx('w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:shadow-sm', {
                    'border-red-500 bg-primary/5': errors.new_password
                  })}
                  type={showPassword.new_password ? 'text' : 'password'}
                  register={register}
                  name='new_password'
                  placeholder={t('changePassword.newPassword')}
                />
                <Button
                  type='button'
                  onClick={() => setShowPassword({ ...showPassword, new_password: !showPassword.new_password })}
                >
                  {showPassword.new_password ? (
                    <EyeSlashSVG className='absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer' />
                  ) : (
                    <EyeSVG className='absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer' />
                  )}
                </Button>
              </div>
              <span className='text-sx mt-0.5 block min-h-5 text-red-500'>{errors.new_password?.message}</span>
            </div>
          </div>
          {/* Confirm Password */}
          <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              {t('changePassword.confirmPassword')}
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='relative'>
                <Input
                  className={clsx('w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:shadow-sm', {
                    'border-red-500 bg-primary/5': errors.confirm_password
                  })}
                  type={showPassword.confirm_password ? 'text' : 'password'}
                  register={register}
                  name='confirm_password'
                  placeholder={t('changePassword.confirmPassword')}
                />
                <Button
                  type='button'
                  onClick={() => setShowPassword({ ...showPassword, confirm_password: !showPassword.confirm_password })}
                >
                  {showPassword.confirm_password ? (
                    <EyeSlashSVG className='absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer' />
                  ) : (
                    <EyeSVG className='absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer' />
                  )}
                </Button>
              </div>
              <span className='text-sx mt-0.5 block min-h-5 text-red-500'>{errors.confirm_password?.message}</span>
            </div>
          </div>

          <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='flex h-9 items-center bg-primary px-5 text-center text-sm text-white hover:bg-primary/80'
                type='submit'
              >
                {t('save')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
