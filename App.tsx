import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import OnboardingScreen from './src/screens/onboarding/onboarding';
import ComixCollectionScreen from './src/screens/comix-collection/comix-collection';
import AppTheme from './theme';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

const App = () => (
  <PaperProvider theme={AppTheme}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="onboarding">
        <Stack.Screen component={OnboardingScreen} name="onboarding"/>
        <Stack.Screen component={ComixCollectionScreen} name="comixCollection"/>
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
);

export default App;
