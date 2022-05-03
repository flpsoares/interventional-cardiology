import React, { createContext, useContext, ReactNode, useState } from 'react'

interface UserContextData {
  setUser: React.Dispatch<React.SetStateAction<UserProps | undefined>>
  user: UserProps | undefined
}

interface UserProviderProps {
  children: ReactNode
}

interface UserProps {
  name: any
  email: any
  telephone: any
  isDoctor: any
  crm?: any
  institution?: any
  isSubscriber?: any
}

export const UserContext = createContext({} as UserContextData)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProps>()

  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
