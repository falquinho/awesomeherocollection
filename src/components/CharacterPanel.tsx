import React, { ReactElement } from 'react';
import { ApiCharacter } from '../interfaces/ApiCharacter';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from '../../styles';

export function CharacterPanel(props: {character: ApiCharacter}): ReactElement {
    const { thumbnail } = props.character;
    return (
        <View style={[styles.mainPanel, GlobalStyles.panelBorder]}>
            <Image style={styles.image} source={{uri: `${thumbnail.path}/standard_amazing.${thumbnail.extension}`}}/>
            <LinearGradient style={styles.gradient} colors={["#0f2135dd", "#0f213500"]} start={{x: 0, y: 1}} end={{x: 0.2, y: 0.4}}/>
            <Text style={styles.nameLabel}>{props.character.name}</Text>
        </View>
    )    
}

const styles = StyleSheet.create({
    mainPanel: {
        flex: 1,
        aspectRatio: 1,
        marginHorizontal: 4,
        marginVertical: 6,
        backgroundColor: "white",
        elevation: 6, 
    },
    image: {
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    gradient: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    nameLabel: {
        fontSize: 18,
        color: "white",
        position: "absolute",
        padding: 8,
        bottom: 0,
    }
})