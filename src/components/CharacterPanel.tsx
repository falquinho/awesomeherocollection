import React, { ReactElement } from 'react';
import { ApiCharacter } from '../interfaces/ApiCharacter';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from '../../styles';
import { generateCharacterThumbnailUri } from '../utils/marvelApi';

export function CharacterPanel(props: {character: ApiCharacter}): ReactElement {
    const { thumbnail } = props.character;
    return (
        <View style={[GlobalStyles.reactiveSquare, styles.mainPanel, GlobalStyles.panelBorder]}>
            <Image style={[GlobalStyles.absoluteFill, {resizeMode: "cover"}]} source={{uri: generateCharacterThumbnailUri(thumbnail)}}/>
            <LinearGradient style={GlobalStyles.absoluteFill} colors={["#0f2135dd", "#0f213500"]} start={{x: 0, y: 1}} end={{x: 0.2, y: 0.4}}/>
            <Text style={styles.nameLabel}>{props.character.name}</Text>
        </View>
    )    
}

const styles = StyleSheet.create({
    mainPanel: {
        marginHorizontal: 4,
        marginVertical: 6,
        backgroundColor: "white",
        elevation: 6, 
    },
    nameLabel: {
        fontSize: 18,
        color: "white",
        position: "absolute",
        padding: 8,
        bottom: 0,
    }
})