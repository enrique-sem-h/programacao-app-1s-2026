import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function navigate(to: string) {
  console.log(to);
}

function alert(message: string) {
  if (Platform.OS === "web") {
    window.alert(message);
  } else {
    Alert.alert(message);
  }
}

export default function Home({ navigation }: any) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text_title}>Home!</Text>
        <View style={styles.horizontal_view}>
          <Button
            title="Cadastro"
            onPress={() => navigate("to be implemented")}
          />
          <Button title="Login" onPress={() => navigation.navigate("Login")} />
          <Button
            title="Lembrar"
            onPress={() => alert("Você será lembrado!")}
          />
        </View>
        <TextInput
          style={styles.textInput_base}
          placeholder="Buscar noticias (por tag ou UF)"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  horizontal_view: {
    display: "flex",
    flexDirection: "row",
  },

  text_title: {
    fontWeight: "900",
    fontSize: 32,
  },

  textInput_base: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
});
