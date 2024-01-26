import { useState, useEffect } from 'react'
import range from 'lodash/range'

type DatePickerProps = {
  value?: Date
  onChange?: (value: Date) => void
  errorMessage?: string
}

export default function DatePicker({ value, onChange, errorMessage }: DatePickerProps) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1980
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: onChangeValue, name } = e.target
    const newDate = {
      ...date,
      [name]: Number(onChangeValue)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  return (
    <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            name='date'
            value={value?.getDate() || date.date}
            onChange={(e) => handleChange(e)}
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none hover:border-primary'
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
          <select
            name='month'
            value={value?.getMonth() || date.month}
            onChange={(e) => handleChange(e)}
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none hover:border-primary'
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((month) => (
              <option value={month} key={month}>
                {month + 1}
              </option>
            ))}
          </select>
          <select
            name='year'
            value={value?.getFullYear() || date.year}
            onChange={(e) => handleChange(e)}
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-primary'
          >
            <option disabled>Năm</option>
            {range(1980, new Date().getFullYear() + 1).map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <span className='text-sx mt-0.5 block min-h-5 text-red-500'>{errorMessage}</span>
      </div>
    </div>
  )
}
