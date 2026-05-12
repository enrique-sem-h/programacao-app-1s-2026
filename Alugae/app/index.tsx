import { useState } from "react";
import { StyleSheet, Image, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import SecureStore from "expo-secure-store";
import { Text, View } from "@/components/Themed";
import MainButton from "@/components/MainButton";
import { useAuth } from "@/src/context/AuthContext";

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

export default function Index() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  async function handleLogin() {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data: LoginResponse = await response.json();
      console.log(data);

      if (!response.ok) {
        Alert.alert("Erro", data.error || "Falha no login");
        return;
      }

      if (data.token && data.usuario) {
        await signIn(data.token, data.usuario);

        router.replace("/(tabs)/home");
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
      <Image
        style={styles.logo}
        source={require("../assets/images/icon.png")}
      />

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
        onPress={() => router.push("/register")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    margin: "1%",
    padding: "3%",
    width: "90%",
    borderRadius: 16,
    borderColor: "#999",
    borderWidth: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  logo: {
    width: 66,
    height: 58,
    marginVertical: "10%",
  },
});
