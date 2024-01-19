import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  name: keyof T
  errorMessage?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input<T extends FieldValues>({
  register,
  name,
  errorMessage,
  type,
  className,
  placeholder,
  autoComplete
}: InputProps<T>) {
  return (
    <div>
      <input
        {...register(name as Path<T>)}
        type={type}
        className={className}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <span className='block min-h-[1.25rem] pl-1 text-red-600'>{errorMessage}</span>
    </div>
  )
}
