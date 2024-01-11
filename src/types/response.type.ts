export type SuccessResponse<T> = {
  message: string
  data: T
}

export type ErrorResponse<T> = {
  message: string
  data?: T
}
