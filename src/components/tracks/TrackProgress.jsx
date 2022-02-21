import React from "react";


const TrackProgress = ({
                           left, right, onChange, type
                       }) => {

    return (
        <>
            <div style={{display: "flex", marginLeft: "20px"}}>
                <input type={'range'}
                       min={0}
                       max={right}
                       value={left}
                       onChange={onChange}/>
                <div>{left}/{right}</div>
            </div>
        </>
    )
}

export default TrackProgress
