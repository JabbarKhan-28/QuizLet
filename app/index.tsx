
import { NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './Screens/Home';
import Menu from './Screens/Menu';
import Quiz from './Screens/Quiz';
import Result from './Screens/Result';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}
export default App;