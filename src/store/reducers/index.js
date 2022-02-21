const {playerReducer} = require("./playerReducer");
const {tracksReducer} =require("./tracksReducer")
const {combineReducers} = require("redux");

export const rootReducer = combineReducers({
    player: playerReducer,
    tracks : tracksReducer
})
