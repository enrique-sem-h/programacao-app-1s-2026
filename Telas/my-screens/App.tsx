import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando as telas que vamos criar abaixo
import Login from './src/screens/Login';
import Autor from './src/screens/Autor';
import Leitor from './src/screens/Leitor';
import Editor from './src/screens/Editor';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Autor" component={Autor} />
        <Stack.Screen name="Leitor" component={Leitor} />
        <Stack.Screen name="Editor" component={Editor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}