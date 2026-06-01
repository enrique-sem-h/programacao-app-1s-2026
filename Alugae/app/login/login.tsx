import { useState } from "react";
import { StyleSheet, Image, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import SecureStore from "expo-secure-store";
import { Text, View } from "@/components/Themed";
import MainButton from "@/components/MainButton";
import { useAuth } from "@/src/context/AuthContext";
import { API_URL } from "@/constants/constants";
import { styles } from "./styles";

type LoginResponse = {
  token?: string;
  usuario?: User;
  error?: string;
};

type User = {
  id: string;
  nome: string;
  email: string;
};

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  async function handleLogin() {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email,
            senha,
          },
        }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || "Falha no login");
        return;
      }

      if (data.token && data.usuario) {
        await signIn(data.token, data.usuario);

        router.replace("/home");
      } else {
        Alert.alert("Erro", "Usuario não recebido");
      }
    } catch (error) {
      console.error(error);

      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/images/icon.png")} />

      <TextInput
        style={styles.input}
        placeholder="email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <MainButton
        title={loading ? "Entrando..." : "Login"}
        onPress={handleLogin}
      />

      <Pressable
        onPress={() => router.push("/register/register")}
        style={{ marginTop: 20 }}
      >
        <Text
          style={{
            color: "#007AFF",
            fontWeight: "bold",
          }}
        >
          Não tem conta? Criar conta
        </Text>
      </Pressable>
    </View>
  );
}
