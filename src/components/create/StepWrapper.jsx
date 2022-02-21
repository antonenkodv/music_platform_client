import React, {useEffect, useState} from "react";
import Stepper from 'bs-stepper'
import FileUpload from './FileUpload'
import {CheckCircleFill, MusicNoteBeamed, ArrowDownCircleFill} from 'react-bootstrap-icons'
import {Button} from 'react-bootstrap'
import "../../styles/create.scss"
import {useInput} from "../../hooks/useInput";
import {CREATE_NEW_TRACK} from '../../mutations/tracks'
import {useMutation} from "@apollo/client";
import {UPLOAD_FILE, UPLOAD_MULTIPLE_FILES} from "../../mutations/files";

let stepper;
const steps = ["Информация", "Обложка", "Аудио"]
const StepWrapper = () => {

    const [activeStep, setActiveStep] = useState(1)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const name = useInput('')
    const author = useInput('')
    const text = useInput('')
    const [createNewTrack] = useMutation(CREATE_NEW_TRACK)
    const [singleUpload] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log('onCompleted single upload', data)
    })
    const [multipleUpload] = useMutation(UPLOAD_MULTIPLE_FILES, {
        onCompleted: data => console.log('onCompleted multiple upload', data)

    })

    useEffect(() => {
        stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true,
            selectors: {
                steps: '.step',
                trigger: '.step-trigger',
                stepper: '.bs-stepper'
            }
        })

    }, [])

    useEffect(() => {

    }, [audio, picture])

    async function onSubmit(e) {
        e.preventDefault()

        if (activeStep === 3) {
            if (picture && audio) {
                multipleUpload({
                    variables: {
                        files: [picture, audio],
                    }
                })
                    .then(({data}) => {
                        const {path} = data.multipleUpload
                        createNewTrack({
                            variables: {
                                input: {
                                    name: name.value,
                                    author: author.value,
                                    text: text.value,
                                    audio_path: path.find(file => file.mimetype.split('/')[0] === 'audio').filepath,
                                    picture_path: path.find(file => file.mimetype.split('/')[0] === 'image').filepath,
                                }
                            }
                        })


                    })

            } else if (picture || audio) {
                singleUpload({variables: {file: picture || audio}}).then(({data}) => {
                    const {filename, filepath} = data.singleUpload
                    createNewTrack({
                        variables: {
                            input: {
                                name: name.value,
                                author: author.value,
                                text: text.value,
                                audio_path: audio && filepath,
                                picture_path: picture && filepath,
                            }
                        }
                    })
                })

            }
        }
    }

    function nextStep(e) {
        stepper.next()
        setActiveStep(prev => prev + 1)
    }

    return (
        <div>
            <div id="stepper1" className="bs-stepper ">
                <div className="bs-stepper-header bs-stepper-header-custom">
                    {steps.map((title, index) => <>
                            <div key={index} className="step" data-target={`#test-l-${index + 1}`}
                                 onClick={() => setActiveStep(index + 1)}>
                                <button className="step-trigger button_first_step">
                                    {activeStep > index + 1 ? <CheckCircleFill className={"icon_completed"}/> :
                                        <span className="bs-stepper-circle"
                                        >{index + 1}</span>}
                                    <br/>
                                    <span className="bs-stepper-label">{title}</span>
                                </button>
                            </div>
                            {index < steps.length - 1 && <div className="line"></div>}
                        </>
                    )}
                </div>
                <div className="bs-stepper-content" className='stepper-content'>
                    <form onSubmit={onSubmit} className={'form-container'}>
                        <div id="test-l-1" className="content fade first_section"
                             style={{display: activeStep !== 1 && 'none'}}>
                            <div>
                                <label htmlFor="nameTrackInput">Название трека</label>
                                <input {...name} type="text" className=" create_track_input" id="nameTrackInput"
                                       placeholder="Name"/>
                            </div>
                            <div>
                                <label htmlFor="authorTrackInput">Исполнитель</label>
                                <input {...author} type="text" className=" create_track_input" id="authorTrackInput"
                                       placeholder="Author"/>
                            </div>
                            <div>
                                <label htmlFor="textSongArea">Слова</label>
                                <textarea {...text} type="text"
                                          className="create_track_input create_track_input-text-song "
                                          id="textSongArea"
                                          placeholder="Text"/>
                            </div>
                            <button className="btn button_next_step" onClick={nextStep}>Next</button>
                        </div>
                        <div id="test-l-2" className="content fade upload_file ">
                            <div className='files_upload_section'>
                                <FileUpload id="fileUploadInput" file={''} accept={'image/*'} setFile={setPicture}>
                                    <button className={'upload_file_button'}><ArrowDownCircleFill
                                        className={"icon_upload"}></ArrowDownCircleFill></button>
                                </FileUpload>
                            </div>
                            <button className="btn button_next_step " onClick={nextStep}>Next</button>
                        </div>
                        <div id="test-l-3" className="content  fade  upload_file ">
                            <div className='files_upload_section'>
                                <FileUpload accept={'audio/*'} setFile={setAudio}>
                                    <button className={'upload_file_button'}><MusicNoteBeamed
                                        className="icon_upload"></MusicNoteBeamed></button>
                                </FileUpload>
                            </div>

                            <button type="submit" className="btn button_next_step">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StepWrapper;
