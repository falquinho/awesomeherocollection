import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from '../../styles';

/**
 * A LinearGradient container styled to look like a comic panel.
 */
export default function ComicPanel(props: {color: string, elevation: number} | any ) {
    return (
        <LinearGradient 
            style={{
                ...GlobalStyles.panelBorder,
                ...styles.panelSpacing,
                ...props.style,
                elevation: props.elevation ?? 0,
            }} 
            colors={[props.color ?? "#ffffff", "#ffffff"]}
            start={{x: 1, y: 1}}
            end={{x: 1.5, y: -0.5}}
        >
            {props.children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    panelSpacing: {
        marginHorizontal: 4, 
        marginVertical: 6,
    }
})