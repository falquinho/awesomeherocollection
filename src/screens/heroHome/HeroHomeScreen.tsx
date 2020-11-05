import React, { ReactElement, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ComixCollectionScreen from '../comixCollection/ComixCollection';
import MapScreen from '../map/Map';
import { useRoute, useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import GlobalStyles from '../../../styles';

const Tab = createBottomTabNavigator();

function HeroHomeScreen(): ReactElement {
  const route: RouteProp<any, any> = useRoute();
  const navigation: NavigationProp<any> = useNavigation();

  useEffect(() => {
    const { name } = route.params?.params.favoriteHero || { name: "" };
    navigation.setOptions({ title: name })
  });

  return (
    <Tab.Navigator>
      <Tab.Screen component={ComixCollectionScreen} name="comixCollection" options={{title: "Aventuras"}}/>
      <Tab.Screen component={MapScreen} name="mapScreen" options={{title: "Esconderijos"}}/>
    </Tab.Navigator>
  );
}

export default HeroHomeScreen;