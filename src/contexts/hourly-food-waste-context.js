import React, { createContext, useEffect, useState } from 'react'

import { roundedUpNumberAndTurnBackToString, roundedUpNumberAndTurnBackToNumber } from "./../utilities.js"

export const HourlyFoodWasteContext = createContext()

const HourlyFoodWasteContextProvider = props => {

  const [hourlyWasteDate, setHourlyWasteDate] = useState(false);
  const [index, setIndex] = useState(0);

  const [hourlyWasteSelector, setHourlyWasteSelector] = React.useState("production");
  const [hourlyWasteValues, setHourlyWasteValues] = React.useState([]);

  const [clickOnHourlyBarChart, setClickOnHourlyChart] = React.useState(false);

  const [hourlyCoverWasteData, setHourlyCoverWaste] = React.useState([]);
  const [hourlyPreparationWasteData, setHourlyPrepWaste] = React.useState([]);
  const [hourlySpoilageWasteData, setHourlySpoilageWaste] = React.useState([]);

  const [allHourlyWasteData, setAllHourlyWasteData] = React.useState([]);

  const [showTooltip, setTooltip] = React.useState(true);

  useEffect(() => {

    if(props.hourlyWaste) {
      // console.log("props.hourlyWaste",props.hourlyWaste)
      setAllHourlyWasteData(props.hourlyWaste)
      handleHourlyWaste(props.hourlyWaste)
      // console.log("hourlyWasteValues",hourlyWasteValues)
    }

  }, [ props.siteName, props.hourlyWaste])

  const handleHourlyWaste = (item) => {
    if (item) {
      const index = item.index;
      setIndex(index);

      let date = item.date;
      setHourlyWasteDate(date);

      // console.log("item",item)
      // console.log("item.index",item.index)
      // console.log("index",index)
      // console.log("date",date)


      const hourlyWaste = item.hourlyWaste ? item.hourlyWaste: []
      // console.log("hourlyWaste",hourlyWaste)
      if (hourlyWaste.length > 0) {
        const selectedHourlyWaste = hourlyWaste[index];
        // console.log("selectedHourlyWaste",selectedHourlyWaste)
        if (selectedHourlyWaste) {
          setHourlyCoverWaste(selectedHourlyWaste.data.coverWaste)
          setHourlyPrepWaste(selectedHourlyWaste.data.preparationWaste)
          setHourlySpoilageWaste(selectedHourlyWaste.data.spoilageWaste)

          let hourlyWasteDataFormated = []
          selectedHourlyWaste.data.preparationWaste.map((data) => {
            const formatedData = roundedUpNumberAndTurnBackToNumber(data)
            hourlyWasteDataFormated.push(formatedData);
            return ""
          })
          setHourlyWasteValues(hourlyWasteDataFormated)

          setClickOnHourlyChart(true);

          setHourlyWasteSelector("production");
        }

      }

    }
  }

  const showCoverWasteLabelRed = (cap, values, showPounds, capInPounds) => {
    // console.log("cap",cap)
    // console.log("values",values)
    // console.log("showPounds",showPounds)
    // console.log("converterValue",converterValue)
    // console.log("capInPounds",capInPounds)

    const converterValue = 2.775

    if (showPounds) {
      const convertedValues = []

      values.map((data) => {
        convertedValues.push(data * converterValue)
        return ""
      })

      let showRed;

      let check = convertedValues.map((item) => {
        let value = roundedUpNumberAndTurnBackToString(item)

        if (value >= capInPounds) {
          return true;
        } else {
          return false;
        }
      })

      if (check.includes(true)) {
        showRed = true;
      } else {
        showRed = false;
      }

      return showRed;

    } else {

      let showRed;

      let check = values.map((item) => {
        let value = roundedUpNumberAndTurnBackToString(item)
        if (value >= cap) {
          return true;
        } else {
          return false;
        }
      })

      if (check.includes(true)) {
        showRed = true;
      } else {
        showRed = false;
      }

    return showRed;

    }
  }

  const handleHourlyWasteCategory = (e) => {
    const value = e.target.id;
    if (value === "C") {
      // setHourlyWasteValues(hourlyCoverWasteData);
      reformatData(hourlyCoverWasteData)
      setHourlyWasteSelector("cover");
    } else if (value === "S") {
      // setHourlyWasteValues(hourlySpoilageWasteData);
      reformatData(hourlySpoilageWasteData)
      setHourlyWasteSelector("spoliage");
    } else if (value === "P") {
      // setHourlyWasteValues(hourlyPreparationWasteData);
      reformatData(hourlyPreparationWasteData)
      setHourlyWasteSelector("production");
    }

    console.log("handleHourlyWasteCategory HERE")
    setTooltip(false);
  };

  const reformatData = (selectedData) => {
    let hourlyWasteDataFormated = []
    selectedData.map((data) => {
      const formatedData = roundedUpNumberAndTurnBackToNumber(data)
      hourlyWasteDataFormated.push(formatedData);
      return ""
    })
    setHourlyWasteValues(hourlyWasteDataFormated)
  }

  const getIndexesForBackgroundColours =(showPounds, targetsInPounds, allCappings) => {

    let cwTarget = allCappings.hourlyCoverWastesCap
    let prepTarget =  allCappings.hourlyPeparationWastesCap
    let spoilageTarget =  allCappings.hourlySpoliageWastesCap

    let coverWasteOverTargetIndexArray = []
    let spoilageWasteOverTargetIndexArray = []
    let prepWasteOverTargetIndexArray = []

    if (hourlyCoverWasteData) {
      hourlyCoverWasteData.map((data, i) => {

          const formatedNumber = roundedUpNumberAndTurnBackToNumber(data)

          if (formatedNumber >= cwTarget) {
            coverWasteOverTargetIndexArray.push(i)
          }
          return ""

      })


      hourlyPreparationWasteData.map((data, i) => {

          const formatedNumber = roundedUpNumberAndTurnBackToNumber(data)

          if (formatedNumber >= prepTarget) {
            prepWasteOverTargetIndexArray.push(i)
          }
          return ""

      })

      hourlySpoilageWasteData.map((data, i) => {

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
    <HourlyFoodWasteContext.Provider
      value={{
        index,
        hourlyWasteValues,
        hourlyWasteDate,
        clickOnHourlyBarChart,
        hourlyWasteSelector,

        hourlyCoverWasteData,
        hourlyPreparationWasteData,
        hourlySpoilageWasteData,

        showCoverWasteLabelRed,
        handleHourlyWasteCategory,

        allHourlyWasteData,
        handleHourlyWaste,

        getIndexesForBackgroundColours,

        showTooltip
      }}
    >
      {props.children}
    </HourlyFoodWasteContext.Provider>
  )
}

export default HourlyFoodWasteContextProvider