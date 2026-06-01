import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Text, View } from "@/components/Themed";
import MainButton from "@/components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

type RegisterResponse = {
  token?: string;
  error?: string;
};

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const InputLabel = ({ label }: { label: string }) => (
    <Text style={styles.label}>{label}</Text>
  );

  async function handleRegister() {
    try {
      if (senha !== confirmarSenha) {
        Alert.alert("Erro", "As senhas não coincidem");
        return;
      }

      setLoading(true);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              nome,
              cpf,
              email,
              senha,
              endereco,
              telefone,
            },
          }),
        },
      );

      const data: RegisterResponse = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || "Erro ao cadastrar");

        return;
      }

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      router.back();
    } catch (error) {
      console.error(error);

      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person-outline" size={40} color="#888" />
            </View>
          </View>

          <View style={styles.form}>
            <InputLabel label="Nome" />
            <TextInput
              style={styles.input}
              placeholder="Seu nome completo"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
            />

            <InputLabel label="CPF" />
            <TextInput
              style={styles.input}
              placeholder="000.000.000-00"
              keyboardType="numeric"
              placeholderTextColor="#999"
              value={cpf}
              onChangeText={setCpf}
            />

            <InputLabel label="Endereço" />
            <TextInput
              style={styles.input}
              placeholder="Rua, número, bairro"
              placeholderTextColor="#999"
              value={endereco}
              onChangeText={setEndereco}
            />

            <InputLabel label="Telefone" />
            <TextInput
              style={styles.input}
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
              placeholderTextColor="#999"
              value={telefone}
              onChangeText={setTelefone}
            />

            <InputLabel label="E-mail" />
            <TextInput
              style={styles.input}
              placeholder="email@exemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
            />

            <InputLabel label="Senha" />
            <TextInput
              style={styles.input}
              placeholder="******"
              secureTextEntry
              placeholderTextColor="#999"
              value={senha}
              onChangeText={setSenha}
            />

            <InputLabel label="Confirmar senha" />
            <TextInput
              style={styles.input}
              placeholder="******"
              secureTextEntry
              placeholderTextColor="#999"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />

            <View style={styles.buttonWrapper}>
              <MainButton
                title={loading ? "Cadastrando..." : "Cadastrar"}
                onPress={handleRegister}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
