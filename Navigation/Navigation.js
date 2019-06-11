import { createStackNavigator, createAppContainer } from 'react-navigation'
import Home from '../Components/Home'
import BookDetail from '../Components/BookDetail'
import StoreWebView from '../Components/StoreWebView'

// Added two space characters because of OnePlus Slate font
// https://forums.expo.io/t/text-cut-off-on-oneplus-device/4999/7

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                title: 'SeBooks  '
            }
        },
        BookDetail: {
            screen: BookDetail,
            navigationOptions: ({ navigation }) => ({
                title: `${navigation.state.params.title}  `
            }),
        },
        StoreWebView: {
            screen: StoreWebView,
            navigationOptions: ({ navigation }) => ({
                title: `Store - ${navigation.state.params.title}  `
            }),
        }
    }, {
        initialRouteName: 'Home'
    }
)

export default createAppContainer(AppNavigator)