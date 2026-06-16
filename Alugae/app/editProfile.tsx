import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/src/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { getOptimizedImageUrl } from "@/src/images/optimizedImage";

export default function EditProfile() {
  const { user, token, update } = useAuth();
  const router = useRouter();
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  async function handleChangePhoto() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso à galeria para alterar a foto.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const photo = result.assets[0];

      setLoadingPhoto(true);

      const formData = new FormData();

      formData.append("foto", {
        uri: photo.uri,
        name: photo.fileName ?? "profile.jpg",
        type: photo.mimeType ?? "image/jpeg",
      } as any);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/user/${user?.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "PATCH",
          body: formData,
        },
      );

      if (!response.ok) {
        const error = await response.text();
        Alert.alert("Erro", error || "Não foi possível atualizar a foto");
        4;
        return;
      }

      const data = await response.json();

      if (data.result?.foto) {
        update({
          foto: data.result.foto,
        });
      }

      Alert.alert("Sucesso", "Foto atualizada!");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar a foto");
    } finally {
      setLoadingPhoto(false);
    }
  }

  const InputField = ({
    label,
    placeholder,
    isLocked = false,
    canChange = false,
    route = "",
  }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <View style={[styles.inputWrapper, { flex: 1 }]}>
          <TextInput
            style={[styles.input, isLocked && { color: "#666" }]}
            placeholder={placeholder}
            placeholderTextColor="#888"
            editable={false}
          />
          {isLocked && <Ionicons name="lock-closed" size={16} color="#666" />}
        </View>
        {canChange && (
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => router.push(route)}
          >
            <Text style={styles.changeText}>Mudar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Perfil" }} />

      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={handleChangePhoto} disabled={loadingPhoto}>
          <View style={styles.avatarLarge}>
            {user?.foto ? (
              <Image
                source={{
                  uri: getOptimizedImageUrl(user.foto, {
                    width: 220,
                    height: 220,
                  })!,
                }}
                style={styles.avatarImage}
              />
            ) : (
              <Ionicons name="person-outline" size={60} color="#666" />
            )}
          </View>

          <Text
            style={{
              textAlign: "center",
              marginTop: 8,
              fontSize: 12,
            }}
          >
            {loadingPhoto ? "Enviando..." : "Alterar foto"}
          </Text>
        </TouchableOpacity>
      </View>

      <InputField
        label="E-mail"
        placeholder={user?.email}
        canChange
        route="/editEmail"
      />

      <TouchableOpacity
        style={styles.passwordAction}
        onPress={() => router.push("/editPassword")}
      >
        <Text style={styles.passwordActionText}>Alterar senha</Text>
      </TouchableOpacity>

      <InputField label="Nome" placeholder={user?.nome} isLocked />
      <InputField label="CPF" placeholder={user?.cpf} isLocked />
      <InputField
        label="Endereço"
        placeholder={user?.endereco}
        canChange
        route="/editAddress"
      />
      <InputField
        label="Telefone"
        placeholder={user?.telefone}
        canChange
        route="/editPhone"
      />

      <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  avatarSection: {
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: "transparent",
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  inputGroup: { marginBottom: 15, backgroundColor: "transparent" },
  label: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 55,
  },
  input: { flex: 1, fontSize: 14, color: "#000" },
  changeButton: {
    backgroundColor: "#E5E5E5",
    height: 55,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginLeft: 10,
    justifyContent: "center",
  },
  changeText: { color: "#000", fontSize: 12, fontWeight: "bold" },
  passwordAction: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    alignItems: "center",
  },
  passwordActionText: { color: "#fff", fontWeight: "bold" },
  saveButton: {
    backgroundColor: "#000",
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
    width: 140,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
