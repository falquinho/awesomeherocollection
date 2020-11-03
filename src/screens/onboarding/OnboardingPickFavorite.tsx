import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import { Button, Text } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import ComicPanel from '../../components/ComicPanel';
import I18n from '../../../I18n';
import marvelApi from '../../utils/marvelApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import CharacterPanel from './CharacterPanel';
import { ApiCharacter } from '../../interfaces/ApiCharacter';

interface Props {
  onBackPress: () => void,
  onFinishPress: () => void,
}

interface State {
  heroList: ApiCharacter[],
  selectedHero: number,
}

class OnboardingPickFavorite extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    marvelApi.characters()
    .then(res => {
      console.log("Heroes fetched!");
      this.setState({heroList: res.data.data.results});
    })
    .catch(err => {
      console.log("Error fetching heroes: ", err.response.data);
    });
  }

  render() {
    const { heroList } = this.state;
    const { onBackPress, onFinishPress } = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ComicPanel style={{flex: 1}} color="#d6c64d">
        <Animatable.Image 
          source={require("../../assets/imgs/heroinBust.png")} 
          animation="zoomIn"
        />
        </ComicPanel>
        <ComicPanel style={{flex: 2}} color="#35185e">
          <ComicPanel style={{ padding: 8}}>
            <Text>{I18n.t("onboardingMyFavorite")}</Text>
          </ComicPanel>
          <View style={styles.heroesContainer}>
            {!heroList.length && <LoadingIndicator message={I18n.t("fetchingHeroes")}/>}
            {heroList.length && (
              <FlatList
                data={heroList}
                renderItem={({ item }) => <CharacterPanel apiCharacter={item}/>}
              />
            )}
          </View>
        </ComicPanel>
        <View style={styles.btnRow}>
          <Button containerStyle={[styles.btnLeft]} title={I18n.t("back")} onPress={onBackPress}/>
          <Button containerStyle={[styles.btnRight]} title={I18n.t("letsGo")} onPress={onFinishPress}/>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  heroesContainer: {
    flex: 1,
    marginTop: -8,
  },
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