import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './src/screens/onboarding/Onboarding';
import ComixCollectionScreen from './src/screens/comix-collection/comix-collection';
import AppTheme from './theme';
import { ThemeProvider } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { flipIn, flipOut, flipInReverse, flipOutReverse } from './src/utils/animations';

declare const global: {
  HermesInternal: null | {},
};

Animatable.initializeRegistryWithDefinitions({
  flipIn,
  flipOut,
  flipInReverse,
  flipOutReverse,
});

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
