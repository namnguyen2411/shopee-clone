import { createContext, useState } from 'react'
import { ExtendedPurchase } from 'src/apis/purchase.api'
import { User } from 'src/types/user.type'
import { getProfileFromLocalStorage, getAccessTokenFromLocalStorage } from 'src/utils/auth'

export type AppContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
}

const initalState: AppContextType = {
  isAuthenticated: getAccessTokenFromLocalStorage() ? true : false,
  setIsAuthenticated: () => {},
  profile: getProfileFromLocalStorage() || null,
  setProfile: () => {},
  extendedPurchases: [],
  setExtendedPurchases: () => {},
  reset: () => null
}

export const AppContext = createContext<AppContextType>(initalState)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initalState.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initalState.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initalState.extendedPurchases)

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
    setExtendedPurchases([])
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
