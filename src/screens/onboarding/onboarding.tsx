import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { SafeAreaView, Text } from 'react-native';
import ComicPanel from '../../components/ComicPanel';
import { color } from 'react-native-reanimated';
import { ComicText } from '../../components/ComicText';
import ComicButton from '../../components/ComicButton';

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
    const { navigation } = this.props;
    navigation.setOptions({ header: () => null });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ComicPanel style={{flex: 2}} color="#94d315">
        </ComicPanel>
        <ComicPanel style={{flex: 1}} color="#d3b315">
          <ComicButton
            label="Press Me!"
            onPress={() => {}}
            icon="arrow-forward"
            iconSide="end"
            style={{margin: 4, width: 128, alignSelf: "flex-end"}}
          />
        </ComicPanel>
      </SafeAreaView>
    );
  }
}

export default OnboardingScreen;