import React from 'react'
import { SyncLoader } from "react-spinners"

// const Spinner = props => {
const Spinner = () => {
    return(
        <div className="Spinner">
            <SyncLoader
                size={16}
                color={"rgb(140, 112, 140)"}
             />
            {/* <div className="modal-loader"></div> */}
        </div>
    )
}

export default Spinner;