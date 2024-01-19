import { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getProfileFromLocalStorage, getAccessTokenFromLocalStorage } from 'src/utils/auth'

export type AppContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initalState: AppContextType = {
  isAuthenticated: getAccessTokenFromLocalStorage() ? true : false,
  setIsAuthenticated: () => {},
  profile: getProfileFromLocalStorage() || null,
  setProfile: () => {}
}

export const AppContext = createContext<AppContextType>(initalState)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initalState.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initalState.profile)

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
