import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, Image } from "react-native"; 
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons"; 
import { Stack, useRouter } from "expo-router";

export default function MyAds() {
  const router = useRouter();

  const ads = [
    { id: '1', title: 'Furadeira Bosch', price: 'R$ 50/dia' },
    { id: '2', title: 'Câmera Canon', price: 'R$ 120/dia' },
    { id: '3', title: 'Tenda 4 pessoas', price: 'R$ 80/dia' },
    { id: '4', title: 'Escada Articulada', price: 'R$ 40/dia' },
  ]; // mudar dps

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Meus anúncios",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
              <Ionicons name="chevron-back" size={24} lightColor="#000" darkColor="#fff" />
            </TouchableOpacity>
          ),
        }} 
      />

      <FlatList
        data={ads}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.adCard}>
            <View style={styles.imagePlaceholder}>
               <Ionicons name="image-outline" size={40} color="#ccc" />
            </View>
            
            <View style={styles.infoContainer}>
              <Text style={styles.adTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.adPrice}>{item.price}</Text>
              
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => router.push("/editAd")} 
              >
                <Ionicons name="pencil-sharp" size={14} color="#fff" />
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 10 },
  adCard: { 
    flex: 1, 
    margin: 8, 
    borderRadius: 12, 
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  imagePlaceholder: { 
    height: 110, 
    backgroundColor: "#f5f5f5", 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  infoContainer: { padding: 12, backgroundColor: 'transparent' },
  adTitle: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  adPrice: { fontSize: 13, color: "#007AFF", fontWeight: "700", marginBottom: 10 },
  editButton: { 
    flexDirection: 'row',
    backgroundColor: "#000", 
    paddingVertical: 6, 
    borderRadius: 6, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  editButtonText: { color: "#fff", fontSize: 12, fontWeight: "600", marginLeft: 5 },
});