import { useState } from "react";
import { View, ActivityIndicator, StyleSheet, Text, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "./drizzle/migrations";

import Home from "./src/app/home";
import CityScreen from "./src/app/city";
import RegionScreen from "./src/app/region";

// const expoDb = openDatabaseSync("app.db");
const expoDb = openDatabaseSync("banco_limpo_v1.db");
const db = drizzle(expoDb);

function AppContent() {
  const { success, error } = useMigrations(db, migrations);
  const [screen, setScreen] = useState<'MENU' | 'UF' | 'CIDADE' | 'REGIAO'>('MENU');

  if (error) return <View style={styles.center}><Text>Erro no Banco: {error.message}</Text></View>;
  if (!success) return <View style={styles.center}><ActivityIndicator size="large" color="#6200EE" /><Text>Carregando...</Text></View>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
      {screen === 'MENU' ? (
        <View style={styles.menuContainer}>
          <Text style={styles.title}>Menu Principal</Text>
          
          <Pressable style={[styles.card, {backgroundColor: '#6200EE'}]} onPress={() => setScreen('UF')}>
            <Text style={styles.cardText}>Gerenciar UFs</Text>
          </Pressable>

          <Pressable style={[styles.card, {backgroundColor: '#03DAC6'}]} onPress={() => setScreen('CIDADE')}>
            <Text style={[styles.cardText, {color: '#000'}]}>Gerenciar Cidades</Text>
          </Pressable>

          <Pressable style={[styles.card, {backgroundColor: '#37474F'}]} onPress={() => setScreen('REGIAO')}>
            <Text style={styles.cardText}>Gerenciar Regiões</Text>
          </Pressable>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Pressable onPress={() => setScreen('MENU')} style={styles.backBtn}>
            <Text style={{color: '#6200EE', fontWeight: 'bold', fontSize: 16}}>⬅ Voltar ao Menu</Text>
          </Pressable>

          {screen === 'UF' && <Home />}
          {screen === 'CIDADE' && <CityScreen />}
          {screen === 'REGIAO' && <RegionScreen />}
        </View>
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="banco_limpo_v1.db">
        <AppContent />
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  menuContainer: { flex: 1, padding: 30, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  card: { padding: 20, borderRadius: 15, marginBottom: 15, elevation: 5 },
  cardText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  backBtn: { padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' }
});