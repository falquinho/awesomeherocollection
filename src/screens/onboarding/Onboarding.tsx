import React, { ReactElement } from 'react';
import { NavigationProp } from '@react-navigation/native';
import OnboardingIntro from './OnboardingIntro';
import OnboardingPickFavorite from './OnboardingPickFavorite';
import { Alert, SafeAreaView, View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import I18n from '../../../I18n';
import RNBootSplash from "react-native-bootsplash";
import * as Animatable from 'react-native-animatable';

interface Props {
  navigation: NavigationProp<any>,
}

interface State {
  currPageIndex: number,
  currPage: ReactElement | undefined,
  prevPage: ReactElement | undefined,
  favoriteHero: string,
  animationPlaying: boolean,
}

class OnboardingScreen extends React.Component<Props, State> {
  private pages = [
    <OnboardingIntro/>,
    <OnboardingPickFavorite/>,
    <OnboardingIntro/>,
    <OnboardingPickFavorite/>,
    <OnboardingIntro/>,
    <OnboardingPickFavorite/>,
  ]

  private currAnimatableRef: any;
  private prevAnimatableRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      currPageIndex: 0,
      currPage: this.pages[0],
      prevPage: undefined,
      favoriteHero: "",
      animationPlaying: false,
    }
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({ header: () => null });
    RNBootSplash.hide({ duration: 250 });
  }

  componentDidUpdate(_: any, prevState: State) {
    if(prevState.pageIndex != this.state.pageIndex)
      this.setState({ animationPlaying: true });
  }

  /**
   * Change the current page to show by some number of pages.
   * @param step How many pages to change. Can be a negative number.
   */
  changePage(step: number) {
    const { currPageIndex } = this.state;
    const newIndex = Math.max(0, Math.min(currPageIndex + step, this.pages.length - 1));
    if(newIndex == currPageIndex)
      return;
    this.setState({ 
      currPageIndex: newIndex,
      prevPage: this.state.currPage,
      currPage: this.pages[newIndex],
    });
    if(newIndex < currPageIndex) {
      this.prevAnimatableRef?.flipInReverse(500);
      this.currAnimatableRef?.flipOutReverse(500);
    } else {
      this.prevAnimatableRef?.flipOut(500);
      this.currAnimatableRef?.flipIn(500);
    }
  }

  completeOnboarding() {
    Alert.alert("Onboarding Done!", "Save favorite hero and redirect.");
  }

  render() {
    const { 
      pageIndex, 
      favoriteHero,
      animationPlaying,
    } = this.state;
    const currentPage = this.pages[pageIndex];
    const prevPage = this.pages[pageIndex - 1];
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          {currentPage}
          {prevPage && animationPlaying && (
            <Animatable.View 
              style={{position: "absolute", width: "100%", height: "100%"}} 
              animation="flipOutAnim"
              onAnimationEnd={() => this.setState({animationPlaying: false})}>
              {prevPage}
            </Animatable.View>
          )}
        </View>
        <View style={styles.controls}>
          {pageIndex > 0 && <Button 
            containerStyle={[{flex: 1}]} 
            title={I18n.t("back")}
            icon={<Icon name="arrow-back"/>} 
            onPress={() => this.changePage(-1)}
          />}
          {pageIndex > 0 && <View style={{width: 8}}/>}
          {pageIndex < this.pages.length -1 && <Button 
            containerStyle={[{flex: 1}]} 
            title={I18n.t("next")}
            icon={<Icon name="arrow-forward"/>}
            iconRight
            onPress={() => this.changePage(1)}
          />}
          {pageIndex == this.pages.length -1 && <Button 
            containerStyle={[{flex: 1}]} 
            title={I18n.t("letsGo")}
            icon={<Icon name="done"/>}
            iconRight
            disabled={!favoriteHero}
          />}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  controls: { 
    flexDirection: "row",
    marginVertical: 6,
    marginHorizontal: 6,
  }
})

export default OnboardingScreen;