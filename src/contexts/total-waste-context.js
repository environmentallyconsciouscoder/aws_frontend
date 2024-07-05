import React, { createContext, useEffect, useState } from 'react'

export const OverviewWasteContext = createContext()

const OverviewWasteContextProvider = props => {

  const [coverWaste, setCoverWaste] = useState(0);
  const [prepWaste, setPrepWaste] = useState(0);
  const [spoilageWaste, setSpoilageWaste] = useState(0);
  const [siteName, setSiteName] = useState("");
  useEffect(() => {

    if (props.totalWasteFromSelectedSite[0] !== undefined) {

      let site = props.totalWasteFromSelectedSite[0].siteName.replace(/[^A-Za-z]+/g, '').toUpperCase();
      setSiteName(site)

      setCoverWaste(props.totalWasteFromSelectedSite[0].coverWaste)
      setPrepWaste(props.totalWasteFromSelectedSite[0].prepWaste)
      setSpoilageWaste(props.totalWasteFromSelectedSite[0].spoilageWaste)
    }

}, [props.totalWasteFromSelectedSite])

  return (
    <OverviewWasteContext.Provider
      value={{
        coverWaste,
        prepWaste,
        spoilageWaste,
        siteName
      }}
    >
      {props.children}
    </OverviewWasteContext.Provider>
  )
}

export default OverviewWasteContextProvider