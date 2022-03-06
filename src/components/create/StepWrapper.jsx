import React, {useEffect, useState} from "react";
// ---components
import DescriptionForm from './DescriptionForm'
import ImageForm from "./ImageForm"
import MusicForm from "./MusicForm"
import Steps from "./Steps"
// ---hooks
import {useMutation} from "@apollo/client";
// ---qql
import {UPLOAD_FILE, UPLOAD_MULTIPLE_FILES} from "../../mutations/files";
import {CREATE_NEW_TRACK} from '../../mutations/tracks'
// ---styles
import "../../styles/create.scss"

const StepWrapper = () => {

    const [activeStep, setActiveStep] = useState(1)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const [trackInfo, setTrackInfo] = useState({name: '', author: '', text: ''})

    const [createNewTrack] = useMutation(CREATE_NEW_TRACK)
    const [singleUpload] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log('onCompleted single upload', data),
        onError: err => console.log(err)
    })
    const [multipleUpload] = useMutation(UPLOAD_MULTIPLE_FILES, {
        onCompleted: data => console.log('onCompleted multiple upload', data),
        onError: err => console.log(err)
    })

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
                        const newTrack = {
                            name: trackInfo.name,
                            author: trackInfo.author,
                            text: trackInfo.text,
                            audio_path: path.find(file => file.mimetype.split('/')[0] === 'audio').filepath,
                            picture_path: path.find(file => file.mimetype.split('/')[0] === 'image').filepath,
                        }
                        createNewTrack({
                            variables: {
                                input: newTrack
                            }
                        })
                    })
                return true
            } else if (picture || audio) {
                singleUpload({variables: {file: picture || audio}})
                    .then(({data}) => {
                        const {filepath} = data.singleUpload
                        const newTrack = {
                            name: trackInfo.name,
                            author: trackInfo.author,
                            text: trackInfo.text,
                            audio_path: audio && filepath,
                            picture_path: picture && filepath,
                        }

                        createNewTrack({
                            variables: {
                                input: newTrack
                            }
                        })
                    })
                return true
            }
            return null
        }
    }

    function StepForm({...props}) {
        const forms = {
            1: <DescriptionForm activeStep={activeStep} setTrackInfo={setTrackInfo}
                                nextStep={() => setActiveStep(prev => prev + 1)} trackInfo={trackInfo}/>,
            2: <ImageForm nextStep={() => setActiveStep(prev => prev + 1)} setPicture={setPicture}/>,
            3: <MusicForm setAudio={setAudio}/>
        }

        return (
            <div className="bs-stepper-content" className='stepper-content'>
                <form onSubmit={onSubmit} className='form-container'>
                    {forms[activeStep]}
                </form>
            </div>
        )
    }

    return (
        <>
            <Steps setActiveStep={setActiveStep}/>
            <StepForm/>
        </>
    );
}

export default StepWrapper;
