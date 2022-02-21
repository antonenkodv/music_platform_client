import {gql} from '@apollo/client'

export const UPLOAD_FILE = gql`
    mutation singleUpload($file : Upload! ){
        singleUpload ( file : $file) {
            ok errors {path message} path { filename filepath mimetype }
        }
    },
`
export const UPLOAD_MULTIPLE_FILES = gql`
    mutation ($files: [Upload!]!) {
        multipleUpload(files: $files) {
            ok errors{ path message} path { filename filepath mimetype}
        }
    }
`;
