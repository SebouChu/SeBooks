import React from 'react'

import { StyleSheet, View, WebView } from 'react-native'

export default class StoreWebView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.navigation.getParam('title', null),
            storeUrl: props.navigation.getParam('storeUrl', null)
        }
    }

    render() {
        return (
            <View style={ styles.mainContainer }>
                <WebView
                    style={ styles.storeWebView }
                    scalesPageToFit
                    startInLoadingState
                    source={{ uri: this.state.storeUrl }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 5
    }
})