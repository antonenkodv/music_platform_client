import React from 'react';
import {CheckCircleFill} from "react-bootstrap-icons";
import "../../styles/create.scss"
//<CheckCircleFill className={"icon_completed"}/>
const Steps = ({setActiveStep}) => {
    return (
        <>
            <div className="steps">
                {[1, 2, 3].map((item, index) => <>
                        <div className="steps_number" id={item} onClick={()=>setActiveStep(item)}>{item}</div>
                        {item < 3 && <div className="steps_line"></div>}
                    </>
                )}
            </div>
        </>
    )
};

export default Steps;
