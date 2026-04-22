import * as Crypto from "expo-crypto";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import * as UFSchema from "../db/schemas/ufSchema";
import * as CitySchema from "../db/schemas/citySchema";

export default function CityScreen({ onNavigate }: any) {
  const [cityName, setCityName] = useState("");
  const [selectedUfId, setSelectedUfId] = useState("");
  const [cities, setCities] = useState<any[]>([]);
  const [ufs, setUfs] = useState<any[]>([]);

  const database = useSQLiteContext();
  const db = drizzle(database, { schema: { ...UFSchema, ...CitySchema } });

  const load = async () => {
    try {
      const cityRes = await db.select({
        id: CitySchema.city.id,
        name: CitySchema.city.name,
        ufName: UFSchema.uf.name
      }).from(CitySchema.city).innerJoin(UFSchema.uf, eq(CitySchema.city.ufId, UFSchema.uf.id));
      
      const ufRes = await db.select().from(UFSchema.uf);
      setCities(cityRes);
      setUfs(ufRes);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!cityName || !selectedUfId) return Alert.alert("Ops!", "Selecione a UF e o nome da cidade.");
    await db.insert(CitySchema.city).values({ id: Crypto.randomUUID(), name: cityName, ufId: selectedUfId });
    setCityName(""); setSelectedUfId(""); load();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Nova Cidade</Text>
      <View style={styles.cardForm}>
        <TextInput placeholder="Nome da Cidade" style={styles.input} value={cityName} onChangeText={setCityName} />
        <Text style={styles.label}>Vincular à UF:</Text>
        <FlatList
          horizontal
          data={ufs}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 15 }}
          renderItem={({ item }) => (
            <Pressable 
              onPress={() => setSelectedUfId(item.id)} 
              style={[styles.miniBadge, selectedUfId === item.id && styles.miniBadgeActive]}
            >
              <Text style={{ color: selectedUfId === item.id ? '#FFF' : '#6200EE', fontWeight: 'bold' }}>{item.abbreviation}</Text>
            </Pressable>
          )}
        />
        <Pressable style={styles.mainBtn} onPress={add}><Text style={styles.mainBtnTxt}>Cadastrar Cidade</Text></Pressable>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Lista de Cidades</Text>
      <FlatList
        data={cities}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.circle}><Text style={{ color: '#6200EE' }}>📍</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={{ color: '#777', fontSize: 12 }}>{item.ufName}</Text>
            </View>
            <Pressable onPress={() => db.delete(CitySchema.city).where(eq(CitySchema.city.id, item.id)).then(load)}>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Excluir</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#F5F7FA' },
  navContainer: { flexDirection: 'row', backgroundColor: '#E4E9F2', borderRadius: 12, padding: 4, marginBottom: 25 },
  navBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  activeBtn: { backgroundColor: '#FFF', elevation: 2 },
  navTxt: { color: '#777', fontWeight: '600' },
  activeTxt: { color: '#6200EE', fontWeight: '700' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#1A1C1E', marginBottom: 15 },
  cardForm: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, elevation: 3 },
  input: { backgroundColor: '#F8F9FB', borderWidth: 1, borderColor: '#E4E9F2', padding: 14, borderRadius: 10, marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '700', marginBottom: 8, color: '#555' },
  miniBadge: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#F0E6FF', borderRadius: 8, marginRight: 8 },
  miniBadgeActive: { backgroundColor: '#6200EE' },
  mainBtn: { backgroundColor: '#6200EE', padding: 16, borderRadius: 10, alignItems: 'center' },
  mainBtnTxt: { color: '#FFF', fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  itemCard: { backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 12, marginBottom: 10 },
  circle: { width: 40, height: 40, backgroundColor: '#F0E6FF', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  itemName: { fontSize: 16, fontWeight: '600' }
});