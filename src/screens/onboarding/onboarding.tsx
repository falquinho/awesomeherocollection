import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { SafeAreaView, Alert } from 'react-native';
import ComicPanel from '../../components/ComicPanel';
import { Button, Text } from 'react-native-elements';
import { initialWindowMetrics } from 'react-native-safe-area-context';

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
  
  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({ header: () => null });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ComicPanel style={{flex: 2}} color="#94d315">
          <Text style={{fontSize: 18}}>Heelo World!</Text>
        </ComicPanel>
        <ComicPanel style={{flex: 1}} color="#d3b315">
          <Button title="Next" onPress={() => {}}/>
        </ComicPanel>
      </SafeAreaView>
    );
  }
}

export default OnboardingScreen;