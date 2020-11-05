import React, { ReactElement } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';

export default function LoadingIndicator(props: {message?: string, color?: string}): ReactElement {
  const finalColor = props.color || "#ffffff";
  return (
    <View style={{alignItems: "center", marginVertical: 12, marginHorizontal: 8}}>
      <ActivityIndicator size="large" color={finalColor}/>
      {props.message != "" && <Text style={{marginTop: 16, color: finalColor}}>{props.message}</Text>}
    </View>
  )
}