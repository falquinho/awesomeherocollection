import React from 'react';
import { ViewStyle, View, ViewProps } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import GlobalStyles from '../../styles';

interface SpeechBubleProps extends ViewProps{
    /** Draw the "speaker arrow" to the left of the bubble. */
    leftSpeaker?: boolean,
    children?: any,
}

function SpeechBubble (props: SpeechBubleProps) {
  return (
    <View {...props} style={[GlobalStyles.panelBorder, bubbleStyle, props.style]}>
      {/* <Svg height="100" width="100">
        <Polygon
          points="40,5 70,80 25,95"
          fill="lime"
        />
      </Svg> */}
    </View>
  );
}

const bubbleStyle: ViewStyle = {
    borderRadius: 16,
    padding: 8,
    backgroundColor: "white",
}

export default SpeechBubble;