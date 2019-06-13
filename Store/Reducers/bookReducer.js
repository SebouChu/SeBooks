export default function bookReducer (state, action) {
    switch (action.type) {
        case 'SELECT_BOOK':
            return {
                ...state,
                book: action.value
            }
        default:
            return state
    }
}