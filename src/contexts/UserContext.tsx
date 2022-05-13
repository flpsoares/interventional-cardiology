import React, { createContext, useContext, ReactNode, useState } from 'react'

interface UserContextData {
  setUser: React.Dispatch<React.SetStateAction<UserProps | undefined>>
  user: UserProps | undefined
  userId: string
  setUserId: React.Dispatch<React.SetStateAction<string>>
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
  userPhoto?: any
}

export const UserContext = createContext({} as UserContextData)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProps>()
  const [userId, setUserId] = useState('')

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userId,
        setUserId
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
