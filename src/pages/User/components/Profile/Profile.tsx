import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import NumberInput from 'src/components/NumberInput'
import { getAvatarUrl, hideText } from 'src/utils/helper'
import { profileSchema, ProfileSchemaType } from 'src/utils/schema'
import DatePicker from '../DatePicker'
import { AppContext } from 'src/context/appContext'
import { setProfileToLocalStorage } from 'src/utils/auth'
import isGenericsAxiosError from 'src/utils/isGenericsAxiosError'
import { ErrorResponse } from 'src/types/response.type'

const START_HIDE_TEXT_INDEX = 2
const END_HIDE_TEXT_INDEX = 9
const avatarSizeLimit = 300 // 300Kb
const avatarExtension = '.jpg,.jpeg,.png'

export default function Profile() {
  const { t } = useTranslation('user')
  const datePickerTranslation = {
    dateOfBirth: t('profile.dateOfBirth'),
    year: t('profile.year'),
    month: t('profile.month'),
    date: t('profile.date')
  }
  const [file, setFile] = useState<File>()
  const { setProfile } = useContext(AppContext)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewAvatar = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    setError
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
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      void refetch()
      setProfile(data.data.data)
      setProfileToLocalStorage(data.data.data)
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 3000
      })
    },
    onError: (error) => {
      if (isGenericsAxiosError<ErrorResponse<ProfileSchemaType>>(error)) {
        const data = error.response?.data.data as ProfileSchemaType
        for (const [key, value] of Object.entries(data)) {
          if (value as string) setError(key as keyof ProfileSchemaType, { message: value as string })
        }
      }
    }
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: userApi.uploadAvatar
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name as string)
      setValue('phone', profile.phone as string)
      setValue('address', profile.address as string)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit((body: ProfileSchemaType) => {
    let avatarName = ''
    if (file) {
      const formData = new FormData()
      formData.append('image', file)
      uploadAvatarMutation.mutate(formData, {
        onSuccess: (data) => {
          avatarName = data.data.data
          setValue('avatar', avatarName)
          updateProfileMutation.mutate({
            ...data,
            date_of_birth: body.date_of_birth.toISOString(),
            avatar: avatarName
          })
        },
        onError: () => {
          toast.error('Không thể cập nhật ảnh đại diện', {
            position: 'top-center',
            autoClose: 3000
          })
        }
      })
    } else {
      updateProfileMutation.mutate({
        ...body,
        date_of_birth: body.date_of_birth.toISOString(),
        avatar: avatarName
      })
    }
  })

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.size > avatarSizeLimit * 1024 || !file.type.includes('image'))) {
      toast.error('Ảnh không đúng định dạng hoặc vượt quá kích thước', {
        position: 'top-center',
        autoClose: 3000
      })
      return
    }
    setFile(file)
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  if (!profile) return null
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>{t('profile.myProfile')}</h1>
        <div className='mt-1 text-sm text-gray-600'>{t('profile.manage&protect')}</div>
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
              <div className='pt-3 text-gray-700'>
                {hideText(profile.email, START_HIDE_TEXT_INDEX, END_HIDE_TEXT_INDEX)}
              </div>
            </div>
          </div>
          {/* Name */}
          <div className='mt-[38px] flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('profile.name')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className={clsx('w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:shadow-sm', {
                  'border-red-500 bg-primary/5': errors.name
                })}
                type='text'
                register={register}
                name='name'
                placeholder={t('profile.name')}
              />
              <span className='text-sx mt-0.5 block min-h-5 text-red-500'>{errors.name?.message}</span>
            </div>
          </div>
          {/* Phone Number */}
          <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('profile.phoneNumber')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <NumberInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={t('profile.phoneNumber')}
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
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('profile.address')}</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className={clsx('w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:shadow-sm', {
                  'border-red-500 bg-primary/5': errors.address
                })}
                type='text'
                register={register}
                name='address'
                placeholder={t('profile.address')}
              />
              <span className='text-sx mt-0.5 block min-h-5 text-red-500'>{errors.address?.message}</span>
            </div>
          </div>
          {/* Date of birth */}
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                value={field.value}
                errorMessage={errors.date_of_birth?.message}
                datePickerTranslation={datePickerTranslation}
              />
            )}
          />
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
        {/* User Avatar */}
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src={previewAvatar || getAvatarUrl(profile.avatar)}
                alt='avatar'
                className='h-full w-full rounded-full border border-slate-300 object-cover'
              />
            </div>
            <input
              className='hidden'
              type='file'
              accept={avatarExtension}
              ref={fileInputRef}
              onChange={onFileChange}
              onClick={(e) => ((e.target as HTMLInputElement).value = '')}
            />
            <Button
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
              type='button'
              onClick={handleUpload}
            >
              {t('profile.selectImage')}
            </Button>
            <div className='mt-4 text-red-400'>
              <div>
                {t('profile.fileSize')} {avatarSizeLimit}KB
              </div>
              <div>{t('profile.fileExtension')}: .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
