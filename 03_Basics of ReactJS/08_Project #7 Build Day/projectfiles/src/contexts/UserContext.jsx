import { createContext, useContext, useMemo, useState } from 'react'

// TODO: create a defaultContext.  It's a object with a key user set to null, and setUser set to the do nothing function.

// TODO: create a UserContext created from createContext(defaultContext)

export function UserProvider({ children }) {
    // TODO: useState with an initial state of {username: 'student', avatar: 'https://i.pravatar.cc/128?img=13'}
    // variables names of user and setUser

    // TODO: create an arrow function called updateUserName = (name) =>   call setUser passing in u=> ({ ...u, username: name})

  const value = useMemo(() => ({ user, updateUsername }), [user])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within a UserProvider')
  return ctx
}
