import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, FlatList, View, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import ComicPanel from '../../components/ComicPanel';
import { ApiCharacter } from '../../interfaces/ApiCharacter';
import { Icon, Text, ListItem, Avatar } from 'react-native-elements';
import LoadingIndicator from '../../components/LoadingIndicator';
import I18n from '../../../I18n';
import { ApiComic } from '../../interfaces/ApiComic';
import marvelApi from '../../utils/marvelApi';
import MagazineItem from '../../components/MagazineItem';
import * as Animatable from 'react-native-animatable';
import MergeComicsStrategies, { MergeArrayFunction } from '../../utils/mergeObjectsWithIdStrategies';
import Snackbar from 'react-native-snackbar';
import HttpErrorMessages from '../../utils/httpErrorMessages';
import MergeObjectsWithIdStrategies from '../../utils/mergeObjectsWithIdStrategies';

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
  focusedComic: ApiComic | undefined,
  comicsOffset: number,
  totalNumComics: number,
  refreshing: boolean,
  fetching: boolean,
}

class ComixCollectionScreen extends React.Component<Props, State> {
  /** Build a route params object for this screen. */
  static RouteParams(params: {favoriteHero: ApiCharacter}): RouteParams {
    return params;
  }

  focusedComicAnimatableRef: any;
  
  constructor(props: Props) {
    super(props);
    this.state = {
      favoriteHero: undefined,
      comics: [],
      focusedComic: undefined,
      comicsOffset: 0,
      totalNumComics: 1,
      refreshing: false,
      fetching: false,
    }
  }

  componentDidMount() {
    const { navigation, route } = this.props;
    navigation.setOptions({ header: () => null });
    this.setState({
      favoriteHero: route.params?.favoriteHero,
    }, () => this.handleFlastListEndReached());
  }

  goBack() {
    const { navigation } = this.props;
    navigation.goBack(); 
  }

  /**
   * Requires a merge function because depending of the action it needs to either replace existing (refresh)
   * or merge new with existing (end of list reached)
   * @param mergeStrategy Function to do the merge of current state Comics array with the fetched batch.
   */
  fetchNextComicsBatch(mergeStrategy: MergeArrayFunction): Promise<any> {
    const { favoriteHero, comicsOffset, totalNumComics } = this.state;
    if(!favoriteHero)
      return Promise.reject({message: "Hero undefined."});
    if(comicsOffset >= totalNumComics)
      return Promise.resolve({message: "Already retrieved all resources."});
    return marvelApi.characterComics(favoriteHero.id, comicsOffset)
    .then(res => {
      const { data } = res.data;
      this.setState({ 
        comics: mergeStrategy(this.state.comics, res.data.data.results) as ApiComic[],
        comicsOffset: data.offset + data.count,
        totalNumComics: data.total,
      })
    });
  }

  handleFlastListEndReached() {
    this.setState({ fetching: true });
    this.fetchNextComicsBatch(MergeObjectsWithIdStrategies.removeDuplicates)
    .then(res => {
      this.setState({ fetching: false });
    })
    .catch(err => {
      console.warn("Error handling List End: ", err);
      this.setState({ fetching: false });
      Snackbar.show({
        text: HttpErrorMessages[err.status ?? 0],
        action: { text: I18n.t("retry"), onPress: () => this.handleFlastListEndReached() },
      });
    })
  }

  /** Refresh the data: discard all thats stored and fetch from scratch. */
  handleRefresh() {
    this.setState({
      comics: [],
      comicsOffset: 0,
      totalNumComics: 1,
      refreshing: true,
    }, () => {
      this.fetchNextComicsBatch(MergeComicsStrategies.discardOld)
      .then(res => this.setState({ refreshing: false }))
      .catch(err => {
        console.warn("Error refreshing: ", err);
        this.setState({ refreshing: false });
        Snackbar.show({
          text: HttpErrorMessages[err.status ?? 0],
          action: { text: I18n.t("retry"), onPress: () => this.handleRefresh() },
        });
      })
    });
  }

  render() {
    const { 
      favoriteHero,
      comics,
      focusedComic,
      fetching,
      refreshing,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={comics}
          extraData={(item: ApiComic) => '' + item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={{flex: 1}} activeOpacity={0.6} onPress={() => this.setState({ focusedComic: item })}>
              <MagazineItem comic={item}/>
            </TouchableOpacity>
          )}
          onRefresh={() => this.handleRefresh()}
          refreshing={refreshing}
          numColumns={2}
          columnWrapperStyle={{flex: 1, paddingHorizontal: 4}}
          onEndReached={() => this.handleFlastListEndReached()}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={<View style={{height: 6}}/>}
          ListFooterComponent={fetching? <LoadingIndicator color="#000000" message={I18n.t("retrievingComics")}/> : <View style={{height: 6}}/>}
        />

        <Modal visible={focusedComic != undefined} transparent>
          <View style={{ flex: 1, backgroundColor: "#000000aa" }}>
            {focusedComic != undefined && (
              <Animatable.View style={{ flex: 1, alignSelf: "center", padding: 16 }} animation="zoomInUp" duration={500}>
                <TouchableWithoutFeedback style={{ alignSelf: "center" }} onPress={() => this.focusedComicAnimatableRef?.spin()}>
                  <Animatable.View ref={ref => this.focusedComicAnimatableRef = ref}>
                    <MagazineItem comic={focusedComic}/>
                  </Animatable.View>
                </TouchableWithoutFeedback>
              </Animatable.View>
            )}
            {focusedComic != undefined && (
              <Animatable.View>
                <ComicPanel>
                  <ListItem>
                    <Avatar icon={{ name: "book-open-page-variant", type: "material-community", color: "black" }}/>
                    <ListItem.Content>
                      <ListItem.Title>{focusedComic.title}</ListItem.Title>
                      <ListItem.Subtitle>{I18n.t("title")}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  {focusedComic.prices.map(el => (
                    <ListItem>
                      <Avatar icon={{ name: "currency-usd", type: "material-community", color: "black" }}/>
                      <ListItem.Content>
                        <ListItem.Title>{el.price} USD</ListItem.Title>
                        <ListItem.Subtitle>{el.type}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  ))}
                  <View style={{ position: "absolute", top: 8, right: 8 }}>
                    <Icon name="close" onPress={() => this.setState({ focusedComic: undefined })}/>
                  </View>
                </ComicPanel>
              </Animatable.View>
            )}
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

export default ComixCollectionScreen;