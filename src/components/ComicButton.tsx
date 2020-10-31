import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle, ButtonProps } from "react-native";
import React, { ReactElement } from 'react';
import GlobalStyles from '../../styles';
import { Button, Icon } from "react-native-elements";

interface IProps extends ButtonProps {
    title: string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>,
    icon?: boolean | ReactElement<any>,
    iconRight?: boolean,
    loading?: boolean,
    disabled?: boolean,
}

/**
 * Custom button that looks like a comic text box.
 * @param props 
 */
export default function ComicButton(props: IProps) {
    return (
        <Button
            buttonStyle={styles.button}
            containerStyle={[GlobalStyles.panelBorder, props.style]}
            raised
            TouchableComponent={TouchableOpacity}
            loadingProps={{color: "black"}}
            titleStyle={{fontFamily: "ComicNeue-Bold", color: "black"}}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 0,
        backgroundColor: "white",
    },
    label: {
        marginHorizontal: 8,
        fontSize: 16,
    },
    icon: {
        fontSize: 22
    }
})