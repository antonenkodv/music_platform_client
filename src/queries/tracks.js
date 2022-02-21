import {gql} from '@apollo/client'

export const GET_ALL_TRACKS = gql`
    query{
        getAllTracks{
            id , name , author , picture_path , audio_path
        }
    }
`
