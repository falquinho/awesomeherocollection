import { Text, StyleProp, TextStyle } from "react-native";

import React from 'react';

export function ComicText(props: {style?: TextStyle, children?: any}) {
    return <Text style={{fontFamily: "ComicNeue-Bold", ...props.style}}>{props.children}</Text>
}