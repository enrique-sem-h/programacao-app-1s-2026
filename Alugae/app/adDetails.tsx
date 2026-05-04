import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";


const { width } = Dimensions.get("window");

export default function AdDetails() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerTitle: "Detalhes do Item",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="chevron-back" size={24} lightColor="#000" darkColor="#fff" />
            </TouchableOpacity>
          ),
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Ionicons name="image-outline" size={80} color="#ccc" />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Furadeira de Impacto Bosch</Text>
          <Text style={styles.price}>R$ 50,00 / dia</Text>
          
          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>
            Furadeira profissional em ótimo estado. Perfeita para furos em concreto, 
            madeira e aço. Acompanha maleta e jogo de brocas básico.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Selecione as datas</Text>
          <View style={styles.calendarMock}>
            <View style={styles.calendarHeader}>
              <Ionicons name="calendar-outline" size={20} color="#007AFF" />
              <Text style={styles.calendarHeaderText}> Maio 2026</Text>
            </View>
            <View style={styles.calendarGrid}>
              {[...Array(14)].map((_, i) => (
                <View key={i} style={[styles.dayCircle, i === 5 && styles.selectedDay]}>
                  <Text style={{ fontSize: 10, color: i === 5 ? "#fff" : "#000" }}>{i + 10}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Localização</Text>
          <View style={styles.mapPlaceholder}>
             <Ionicons name="map-outline" size={30} color="#666" />
             <Text style={styles.mapText}>Brasília, DF - Asa Sul</Text>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.ownerInfo}>
          <View style={styles.ownerAvatar} />
          <Text style={styles.ownerName}>Mariana</Text>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.chatButton}
            onPress={() => router.push("/chat")}
          >
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rentButton}>
            <Text style={styles.buttonText}>Alugar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: { width: width, height: 300, backgroundColor: "#eee", justifyContent: "center", alignItems: "center" },
  content: { padding: 20, backgroundColor: "transparent" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  price: { fontSize: 20, color: "#007AFF", fontWeight: "700", marginBottom: 15 },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 14, color: "#666", lineHeight: 20 },
  calendarMock: { padding: 15, backgroundColor: "#f9f9f9", borderRadius: 12, borderWidth: 1, borderColor: "#eee" },
  calendarHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10, backgroundColor: "transparent" },
  calendarHeaderText: { fontWeight: "bold" },
  calendarGrid: { flexDirection: "row", flexWrap: "wrap", backgroundColor: "transparent" },
  dayCircle: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#eee", margin: 4, justifyContent: "center", alignItems: "center" },
  selectedDay: { backgroundColor: "#007AFF" },
  mapPlaceholder: { height: 150, backgroundColor: "#eee", borderRadius: 12, justifyContent: "center", alignItems: "center" },
  mapText: { marginTop: 10, color: "#666", fontSize: 12 },
  footer: { 
    position: "absolute", 
    bottom: 0, 
    width: width, 
    padding: 20, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff"
  },
  ownerInfo: { flexDirection: "row", alignItems: "center", backgroundColor: "transparent" },
  ownerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#ddd", marginRight: 10 },
  ownerName: { fontWeight: "bold" },
  actionButtons: { flexDirection: "row", backgroundColor: "transparent" },
  chatButton: { backgroundColor: "#333", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, marginRight: 10 },
  rentButton: { backgroundColor: "#000", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" }
});