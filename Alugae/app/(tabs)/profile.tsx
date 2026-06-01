import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import { ProfileHeader } from "@/components/ProfileHeader";
import ProfileLoginComponent from "@/components/profileLoginComponent";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const ProfileButton = ({
    title,
    icon,
    onPress,
  }: {
    title: string;
    icon: any;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Ionicons
          name={icon}
          size={20}
          color="#333"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#888" />
    </TouchableOpacity>
  );

  function handleLogOut() {
    Alert.alert("Log Out", "Tem certeza que deseja sair?", [
      {
        text: "Ok",
        onPress: () => {
          signOut();
        },
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ backgroundColor: "transparent" }}>
            {user ? (
              <ProfileHeader user={user} router={router}></ProfileHeader>
            ) : (
              <ProfileLoginComponent router={router}></ProfileLoginComponent>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alugaê</Text>
            <View style={styles.separator} />

            <ProfileButton
              title="Meus aluguéis"
              icon="cart-outline"
              onPress={() => router.push("/myRentals")}
            />

            <ProfileButton
              title="Ajuda"
              icon="help-circle-outline"
              onPress={() => router.push("/support")}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alugue seus objetos</Text>
            <View style={styles.separator} />

            <ProfileButton
              title="Meus anúncios"
              icon="megaphone-outline"
              onPress={() => router.push("/myAds")}
            />

            <ProfileButton
              title="Carteira"
              icon="wallet-outline"
              onPress={() => router.push("/wallet")}
            />
          </View>

          <View style={styles.spacer} />
        </ScrollView>

        {user && (
          <TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
            <Text>Log out</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: "transparent",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#D9D9D9",
    padding: 18,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  spacer: {
    width: "100%",
    marginVertical: "5%",
  },
  logOutButton: {
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    padding: 18,
    borderRadius: 8,
    marginBottom: 12,
  },
});
