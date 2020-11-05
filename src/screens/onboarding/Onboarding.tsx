import React, { ReactElement } from 'react';
import { NavigationProp } from '@react-navigation/native';
import OnboardingIntro from './OnboardingIntro';
import OnboardingPickFavorite from './OnboardingPickFavorite';
import { Alert, SafeAreaView, View, StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import I18n from '../../../I18n';
import RNBootSplash from "react-native-bootsplash";
import * as Animatable from 'react-native-animatable';
import ComicPanel from '../../components/ComicPanel';

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
  }

  canLeaveOnboarding() {
    const { favoriteHero } = this.state;
    return !!favoriteHero;
  }

  completeOnboarding() {
    Alert.alert("Onboarding Done!", "Save favorite hero and redirect.");
  }

  render() {
    const { 
      currPageIndex, 
      favoriteHero,
      animationPlaying,
    } = this.state;
    const currentPage = this.pages[currPageIndex];
    const prevPage = this.pages[currPageIndex - 1];
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
        <Animatable.View animation="fadeIn" duration={300}>
          <ComicPanel style={{height: 56, paddingHorizontal: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <Button 
              title={I18n.t("back")}
              icon={{name: "arrow-back"}}
              onPress={() => this.changePage(-1)}
              disabled={currPageIndex == 0}
              type="clear"
            />

            <Text style={{fontSize: 18}}>
              {currPageIndex + 1}/{this.pages.length}
            </Text>

            {currPageIndex < this.pages.length -1 && <Button 
              title={I18n.t("next")}
              icon={{name: "arrow-forward"}}
              iconRight
              onPress={() => this.changePage(1)}
              type="clear"
            />}
            {currPageIndex == this.pages.length -1 && <Button 
              title={I18n.t("letsGo")}
              icon={{name: "done"}}
              iconRight
              disabled={!this.canLeaveOnboarding()}
              type="clear"
            />}
          </ComicPanel>
        </Animatable.View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  controls: { 
    flexDirection: "row",
    marginVertical: 6,
    marginHorizontal: 6,
  },
  clearBtn: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
})

export default OnboardingScreen;