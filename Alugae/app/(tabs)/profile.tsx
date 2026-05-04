import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed"; 
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  const ProfileButton = ({ title, icon, onPress }: { title: string; icon: any; onPress: () => void }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Ionicons name={icon} size={20} color="#333" style={{ marginRight: 10 }} />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#888" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person-outline" size={50} color="#ccc" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Mariana</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.locationText}>Brasilia, DF</Text>
          </View>
          
          <TouchableOpacity onPress={() => router.push("/editProfile")}>
            <Text 
              style={styles.editLabel}
              lightColor="#000" 
              darkColor="#fff" 
            >
              Editar perfil
            </Text>
          </TouchableOpacity>
        </View>
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

      <View style={{ height: 40 }} /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    backgroundColor: 'transparent',
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
    textDecorationLine: 'underline'
  },
  section: {
    marginBottom: 25,
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
