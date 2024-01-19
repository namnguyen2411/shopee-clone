import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputProps<T extends FieldValues> = {
  register?: UseFormRegister<T>
  name?: keyof T
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input<T extends FieldValues>({ register, name, ...props }: InputProps<T>) {
  if (register) {
    return <input {...register(name as Path<T>)} {...props} />
  } else {
    return <input {...props} />
  }
}
