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
import mergeObjectsWithIdStrategies from '../../utils/mergeObjectsWithIdStrategies';
import { show } from 'react-native-bootsplash';

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
  showHeader: boolean,
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
      showHeader: true,
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
      const { data } = res.data;
      this.setState({ 
        heroList: mergeObjectsWithIdStrategies.removeDuplicates(heroList, data.results) as ApiCharacter[], 
        totalCharactes: data.total,
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

  handleScroll(scrollEvent: any) {
    console.log(scrollEvent);
    const showHeader = scrollEvent.contentOffset.y <= 0;
    if(this.state.showHeader != showHeader)
      this.setState({ showHeader });
  }

  render() {
    const { 
      heroList, 
      searchMode,
      searchRes,
      loadMsg,
      favoriteHero,
      showHeader
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Animatable.View transition={["height", "opacity"]} duration={300} style={showHeader? styles.shownHeader : styles.hiddenHeader}>
          <ComicPanel style={{flex: 1, justifyContent: "center"}} color="#d6c64d">
            <Animatable.Image
              style={styles.bustImage}
              source={require("../../assets/imgs/heroinBust.png")} 
              animation="fadeIn"
            />
            <Animatable.View animation="zoomIn" style={{ width: "40%", marginLeft: 16 }}>
              <SpeechBubble>
                <Text>{I18n.t("onboardingAskFavorite")}</Text>
              </SpeechBubble>
            </Animatable.View>
          </ComicPanel>
        </Animatable.View>

        {!searchMode && (
          <ComicPanel style={[styles.favoriteBar, styles.row]}>
            <TouchableOpacity 
              style={[{ flex: 1 }, styles.row]} 
              onPress={() => favoriteHero == undefined? this.toggleSearchMode() : this.handleHeroChange(undefined)}>
              <Text 
                style={{fontSize: 16}}
                numberOfLines={1}
                ellipsizeMode="head">
                {favoriteHero != undefined? favoriteHero.name : I18n.t("onboardingMyFavorite")}
              </Text>
              {favoriteHero == undefined && <Icon name="search"/>}
              {favoriteHero != undefined && <Icon name="close"/>}
            </TouchableOpacity>
          </ComicPanel>
        )}

        {searchMode && (
          <ComicPanel style={[styles.favoriteBar, styles.row]}>
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

        {favoriteHero == undefined && (
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
                columnWrapperStyle={{flex: 1, alignItems: "center"}}
                onEndReachedThreshold={0.1}
                onEndReached={() => this.fetchNextCharacterBatch()}
                ListHeaderComponent={<View style={{height: 16}}/>}
                ListFooterComponent={loadMsg != ""? <LoadingIndicator message={loadMsg} color="#000000"/> : null}
                scrollEventThrottle={250}
                onScroll={event => this.handleScroll(event.nativeEvent)}
              />
            )}
          </View>
        )}

        {favoriteHero != undefined && (
          <ComicPanel style={{flex: 3}}>
            <Animatable.Image
              animation="zoomIn"
              duration={200}
              style={styles.favoritePic} source={{uri: generateCharacterThumbnailUri(favoriteHero.thumbnail)}}
            />
          </ComicPanel>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  heroesContainer: {
    flex: 3,
    marginTop: -6,
    paddingHorizontal: 8,
  },
  bustImage: {
    position: "absolute",
    height: "100%",
    right: 0,
  },
  favoriteBar: {
    height: 56,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  favoritePic: {
    position: "absolute",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  shownHeader: {
    height: 148,
    opacity: 1,
  },
  hiddenHeader: {
    height: 0,
    opacity: 0,
  }
});

export default OnboardingPickFavorite;