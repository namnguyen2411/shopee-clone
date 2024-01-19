import { isAxiosError, AxiosError, HttpStatusCode } from 'axios'

const isGenericsAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  return (
    isAxiosError<T>(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity &&
    error.response?.data !== undefined &&
    error.response?.data !== null
  )
}

export default isGenericsAxiosError
