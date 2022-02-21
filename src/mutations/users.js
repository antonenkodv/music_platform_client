import {gql} from '@apollo/client'

export const LOGIN = gql`
    mutation login($input: loginInput){
        login ( loginCredentials:  $input){
            email password token refreshToken ok errors{path message}
        }
    },
`

export const REGISTRATION = gql`
    mutation registration($input: registerInput){
        registration ( registerCredentials: $input){ 
            email password ok errors{path message}
        }
    },
`

