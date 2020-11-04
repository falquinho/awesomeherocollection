import React from 'react';
import { SafeAreaView, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Button, Text } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import ComicPanel from '../../components/ComicPanel';
import I18n from '../../../I18n';
import marvelApi from '../../utils/marvelApi';
import { retrieveStoredCharacters, storeCharacterArray } from '../../utils/characterArrayStorage';
import { ApiCharacter } from '../../interfaces/ApiCharacter';
import { CharacterPanel } from '../../components/CharacterPanel';

interface Props {
  onBackPress: () => void,
  onFinishPress: () => void,
}

interface State {
  heroList: Array<ApiCharacter>,
  favoriteId: number,
  loadMsg: string,
  totalCharactes: number,
}

class OnboardingPickFavorite extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      heroList: [],
      favoriteId: -1,
      loadMsg: "",
      totalCharactes: 2**30,
    }
  }

  async componentDidMount() {
    let characters = await retrieveStoredCharacters();
    if(characters.length) {
      console.log("Character array recovered from storage.");
      return this.setState({ heroList: characters });
    }
    this.fetchNextCharacterBatch()
  }

  /** Fetch the next page of Characters from the API. Does not act if already have all resources.*/
  fetchNextCharacterBatch() {
    const { heroList, totalCharactes } = this.state;
    if(heroList.length >= totalCharactes )
      return;
    this.setState({ loadMsg: "Buscando Heróis..." });
    marvelApi.characters(heroList.length)
    .then(res => {
      const { heroList } = this.state;
      this.setState({ 
        heroList: heroList.concat(res.data.data.results),
        totalCharactes: res.data.data.total,
        loadMsg: "",
      });
      storeCharacterArray(heroList.concat(res.data.data.results));
    })
    .catch(err => {
      console.log("Error fetching heroes: ", err.response.data);
      this.setState({ loadMsg: "" });
    })
  }

  render() {
    const { heroList, loadMsg } = this.state;
    return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <ComicPanel style={{flex: 1}} color="#d6c64d">
        <Animatable.Image 
          source={require("../../assets/imgs/heroinBust.png")} 
          animation="zoomIn"
        />
      </ComicPanel>

      <ComicPanel style={{paddingHorizontal: 8, paddingVertical: 12}}>
        <Text>{I18n.t("onboardingMyFavorite")}</Text>
      </ComicPanel>

      <ComicPanel style={{flex: 2}} color="#35185e">
        <View style={{flex: 1, alignItems: "center"}}>
          {heroList.length > 0 && (
            <FlatList
              data={heroList}
              renderItem={({item}) => <CharacterPanel character={item}/>}
              keyExtractor={(item) => '' + item.id}
              numColumns={2}
              onEndReachedThreshold={0.2}
              onEndReached={() => this.fetchNextCharacterBatch()}
            />
          )}
        </View>
        {loadMsg.length > 0 && <ActivityIndicator size="large" color="#ffffff"/>}
      </ComicPanel>
      <View style={styles.btnRow}>
        <Button containerStyle={[styles.btnLeft]} title={I18n.t("back")} onPress={this.props.onBackPress}/>
        <Button containerStyle={[styles.btnRight]} title={I18n.t("letsGo")} onPress={this.props.onFinishPress}/>
      </View>
    </SafeAreaView>
    );
  }
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