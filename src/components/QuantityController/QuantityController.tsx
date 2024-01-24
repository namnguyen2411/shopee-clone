import NumberInput from 'src/components/NumberInput'

type QuantityControllerProps = {
  value: number
  onIncrease: (quantity: number) => void
  onDecrease: (quantity: number) => void
  onChange: (quantity: number) => void
  onBlur?: (quantity: number) => void
}

export default function QuantityController({
  value,
  onIncrease,
  onDecrease,
  onChange,
  onBlur
}: QuantityControllerProps) {
  return (
    <div className='flex items-center'>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={() => onDecrease(value)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>

      <NumberInput
        value={value}
        onChange={(inputValue) => onChange(inputValue as number)}
        onBlur={() => onBlur && onBlur(value)}
        className='h-8 w-14 border-b border-t border-gray-300 p-1 text-center outline-none focus:border-2 focus:border-black'
      />

      <button
        className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
        onClick={() => onIncrease(value)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
