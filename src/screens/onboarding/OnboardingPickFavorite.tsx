import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TextInput } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import ComicPanel from '../../components/ComicPanel';
import I18n from '../../../I18n';
import marvelApi from '../../utils/marvelApi';
import { retrieveStoredCharacters, storeCharacterArray } from '../../utils/characterArrayStorage';
import { ApiCharacter } from '../../interfaces/ApiCharacter';
import SpeechBubble from '../../components/SpeechBubble';
import debounce from 'lodash/debounce';
import { CharacterPanel } from '../../components/CharacterPanel';

interface Props {
}

interface State {
  heroList: Array<ApiCharacter>,
  favoriteId: number,
  loadMsg: string,
  totalCharactes: number,
  selectedHero: number,
  searchMode: boolean,
  searchString: string,
}

class OnboardingPickFavorite extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      heroList: [],
      favoriteId: -1,
      loadMsg: "",
      totalCharactes: 2**30,
      selectedHero: -1,
      searchMode: false,
      searchString: "",
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

  debouncedHeroSearch = debounce(() => {
    console.log("Debounced Hero Search: ", this.state.searchString);
  }, 400);

  render() {
    const { 
      heroList, 
      searchString, 
      searchMode
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ComicPanel style={{flex: 1}} color="#d6c64d">
          <Animatable.Image
            style={styles.image}
            source={require("../../assets/imgs/heroinBust.png")} 
            animation="fadeIn"
          />
          <Animatable.View animation="zoomIn" style={{margin: 16, width: "40%"}}>
            <SpeechBubble>
              <Text>{I18n.t("onboardingAskFavorite")}</Text>
            </SpeechBubble>
          </Animatable.View>
        </ComicPanel>

        {!searchMode && (
          <ComicPanel style={styles.favoriteBar}>
            <Text>{I18n.t("onboardingMyFavorite")}</Text>
            <Icon name="search" onPress={() => this.setState({searchMode: true, searchString: ""})}/>
          </ComicPanel>
        )}

        {searchMode && (
          <ComicPanel style={styles.favoriteBar}>
            <TextInput
              style={{flex: 1}}
              autoFocus
              maxLength={32}
              returnKeyType="search"
              onChangeText={text => {
                this.setState({ searchString: text });
                this.debouncedHeroSearch();
              }}
            />
            <Icon name="close" onPress={() => this.setState({searchMode: false, searchString: ""})}/>
          </ComicPanel>
        )}

        <ComicPanel style={{flex: 3}} color="#35185e">
          <View style={styles.heroesContainer}>
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
        </ComicPanel>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  heroesContainer: {
    flex: 1,
    marginTop: -8,
  },
  image: {
    position: "absolute",
    height: "100%",
    right: 0,
  },
  favoriteBar: {
    height: 56,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {

  }
});

export default OnboardingPickFavorite;