import React from 'react'
import { StyleSheet, View, WebView } from 'react-native'
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
    }
})

class StoreWebView extends React.Component {
    render() {
        return (
            <View style={ styles.mainContainer }>
                <WebView
                    style={ styles.storeWebView }
                    scalesPageToFit
                    startInLoadingState
                    source={{ uri: this.props.book.volumeInfo.infoLink }} />
            </View>
        )
    }
}

export default connect(mapStateToProps)(StoreWebView)