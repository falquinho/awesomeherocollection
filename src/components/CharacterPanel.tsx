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
            {/* <Image style={styles.image} source={{uri: `${thumbnail.path}/standard_amazing.${thumbnail.extension}`}}/> */}
            <LinearGradient style={styles.gradient} colors={["#00000088", "#00000000"]} start={{x: 0, y: 1}} end={{x: 0.2, y: 0.5}}/>
            <Text style={styles.nameLabel}>{props.character.name}</Text>
        </View>
    )    
}

const styles = StyleSheet.create({
    mainPanel: {
        width: 164,
        marginHorizontal: 4,
        marginVertical: 6,
        aspectRatio: 1,
        backgroundColor: "white",
        elevation: 6, 
    },
    image: {
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        backgroundColor: "red",
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