import React, { ReactElement } from 'react';
import { ApiCharacter } from '../../interfaces/ApiCharacter';
import ComicPanel from '../../components/ComicPanel';
import { Image } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default function CharacterPanel(props: {apiCharacter: ApiCharacter}): ReactElement {
  const { name, thumbnail } = props.apiCharacter;
  return (
    <ComicPanel style={styles.panel}>
      <Image style={styles.image} source={{uri: `${thumbnail.path}/landscape_xlarge.${thumbnail.extension}`}}/>
      <LinearGradient style={styles.gradient} start={{x: 1, y: 1}} end={{x: 0.5, y: 0.5}} colors={["#3a145e", "#3a145e00"]}/>
      <Text style={styles.nameLabel}>{name}</Text>
    </ComicPanel>
  )
}

const styles = StyleSheet.create({
  panel: {
    width: "95%",
    aspectRatio: 2,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  nameLabel: {
    color: "#ffffff",
    position: "absolute",
    bottom: 4,
    right: 4,
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  }
})