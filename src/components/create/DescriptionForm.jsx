import React from 'react';
import "../../styles/create.scss"
import {useInput} from "../../hooks/useInput";

const DescriptionForm = ({activeStep, setTrackInfo , nextStep}) => {

    const name = useInput('')
    const author = useInput('')
    const text = useInput('')

    const newTrack = {
        name: name.value,
        author: author.value,
        text: text.value
    }

    const changeHandler = (e) => {
        const obj = {
            "nameTrackInput": name.onChange,
            "authorTrackInput": author.onChange,
            "textSongArea": text.onChange
        }
        obj[e.target.id](e)
    }
    return (
        <div id="test-l-1"
             className="content first_section"
             style={{display: activeStep !== 1 && 'none'}}>
            <div>
                <label htmlFor="nameTrackInput">Название трека</label>
                <input value={name.value}
                       onChange={changeHandler}
                       type="text"
                       className=" create_track_input"
                       id="nameTrackInput"
                       placeholder="Name"/>
            </div>
            <div>
                <label htmlFor="authorTrackInput">Исполнитель</label>
                <input value={author.value}
                       onChange={changeHandler}
                       type="text"
                       className=" create_track_input"
                       id="authorTrackInput"
                       placeholder="Author"/>
            </div>
            <div>
                <label htmlFor="textSongArea">Слова</label>
                <textarea value={text.value}
                          onChange={changeHandler}
                          type="text"
                          className="create_track_input create_track_input-text-song "
                          id="textSongArea"
                          placeholder="Text"/>
            </div>
            <button className="btn button_next_step"
                    onClick={()=>{
                        nextStep()
                        setTrackInfo(newTrack)
                    }}>Next
            </button>
        </div>
    );
};

export default DescriptionForm;
