import { StyleSheet, Image, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import MainButton from "@/components/MainButton";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/icon.png")}
      />
      <TextInput style={styles.input} placeholder="username" />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
      />
      <MainButton
        title="Login"
        onPress={() => router.replace("/(tabs)/home")}
      />

      <Pressable onPress={() => router.push("/register")} style={{ marginTop: 20 }}>
        <Text style={{ color: "#007AFF", fontWeight: "bold" }}>Não tem conta? Criar conta</Text>
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
