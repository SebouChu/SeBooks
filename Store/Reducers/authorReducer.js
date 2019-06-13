export default function authorReducer (state, action) {
    switch (action.type) {
        case 'UPDATE_AUTHOR':
            return {
                ...state,
                author: action.value
            }
        default:
            return state
    }
}