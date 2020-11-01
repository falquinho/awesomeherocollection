import React from 'react';
import { ViewStyle, View, ViewProps } from 'react-native';
import GlobalStyles from '../../styles';

interface SpeechBubleProps extends ViewProps{
    /** Draw the "speaker arrow" to the left of the bubble. */
    leftSpeaker?: boolean,
    children?: any,
}

function SpeechBubble (props: SpeechBubleProps) {
  return (
    <View {...props} style={[GlobalStyles.panelBorder, bubbleStyle, props.style]}/>
  );
}

const bubbleStyle: ViewStyle = {
    borderRadius: 16,
    padding: 8,
    backgroundColor: "white",
}

export default SpeechBubble;