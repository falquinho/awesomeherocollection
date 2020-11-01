import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ComicPanel from '../../components/ComicPanel';
import { Button, Text, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import SpeechBubble from '../../components/SpeechBubble';
import GlobalStyles from '../../../styles';

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
    const now = new Date();
    const timeLabel = `${now.getHours()}:${now.getMinutes()}`
    return (
      <SafeAreaView style={{flex: 1}}>
        <ComicPanel style={{flex: 2}} color="#94d315" backgroundImage={require("../../assets/imgs/supermanDecoCity.jpeg")}>
          <ComicPanel color="#ffffff" style={{padding: 8, width: 158, alignItems: "center"}}>
            <Text>Hero Collection, {timeLabel}.</Text>
          </ComicPanel>
          <View style={[styles.row]}>
            <Animatable.View animation="fadeIn">
              <SpeechBubble style={{width: 128}}>
                <Text style={{textAlign: "center"}}>
                  Hello you.
                  Welcome to the Awesome Hero Collection.
                </Text>
              </SpeechBubble>
              <SpeechBubble style={{width: 128}}>
                <Text style={{textAlign: "center"}}>
                  This is the place check your favorite hero adventures.
                </Text>
              </SpeechBubble>
            </Animatable.View>
            <Animatable.Image 
              source={require("../../assets/imgs/missMarvelFlying.jpeg")} 
              style={styles.image}
              animation="fadeInDown"
            />
            
          </View>
        </ComicPanel>
        <ComicPanel style={{flex: 1}} color="#d3b315">
          <Button 
            title="Next" 
            onPress={() => {}} 
            containerStyle={[styles.btnContainer]} 
            icon={<Icon name="arrow-forward"/>} 
            iconRight
          />
        </ComicPanel>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "50%",
    resizeMode: "contain",
  },
  btnContainer: {
    alignSelf: "flex-end",
    margin: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "80%",
    backgroundColor: "red",
  },
  speechBubble: {

  },
});

export default OnboardingScreen;