import { User } from 'src/types/user.type'

// access_token
const getAccessTokenFromLocalStorage = (): string | null => localStorage.getItem('access_token')
const setAccessTokenToLocalStorage = (token: string) => localStorage.setItem('access_token', token)

// refresh_token
const getRefreshTokenFromLocalStorage = (): string | null => localStorage.getItem('refresh_token')
const setRefreshTokenToLocalStorage = (token: string) => localStorage.setItem('refresh_token', token)

// profile
const getProfileFromLocalStorage = (): User | null => {
  const profile = localStorage.getItem('profile')
  if (profile) return JSON.parse(profile) as User
  return null
}
const setProfileToLocalStorage = (profile: User) => localStorage.setItem('profile', JSON.stringify(profile))

const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
}

export {
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  getRefreshTokenFromLocalStorage,
  setRefreshTokenToLocalStorage,
  getProfileFromLocalStorage,
  setProfileToLocalStorage,
  clearLocalStorage
}
