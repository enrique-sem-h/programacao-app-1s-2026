import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as SecureStore from "expo-secure-store";

type User = {
  id: string;
  nome: string;
  email: string;
};

type AuthContextData = {
  user: User | null;
  token: string | null;
  loading: boolean;

  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  async function loadStorageData() {
    const storedToken = await SecureStore.getItemAsync("token");

    const storedUser = await SecureStore.getItemAsync("user");

    if (storedToken && storedUser) {
      setToken(storedToken);

      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }

  useEffect(() => {
    loadStorageData();
  }, []);

  async function signIn(token: string, user: User) {
    await SecureStore.setItemAsync("token", token);

    await SecureStore.setItemAsync(
      "user",
      JSON.stringify(user)
    );

    setToken(token);

    setUser(user);
  }

  async function signOut() {
    await SecureStore.deleteItemAsync("token");

    await SecureStore.deleteItemAsync("user");

    setToken(null);

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}