import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Text, Icon, Image } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import ComicPanel from '../../components/ComicPanel';
import I18n from '../../../I18n';
import marvelApi, { generateCharacterThumbnailUri } from '../../utils/marvelApi';
import { retrieveStoredCharacters, storeCharacterArray } from '../../utils/characterArrayStorage';
import { ApiCharacter } from '../../interfaces/ApiCharacter';
import SpeechBubble from '../../components/SpeechBubble';
import debounce from 'lodash/debounce';
import { CharacterPanel } from '../../components/CharacterPanel';
import LoadingIndicator from '../../components/LoadingIndicator';
import GlobalStyles from '../../../styles';

interface Props {
  onChangeFavoriteHero?: (hero: ApiCharacter | undefined) => void,
}

interface State {
  heroList: Array<ApiCharacter>,
  favoriteHero: ApiCharacter | undefined,
  loadMsg: string,
  totalCharactes: number,
  selectedHero: number,
  searchMode: boolean,
  searchString: string,
  searchRes: Array<ApiCharacter>,
}

class OnboardingPickFavorite extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      heroList: [],
      favoriteHero: undefined,
      loadMsg: "",
      totalCharactes: 2**30,
      selectedHero: -1,
      searchMode: false,
      searchString: "",
      searchRes: [],
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

  /** 
   * Fetch the next page of Characters from the API. Does not act if already have all resources.
   * Also does not act if on search mode.
   * */
  fetchNextCharacterBatch() {
    const { heroList, totalCharactes, searchMode } = this.state;
    if(heroList.length >= totalCharactes || searchMode )
      return;
    this.setState({ loadMsg: I18n.t("retrievingHeroes") });
    marvelApi.characters(heroList.length)
    .then(res => {
      const { heroList } = this.state;
      this.setState({ 
        heroList: heroList.concat(res.data.data.results),
        totalCharactes: res.data.data.total,
        loadMsg: "",
      });
      storeCharacterArray(heroList.concat(res.data.data.results)).catch(console.error);
    })
    .catch(err => {
      console.log("Error fetching heroes: ", err.response.data);
      this.setState({ loadMsg: "" });
    })
  }

  toggleSearchMode() {
    this.setState({
      searchMode: !this.state.searchMode,
      searchRes: [],
      searchString: "",
    })
  }

  debouncedHeroSearch = debounce(() => {
    const { searchString } = this.state;
    if(searchString.length < 4)
      return;
    this.setState({loadMsg: I18n.t("fetchingHeroes")});
    marvelApi.searchCharacter(searchString.trim())
    .then(res => {
      console.log("Search res: ", res.data);
      this.setState({
        searchRes: res.data.data.results,
        loadMsg: "",
      })
    })
    .catch(err => {
      console.log("Error searching character: ", err.response, err.data);
      this.setState({ loadMsg: "" });
    })
  }, 400);

  handleHeroChange(hero: ApiCharacter | undefined) {
    const { onChangeFavoriteHero } = this.props;
    this.setState({ 
      favoriteHero: hero,
      searchMode: false,
      searchRes: [],
      searchString: "",
    }, () => onChangeFavoriteHero?.(hero));
  }

  render() {
    const { 
      heroList, 
      searchMode,
      searchRes,
      loadMsg,
      favoriteHero,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ComicPanel style={{flex: 1}} color="#d6c64d">
          <Animatable.Image
            style={styles.bustImage}
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
            <View style={{flex: 1}}>
              <Text 
                style={{fontSize: 16}}
                numberOfLines={1}
                ellipsizeMode="head">
                {I18n.t("onboardingMyFavorite")}{favoriteHero != undefined && <Text> {favoriteHero.name}</Text>}
              </Text>
            </View>
            {favoriteHero == undefined && <Icon name="search" onPress={() => this.toggleSearchMode()}/>}
            {favoriteHero != undefined && <Icon name="close" onPress={() => this.handleHeroChange(undefined)}/>}
          </ComicPanel>
        )}

        {searchMode && (
          <ComicPanel style={styles.favoriteBar}>
            <TextInput
              style={{flex: 1}}
              autoFocus
              maxLength={32}
              onChangeText={text => {
                this.setState({ searchString: text });
                this.debouncedHeroSearch();
              }}
            />
            <Icon name="close" onPress={() => this.toggleSearchMode()}/>
          </ComicPanel>
        )}

        <ComicPanel style={{flex: 3}} color="#35185e">
          <View style={styles.heroesContainer}>
            {heroList.length > 0 && (
              <FlatList
                data={searchMode? searchRes : heroList}
                renderItem={({item}) => (
                  <TouchableOpacity 
                    style={GlobalStyles.reactiveSquare} 
                    activeOpacity={0.6}
                    onPress={() => this.handleHeroChange(item)} 
                  >
                    <CharacterPanel character={item}/>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => '' + item.id}
                numColumns={2}
                columnWrapperStyle={{flex: 1}}
                onEndReachedThreshold={0.1}
                onEndReached={() => this.fetchNextCharacterBatch()}
                ListHeaderComponent={<View style={{height: 16}}/>}
                ListFooterComponent={loadMsg != ""? <LoadingIndicator message={loadMsg}/> : null}
              />
            )}
          </View>

          {favoriteHero != undefined && (
            <Animatable.Image
              animation="zoomIn"
              duration={200}
              style={styles.favoritePic} source={{uri: generateCharacterThumbnailUri(favoriteHero.thumbnail)}}
            />
          )}

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
  bustImage: {
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
  favoritePic: {
    position: "absolute",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  }
});

export default OnboardingPickFavorite;