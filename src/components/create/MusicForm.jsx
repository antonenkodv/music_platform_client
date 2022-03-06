import React from 'react';
import FileUpload from "./FileUpload";
import {MusicNoteBeamed} from "react-bootstrap-icons";
import "../../styles/create.scss"

const MusicForm = ({setAudio }) => {
    return (
        <div id="test-l-3" className="content upload_file ">
            <div className='files_upload_section'>
                <FileUpload accept={'audio/*'} setFile={setAudio}>
                    <button type="button" className={'upload_file_button'}><MusicNoteBeamed
                        className="icon_upload"></MusicNoteBeamed></button>
                </FileUpload>
            </div>
            <button type="submit" className="btn button_next_step">Submit</button>
        </div>
    );
};

export default MusicForm;
