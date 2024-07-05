import React from 'react'

export default function capping(props) {
    return (
        <b className="capping">
          <div className="applyPurpleColor cooperHewittBold">Cap</div>
          <div className="capping__text applyMarginRightAndLeft">
            <div className={ "applyPurpleColor cooperHewittBold"}> {props.c}</div>
          </div>
            <div className={"applyBlueTuckGreen"}>
              {props.showPounds ? props.coverWastes : props.coverWastes}
            </div>
          <div className="capping__text applyMarginRightAndLeft applyPurpleColor">
            <div className={ "applyPurpleColor cooperHewittBold"}> {props.s}</div>
          </div>
            <div className={"applyBlueTuckGreen"}>
              {props.showPounds ? props.spoilageWastes : props.spoilageWastes}
            </div>
          <div className="capping__text applyMarginRightAndLeft applyPurpleColor cooperHewittBold">
            <div className={ "applyPurpleColor cooperHewittBold"}> {props.p}</div>
          </div>
            <div className={"applyBlueTuckGreen"}>
              {props.showPounds ? props.prepWastes : props.prepWastes}
            </div>
          </b>
    )
}
