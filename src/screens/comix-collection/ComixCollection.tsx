import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import ComicPanel from '../../components/ComicPanel';
import { ApiCharacter } from '../../interfaces/ApiCharacter';
import { Icon, Text } from 'react-native-elements';
import LoadingIndicator from '../../components/LoadingIndicator';
import I18n from '../../../I18n';
import { ApiComic } from '../../interfaces/ApiComic';
import marvelApi from '../../utils/marvelApi';
import MagazineItem from '../../components/MagazineItem';

interface RouteParams {
  favoriteHero: ApiCharacter | undefined,
}

interface Props {
  navigation: NavigationProp<any>,
  route: RouteProp<any, any>,
}

interface State {
  favoriteHero: ApiCharacter | undefined,
  comics: Array<ApiComic>,
  comicsOffset: number,
  totalNumComics: number,
  fetching: boolean,
}

class ComixCollectionScreen extends React.Component<Props, State> {
  /** Build a route params object for this screen. */
  static RouteParams(params: {favoriteHero: ApiCharacter}): RouteParams {
    return params;
  } 
  
  constructor(props: Props) {
    super(props);
    this.state = {
      favoriteHero: undefined,
      comics: [],
      comicsOffset: 0,
      totalNumComics: 1,
      fetching: false,
    }
  }

  componentDidMount() {
    const { navigation, route } = this.props;
    navigation.setOptions({ header: () => null });
    this.setState({
      favoriteHero: route.params?.favoriteHero,
    }, () => this.fetchNextComicsBatch());
  }

  goBack() {
    const { navigation } = this.props;
    navigation.goBack(); 
  }

  fetchNextComicsBatch() {
    const { favoriteHero, comicsOffset, totalNumComics } = this.state;
    if(!favoriteHero || comicsOffset >= totalNumComics)
      return console.log("Unable to fetch: ", favoriteHero, comicsOffset, totalNumComics);
    this.setState({ fetching: true });
    marvelApi.characterComics(favoriteHero.id, comicsOffset)
    .then(res => {
      const { data } = res.data;
      console.log(data.offset, data.total, data.count);
      this.setState({ 
        fetching: false,
        comics: this.state.comics.concat(res.data.data.results),
        comicsOffset: data.offset + data.count,
        totalNumComics: data.total,
      })
    })
    .catch(err => {
      console.warn("Error fetching comics: ", err);
      this.setState({ fetching: false });
    })
  }

  render() {
    const { 
      favoriteHero,
      comics,
      fetching,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ComicPanel style={styles.toolbar}>
          <Icon name="arrow-back" onPress={() => this.goBack()}/>
          <Text style={styles.title}>{favoriteHero?.name ?? ""}</Text>
        </ComicPanel>
        
        <ComicPanel style={{flex: 1}} color="#561b2b">
          <FlatList
            data={comics}
            extraData={(item: ApiComic) => '' + item.id}
            renderItem={({item}) => <MagazineItem comic={item}/>}
            numColumns={2}
            columnWrapperStyle={{flex: 1, paddingHorizontal: 4}}
            onEndReached={() => this.fetchNextComicsBatch()}
            onEndReachedThreshold={0.1}
            ListHeaderComponent={<View style={{height: 6}}/>}
            ListFooterComponent={fetching? <LoadingIndicator message={I18n.t("retrievingComics")}/> : <View style={{height: 6}}/>}
          />
        </ComicPanel>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginLeft: 16,
  }
})

export default ComixCollectionScreen;