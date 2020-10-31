import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './src/screens/onboarding/onboarding';
import ComixCollectionScreen from './src/screens/comix-collection/comix-collection';
import AppTheme from './theme';
import { ThemeProvider } from 'react-native-elements';

declare const global: {
  HermesInternal: null | {},
  marvelApiKey: string,
};
global.marvelApiKey = "558ed6347bbea27b6f865ad4d0cb3cb1";

const Stack = createStackNavigator();

const App = () => (
  <ThemeProvider theme={AppTheme}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="onboarding">
        <Stack.Screen component={OnboardingScreen} name="onboarding"/>
        <Stack.Screen component={ComixCollectionScreen} name="comixCollection"/>
      </Stack.Navigator>
    </NavigationContainer>
  </ThemeProvider>
);

export default App;
