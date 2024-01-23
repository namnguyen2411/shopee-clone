import z from 'zod'

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Email không hợp lệ' })
    .min(6, { message: 'Email phải có độ dài tối thiểu 6 kí tự' }),
  password: z.string().trim().min(6, { message: 'Password phải có độ dài tối thiểu 6 kí tự' }),
  confirmPassword: z.string().trim(),
  price_min: z.string().trim(),
  price_max: z.string().trim(),
  productName: z.string().trim().min(1)
})
export type Schema = z.infer<typeof schema>
export default schema

const priceSchema = schema.pick({ price_min: true, price_max: true })
export const priceSchemaRefined = priceSchema.superRefine(({ price_min, price_max }, ctx) => {
  if (price_min && price_max && Number(price_min) > Number(price_max)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Vui lòng nhập khoảng giá phù hợp',
      path: ['price_min']
    })
  } else if (price_min === '' && price_max === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Vui lòng nhập khoảng giá phù hợp',
      path: ['price_min']
    })
  }
})
export type PriceSchema = z.infer<typeof priceSchemaRefined>

const RegisterSchema = schema.pick({ email: true, password: true, confirmPassword: true })
export const RegisterSchemaRefined = RegisterSchema.refine(
  ({ password, confirmPassword }) => password === confirmPassword,
  {
    message: 'Mật khẩu không trùng khớp',
    path: ['confirmPassword']
  }
)
export type RegisterSchema = z.infer<typeof RegisterSchemaRefined>

export const LoginSchema = schema.pick({ email: true, password: true })
export type LoginSchemaType = z.infer<typeof LoginSchema>

export const ProductSchema = schema.pick({ productName: true })
export type ProductSchemaType = z.infer<typeof ProductSchema>
