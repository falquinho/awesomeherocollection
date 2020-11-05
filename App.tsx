import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './src/screens/onboarding/Onboarding';
import AppTheme from './theme';
import { ThemeProvider } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { flipIn, flipOut, flipInReverse, flipOutReverse, rotationTable, spin } from './src/utils/animations';
import HeroHomeScreen from './src/screens/heroHome/HeroHomeScreen';
import { StyleSheet } from 'react-native';

declare const global: {
  HermesInternal: null | {},
};

Animatable.initializeRegistryWithDefinitions({
  flipIn,
  flipOut,
  flipInReverse,
  flipOutReverse,
  rotationTable,
  spin,
});

const Stack = createStackNavigator();

const App = () => (
  <ThemeProvider theme={AppTheme}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="onboarding" screenOptions={{ headerStyle: styles.header, headerTitleStyle: styles.title }}>
        <Stack.Screen component={OnboardingScreen} name="onboarding" options={{ headerShown: false }}/>
        <Stack.Screen component={HeroHomeScreen} name="heroHome"/>
      </Stack.Navigator>
    </NavigationContainer>
  </ThemeProvider>
);

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 2, 
    borderBottomColor: "black",
  },
  title: {
    fontFamily: "ComicNeue-Bold",
  },
})

export default App;
