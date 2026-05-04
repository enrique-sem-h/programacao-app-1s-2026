import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Wallet() {
  const router = useRouter();

  const CardItem = ({ title, subtitle, route }: { title: string; subtitle: string; route?: string }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => route && router.push(route as any)}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#000" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: "Carteira" }} />

      <Text style={styles.sectionTitle}>Meus cartões</Text>
      <CardItem 
        title="Cartão de Crédito" 
        subtitle="**** **** **** 4532" 
        route="/editCard" 
      />
      <CardItem 
        title="Cartão de Débito" 
        subtitle="**** **** **** 8890" 
        route="/editCard" 
      />

      <Text style={styles.sectionTitle}>Pix</Text>
      <CardItem 
        title="Pix" 
        subtitle="mariana@email.com" 
        route="/pixDetails" 
      />

      <Text style={styles.sectionTitle}>Saldo</Text>
      <CardItem 
        title="Saldo alugaê" 
        subtitle="R$ 150,00" 
        route="/balance" 
      />

      <TouchableOpacity 
        style={styles.mainButton} 
        onPress={() => router.push("/addCard")}
      >
        <Ionicons name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.mainButtonText}>Adicionar novo cartão</Text>
      </TouchableOpacity>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    marginTop: 15,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  card: { 
    backgroundColor: '#E5E5E5', 
    padding: 20, 
    borderRadius: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  cardContent: { 
    flex: 1, 
    backgroundColor: 'transparent' 
  },
  cardTitle: { 
    color: '#000', 
    fontWeight: 'bold', 
    fontSize: 15 
  },
  cardSubtitle: { 
    color: '#666', 
    fontSize: 13, 
    marginTop: 4 
  },
  mainButton: { 
    backgroundColor: '#000', 
    padding: 18, 
    borderRadius: 15, 
    marginTop: 25, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainButtonText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16
  }
});