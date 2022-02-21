import {TracksActionsType} from '../../types/tracks'

const initalState = {
    tracks: [],
    error: ''
}


export const tracksReducer = (state = initalState, action) => {
    switch (action.type) {
        case TracksActionsType.FETCH_TRACKS: {
            return {tracks: action.payload, error: ''}
        }
        case TracksActionsType.FETCH_TRACKS_ERROR: {
            return {...state, error: action.payload}
        }
        default :
            return state
    }
}
