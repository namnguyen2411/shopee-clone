import z from 'zod'

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Email không hợp lệ' })
    .min(6, { message: 'Email phải có độ dài tối thiểu 6 kí tự' }),
  password: z.string().trim().min(6, { message: 'Mật khẩu phải có độ dài tối thiểu 6 kí tự' }),
  confirm_password: z.string().trim(),
  price_min: z.string().trim(),
  price_max: z.string().trim(),
  productName: z.string().trim().min(1),
  name: z
    .string({
      required_error: 'Vui lòng nhập tên'
    })
    .trim()
    .min(1, { message: 'Vui lòng nhập tên' })
    .max(160, { message: 'Tên có độ dài tối đa 160 kí tự' }),
  phone: z
    .string({
      required_error: 'Vui lòng nhập số điện thoại'
    })
    .trim()
    .min(10, { message: 'Vui lòng nhập số điện thoại' })
    .max(20, { message: 'Số điện thoại tối đa 20 chữ số' }),
  address: z.string().trim().max(160, { message: 'Tên có độ dài tối đa 160 kí tự' }).default(''),
  date_of_birth: z.date().max(new Date(), { message: 'Vui lòng chọn ngày phù hợp' }),
  avatar: z.string().trim().default(''),
  new_password: z.string().trim().min(6, { message: 'Mật khẩu phải có độ dài tối thiểu 6 kí tự' })
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

const RegisterSchema = schema.pick({ email: true, password: true, confirm_password: true })
export const RegisterSchemaRefined = RegisterSchema.refine(
  ({ password, confirm_password }) => password === confirm_password,
  {
    message: 'Mật khẩu không trùng khớp',
    path: ['confirm_password']
  }
)
export type RegisterSchema = z.infer<typeof RegisterSchemaRefined>

export const LoginSchema = schema.pick({ email: true, password: true })
export type LoginSchemaType = z.infer<typeof LoginSchema>

export const ProductSchema = schema.pick({ productName: true })
export type ProductSchemaType = z.infer<typeof ProductSchema>

export const profileSchema = schema.pick({
  name: true,
  phone: true,
  address: true,
  date_of_birth: true,
  avatar: true
})
export type ProfileSchemaType = z.infer<typeof profileSchema>

export const passwordSchema = schema
  .pick({ password: true, confirm_password: true, new_password: true })
  .refine(({ new_password, confirm_password }) => new_password === confirm_password, {
    message: 'Mật khẩu không trùng khớp',
    path: ['confirm_password']
  })

export type PasswordSchemaType = z.infer<typeof passwordSchema>
