import React from 'react';
import { View, StyleSheet } from 'react-native';
import ComicPanel from '../../components/ComicPanel';
import { Text, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import SpeechBubble from '../../components/SpeechBubble';
import { customTimeString } from '../../utils/time-utils';
import I18n from '../../../I18n';

const baseDelay = 300;

function OnboardingIntro() {  
  const timeLabel = customTimeString(new Date());
  return (
    <ComicPanel style={{flex: 3}} color="#333333" backgroundImage={require("../../assets/imgs/bluredCityBkg.jpeg")}>
      <ComicPanel color="#ffffff" style={styles.locationPanel}>
        <Text>{I18n.t('onboardingPlace')} {timeLabel}.</Text>
      </ComicPanel>
      <View style={{flex: 1, padding: 16}}>
        <Animatable.Image 
          source={require("../../assets/imgs/flyingHeroin.png")} 
          style={styles.image}
          animation="fadeInDown"
          delay={baseDelay}
        />
        <Animatable.View animation="zoomIn" duration={400} delay={baseDelay + 600}>
          <SpeechBubble style={styles.speechBubble}>
            <Text style={{textAlign: "center"}}>{I18n.t("onboardingWelcome")}</Text>
          </SpeechBubble>
        </Animatable.View>
        <Animatable.View animation="zoomIn" duration={400} delay={baseDelay + 1200} style={{alignSelf: "flex-end"}}>
          <SpeechBubble style={{width: 128}}>
            <Text style={{textAlign: "center"}}>{I18n.t("onboardingExplanation")}</Text>
          </SpeechBubble>
        </Animatable.View>
        <Animatable.View animation="zoomIn" duration={400} delay={baseDelay + 1800} style={{alignSelf: "flex-start"}}>
          <SpeechBubble style={{width: 128}}>
            <Text style={{textAlign: "center"}}>{I18n.t("onboardingHideout")}</Text>
          </SpeechBubble>
        </Animatable.View>
      </View>
    </ComicPanel>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    height: "80%",
  },
  locationPanel: {
    padding: 8,
    alignSelf: "flex-start",
  },
  image: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 16,
    right: 16,
    resizeMode: "contain",
  },
  btnContainer: {
    alignSelf: "flex-end",
    marginHorizontal: 4,
    marginVertical: 6,
  },
  speechBubble: {
    width: 128,
  },
  firstBubble: {

  },
  secondBubble: {
    bottom: 16,
    right: 16,
  }
});

export default OnboardingIntro;