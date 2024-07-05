import React, { createContext, useEffect, useState} from 'react'
import { getIdCustomerWaste } from "../api";
import { reducer } from "./../helper.js"

export const IdCustomerWasteContext = createContext()

const IdCustomerWasteProvider = props => {

    const [xaxis, setXaxis] = useState([])
    const [yaxis, setYaxis] = useState([])
    const [eventName, setEventName] = useState("")
    const [date, setDate] = useState("")
    const [sum, setSum] = useState("")
    const [index, setIndex] = useState("")

  useEffect(() => {

    if (props.siteName, props.companyName, props.companyId) {
        callIdCustomerWasteAPI(props.companyId, props.companyName, props.siteName, 0)
    };
  }, [ props.siteName, props.companyName, props.companyId]);

  const callIdCustomerWasteAPI = ((companyNumber, companyName, siteName, selected) => {
    getIdCustomerWaste(companyNumber, companyName, siteName, selected).then((data) => {
        console.log("callIdCustomerWasteAPI",data);
        setXaxis(data.xaxis)
        setYaxis(data.yaxis)
        setEventName(data.eventName)
        setDate(data.date)
        setIndex(data.numberOfIndex)

        const total = data.yaxis.reduce(reducer)
        setSum(parseInt(total));
    });
  });

  return (
    <IdCustomerWasteContext.Provider
      value={{
        xaxis,
        yaxis,
        eventName,
        date,
        sum,
        index,
        callIdCustomerWasteAPI
      }}
    >
      {props.children}
    </IdCustomerWasteContext.Provider>
  )
}

export default IdCustomerWasteProvider