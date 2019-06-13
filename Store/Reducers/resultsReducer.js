export default function resultsReducer (state, action) {
    let nextState
    switch (action.type) {
        case 'WAIT_RESULTS':
            nextState = {
                ...state,
                results: [],
                loading: true
            }
            break
        case 'UPDATE_RESULTS':
            nextState = {
                ...state,
                results: action.value,
                loading: false
            }
            break
    }

    return nextState || state
}