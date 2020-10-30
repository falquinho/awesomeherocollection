import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import React from 'react';
import GlobalStyles from '../../styles';
import { Button, Icon } from "react-native-elements";

interface IProps {
    label: string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>,
    icon?: string,
    iconSide?: "start" | "end",
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
            title="Next"
            loadingProps={{color: "black"}}
            loading={props.loading}
            disabled={props.disabled}
            icon={props.icon? <Icon name={props.icon}/> : undefined}
            iconRight={props.iconSide == "end"}
            titleStyle={{fontFamily: "ComicNeue-Bold", color: "black"}}
            onPress={props.onPress}
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