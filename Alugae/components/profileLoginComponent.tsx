import Colors from "@/constants/Colors";
import { Router } from "expo-router";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ColorSchemeName,
  useColorScheme,
} from "react-native";

interface Props {
  router: Router;
}

export default function profileLoginComponent({ router }: Props) {
  const styles = createStyles(useColorScheme());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parece que você não está logado!</Text>

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/login/login");
          }}
        >
          <Text style={styles.buttonText}>Fazer Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/register/register");
          }}
        >
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (theme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      justifyContent: "space-evenly",
      height: Dimensions.get("window").height / 4,
      alignItems: "center",
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: theme === "light" ? Colors.light.text : Colors.dark.text,
    },
    buttonsWrapper: {
      width: "100%",
      height: "70%",
      justifyContent: "space-evenly",
    },
    button: {
      backgroundColor: "blue",
      padding: 20,
      borderRadius: 12,
      width: "100%",
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
