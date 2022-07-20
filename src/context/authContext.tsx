import React, { useState, createContext, ReactNode } from "react";

type TUser = {
  id: number;
  username: string;
  email: string;
};

export type TUserInfo = {
  jwt: string;
  user: TUser;
};

export type TAuthContext = {
  userInfo: TUserInfo | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<TUserInfo | undefined>>;
};

const AuthContext = createContext<TAuthContext | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<TUserInfo>();

  const value = {
    userInfo,
    setUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
