import React, { createContext, useEffect, useState } from 'react'
import { roundedUpNumberAndTurnBackToNumber } from "./../utilities.js"

export const DailyWasteContext = createContext()

const DailyWasteContextProvider = props => {

  const [dailyWasteData, setDailyWasteData] = useState([]);
  const [coverWaste, setDailyCoverWaste] = useState([]);
  const [prepWaste, setDailyPrepWaste] = useState([]);
  const [spoilageWaste, setDailySpoilageWaste] = useState([]);

  useEffect(() => {

    if (props.dailyWaste) {
      // console.log("props.dailyWaste",props.dailyWaste);

      setDailyCoverWaste(props.dailyWaste.coverWaste)
      setDailyPrepWaste(props.dailyWaste.prepWaste)
      setDailySpoilageWaste(props.dailyWaste.spoilageWaste)
      setDailyWasteData(props.dailyWaste.totalWaste)
    }

}, [ props.siteName, props.dailyWaste])

  const getIndexesForBackgroundColours =(targets) => {

    let cwTarget = targets.dailyCoverWastes;
    let prepTarget= targets.dailyPeparationWastes;
    let spoilageTarget = targets.dailySpoliageWastes;

    let coverWasteOverTargetIndexArray = []
    let spoilageWasteOverTargetIndexArray = []
    let prepWasteOverTargetIndexArray = []

    // console.log("coverWaste coverWaste", coverWaste)
    if (coverWaste !== undefined) {

      coverWaste.map((data, i) => {

        const formatedNumber = roundedUpNumberAndTurnBackToNumber(data)

        if (formatedNumber >= cwTarget) {
          coverWasteOverTargetIndexArray.push(i)
        }
        return ""
      })

      prepWaste.map((data, i) => {

        const formatedNumber = roundedUpNumberAndTurnBackToNumber(data)

        if (formatedNumber >= prepTarget) {
          prepWasteOverTargetIndexArray.push(i)
        }
        return ""
      })

      spoilageWaste.map((data, i) => {

        const formatedNumber = roundedUpNumberAndTurnBackToNumber(data)

        if (formatedNumber >= spoilageTarget) {
          spoilageWasteOverTargetIndexArray.push(i)
        }
        return ""
      })

    }


    return {
      coverWasteOverTargetIndexArray: coverWasteOverTargetIndexArray,
      spoilageWasteOverTargetIndexArray: spoilageWasteOverTargetIndexArray,
      prepWasteOverTargetIndexArray: prepWasteOverTargetIndexArray
    }

  }



  return (
    <DailyWasteContext.Provider
      value={{
        coverWaste,
        prepWaste,
        spoilageWaste,
        getIndexesForBackgroundColours,
        dailyWasteData,
      }}
    >
      {props.children}
    </DailyWasteContext.Provider>
  )
}

export default DailyWasteContextProvider
