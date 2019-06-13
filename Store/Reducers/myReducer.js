var initialState = {
    author: '',
    results: [],
    loading: false,
    book: null
}

import authorReducer from './authorReducer'
import bookReducer from './bookReducer'
import resultsReducer from './resultsReducer'

export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_AUTHOR':
            return authorReducer(state, action)
        case 'WAIT_RESULTS':
            return resultsReducer(state, action)
        case 'UPDATE_RESULTS':
            return resultsReducer(state, action)
        case 'SELECT_BOOK':
            return bookReducer(state, action)
        default:
            return state
    }
}