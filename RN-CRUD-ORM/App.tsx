// import * as Crypto from "expo-crypto";

// if (!globalThis.crypto) {
//   globalThis.crypto = {
//     getRandomValues: (arr: Uint8Array) => {
//       const bytes = Crypto.getRandomBytes(arr.length);

//       arr.set(bytes);

//       return arr;
//     },
//   } as any;
// }

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "./drizzle/migrations";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

const expoDb = openDatabaseSync("app.db");
const db = drizzle(expoDb);

import Home from "./src/app/home";

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (!success) {
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />;
  }

  return (
    <SQLiteProvider databaseName="app.db">
      <Home />
    </SQLiteProvider>
  );
}
