import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TextInput } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import ComicPanel from '../../components/ComicPanel';
import I18n from '../../../I18n';
import marvelApi from '../../utils/marvelApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import CharacterPanel from './CharacterPanel';
import { ApiCharacter } from '../../interfaces/ApiCharacter';
import SpeechBubble from '../../components/SpeechBubble';
import debounce from 'lodash/debounce';

interface Props {
}

interface State {
  heroList: ApiCharacter[],
  selectedHero: number,
  searchMode: boolean,
  searchString: string,
}

class OnboardingPickFavorite extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      heroList: [],
      selectedHero: -1,
      searchMode: false,
      searchString: "",
    }
  }

  componentDidMount() {
    // marvelApi.characters()
    // .then(res => {
    //   console.log("Heroes fetched!");
    //   this.setState({heroList: res.data.data.results});
    // })
    // .catch(err => {
    //   console.log("Error fetching heroes: ", err.response.data);
    // });
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
            {/* {!heroList.length && <LoadingIndicator message={I18n.t("fetchingHeroes")}/>}
            {heroList.length && (
              <FlatList
                data={heroList}
                renderItem={({ item }) => <CharacterPanel apiCharacter={item}/>}
              />
            )} */}
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