import React, { createContext, useEffect, useState } from 'react'

export const WeeklyWasteContext = createContext()

const WeeklyWasteContextProvider = props => {

  const [coverWaste, setCoverWaste] = useState(0)
  const [productionWaste, setPreparationWaste] = useState(0)
  const [spoliageWaste, setSpoilageWaste] = useState(0)
  const [siteName, setSiteName] = useState("")


  useEffect(() => {

    if (props.siteName) {
      setSiteName(props.siteName)
    }

    if (props.weeklyWaste) {

      setCoverWaste(props.weeklyWaste[0][0].coverWaste[0])
      setPreparationWaste(props.weeklyWaste[0][0].preparationWaste[0])
      setSpoilageWaste(props.weeklyWaste[0][0].spoilageWaste[0])
    }

  },[props.weeklyWaste, props.siteName])

  return (
    <WeeklyWasteContext.Provider
       value={{
        coverWaste,
        productionWaste,
        spoliageWaste,
        siteName
      }}
    >
      {props.children}
    </WeeklyWasteContext.Provider>
  )
}

export default WeeklyWasteContextProvider
