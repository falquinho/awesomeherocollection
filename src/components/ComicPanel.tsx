import React from 'react';
import { StyleSheet, Image, ViewProps, ImageSourcePropType, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from '../../styles';

interface ComicPanelProps extends ViewProps{
  /** Hex color string */
  color?: string,
  backgroundImage?: ImageSourcePropType,
  children?: any,
}

/**
 * A LinearGradient container styled to look like a comic panel.
 */
export default function ComicPanel(props: ComicPanelProps) {
    return (
        <View style={[GlobalStyles.panelBorder, styles.panel, props.style]}>
            {props.color && <LinearGradient 
                style={styles.backgroundGradient} 
                start={{x: 1, y: 1}}
                end={{x: 1.5, y: -0.5}}
                colors={[props.color, "#ffffff"]}
            />}
            {props.backgroundImage != undefined && <Image source={props.backgroundImage} style={styles.backgroundImage}/>}
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    panel: {
        overflow: "hidden",
        marginHorizontal: 4, 
        marginVertical: 6,
    },
    backgroundGradient: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0
    },
    backgroundImage: {
        width: "101%",
        height: "101%",
        position: "absolute",
        top: 0, left: 0,
        resizeMode: "cover",
    }
})