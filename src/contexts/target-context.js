import React, { createContext, useEffect, useState } from 'react'
import {
  getMonths,
  roundedUpNumberAndTurnBackToNumber
} from "../utilities.js"

export const TargetContext = createContext()


const TargetContextProvider = props => {

    const [ targetsAndImpact, setTargetsAndImpact ] = React.useState({
        targets: 0,
        monthlyCoverWasteTarget: 0,
        monthlyPrepWasteTarget: 0,
        monthlySpoilageWasteTarget: 0,
        mealsSavings: 0,
        co2Reduction: 0,
        moneySavings: 0,
        totalMonthlyForecasts: 0,
        totalShortFall: 0,
        coverWasteShortFall: 0,
        prepWasteShortFall: 0,
        spoilageWasteShortFall: 0,
        targetIsRealistic: 0,
        percentaged: 0
    })

    const [ prevMonthWaste, setPrevMonthWaste ] = React.useState(0)

    const [ showPercentagedWarning , setShowPercentagedWarning] = React.useState(false)

    const labels = ["Yearly", "Weekly", "Daily", "Monthly"]
    const [ label, setLabel] = React.useState(null)

    const [ percent, setPercent] = React.useState(0)

    const [activeState, changeActiveState] = useState({
        monthlyTargets: true,
        weeklyTargets: false,
        dailyTargets: false,
        yearlyTargets: false,
    });

    const [ dailyCoverWaste, setDailyCoverWaste] = React.useState([0])
    const [ dailyPrepWaste, setDailyPrepWaste] = React.useState([0])
    const [ dailySpoilageWaste, setDailySpoilageWaste] = React.useState([0])

    const [ monthlyCoverWaste, setMonthlyCoverWaste] = React.useState([0])
    const [ monthlyPrepWaste, setMonthlyPrepWaste] = React.useState([0])
    const [ monthlySpoilageWaste, setMonthlySpoilageWaste] = React.useState([0])

    const [ weeklyCoverWaste, setWeeklyCoverWaste] = React.useState([0])
    const [ weeklyPrepWaste, setWeeklyPrepWaste] = React.useState([0])
    const [ weeklySpoilageWaste, setWeeklySpoilageWaste] = React.useState([0])

    const [ yearlyCoverWaste, setYearlyCoverWaste] = React.useState([0])
    const [ yearlyPrepWaste, setYearlyPrepWaste] = React.useState([0])
    const [ yearlySpoilageWaste, setYearlySpoilageWaste] = React.useState([0])


    useEffect(() => {

          changeActiveState({
            monthlyTargets: true,
            weeklyTargets: false,
            dailyTargets: false,
            yearlyTargets: false,
          });

          // console.log("props.recommendedTargets",props.recommendedTargets)

          if (props.recommendedTargets.length > 0 && props.aiPredictionsData.length > 0) {
            let percentaged;
            let cw;
            let pw;
            let sw;

            props.recommendedTargets.map((data) => {
                const percentagedAsString = data.recommendedTargets.targets.percents
                percentaged = parseInt(percentagedAsString) / 100
                return ""
            });

            setPercent(percentaged)

            // console.log("percentaged",percentaged)
            // console.log("aiPredictionsData", props.aiPredictionsData)

            props.aiPredictionsData.map((data) => {

                cw = data.aiPrediction.monthlyForcastsBasedOnCurrentMonth.coverWaste
                pw = data.aiPrediction.monthlyForcastsBasedOnCurrentMonth.preparationWaste
                sw = data.aiPrediction.monthlyForcastsBasedOnCurrentMonth.spoilageWaste

                setDailyCoverWaste(data.aiPrediction.dailyForcastsBasedOnCurrentMonth.coverWaste)
                setDailyPrepWaste(data.aiPrediction.dailyForcastsBasedOnCurrentMonth.preparationWaste)
                setDailySpoilageWaste(data.aiPrediction.dailyForcastsBasedOnCurrentMonth.spoilageWaste)

                setMonthlyCoverWaste(data.aiPrediction.monthlyForcastsBasedOnCurrentMonth.coverWaste)
                setMonthlyPrepWaste(data.aiPrediction.monthlyForcastsBasedOnCurrentMonth.preparationWaste)
                setMonthlySpoilageWaste(data.aiPrediction.monthlyForcastsBasedOnCurrentMonth.spoilageWaste)

                setWeeklyCoverWaste(data.aiPrediction.weeklylyForcastsBasedOnCurrentMonth.coverWaste)
                setWeeklyPrepWaste(data.aiPrediction.weeklylyForcastsBasedOnCurrentMonth.preparationWaste)
                setWeeklySpoilageWaste(data.aiPrediction.weeklylyForcastsBasedOnCurrentMonth.spoilageWaste)

                setYearlyCoverWaste(data.aiPrediction.yearlyForcastsBasedOnCurrentMonth.coverWaste)
                setYearlyPrepWaste(data.aiPrediction.yearlyForcastsBasedOnCurrentMonth.preparationWaste)
                setYearlySpoilageWaste(data.aiPrediction.yearlyForcastsBasedOnCurrentMonth.spoilageWaste)
                return ""
            });

            const getTargetsAndImpact = calculateTargetsAndImpact(cw, pw, sw, percentaged);
            setTargetsAndImpact(getTargetsAndImpact)

            const monthNumber = getMonths();
            const prevMonthIndex = monthNumber - 1;

            const previousMonthCoverWaste =  props.currentMonthCoverWasteArray[prevMonthIndex]
            const previousMonthPrepWaste =  props.currentMonthPrepWasteArray[prevMonthIndex]
            const previousMonthSpoilageWaste =  props.currentMonthSpoilageWasteArray[prevMonthIndex]
            const totalPreviousMonthsWaste = previousMonthCoverWaste + previousMonthPrepWaste + previousMonthSpoilageWaste
            setPrevMonthWaste(totalPreviousMonthsWaste)

            if (percentaged > 0.3) {
                setShowPercentagedWarning(true)
            } else {
                setShowPercentagedWarning(false)
            }

            setLabel(labels[3])
        }
                // eslint-disable-next-line react-hooks/exhaustive-deps
    },[
        props.aiPredictionsData,
        props.recommendedTargets,
        props.currentMonthCoverWasteArray,
        props.currentMonthPrepWasteArray,
        props.currentMonthSpoilageWasteArray
    ])

    const calculateTargetsAndImpact = (cover, prep, spoilage, percent) => {

        // console.log("ai cover array",cover)
        // console.log("ai prep array",prep)
        // console.log("ai spoilage array",spoilage)
        // console.log("percent from recommendedTargets",percent)

        const monthIndex = cover.length - 1;

        let percentaged = isNaN(percent) ? 0 : percent;

        const coverWaste = cover[monthIndex] ? cover[monthIndex] : 0;
        const prepWaste = prep[monthIndex] ? prep[monthIndex] : 0;
        const spoilageWaste = spoilage[monthIndex] ? spoilage[monthIndex] : 0;

        // console.log("current month ai prediction cover",cover[monthIndex])
        // console.log("current month ai prediction prep",prep[monthIndex])
        // console.log("current month ai prediction spoilage",spoilage[monthIndex])

        const totalMonthlyForecasts = coverWaste + prepWaste + spoilageWaste
        // console.log("current month ai prediction spoilage for ALL",totalMonthlyForecasts)

        const savings = parseInt(totalMonthlyForecasts * percentaged)
        // console.log("percentaged savings from ai prediction for all",savings)

        const targets = totalMonthlyForecasts - savings;
        // console.log("targets for this month to achieve the percentaged savings", targets)

        // console.log("totalMonthlyForecasts",totalMonthlyForecasts)
        // console.log("savings",savings)
        // console.log("targets",targets)

        const coverWastePercentagedSavings = coverWaste * percentaged;
        const prepWastePercentagedSavings = prepWaste * percentaged;
        const spoilageWastePercentagedSavings = spoilageWaste * percentaged;

        const monthlyCoverWasteTarget = coverWaste- coverWastePercentagedSavings
        const monthlyPrepWasteTarget = prepWaste - prepWastePercentagedSavings
        const monthlySpoilageWasteTarget = spoilageWaste - spoilageWastePercentagedSavings

        const totalTarget = roundedUpNumberAndTurnBackToNumber(monthlyCoverWasteTarget + monthlyPrepWasteTarget + monthlySpoilageWasteTarget)

        // console.log("totalTarget",totalTarget)

        const coverWasteShortFall = roundedUpNumberAndTurnBackToNumber(monthlyCoverWasteTarget - coverWaste)
        const prepWasteShortFall = roundedUpNumberAndTurnBackToNumber(monthlyPrepWasteTarget - prepWaste)
        const spoilageWasteShortFall = roundedUpNumberAndTurnBackToNumber(monthlySpoilageWasteTarget - spoilageWaste)
        const totalShortFall = roundedUpNumberAndTurnBackToNumber(coverWasteShortFall + prepWasteShortFall + spoilageWasteShortFall)

        const carbonMunicipalValue = parseFloat(props.carbonMunicipalValue);

        const mealsSavings = roundedUpNumberAndTurnBackToNumber(savings / 0.36)
        const co2Reduction = roundedUpNumberAndTurnBackToNumber(savings * carbonMunicipalValue)
        const moneySavings = roundedUpNumberAndTurnBackToNumber(savings * 2.775)

        const differencesBetweenTargetAndForcastedWaste = totalTarget - totalMonthlyForecasts

        let targetIsRealistic;

        if (differencesBetweenTargetAndForcastedWaste < 0) {
          targetIsRealistic = false
        } else {
          targetIsRealistic = true
        }

        const data = {
          targets: targets,
          monthlyCoverWasteTarget: monthlyCoverWasteTarget,
          monthlyPrepWasteTarget: monthlyPrepWasteTarget,
          monthlySpoilageWasteTarget: monthlySpoilageWasteTarget,
          mealsSavings: mealsSavings,
          co2Reduction: co2Reduction,
          moneySavings: moneySavings,
          percentaged: percentaged,
          totalMonthlyForecasts: totalMonthlyForecasts,
          totalShortFall: totalShortFall,
          coverWasteShortFall: coverWasteShortFall,
          prepWasteShortFall: prepWasteShortFall,
          spoilageWasteShortFall: spoilageWasteShortFall,
          targetIsRealistic: targetIsRealistic
        }

        return data
    }

    function toggleActive(type) {
        switch (type) {
          case "monthlyTargets":
            changeActiveState({
              monthlyTargets: true,
              weeklyTargets: false,
              dailyTargets: false,
              yearlyTargets: false,
            });

            let getMonthlyTargetsAndImpact = calculateTargetsAndImpact(monthlyCoverWaste,monthlyPrepWaste, monthlySpoilageWaste, percent)
            setTargetsAndImpact(getMonthlyTargetsAndImpact)

            setLabel(labels[3])

            break;
          case "weeklyTargets":
            changeActiveState({
              monthlyTargets: false,
              weeklyTargets: true,
              dailyTargets: false,
              yearlyTargets: false,
            });

            let getWeeklyTargetsAndImpact = calculateTargetsAndImpact(weeklyCoverWaste,weeklyPrepWaste, weeklySpoilageWaste, percent)
            setTargetsAndImpact(getWeeklyTargetsAndImpact)

            setLabel(labels[1])

            break;
          case "dailyTargets":
            changeActiveState({
              monthlyTargets: false,
              weeklyTargets: false,
              dailyTargets: true,
              yearlyTargets: false,
            });

            let getDailyTargetsAndImpact = calculateTargetsAndImpact(dailyCoverWaste,dailyPrepWaste, dailySpoilageWaste, percent)
            setTargetsAndImpact(getDailyTargetsAndImpact)

            setLabel(labels[2])

            break;
          case "yearlyTargets":
            changeActiveState({
              monthlyTargets: false,
              weeklyTargets: false,
              dailyTargets: false,
              yearlyTargets: true,
            });

            let getYearlyTargetsAndImpact = calculateTargetsAndImpact(yearlyCoverWaste,yearlyPrepWaste, yearlySpoilageWaste, percent)
            setTargetsAndImpact(getYearlyTargetsAndImpact)

            setLabel(labels[0])

            break;
          default:
        }
      }

    return (
        <TargetContext.Provider
        value={{
            targetsAndImpact,
            prevMonthWaste,
            showPercentagedWarning,
            label,
            toggleActive,
            activeState
        }}
        >
        {props.children}
        </TargetContext.Provider>
    )
}

export default TargetContextProvider
