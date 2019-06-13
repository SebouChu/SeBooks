import React from 'react'
import { Button, Image, StyleSheet, Text, View, WebView } from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        book: state.book
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 5
    },
    imageContainer: {
        alignItems: 'center'
    },
    coverImage: {
        width: 128,
        height: 210
    },
    infoContainer: {
        marginBottom: 5
    },
    infoText: {
        fontSize: 16
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    descriptionContainer: {
        paddingBottom: 5
    }
})

class BookDetail extends React.Component {
    getTitle() {
        return this.props.book.volumeInfo.title
    }

    getAuthorsList() {
        return this.props.book.volumeInfo.authors.join(', ')
    }

    getDescription() {
        return this.props.book.volumeInfo.description
    }

    getCoverUrl() {
        return this.props.book.volumeInfo.imageLinks !== undefined  ? this.props.book.volumeInfo.imageLinks.thumbnail
                                                                    : "https://via.placeholder.com/128x210.png?text=No%20image"
    }

    getPublicationYear() {
        return new Date(this.props.book.volumeInfo.publishedDate).getFullYear()
    }

    render() {
        return (
            <View style={ styles.mainContainer }>
                <View style={ styles.imageContainer }>
                    <Image
                        source={{uri: this.getCoverUrl() }}
                        style={ styles.coverImage } />
                </View>
                <View style={ styles.titleContainer }>
                    <Text style={ styles.titleText }>
                        { this.getTitle() }
                    </Text>
                </View>
                <View style={ styles.infoContainer }>
                    <Text style={ styles.infoText }>Par { this.getAuthorsList() }</Text>
                    <Text style={ styles.infoText }>Sorti en { this.getPublicationYear() }</Text>
                </View>
                <View style={ styles.descriptionContainer }>
                    <Text style={ styles.descriptionText }>
                        { this.getDescription() }
                    </Text>
                </View>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate("StoreWebView", {
                            title: this.getTitle()
                        })
                    }}
                    title="Plus de détails"
                    color="#00C853" />
            </View>
        )
    }
}

export default connect(mapStateToProps)(BookDetail)