import React, { ReactElement } from 'react';
import { NavigationProp } from '@react-navigation/native';
import OnboardingIntro from './OnboardingIntro';
import OnboardingPickFavorite from './OnboardingPickFavorite';
import { Alert, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface Props {
  navigation: NavigationProp<any>,
}

interface State {
  currPageIndex: number,
  currPage: ReactElement | undefined,
  prevPage: ReactElement | undefined,
  favoriteHero: string,
}

class OnboardingScreen extends React.Component<Props, State> {
  private pages = [
    <OnboardingIntro onNextPress={() => this.changePage(1)}/>,
    <OnboardingPickFavorite onBackPress={() => this.changePage(-1)} onFinishPress={() => {}}/>
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
    }
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({ header: () => null });
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
    const { currPage, prevPage } = this.state;
    return <>
      <Animatable.View style={{flex: 1}} ref={ref => this.currAnimatableRef = ref}>
        {currPage}
      </Animatable.View>
      <Animatable.View style={[styles.previousContainer]} ref={ref => this.prevAnimatableRef = ref}>
        {prevPage}
      </Animatable.View>
    </>;
  }
}

const styles = StyleSheet.create({
  previousContainer: {
    position: "absolute", 
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  }
});

export default OnboardingScreen;