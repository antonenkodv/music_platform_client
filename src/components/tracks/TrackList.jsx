import React, {useEffect} from 'react'
import "../../styles/tracklist.scss"
import {Col, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {PlayFill, PauseFill} from 'react-bootstrap-icons'
import {GET_ALL_TRACKS} from '../../queries/tracks'
import {useQuery} from "@apollo/client";

const TrackList = () => {
    const {active} = useSelector(state => state.player)
    const {data: allTracksData, loading, error, refetch} = useQuery(GET_ALL_TRACKS)

    useEffect(() => {
        if (!loading) {
            console.log('allTracksData,', allTracksData)
        }
    }, [allTracksData])

    const {playTrack, pauseTrack, setActiveTrack} = useActions()
    const play = (e, track) => {
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
    }
    const pause = (e) => {
        e.stopPropagation()
        pauseTrack()
    }
    return (
        <>
            <div className={'tracklist_container'}>
                {
                    allTracksData && allTracksData.getAllTracks.length && allTracksData.getAllTracks.map(track =>
                        <Row className={'tracklist_item'} onClick={(e) => play(e, track)}>
                            <Col lg={2}
                                 className={'track_icon_block'}> {active && active.name === track.name ?
                                <PauseFill className={'track_play_icon'}/> :
                                <PlayFill className={'track_play_icon'}/>}</Col>
                            <Col lg={3}><img width={80} height={80} className={'track_picture'}
                                             src={`http://localhost:5000/${track.picture_path}`}/> </Col>
                            <Col lg={3} className={'track_description_text'}>{track.name}<p
                                className="mb-2 text-muted">{track.author}</p></Col>
                        </Row>)
                }
            </div>

        </>
    )
}

export default TrackList
