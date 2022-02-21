import React, {useRef} from 'react';
import "../../styles/create.scss"

const FileUpload = ({ setFile, accept, children}) => {
    const ref = useRef()
    const onChange = (e) => {
        setFile(e.target.files[0])
    }
    return (
        <div onClick={() => ref.current.click()} >
            <label htmlFor="fileUploadInput"> </label>
            <input type="file"
                   accept={accept}
                   style={{display: 'none'}}
                   ref={ref}
                   onChange={onChange}/>
            {children}
        </div>
    );
};

export default FileUpload;
