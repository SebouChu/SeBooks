import React from 'react'
import { ActivityIndicator, Button, FlatList, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'

import ResultItem from './ResultItem'
import MussoResults from './Fixtures/Musso'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            author: '',
            results: [],
            loading: false
        }
    }

    loadLocalResults() {
        this.setState({ results: MussoResults.items, loading: false })
    }

    searchAuthor(author) {
        var url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${this.state.author}`
        this.setState({ results: [], loading: true });
        fetch(url).then(response => response.json())
                .then(responseJSON => {
                    this.setState({ results: responseJSON.items, loading: false })
                })
                .catch(error => {
                    this.setState({ loading: false })
                    console.error(error);
                })
    }

    onPressSearchBtn() {
        console.log(`Let's search with author name: ${this.state.author}`)

        // this.searchAuthor(this.state.author)
        this.loadLocalResults()
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
        return (
            <ResultItem
                book={item}
                detailLink={() => {
                    this.props.navigation.navigate("BookDetail", {
                        title: item.volumeInfo.title,
                        book: item
                    })
                }}
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
        marginTop: 10
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