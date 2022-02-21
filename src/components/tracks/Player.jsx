import React, {useEffect} from 'react'
import {PlayFill, PauseFill, VolumeUpFill} from 'react-bootstrap-icons'
import "../../styles/player.scss"
import TrackProgress from "./TrackProgress";
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";


let audio;

const Player = () => {

    const {pause, volume, active, duration, currentTime} = useSelector(state => state.player)
    const {playTrack, pauseTrack, setVolume, setCurrentTime, setDuration} = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            play()
        }
    }, [active])

    const setAudio = () => {
        if (active) {
            audio.src = `http://localhost:5000/${active.audio_path}`
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.onerror = (err) => {
                console.log(err)
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }
    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }
    const changeVolume = (e) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }
    const changeCurrentTime = (e) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime()
    }

    if (!active) {
        return null
    }
    return (
        <>
            <div className={'player_container'}>
                <div onClick={play}>
                    {pause ? <PlayFill className={'player_icon'}/> : <PauseFill className={'player_icon'}/>}
                </div>
                <TrackProgress left={currentTime} right={duration} onChange={(e) => changeCurrentTime(e)} type="time"/>
                <VolumeUpFill style={{marginLeft: "auto"}}/>
                <TrackProgress left={volume} right={100} onChange={e => changeVolume(e)} type="sound"/>
            </div>
        </>
    )
}

export default Player
