type NumberInputProps = {
  value?: number | string
  onChange?: (value: string | number) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export default function NumberInput({ value, onChange, ...props }: NumberInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d+$/.test(value) || value === '') onChange && onChange(value)
  }

  return <input type='text' value={value} onChange={handleInputChange} {...props} />
}
