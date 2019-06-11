import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class ResultItem extends React.Component {
    getCoverUrl() {
        return this.props.book.volumeInfo.imageLinks !== undefined  ? this.props.book.volumeInfo.imageLinks.thumbnail
                                                                    : "https://via.placeholder.com/128x210.png?text=No%20image"
    }

    getTitle() {
        return this.props.book.volumeInfo.title
    }

    getPublicationYear() {
        return new Date(this.props.book.volumeInfo.publishedDate).getFullYear()
    }

    render() {
        return (
            <TouchableOpacity style={ styles.mainContainer } onPress={this.props.detailLink}>
                <Image
                    source={{uri: this.getCoverUrl() }}
                    style={ styles.coverImage } />
                <View style={ styles.titleContainer }>
                    <Text style={ styles.titleText }>
                        { this.getTitle() } ({ this.getPublicationYear() })
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 5,
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    coverImage: {
        width: 128,
        height: 210
    },
    titleContainer: {
        flex: 1,
        paddingLeft: 5
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})