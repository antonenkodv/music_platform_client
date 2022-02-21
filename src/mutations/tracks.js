import {gql} from '@apollo/client'

export const CREATE_NEW_TRACK = gql`
    mutation createNewTrack($input: createNewTrackInput){
        createNewTrack ( input : $input){
            id name author audio_path picture_path
        }
    },
`

