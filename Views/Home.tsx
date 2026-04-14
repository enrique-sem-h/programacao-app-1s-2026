import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import NewsComponent from "../Components/newsComponent";

function alert(message: string) {
  if (Platform.OS === "web") {
    window.alert(message);
  } else {
    Alert.alert(message);
  }
}

const News = NewsComponent;

export default function Home({ navigation }: any) {
  const [remind, setRemind] = useState<boolean>(false);
  const remindToggle = () => setRemind((prev) => !prev);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text_title}>Home!</Text>
        <View style={styles.horizontal_view}>
          <Button
            title="Cadastro"
            onPress={() => navigation.navigate("Register")}
          />
          <Button title="Login" onPress={() => navigation.navigate("Login")} />
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
            onPress={() => {
              remindToggle();
              alert(remind ? "lembrete desativado" : "Você será lembrado!");
            }}
          >
            <Feather
              name={remind ? "bell" : "bell-off"}
              size={28}
              color="blue"
            />
          </Pressable>
        </View>
        <TextInput
          style={styles.textInput_base}
          placeholder="Buscar noticias (por tag ou UF)"
        />
        <News></News>
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

  icon_button: {
    color: "blue",
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
