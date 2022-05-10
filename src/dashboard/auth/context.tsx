import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as ContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
