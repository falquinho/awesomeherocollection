import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import OnboardingIntro from './OnboardingIntro';
import OnboardingPickFavorite from './OnboardingPickFavorite';
import { Alert } from 'react-native';

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
    return this.pages[pageIndex];
  }
}

export default OnboardingScreen;