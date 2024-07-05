import React, { createContext, useEffect, useState } from 'react'

export const WeeklyWasteTrendContext = createContext()

const WeeklyWasteTrendProvider = props => {

  // const [selectedSiteWeeklyValues, setSelectedSiteWeeklyValues] = useState([])
  // const [previousSelectedSiteWeeklyValues, setPreviousSelectedSiteWeeklyValues] = useState([])
  const selectedSiteWeeklyValues = []
  const previousSelectedSiteWeeklyValues = []

  const [coverWaste, setCoverWaste] = useState(0)
  const [preparationWaste, setPreparationWaste] = useState(0)
  const [spoilageWaste, setSpoilageWaste] = useState(0)
  const [totalWaste, setTotalWaste] = useState(0)

  const [lastWeekCoverWaste, setlastWeekCoverWaste] = useState(0)
  const [lastWeekPreparationWaste, setLastWeekPreparationWaste] = useState(0)
  const [lastWeekSpoilageWaste, setLastWeekSpoilageWaste] = useState(0)
  const [lastWeekTotalWaste, setLastWeekTotalWaste] = useState(0)

  const [currentWeekCoverWaste, setCurrentWeekCoverWaste] = useState(0)
  const [currentWeekPreparationWaste, setCurrentWeekPreparationWaste] = useState(0)
  const [currentWeekSpoilageWaste, setCurrentWeekSpoilageWaste] = useState(0)
  const [currentWeekTotalWaste, setCurrentWeekTotalWaste] = useState(0)

  const [displayCurrentWasteValue, setDisplayCurrentWasteValue] = useState(0)
  const [displayPreviousWasteValue, setDisplayPreviousWasteValue] = useState(0)

  const [color, setColor] = useState(0)

  const [showTooltip, setTooltip] = React.useState(true);

  const weeklyWasteValuesForCurrentWeekAndLastWeek = [
  {
    value: displayCurrentWasteValue,
    colors: [color, "rgb(15, 128, 140)"]
  },
  {
    value: displayPreviousWasteValue,
    colors: [color, "rgb(140, 112, 140)"]
  }
];

  useEffect(() => {

    if (props.weeklyTrend) {

      setCoverWaste(props.weeklyTrend[0].coverWaste)
      setPreparationWaste(props.weeklyTrend[0].prepWaste)
      setSpoilageWaste(props.weeklyTrend[0].spoilageWaste)
      setTotalWaste(props.weeklyTrend[0].totalWaste)

      reformatForWeeklyWasteBar(props.weeklyWasteValuesForCurrentWeekAndLastWeek)

    }

}, [ props.siteName, props.weeklyWasteTrend, props.weeklyTrend, props.weeklyWasteValuesForCurrentWeekAndLastWeek])



  const reformatForWeeklyWasteBar = (weeklyWaste) => {
    if (weeklyWaste) {

      setlastWeekCoverWaste(weeklyWaste.lastWeek[0].data.coverWaste[0]);
      setLastWeekPreparationWaste(weeklyWaste.lastWeek[0].data.preparationWaste[0])
      setLastWeekSpoilageWaste(weeklyWaste.lastWeek[0].data.spoilageWaste[0])
      setLastWeekTotalWaste(weeklyWaste.lastWeek[0].data.coverWaste[0] + weeklyWaste.lastWeek[0].data.preparationWaste[0] + weeklyWaste.lastWeek[0].data.spoilageWaste[0])

      let totalCurrentWeekWaste = weeklyWaste.lastWeek[0].data.coverWaste[0] + weeklyWaste.lastWeek[0].data.preparationWaste[0] + weeklyWaste.lastWeek[0].data.spoilageWaste[0];
      let totalPreviousWeekWaste = weeklyWaste.currentWeek[0][0].coverWaste[0] + weeklyWaste.currentWeek[0][0].preparationWaste[0] + weeklyWaste.currentWeek[0][0].spoilageWaste[0];

      setDisplayPreviousWasteValue(totalCurrentWeekWaste)
      setDisplayCurrentWasteValue(totalPreviousWeekWaste)

      setCurrentWeekCoverWaste(weeklyWaste.currentWeek[0][0].coverWaste[0])
      setCurrentWeekPreparationWaste(weeklyWaste.currentWeek[0][0].preparationWaste[0])
      setCurrentWeekSpoilageWaste(weeklyWaste.currentWeek[0][0].spoilageWaste[0])
      setCurrentWeekTotalWaste(weeklyWaste.currentWeek[0][0].coverWaste[0] + weeklyWaste.currentWeek[0][0].preparationWaste[0] + weeklyWaste.currentWeek[0][0].spoilageWaste[0])

      const differenceBetweenCurrentAndPreviousFoodWaste = totalCurrentWeekWaste - totalPreviousWeekWaste;
      let colour = differenceBetweenCurrentAndPreviousFoodWaste > 0 ? "rgb(188, 242, 107)" : "rgba(255, 0, 0, 0.9)";
      setColor(colour)

    }
  }

  const setDateRange = () => {
    if (selectedSiteWeeklyValues.length > 0 && previousSelectedSiteWeeklyValues.length > 0) {
        let weeklyWasteTrendDateRange = {
          lastWeek: previousSelectedSiteWeeklyValues[0].data.Date,
          thisWeek: selectedSiteWeeklyValues[0].data.Date
        }
        return weeklyWasteTrendDateRange;
    }
  }

  const handleWeeklyTrendValues= (e) => {
    const selector = e.target.id;

    if (selector === "C") {
      setDisplayPreviousWasteValue(lastWeekCoverWaste)
      setDisplayCurrentWasteValue(currentWeekCoverWaste)

    } else if (selector === "S") {
      setDisplayPreviousWasteValue(lastWeekSpoilageWaste)
      setDisplayCurrentWasteValue(currentWeekSpoilageWaste)

    } else if (selector === "P") {
      setDisplayPreviousWasteValue(lastWeekPreparationWaste)
      setDisplayCurrentWasteValue(currentWeekPreparationWaste)

    } else if (selector === "A") {
      setDisplayPreviousWasteValue(lastWeekTotalWaste)
      setDisplayCurrentWasteValue(currentWeekTotalWaste)

    }

    setTooltip(false)
  }

  // console.log("coverWaste",coverWaste)
  // console.log("preparationWaste",preparationWaste)
  // console.log("spoilageWaste",spoilageWaste)
  // console.log("totalWaste",totalWaste)

  return (
    <WeeklyWasteTrendContext.Provider
       value={{
        // selectedSiteWeeklyValues,
        // previousSelectedSiteWeeklyValues,
        // selectCurrentYearlyWeeklyWasteValues,
        coverWaste,
        preparationWaste,
        spoilageWaste,
        totalWaste,
        ///
        setDateRange,
        weeklyWasteValuesForCurrentWeekAndLastWeek,
        handleWeeklyTrendValues,

        showTooltip
      }}
    >
      {props.children}
    </WeeklyWasteTrendContext.Provider>
  )
}

export default WeeklyWasteTrendProvider
