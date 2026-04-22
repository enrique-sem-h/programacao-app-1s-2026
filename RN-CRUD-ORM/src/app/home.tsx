import * as Crypto from "expo-crypto";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as Schema from "../db/schemas/ufSchema";
import { eq, like } from "drizzle-orm";

export default function Home() {
  const [name, setName] = useState("");
  const [abbr, setAbbr] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);

  const database = useSQLiteContext();
  const db = drizzle(database, { schema: Schema });

  const fetchUFs = async () => {
    try {
      const result = await db.select().from(Schema.uf).where(like(Schema.uf.name, `%${search}%`));
      setData(result);
    } catch (e) { console.log(e); }
  };

  useEffect(() => { fetchUFs(); }, [search]);

  const add = async () => {
    if (!name || !abbr) return Alert.alert("Ops", "Preencha os campos.");
    await db.insert(Schema.uf).values({ id: Crypto.randomUUID(), name, abbreviation: abbr.toUpperCase() });
    setName(""); setAbbr(""); fetchUFs();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cadastrar Nova UF</Text>
      <TextInput placeholder="Nome (Ex: São Paulo)" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Sigla (Ex: SP)" style={styles.input} value={abbr} onChangeText={setAbbr} maxLength={2} />
      <Pressable style={styles.btn} onPress={add}><Text style={{color:'#fff', fontWeight:'bold'}}>SALVAR</Text></Pressable>

      <TextInput placeholder="🔍 Pesquisar..." style={styles.search} value={search} onChangeText={setSearch} />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} ({item.abbreviation})</Text>
            <Pressable onPress={() => db.delete(Schema.uf).where(eq(Schema.uf.id, item.id)).then(fetchUFs)}>
              <Text style={{color: 'red'}}>Excluir</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 10, borderRadius: 8, backgroundColor: '#fff' },
  btn: { backgroundColor: '#6200EE', padding: 15, borderRadius: 8, alignItems: 'center' },
  search: { borderWidth: 1, borderColor: '#6200EE', padding: 10, marginVertical: 15, borderRadius: 8, backgroundColor: '#fff' },
  item: { padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', elevation: 1 }
});