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
      <ComicPanel color="#ffffff" style={styles.locationPanel}>
        <Text>{I18n.t('onboardingPlace')} {timeLabel}.</Text>
      </ComicPanel>
      <View style={{flex: 1, padding: 16}}>
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
    <View style={{flexDirection: "row"}}>
      <ComicPanel style={{flex: 1}} color="#444444"/>
      <Button 
        title={I18n.t("next")}
        onPress={props.onNextPress} 
        containerStyle={[styles.btnContainer]} 
        icon={<Icon name="arrow-forward"/>} 
        iconRight
      />
    </View>
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
  locationPanel: {
    padding: 8,
    alignSelf: "flex-start",
  },
  image: {
    position: "absolute",
    width: "70%",
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
    marginTop: 16,
  }
});

export default OnboardingIntro;