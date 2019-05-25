import React from 'react'
import { ActivityIndicator, Button, FlatList, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'

import ResultItem from './Components/ResultItem'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            author: '',
            results: [],
            loading: false
        }
    }

    onPressSearchBtn() {
        console.log(`Let's search with author name: ${this.state.author}`)
        var url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${this.state.author}`
        this.setState({ results: [], loading: true });
        fetch(url).then(response => response.json())
                .then(responseJSON => {
                    this.setState({ results: responseJSON.items, loading: false })
                })
    }

    _renderLoading() {
        return (
            <View style={ styles.loadingContainer }>
                <ActivityIndicator color="blue" size="large" animating />
            </View>
        )
    }

    _renderList() {
        return (
            <FlatList
                style={ styles.resultsContainer }
                data={this.state.results}
                keyExtractor={ (item) => item.id }
                renderItem={this._renderItem}
            />
        )
    }

    _renderItem = ({item}) => {
        coverUrl = item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.thumbnail
                                                            : "https://via.placeholder.com/128x210.png?text=No%20image"
        return (
            <ResultItem
                coverUrl={coverUrl}
                title={item.volumeInfo.title}
                storeUrl={item.volumeInfo.infoLink}
                publicationYear={new Date(item.volumeInfo.publishedDate).getFullYear()}
                description={item.volumeInfo.description}
            />
        )
    }

    render() {
        return (
            <View style={ styles.mainContainer }>
                <View style={ styles.formContainer }>
                    <TextInput
                        style={ styles.authorInput }
                        placeholder="Author name"
                        returnKeyType="search"
                        onChangeText={(author) => this.setState({author})}
                        onEndEditing={this.onPressSearchBtn.bind(this)}
                    />
                </View>

                { this.state.loading ? this._renderLoading() : this._renderList() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 25
    },
    formContainer: {
        margin: 5,
        flexDirection: 'row'
    },
    authorInput: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        height: 40
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultsContainer: {
        flex: 1
    }
})