import { SuccessResponse } from 'src/types/response.type'
import { User, UserProfile } from 'src/types/user.type'
import http from 'src/utils/http'

const getProfile = () => http.get<SuccessResponse<User>>('me')
const updateProfile = (body: UserProfile) => http.put<SuccessResponse<User>>('user', body)
const uploadAvatar = (body: FormData) =>
  http.post<SuccessResponse<string>>('/user/upload-avatar', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

const userApi = {
  getProfile,
  updateProfile,
  uploadAvatar
}

export default userApi
