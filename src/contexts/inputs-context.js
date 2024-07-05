import React, { createContext, useEffect, useState } from 'react'
import { addCoverInput, addSalesInput } from "../api";

export const InputsContext = createContext()

const InputsContextProvider = props => {

  const [thisWeekCoverInputs, setThisWeekCoverInputs] = useState({
    coversInput: [0, 0, 0, 0, 0, 0, 0],
    checkBox: [0, 0, 0, 0, 0, 0, 0],
    Date: "",
    weekOfYear: ""
  });

  const [selectedSiteValueID, setSelectedSiteValueID] = useState("")

  const [thisWeekSalesInputs, setThisWeekSalesInputs] = useState({
    salesInput: [0, 0, 0, 0, 0, 0, 0],
    Date: "",
    weekOfYear: ""
  });

  const [companyName, setCompanyName] = useState("")
  const [companyID, setCompanyID] = useState("")
  const [allWeekSalesInput, setAllWeekSalesInput] = useState(7);
  const [allWeekCoverInput, setAllWeekCoverInput] = useState(7);


  useEffect(() => {
    setThisWeekSalesInputs(props.thisWeekSalesInput[0])

    if (props.thisWeekCoverInputs[0] !== undefined) {
      setThisWeekCoverInputs(props.thisWeekCoverInputs[0])
    }
    setSelectedSiteValueID(props.selectedSiteValueID)

    setCompanyName(props.companyName)
    setCompanyID(props.companyId)

    setAllWeekSalesInput(props.allWeekSalesInput)
    setAllWeekCoverInput(props.allWeekCoverInput)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.companyId, props.companyName, props.selectedSiteValueID, props.thisWeekCoverInputs, props.thisWeekSalesInput, props.allWeekSalesInput, props.allWeekCoverInput])

  const sendDataToDatabase = (type, data) => {

    // console.log("sendDataToDatabase",data)

    switch (type) {
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

  const filterMenuItems = (selectedPage, type) => {
    const menuItemsForSelectedPage = allWeekSalesInput[selectedPage];
    const menuItemsForSelectedPageForCoverInputs = allWeekCoverInput[selectedPage];

    // console.log("allWeekSalesInput",allWeekSalesInput)
    // console.log("selectedPage",selectedPage)
    // console.log("menuItemsForSelectedPage",menuItemsForSelectedPage)

    if (type === "sales-inputs") {
      setThisWeekSalesInputs(menuItemsForSelectedPage)
    } else if (type === "cover-inputs") {
      setThisWeekCoverInputs(menuItemsForSelectedPageForCoverInputs)
    }

  };


  return (
    <InputsContext.Provider
      value={{
        thisWeekCoverInputs,
        selectedSiteValueID,
        thisWeekSalesInputs,
        sendDataToDatabase,
        companyName,
        companyID,
        allWeekSalesInput,
        allWeekCoverInput,
        filterMenuItems,
      }}
    >
      {props.children}
    </InputsContext.Provider>
  )
}

export default InputsContextProvider