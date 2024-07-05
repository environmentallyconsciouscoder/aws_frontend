import React from 'react'
import "./subheadings.css"

export default function Subheadings(props) {
    return (
        <div className="DailySalesVsWasteReport__heading">
            <div
            className="DailySalesVsWasteReport__label"
            >
                <div className="applyPurpleColor cooperHewittBold">{props.site}</div>
                <div className="graph-title">{props.title}</div>
                <div className="applyPurpleColor cooperHewittBold">{props.date}</div>
            </div>
        </div>
    )
}
