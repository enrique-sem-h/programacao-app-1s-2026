import * as Crypto from "expo-crypto";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Picker } from "@react-native-picker/picker";

import * as RegionSchema from "../db/schemas/regionSchema";
import * as CitySchema from "../db/schemas/citySchema";
import { eq } from "drizzle-orm";

export default function RegionScreen() {
  const [name, setName] = useState("");
  const [selectedCity, setSelectedCity] = useState(""); 
  const [cities, setCities] = useState<any[]>([]); 
  const [regions, setRegions] = useState<any[]>([]);

  const database = useSQLiteContext();
  const db = drizzle(database);

  const fetchCities = async () => {
    try {
      const result = await db.select().from(CitySchema.city);
      console.log("Cidades encontradas:", result); 
      setCities(result);
      
      if (result.length > 0) {
        setSelectedCity(result[0].id);
      }
    } catch (e) {
      console.log("Erro ao buscar cidades:", e);
    }
  };

  const fetchRegions = async () => {
    try {
      const result = await db.select().from(RegionSchema.region);
      setRegions(result);
    } catch (e) {
      console.log("Erro ao buscar regiões:", e);
    }
  };

  useEffect(() => {
    fetchCities();
    fetchRegions();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return Alert.alert("Erro", "Digite o nome da região");
    if (!selectedCity) return Alert.alert("Erro", "Você precisa cadastrar uma cidade primeiro!");

    try {
      await db.insert(RegionSchema.region).values({
        id: Crypto.randomUUID(),
        name: name,
        cityId: selectedCity, 
      });
      
      setName("");
      fetchRegions();
      Alert.alert("Sucesso", "Região cadastrada com sucesso!");
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Falha ao salvar no banco.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Região</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome da Região:</Text>
        <TextInput 
          placeholder="Ex: Distrito Industrial" 
          style={styles.input} 
          value={name} 
          onChangeText={setName} 
        />

        <Text style={styles.label}>Selecione a Cidade:</Text>
        <View style={styles.pickerWrapper}>
          {cities.length > 0 ? (
            <Picker
              selectedValue={selectedCity}
              onValueChange={(itemValue) => setSelectedCity(itemValue)}
              style={styles.picker}
            >
              {cities.map((city) => (
                <Picker.Item key={city.id} label={city.name} value={city.id} />
              ))}
            </Picker>
          ) : (
            <Text style={styles.noCities}>Nenhuma cidade cadastrada!</Text>
          )}
        </View>

        <Pressable 
          style={[styles.btnAdd, { backgroundColor: cities.length > 0 ? '#018786' : '#ccc' }]} 
          onPress={handleAdd}
          disabled={cities.length === 0}
        >
          <Text style={styles.btnText}>SALVAR</Text>
        </Pressable>
      </View>

      <Text style={styles.subtitle}>Regiões Listadas:</Text>
      <FlatList
        data={regions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Pressable onPress={() => db.delete(RegionSchema.region).where(eq(RegionSchema.region.id, item.id)).then(fetchRegions)}>
              <Text style={{ color: '#FF5252', fontWeight: 'bold' }}>Excluir</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A1C1E', marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: 'bold', color: '#666', marginTop: 10, marginBottom: 10 },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, elevation: 4, marginBottom: 20 },
  label: { fontSize: 14, color: '#333', marginBottom: 5, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  pickerWrapper: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, marginBottom: 20, backgroundColor: '#F9F9F9', overflow: 'hidden' },
  picker: { height: 50, width: '100%' },
  noCities: { padding: 15, color: 'red', textAlign: 'center' },
  btnAdd: { padding: 16, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  listItem: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  itemText: { fontSize: 16, color: '#333' }
});