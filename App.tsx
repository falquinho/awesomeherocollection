import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import OnboardingScreen from './src/screens/onboarding/onboarding';
import ComixCollectionScreen from './src/screens/comix-collection/comix-collection';
import AppTheme from './theme';

declare const global: {
  HermesInternal: null | {},
  marvelApiKey: string,
};
global.marvelApiKey = "558ed6347bbea27b6f865ad4d0cb3cb1";

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="onboarding">
      <Stack.Screen component={OnboardingScreen} name="onboarding"/>
      <Stack.Screen component={ComixCollectionScreen} name="comixCollection"/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
