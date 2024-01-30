import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { AuthResponse } from 'src/types/auth.type'
import { ErrorResponse } from 'src/types/response.type'
import {
  getRefreshTokenFromLocalStorage,
  getAccessTokenFromLocalStorage,
  setProfileToLocalStorage,
  clearLocalStorage
} from './auth'

class Http {
  readonly instance: AxiosInstance
  private access_token: string | null
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  private refresh_token: string | null
  constructor() {
    this.access_token = getAccessTokenFromLocalStorage()
    this.refresh_token = getRefreshTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL as string,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        config.headers.authorization = this.access_token
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const url = response.config.url
        if (url === 'login' || url === 'register') {
          const data = response.data as AuthResponse
          this.access_token = data.data.access_token
          this.refresh_token = data.data.refresh_token
          localStorage.setItem('access_token', data.data.access_token)
          localStorage.setItem('refresh_token', data.data.refresh_token)
          setProfileToLocalStorage(data.data.user)
        } else if (url === 'logout') {
          this.access_token = null
          this.refresh_token = null
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data = error.response?.data as ErrorResponse<{
            message: string
            data?: Record<string, unknown> | undefined
          }>
          const message = data?.message || error
          console.log(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLocalStorage()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
