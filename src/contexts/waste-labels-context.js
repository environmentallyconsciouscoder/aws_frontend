import React, { createContext, useEffect, useState } from 'react'
import { getWasteLabel } from "../api";

export const WasteLabelsContext = createContext()

const WasteLabelsContextProvider = props => {
  const [labels, setLabels] = useState({
    acronyms: {
      c: "C",
      p: "P",
      s: "S"
    },
    titleLabels: {
      c: "cover",
      p: "preparation",
      s: "spoilage"
    }
  });

  useEffect(() => {

    if (props.companyName && props.companyId && props.siteName) {
      getWasteLabel(props.companyName, props.companyId, props.siteName).then((data) => {
        setLabels(data);
      });
      // getWasteLabelFunc(props.companyName, props.companyId, props.siteName);
    };

}, [ props.companyName, props.companyId, props.siteName])

  // const getWasteLabelFunc = (companyName, companyId, siteName) => {
  //   getWasteLabel(companyName, companyId, siteName).then((data) => {
  //     setLabels(data);
  //   });
  // };


  return (
    <WasteLabelsContext.Provider
      value={{
        labels,
        // getWasteLabelFunc
      }}
    >
      {props.children}
    </WasteLabelsContext.Provider>
  )
}

export default WasteLabelsContextProvider
