import {PlayerActionTypes} from '../../types/player'


export const playTrack = () => {
    return {type: PlayerActionTypes.PLAY}
}
export const pauseTrack = () => {
    return {type: PlayerActionTypes.PAUSE}
}
export const setVolume = (payload) => {
    return {type: PlayerActionTypes.SET_VOLUME, payload}
}
export const setDuration = (payload) => {
    return {type: PlayerActionTypes.SET_DURATION ,payload}
}
export const setCurrentTime = (payload) => {
    return {type: PlayerActionTypes.SET_CURRENT_TIME , payload}
}
export const setActiveTrack = (payload) => {
    return {type: PlayerActionTypes.SET_ACTIVE , payload}
}
