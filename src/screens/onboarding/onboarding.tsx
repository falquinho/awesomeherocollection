import React from 'react';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>,
}

interface State {
  pageIndex: number,
  favoriteHero: string,
}

class OnboardingScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pageIndex: 0,
      favoriteHero: "",
    }
  }

  render() {
    return <></>
  }
}

export default OnboardingScreen;