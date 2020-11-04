import React, { ReactElement } from 'react';
import { ViewStyle, View, ViewProps } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import GlobalStyles from '../../styles';

interface SpeechBubleProps extends ViewProps{
    /** Draw the "speaker arrow" to the left of the bubble. */
    leftSpeaker?: boolean,
    children?: any,
}

function SpeechBubble (props: SpeechBubleProps): ReactElement {
  return (
    <View {...props} style={[GlobalStyles.panelBorder, bubbleStyle, props.style]}>
    </View>
  );
}

const bubbleStyle: ViewStyle = {
    borderRadius: 16,
    padding: 8,
    backgroundColor: "white",
}

export default SpeechBubble;