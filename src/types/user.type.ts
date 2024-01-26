export type Roles = 'Admin' | 'User'

export type User = {
  _id: string
  roles: Roles[]
  email: string
  name?: string
  avatar?: string
  date_of_birth?: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export type UserProfile = Pick<User, 'name' | 'avatar' | 'address' | 'date_of_birth' | 'phone'> & {
  password?: string
  newPassword?: string
}
