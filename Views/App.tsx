import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import Autor from "./Autor";
import Leitor from "./Leitor";
import Editor from "./Editor";
import Home from "./Home";
import Register from "./Register";
import DashboardAdmin from "./DashboardAdmin";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Autor" component={Autor} />
        <Stack.Screen name="Leitor" component={Leitor} />
        <Stack.Screen name="Editor" component={Editor} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="DashboardAdmin" component={DashboardAdmin} options={{ title: 'SuperAdmin' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
