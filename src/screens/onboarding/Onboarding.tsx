import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import OnboardingIntro from './OnboardingIntro';
import OnboardingPickFavorite from './OnboardingPickFavorite';
import { Alert, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface Props {
  navigation: NavigationProp<any>,
}

interface State {
  pageIndex: number,
  favoriteHero: string,
}

class OnboardingScreen extends React.Component<Props, State> {
  private pages = [
    <OnboardingIntro onNextPress={() => this.changePage(1)}/>,
    <OnboardingPickFavorite onBackPress={() => this.changePage(-1)} onFinishPress={() => {}}/>
  ]

  constructor(props: Props) {
    super(props);
    this.state = {
      pageIndex: 0,
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
    const { pageIndex } = this.state;
    this.setState({ pageIndex: Math.max(0, Math.min(pageIndex + step, this.pages.length - 1)) });
  }

  completeOnboarding() {
    Alert.alert("Onboarding Done!", "Save favorite hero and redirect.");
  }

  render() {
    const { pageIndex } = this.state;
    return <>
      <Animatable.View style={{flex: 1}} animation="flipIn">
        {this.pages[1]}
      </Animatable.View>
      <Animatable.View style={[styles.previousContainer]} animation="flipOut">
        {this.pages[0]}
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