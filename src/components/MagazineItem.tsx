import React, { ReactElement } from 'react';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, Image } from 'react-native';
import { ApiComic } from '../interfaces/ApiComic';
import { generateComicThumbnailUri } from '../utils/marvelApi';
import GlobalStyles from '../../styles';

function MagazineItem(props: {comic: ApiComic}): ReactElement {
    const { comic } = props;
    return (
        <Animatable.View style={[styles.container, GlobalStyles.panelBorder]} animation="zoomIn" duration={300}>
            <Image style={[GlobalStyles.absoluteFill, {resizeMode: "cover", top: 0}]} source={{uri: generateComicThumbnailUri(comic.thumbnail)}}/>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        marginVertical: 6,
        marginHorizontal: 4,
        aspectRatio: 3/4,
        overflow: "hidden",
        elevation: 6,
        backgroundColor: "white",
    },
})

export default MagazineItem;