import React, { createContext, useEffect, useState } from 'react'

import { getMonthsWord } from "./../utilities.js"


export const AiPredictionDataContext = createContext()

const AiPredictionDataContextProvider = props => {

  const [ month, setMonthWaste ] = React.useState("")

  const [ aiPredictionsYearlyCoverWaste, setAiPredictionsYearlyCoverWaste ] = React.useState([])
  const [ aiPredictionsYearlyPrepWaste, setAiPredictionsYearlyPrepWaste ] = React.useState([])
  const [ aiPredictionsYearlySpoilageWaste, setAiPredictionsYearlySpoilageWaste ] = React.useState([])

  const [ aiPredictionsMonthlyCoverWaste, setAiPredictionsMonthlyCoverWaste ] = React.useState([])
  const [ aiPredictionsMonthlyPrepWaste, setAiPredictionsMonthlyPrepWaste ] = React.useState([])
  const [ aiPredictionsMonthlySpoilageWaste, setAiPredictionsMonthlySpoilageWaste ] = React.useState([])

  const [ aiPredictionsWeeklyCoverWaste, setAiPredictionsWeeklyCoverWaste ] = React.useState([])
  const [ aiPredictionsWeeklyPrepWaste, setAiPredictionsWeeklyPrepWaste ] = React.useState([])
  const [ aiPredictionsWeeklySpoilageWaste, setAiPredictionsWeeklySpoilageWaste ] = React.useState([])

  const [ aiPredictionsDailyCoverWaste, setAiPredictionsDailyCoverWaste ] = React.useState([])
  const [ aiPredictionsDailyPrepWaste, setAiPredictionsDailyPrepWaste ] = React.useState([])
  const [ aiPredictionsDailySpoilageWaste, setAiPredictionsDailySpoilageWaste ] = React.useState([])

  const [ aiPredictionsDisplayValueForCoverWaste, setAiPredictionsDisplayValueForCoverWaste ] = React.useState([])
  const [ aiPredictionsDisplayValueForPrepWaste, setAiPredictionsDisplayValueForPrepWaste ] = React.useState([])
  const [ aiPredictionsDisplayValueForSpoilageWaste, setAiPredictionsDisplayValueForSpoilageWaste ] = React.useState([])

  const [aiPredictionsActiveState, aiPredictionsChangeActiveState] = useState({
    monthlyForcasts: true,
    weeklyForcasts: false,
    dailyForcasts: false,
    yearlyForcasts: false,
  });

  const [aiPredictionsAppState, aiPredictionsChangeState] = useState({
    activeObject: {
      id: 0,
      val: "monthlyFrocasts",
      name: "Monthly",
    },
    objects: [
      { id: 0, val: "monthlyFrocasts", name: "Monthly" },
      { id: 1, val: "weeklyFrocasts", name: "Weekly" },
      { id: 2, val: "dailyFrocasts", name: "Daily" },
      { id: 3, val: "yearlyFrocasts", name: "Yearly" },
    ],
  });


  useEffect(() => {
    // console.log("aiPredictionsData", props.aiPredictionsData)
    filterAiPredictionsData(props.aiPredictionsData)
  },[props.aiPredictionsData])

  function aiPredictionsToggleActive(type) {

    switch (type) {
      case "monthlyForcasts":

        aiPredictionsChangeActiveState({
          monthlyForcasts: true,
          weeklyForcasts: false,
          dailyForcasts: false,
          yearlyForcasts: false,
        });
        aiPredictionsChangeState({ ...aiPredictionsAppState, activeObject: aiPredictionsAppState.objects[0] });

        setAiPredictionsDisplayValueForCoverWaste(aiPredictionsMonthlyCoverWaste)
        setAiPredictionsDisplayValueForPrepWaste(aiPredictionsMonthlyPrepWaste)
        setAiPredictionsDisplayValueForSpoilageWaste(aiPredictionsMonthlySpoilageWaste)

        break;
      case "weeklyForcasts":

        aiPredictionsChangeActiveState({
          monthlyForcasts: false,
          weeklyForcasts: true,
          dailyForcasts: false,
          yearlyForcasts: false,
        });
        aiPredictionsChangeState({ ...aiPredictionsAppState, activeObject: aiPredictionsAppState.objects[1] });

        setAiPredictionsDisplayValueForCoverWaste(aiPredictionsWeeklyCoverWaste)
        setAiPredictionsDisplayValueForPrepWaste(aiPredictionsWeeklyPrepWaste)
        setAiPredictionsDisplayValueForSpoilageWaste(aiPredictionsWeeklySpoilageWaste)

        break;
      case "dailyForcasts":

        aiPredictionsChangeActiveState({
          monthlyForcasts: false,
          weeklyForcasts: false,
          dailyForcasts: true,
          yearlyForcasts: false,
        });
        aiPredictionsChangeState({ ...aiPredictionsAppState, activeObject: aiPredictionsAppState.objects[2] });

        setAiPredictionsDisplayValueForCoverWaste(aiPredictionsDailyCoverWaste)
        setAiPredictionsDisplayValueForPrepWaste(aiPredictionsDailyPrepWaste)
        setAiPredictionsDisplayValueForSpoilageWaste(aiPredictionsDailySpoilageWaste)

        break;
      case "yearlyForcasts":

        aiPredictionsChangeActiveState({
          monthlyForcasts: false,
          weeklyForcasts: false,
          dailyForcasts: false,
          yearlyForcasts: true,
        });
        aiPredictionsChangeState({ ...aiPredictionsAppState, activeObject: aiPredictionsAppState.objects[3] });

        setAiPredictionsDisplayValueForCoverWaste(aiPredictionsYearlyCoverWaste)
        setAiPredictionsDisplayValueForPrepWaste(aiPredictionsYearlyPrepWaste)
        setAiPredictionsDisplayValueForSpoilageWaste(aiPredictionsYearlySpoilageWaste)

        break;
      default:
    }
  }

  const filterAiPredictionsData = (data) => {

    aiPredictionsChangeActiveState({
      monthlyForcasts: true,
      weeklyForcasts: false,
      dailyForcasts: false,
      yearlyForcasts: false,
    });

    data.map((item) => {
      setAiPredictionsYearlyCoverWaste(item.aiPrediction.yearlyForcastsBasedOnCurrentMonth.coverWaste)
      setAiPredictionsYearlyPrepWaste(item.aiPrediction.yearlyForcastsBasedOnCurrentMonth.preparationWaste)
      setAiPredictionsYearlySpoilageWaste(item.aiPrediction.yearlyForcastsBasedOnCurrentMonth.spoilageWaste)

      setAiPredictionsMonthlyCoverWaste(item.aiPrediction.monthlyForcastsBasedOnCurrentMonth.coverWaste)
      setAiPredictionsMonthlyPrepWaste(item.aiPrediction.monthlyForcastsBasedOnCurrentMonth.preparationWaste)
      setAiPredictionsMonthlySpoilageWaste(item.aiPrediction.monthlyForcastsBasedOnCurrentMonth.spoilageWaste)

      setAiPredictionsWeeklyCoverWaste(item.aiPrediction.weeklylyForcastsBasedOnCurrentMonth.coverWaste)
      setAiPredictionsWeeklyPrepWaste(item.aiPrediction.weeklylyForcastsBasedOnCurrentMonth.preparationWaste)
      setAiPredictionsWeeklySpoilageWaste(item.aiPrediction.weeklylyForcastsBasedOnCurrentMonth.spoilageWaste)

      setAiPredictionsDailyCoverWaste(item.aiPrediction.dailyForcastsBasedOnCurrentMonth.coverWaste)
      setAiPredictionsDailyPrepWaste(item.aiPrediction.dailyForcastsBasedOnCurrentMonth.preparationWaste)
      setAiPredictionsDailySpoilageWaste(item.aiPrediction.dailyForcastsBasedOnCurrentMonth.spoilageWaste)

      setAiPredictionsDisplayValueForCoverWaste(item.aiPrediction.monthlyForcastsBasedOnCurrentMonth.coverWaste)
      setAiPredictionsDisplayValueForPrepWaste(item.aiPrediction.monthlyForcastsBasedOnCurrentMonth.preparationWaste)
      setAiPredictionsDisplayValueForSpoilageWaste(item.aiPrediction.monthlyForcastsBasedOnCurrentMonth.spoilageWaste)
      return ""
    })

    const month = getMonthsWord()
    const monthInUpperCase = month.toUpperCase()
    setMonthWaste(monthInUpperCase);
  }

  return (
    <AiPredictionDataContext.Provider
      value={{
        aiPredictionsDisplayValueForCoverWaste,
        aiPredictionsDisplayValueForPrepWaste,
        aiPredictionsDisplayValueForSpoilageWaste,
        aiPredictionsActiveState,
        aiPredictionsToggleActive,
        month,
      }}
    >
      {props.children}
    </AiPredictionDataContext.Provider>
  )
}

export default AiPredictionDataContextProvider