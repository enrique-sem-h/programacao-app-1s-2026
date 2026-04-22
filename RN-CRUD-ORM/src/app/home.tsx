import * as Crypto from "expo-crypto";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as Schema from "../db/schemas/ufSchema";

type Data = {
  id: string;
  name: string;
  abbreviation: string;
};

export default function Home() {
  const [uf, setUf] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Data[]>([]);

  const database = useSQLiteContext();
  const db = drizzle(database, { schema: Schema });

  async function add() {
    try {
      if (!uf || !abbreviation) {
        alert("Por favor, preencha ambos os campos.");
        return;
      }
      const response = await db
        .insert(Schema.uf)
        .values({ id: Crypto.randomUUID(), name: uf, abbreviation });
      setUf("");
      setAbbreviation("");
      await fetchUFs();
    } catch (error) {
      console.error("Error adding UF:", error);
    }
  }

  async function fetchUFs() {
    try {
      const result = await db.select().from(Schema.uf).all();
      setData(result);
    } catch (error) {
      console.error("Error fetching UFs:", error);
    }
  }

  fetchUFs();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.main}>
        <TextInput
          placeholder="Adicionar UF"
          style={styles.input}
          value={uf}
          onChangeText={setUf}
        />
        <TextInput
          placeholder="Adicionar abreviação"
          style={styles.input}
          value={abbreviation}
          onChangeText={setAbbreviation}
        />

        {/* <Button title="Add" onPress={add}></Button>
              <Button title="reset" onPress={() => {
                db.delete(Schema.uf).run();
                setData([]);
        }}></Button> */}

        <TextInput
          placeholder="Pesquisar UF"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable style={styles.item} onPress={() => console.log(item.id)}>
              <Text>{item.name}</Text>
            </Pressable>
          )}
          ListEmptyComponent={() => <Text>Nenhuma UF encontrada</Text>}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#999",
    paddingHorizontal: 16,
  },
  item: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
  },
});
