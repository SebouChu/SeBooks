import { createStore } from 'redux';
import myReducer from './Reducers/myReducer'

var store = createStore(myReducer)

export default store
