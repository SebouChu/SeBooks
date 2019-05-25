import React from 'react'
import { Image, Linking, StyleSheet, Text, View } from 'react-native'

export default class ResultItem extends React.Component {
    excerptFor(text = "") {
        var excerpt = text.slice(0, 100);
        if (text.length > 100) {
            excerpt += "..."
        }

        return excerpt;
    }

    render() {
        console.log(this.props)
        return (
            <View style={ styles.mainContainer }>
                <Image
                    source={{uri: this.props.coverUrl }}
                    style={ styles.coverImage } />
                <View style={ styles.contentContainer }>
                    <View style={ styles.titleContainer }>
                        <Text style={ styles.titleText } onPress={() => Linking.openURL(this.props.storeUrl)}>
                            { this.props.title } ({ this.props.publicationYear })
                        </Text>
                    </View>
                    <View style={ styles.descriptionContainer }>
                        <Text>{ this.excerptFor(this.props.description) }</Text>
                    </View>
                </View>
            </View>
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
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    coverImage: {
        width: 128,
        height: 210
    },
    contentContainer: {
        flex: 1,
        marginLeft: 5
    },
    titleContainer: {
        flex: 1
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    descriptionContainer: {
        flex: 2
    }
})