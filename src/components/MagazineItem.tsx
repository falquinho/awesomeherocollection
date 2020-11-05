import React, { ReactElement } from 'react';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, Image } from 'react-native';
import { ApiComic } from '../interfaces/ApiComic';
import { generateComicThumbnailUri } from '../utils/marvelApi';
import GlobalStyles from '../../styles';
import { Text } from 'react-native-elements';

function MagazineItem(props: {comic: ApiComic}): ReactElement {
    const { comic } = props;
    return (
        <Animatable.View style={styles.container} animation="zoomIn" duration={300}>
            <Image style={[GlobalStyles.absoluteFill, {resizeMode: "cover"}]} source={{uri: generateComicThumbnailUri(comic.thumbnail)}}/>
            <Text style={styles.titleLabel}>{comic.title}</Text>
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
        borderRadius: 2,
        overflow: "hidden",
        elevation: 6,
        backgroundColor: "white",
    },
    titleLabel: {
        margin: 8,
        color: "white",
        fontSize: 16,
    }
})

export default MagazineItem;