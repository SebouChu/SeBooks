import React from 'react'
import { ActivityIndicator, Button, FlatList, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'

import ResultItem from './ResultItem'
import MussoResults from './Fixtures/Musso'

const mapStateToProps = (state) => {
    return {
        author: state.author,
        results: state.results,
        loading: state.loading
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

class Home extends React.Component {
    _updateAuthor(newAuthor) {
        this.props.dispatch({
            type: 'UPDATE_AUTHOR',
            value: newAuthor
        })
    }

    _updateResults(newResults) {
        this.props.dispatch({
            type: 'UPDATE_RESULTS',
            value: newResults
        })
    }

    loadLocalResults() {
        this._updateResults(MussoResults.items)
    }

    searchAuthor(author) {
        var url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${this.props.author}`
        fetch(url).then(response => response.json())
                .then(responseJSON => {
                    this._updateResults(responseJSON.items)
                })
                .catch(error => {
                    this._updateResults([])
                    console.error(error);
                })
    }

    onPressSearchBtn() {
        console.log(`Let's search with author name: ${this.props.author}`)

        this.props.dispatch({ type: 'WAIT_RESULTS' })

        // this.searchAuthor(this.props.author)
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
                data={this.props.results}
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
                    this.props.dispatch({
                        type: 'SELECT_BOOK',
                        value: item
                    })

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
                        onChangeText={(author) => this._updateAuthor(author)}
                        onEndEditing={this.onPressSearchBtn.bind(this)}
                    />
                </View>

                { this.props.loading ? this._renderLoading() : this._renderList() }
            </View>
        )
    }
}

export default connect(mapStateToProps)(Home)