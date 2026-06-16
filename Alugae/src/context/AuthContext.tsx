import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../@types/types";
import { API_URL } from "@/constants/constants";

import * as SecureStore from "expo-secure-store";

type AuthContextData = {
  user: User | null;
  token: string | null;
  loading: boolean;

  update: (data: Partial<User>) => void;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
  userAuthenticated: () => Promise<boolean>;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
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

    await SecureStore.setItemAsync("user", JSON.stringify(user));

    setToken(token);

    setUser(user);
  }

  async function signOut() {
    await SecureStore.deleteItemAsync("token");

    await SecureStore.deleteItemAsync("user");

    setToken(null);

    setUser(null);
  }

  async function userAuthenticated(): Promise<boolean> {
    const storedToken = await SecureStore.getItemAsync("token");
    const storedUser = await SecureStore.getItemAsync("user");

    if (!storedToken || !storedUser) {
      return false;
    }

    const response = await fetch(API_URL + "/verify", {
      headers: {
        authorization: `Bearer ${storedToken}`,
      },
    });

    if (!response.ok) {
      signOut();
      return false;
    }

    return true;
  }

  async function update(data: Partial<User>) {
    setUser((prevUser) => {
      if (!prevUser) return null;

      const { id, cpf, nome, ...allowed } = data;
      const cleanData = Object.fromEntries(
        Object.entries(allowed).filter(([_, value]) => value !== undefined),
      );

      return {
        ...prevUser,
        ...cleanData,
      };
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        update,
        signIn,
        signOut,
        userAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
