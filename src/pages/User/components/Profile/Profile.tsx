import { useContext, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import clsx from 'clsx'

import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import NumberInput from 'src/components/NumberInput'
import { hideText } from 'src/utils/helper'
import { profileSchema, ProfileSchemaType } from 'src/utils/schema'
import DatePicker from '../DatePicker'
import { toast } from 'react-toastify'
import { AppContext } from 'src/context/appContext'
import { setProfileToLocalStorage } from 'src/utils/auth'

export default function Profile() {
  const { setProfile } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    }
  })

  const { data: profileResponse, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileResponse?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name as string)
      setValue('phone', profile.phone as string)
      setValue('address', profile.address as string)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit((data: ProfileSchemaType) => {
    updateProfileMutation.mutate(
      {
        ...data,
        date_of_birth: data.date_of_birth.toISOString()
      },
      {
        onSuccess: (data) => {
          void refetch()
          setProfile(data.data.data)
          setProfileToLocalStorage(data.data.data)
          toast.success(data.data.message, {
            position: 'top-center',
            autoClose: 3000
          })
        }
      }
    )
  })

  if (!profile) return null
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      {/* User Profile */}
      <form
        className='mt-8 flex flex-col-reverse md:flex-row md:items-start'
        onSubmit={(e) => void onSubmit(e)}
        noValidate
      >
        <div className='flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            {/* Email */}
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{hideText(profile.email, 2, 9)}</div>
            </div>
          </div>
          {/* Name */}
          <div className='mt-[38px] flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className={clsx('w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:shadow-sm', {
                  'border-red-500 bg-primary/5': errors.name
                })}
                type='text'
                register={register}
                name='name'
                placeholder='Tên'
              />
              <span className='text-sx mt-0.5 block min-h-5 text-red-500'>{errors.name?.message}</span>
            </div>
          </div>
          {/* Phone Number */}
          <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <NumberInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder='Số điện thoại'
                    className={clsx('w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:shadow-sm', {
                      'border-red-500 bg-primary/5': errors.phone
                    })}
                  />
                )}
              />

              <span className='text-sx mt-0.5 block min-h-5 text-red-500'>{errors.phone?.message}</span>
            </div>
          </div>
          {/* Address */}
          <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className={clsx('w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:shadow-sm', {
                  'border-red-500 bg-primary/5': errors.address
                })}
                type='text'
                register={register}
                name='address'
                placeholder='Địa chỉ'
              />
              <span className='text-sx mt-0.5 block min-h-5 text-red-500'>{errors.address?.message}</span>
            </div>
          </div>
          {/* Date of birth */}
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DatePicker onChange={field.onChange} value={field.value} errorMessage={errors.date_of_birth?.message} />
            )}
          />
          <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='flex h-9 items-center bg-primary px-5 text-center text-sm text-white hover:bg-primary/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        {/* User Avatar */}
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'
                alt='avatar'
                className='w-full rounded-full object-cover'
              />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
            <Button
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
              type='button'
            >
              Chọn ảnh
            </Button>
            <div className='mt-4 text-gray-400'>
              <div>Dụng lượng file tối đa 500 KB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
