import z from 'zod'

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Email không hợp lệ' })
    .min(6, { message: 'Email phải có độ dài tối thiểu 6 kí tự' }),
  password: z.string().min(6, { message: 'Password phải có độ dài tối thiểu 6 kí tự' }),
  confirmPassword: z.string().min(6, { message: 'Password phải có độ dài tối thiểu 6 kí tự' }),
  price_min: z.string(),
  price_max: z.string()
})

export default schema

const priceSchema = schema.pick({ price_min: true, price_max: true })
export const priceSchemaRefined = priceSchema.superRefine(({ price_min, price_max }, ctx) => {
  if (price_min && price_max && Number(price_min) > Number(price_max)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Vui lòng nhập khoảng giá phù hợp',
      path: ['price_min']
    })
  } else if (price_min === '' || price_max === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Vui lòng nhập khoảng giá phù hợp',
      path: ['price_min']
    })
  }
})

export type PriceSchema = z.infer<typeof priceSchemaRefined>
