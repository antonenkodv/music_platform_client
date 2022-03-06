import React from 'react';
import FileUpload from "./FileUpload";
import {ArrowDownCircleFill} from "react-bootstrap-icons";
import '../../styles/create.scss'

const ImageForm = ({setPicture , nextStep}) => {
    return (
        <div id="test-l-2" className="content upload_file ">
            <div className='files_upload_section'>
                <FileUpload id="fileUploadInput" file={''} accept={'image/*'} setFile={setPicture}>
                    <button type="button" className={'upload_file_button'}><ArrowDownCircleFill
                        className={"icon_upload"}></ArrowDownCircleFill></button>
                </FileUpload>
            </div>
            <button className="btn button_next_step " onClick={nextStep}>Next</button>
        </div>
    );
};

export default ImageForm;
