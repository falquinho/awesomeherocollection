import React, { ReactElement, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ComixCollectionScreen from '../comixCollection/ComixCollection';
import MapScreen from '../map/Map';
import { useRoute, useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const tabBarIconComics = ({color, size}: any) => <Icon type="material-community" name="book-open-page-variant" color={color} size={size}/>

const tabBarIconMap = ({color, size}: any) => <Icon type="material-community" name="map-marker" color={color} size={size}/>

function HeroHomeScreen(): ReactElement {
  const route: RouteProp<any, any> = useRoute();
  const navigation: NavigationProp<any> = useNavigation();

  useEffect(() => {
    const { name } = route.params?.params.favoriteHero || { name: "" };
    navigation.setOptions({ title: name })
  });

  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: "#000", labelStyle: styles.label, labelPosition: "beside-icon", style: styles.container}}>
      <Tab.Screen component={ComixCollectionScreen} name="comixCollection" options={{ title: "Aventuras", tabBarIcon: tabBarIconComics }}/>
      <Tab.Screen component={MapScreen} name="mapScreen" options={{ title: "Esconderijos", tabBarIcon: tabBarIconMap }}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: "ComicNeue-Bold" },
  container: { 
    borderTopColor: "black", 
    borderTopWidth: 2 
  },
})

export default HeroHomeScreen;