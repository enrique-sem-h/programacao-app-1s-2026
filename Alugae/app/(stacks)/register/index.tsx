import { useState } from "react";
import {
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Text, View } from "@/components/Themed";
import MainButton from "@/components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";

type RegisterResponse = {
  token?: string;
  error?: string;
};

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [foto, setFoto] = useState<ImagePicker.ImagePickerAsset | null>(null);

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

  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à galeria para adicionar uma foto.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setFoto(result.assets[0]);
    }
  }

  async function handleRegister() {
    try {
      if (senha !== confirmarSenha) {
        Alert.alert("Erro", "As senhas não coincidem");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      formData.append(
        "user",
        JSON.stringify({
          nome,
          cpf,
          email,
          senha,
          endereco,
          telefone,
        }),
      );

      if (foto) {
        const fileName = foto.uri.split("/").pop() || "foto.jpg";
        const fileType = foto.mimeType || "image/jpeg";

        formData.append("foto", {
          uri: foto.uri,
          name: fileName,
          type: fileType,
        } as any);
      }

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users`, {
        method: "POST",
        body: formData,
      });

      const data: RegisterResponse = await response.json();

      if (!response.ok) {
        console.log("data", data);

        Alert.alert("Erro", data.token || "Erro ao cadastrar");
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
            <TouchableOpacity onPress={handlePickImage}>
              <View style={styles.avatarCircle}>
                {foto ? (
                  <Image
                    source={{ uri: foto.uri }}
                    style={{ width: "100%", height: "100%", borderRadius: 999 }}
                  />
                ) : (
                  <Ionicons name="person-outline" size={40} color="#888" />
                )}
              </View>
              <Text
                style={{
                  textAlign: "center",
                  color: "#888",
                  marginTop: 4,
                  fontSize: 12,
                }}
              >
                Adicionar foto
              </Text>
            </TouchableOpacity>
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
