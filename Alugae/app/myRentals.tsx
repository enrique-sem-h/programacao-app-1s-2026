import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

export default function MyRentals() {
  const router = useRouter();
  
  const rentals = [
    { id: '1', title: "Furadeira Bosch", status: 'ativo' },
    { id: '2', title: "Escada 5m", status: 'em_uso' }, 
    { id: '3', title: "Martelo", status: 'finalizado' },
  ]; // mudar dps

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Meus aluguéis" }} />

      <FlatList
        data={rentals}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imagePlaceholder}>
               <Ionicons name="cube-outline" size={40} color="#888" />
               
               <View style={[
                 styles.badge, 
                 item.status === 'ativo' ? styles.badgeAtivo : 
                 item.status === 'em_uso' ? styles.badgeUso : styles.badgeFim
               ]}>
                 <Text style={styles.badgeText}>
                   {item.status === 'ativo' ? 'ATIVO' : 
                    item.status === 'em_uso' ? 'EM USO' : 'FIM'}
                 </Text>
               </View>
            </View>
            
            <Text style={styles.itemTitle}>{item.title}</Text>
            
            {item.status === 'ativo' && (
              <TouchableOpacity 
                style={[styles.button, styles.btnAtivo]}
                onPress={() => router.push("/rentalStatus")} 
              >
                <Text style={styles.buttonText}>Acompanhar</Text>
              </TouchableOpacity>
            )}

            {item.status === 'em_uso' && (
              <TouchableOpacity 
                style={[styles.button, styles.btnUso]}
                onPress={() => router.push("/returnObject")} 
              >
                <Text style={styles.buttonText}>Devolver</Text>
              </TouchableOpacity>
            )}

            {item.status === 'finalizado' && (
              <TouchableOpacity 
                style={[styles.button, styles.btnFim]}
                onPress={() => router.push("/rating")} 
              >
                <Text style={styles.buttonText}>Avaliar</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { 
    flex: 1, 
    margin: 8, 
    borderRadius: 12, 
    padding: 12, 
    backgroundColor: "#E5E5E5", 
    alignItems: 'center'
  },
  imagePlaceholder: { 
    width: '100%',
    height: 100, 
    backgroundColor: "#D9D9D9", 
    borderRadius: 8,
    marginBottom: 10, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative'
  },
  itemTitle: { 
    fontWeight: "bold", 
    fontSize: 14,
    marginBottom: 12, 
    textAlign: 'center', 
    color: '#000' 
  },
  button: { 
    width: '100%', 
    padding: 10, 
    borderRadius: 8, 
    alignItems: "center" 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 11, 
    fontWeight: "bold" 
  },
  
  btnAtivo: { backgroundColor: "#000" },
  btnUso: { backgroundColor: "#007AFF" },
  btnFim: { backgroundColor: "#888" },

  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeAtivo: { backgroundColor: '#4BB543' },
  badgeUso: { backgroundColor: '#007AFF' },
  badgeFim: { backgroundColor: '#555' },
  badgeText: { color: '#fff', fontSize: 8, fontWeight: 'bold' },
});