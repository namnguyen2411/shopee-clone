import { RegisterSchema, LoginSchemaType } from 'src/utils/schema'
import http from 'src/utils/http'
import { AuthResponse } from 'src/types/auth.type'

const register = (body: RegisterSchema) => http.post<AuthResponse>('register', body)
const logIn = (body: LoginSchemaType) => http.post<AuthResponse>('login', body)
const logOut = () => http.post<Omit<AuthResponse, 'data'>>('logout')

const authApi = {
  register,
  logIn,
  logOut
}

export default authApi
