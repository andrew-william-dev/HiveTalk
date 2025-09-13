import { createContext, useContext, useState, useEffect, type ReactNode, type Dispatch, type SetStateAction } from "react";
import { STATUS } from "../constants/objects/status";

type User = {
  username: string;
  email?: string;
  bio: string;
  interests?: string[];
  dob?: string;
  location?: string;
  occupation?: string;
  website?: string;
  weblink?: string;
  profilePicUrl:string;
  bannerPicUrl: string;
};

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  accessToken: string | null;
  refreshToken: string | null;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [status, setStatus] = useState(STATUS.unauthorized)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccess = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem("refreshToken");

    if (storedUser && storedAccess && storedRefresh) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccess);
      setRefreshToken(storedRefresh);
      setStatus(STATUS.authorized)
    }
  }, []);

  useEffect(() => {
    if(user) {
      localStorage.setItem('user',JSON.stringify(user))
    }
  },[user])

  const login = (user: User, accessToken: string, refreshToken: string) => {
    setUser(user);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setStatus(STATUS.authorized)
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setStatus(STATUS.unauthorized)
  };

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, refreshToken, status, setStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
