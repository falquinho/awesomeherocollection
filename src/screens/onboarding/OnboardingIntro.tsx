import React from 'react';
import { View, StyleSheet } from 'react-native';
import ComicPanel from '../../components/ComicPanel';
import { Text, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import SpeechBubble from '../../components/SpeechBubble';
import { customTimeString } from '../../utils/time-utils';
import I18n from '../../../I18n';

const baseDelay = 300;

function OnboardingIntro(props: {onNextPress: () => void}) {  
  const timeLabel = customTimeString(new Date());
  return (
    <Animatable.View animation="flipInAnim" style={[styles.container]}>
    <ComicPanel style={{flex: 3}} color="#94d315" backgroundImage={require("../../assets/imgs/bluredCityBkg.jpeg")}>
      <ComicPanel color="#ffffff" style={{padding: 8, width: 158, alignItems: "center"}}>
        <Text>{I18n.t('onboardingPlace')} {timeLabel}.</Text>
      </ComicPanel>
      <View style={[styles.row]}>
        <View>
          <Animatable.View animation="zoomIn" duration={400} delay={baseDelay + 600}>
            <SpeechBubble style={styles.speechBubble}>
              <Text style={{textAlign: "center"}}>{I18n.t("onboardingWelcome")}</Text>
            </SpeechBubble>
          </Animatable.View>
          <Animatable.View animation="zoomIn" duration={400} delay={baseDelay + 1200}>
            <SpeechBubble style={styles.speechBubble}>
              <Text style={{textAlign: "center"}}>{I18n.t("onboardingExplanation")}</Text>
            </SpeechBubble>
          </Animatable.View>
        </View>
        <Animatable.Image 
          source={require("../../assets/imgs/flyingHeroin.png")} 
          style={styles.image}
          animation="fadeInDown"
          delay={baseDelay}
        />
      </View>
    </ComicPanel>
    <ComicPanel style={{flex: 1}} color="#d3b315">
    </ComicPanel>
    <Button 
    title={I18n.t("next")}
    onPress={props.onNextPress} 
    containerStyle={[styles.btnContainer]} 
    icon={<Icon name="arrow-forward"/>} 
    iconRight
    />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    height: "80%",
  },
  image: {
    height: "100%",
    width: "60%",
    resizeMode: "contain",
  },
  btnContainer: {
    alignSelf: "flex-end",
    margin: 4,
  },
  speechBubble: {
    width: 128,
    marginTop: 16,
  }
});

export default OnboardingIntro;