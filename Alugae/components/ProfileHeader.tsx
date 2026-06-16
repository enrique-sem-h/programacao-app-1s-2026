import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Text } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import type { User } from "@/src/@types/types";
import { Router } from "expo-router";
import { getOptimizedImageUrl } from "@/src/images/optimizedImage";

interface Props {
  user: User;
  router: Router;
}

export function ProfileHeader({ user, router }: Props) {
  const foto = getOptimizedImageUrl(user.foto, { width: 180, height: 180 });

  return (
    <View style={styles.header}>
      <View style={styles.avatarPlaceholder}>
        <Image
          source={{ uri: foto ?? user.foto }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
          }}
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user?.nome}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.locationText}>Brasilia, DF</Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/editProfile")}>
          <Text style={styles.editLabel} lightColor="#000" darkColor="#fff">
            Editar perfil
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 20,
    backgroundColor: "transparent",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    backgroundColor: "transparent",
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  editLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textDecorationLine: "underline",
  },
});
