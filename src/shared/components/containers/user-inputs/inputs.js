import React, { useState, useEffect } from "react";

import { addCoverInput, addSalesInput } from "../../../../api";

import CoverInputs from "./cover-inputs";
import SalesInputs from "./sales-inputs";

// import InputList from "./inputs-list";


export default function Input(props) {

    const [ thisWeekCoverInputs, setThisWeekCoverInputs ] = useState({
        coversInput: [0, 0, 0, 0, 0, 0, 0],
        Date: "",
        weekOfYear: ""
    });

    const [ selectedSiteValueID, setSelectedSiteValueID] = useState("")

    const [ thisWeekSalesInputs, setThisWeekSalesInputs ] = useState({
        salesInput: [0, 0, 0, 0, 0, 0, 0],
        Date: "",
        weekOfYear: ""
    });

    useEffect(() => {
        setThisWeekCoverInputs(props.thisWeekCoverInputs[0])
        setThisWeekSalesInputs(props.thisWeekSalesInput[0])
        setSelectedSiteValueID(props.selectedSiteValueID)
                // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const sendDataToDatabase = (type, data) => {

        // console.log("sendDataToDatabase",data)

        switch(type) {
            case "COVER INPUTS":
              addCoverInput(data).then(() => {
                props.updateValues("COVER INPUTS")
              })
              break;
            case "SALES INPUTS":
              addSalesInput(data).then(() => {
                props.updateValues("SALES INPUTS")
              })
              break;
            default:
        }
    }

    return (
        <div className="inputs__container">
            <div className="inputs__row">
                <div className="inputs__column">
                    <CoverInputs
                        thisWeekCoverInputs={thisWeekCoverInputs}
                        selectedSiteValueID={selectedSiteValueID}
                        sendDataToDatabase={sendDataToDatabase}
                        companyID={props.companyID}
                        companyName={props.companyName}
                    />
                </div>
                <div className="inputs__column">
                    <SalesInputs
                        thisWeekSalesInputs={thisWeekSalesInputs}
                        selectedSiteValueID={selectedSiteValueID}
                        sendDataToDatabase={sendDataToDatabase}
                        companyID={props.companyID}
                        companyName={props.companyName}
                    />
                </div>
            </div>
        </div>
    )
}
