import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import ComicPanel from '../../components/ComicPanel';
import I18n from '../../../I18n';
import marvelApi from '../../utils/marvelApi';

interface Props {
  onBackPress: () => void,
  onFinishPress: () => void,
}

function OnboardingPickFavorite(props: Props) {
  const [heroList, setHeroList] = useState([]);
  const [favoriteId, setFavoriteId] = useState(-1);

  useEffect(() => {
    // marvelApi.characters()
    // .then(res => {
    //   console.log("Heroes: ", res);
    // })
    // .catch(err => {
    //   console.log("Error fetching heroes: ", err.response.data);
    // });
  });

  return (
  <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
    <ComicPanel style={{flex: 1}} color="#d6c64d">
    <Animatable.Image 
      source={require("../../assets/imgs/heroinBust.png")} 
      animation="zoomIn"
    />

    </ComicPanel>
    <ComicPanel style={{flex: 2}} color="#35185e">
      <ComicPanel style={{padding: 8, alignSelf: "flex-start"}}>
        <Text>{I18n.t("onboardingMyFavorite")}</Text>
      </ComicPanel>
      <ActivityIndicator size="large" color="#ffffff"/>
    </ComicPanel>
    <View style={styles.btnRow}>
      <Button containerStyle={[styles.btnLeft]} title={I18n.t("back")} onPress={props.onBackPress}/>
      <Button containerStyle={[styles.btnRight]} title={I18n.t("letsGo")} onPress={props.onFinishPress}/>
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnRow: {
    flexDirection: "row", 
    marginHorizontal: 4, 
    marginVertical: 6,
  },
  btnLeft: {
    flex: 1,
    marginRight: 4,
  },
  btnRight: {
    flex: 2,
    marginLeft: 4,
  }
});

export default OnboardingPickFavorite;