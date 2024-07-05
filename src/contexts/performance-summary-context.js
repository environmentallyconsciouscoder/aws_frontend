import React, { createContext, useEffect } from 'react'
import { getPerformanceData}  from "../api"

export const PerformanceSummaryContext = createContext()

const PerformanceSummaryContextProvider = props => {

    const [bestWasteWeeks, setBestWasteWeeks] = React.useState(0);
    const [co2Contributions, setCo2Contributions] = React.useState(0);
    const [costOfFoodDisposal, setCostOfFoodDisposal] = React.useState(0);
    const [lastMonthSpendOnFoodWaste, setLastMonthSpendOnFoodWaste] = React.useState(0);
    const [lastWeek, setLastWeek] = React.useState(0);
    const [numberOfMealsSavedThisMonth, setNumberOfMealsSavedThisMonth] = React.useState(0);

    const [bestWasteWeeksDate, setBestWasteWeeksDate] = React.useState(0);
    const [bestWasteWeeksCovers, setBestWasteWeeksCovers] = React.useState(0);
    const [bestWasteWeeksSales, setBestWasteWeeksSales] = React.useState(0);

    const [lastWeekDate, setLastWeekDate] = React.useState(0);
    const [lastWeekSales, setLastWeekSales] = React.useState(0);
    const [lastWeekCovers, setLastWeekCovers] = React.useState(0);

    const [totalCo2Contributions, setTotalCo2Contributions] = React.useState(0);

    const [numberOfMealsLost, setNumberOfMealsLost] = React.useState(0);

    const [averageWasteWeeks, setAverageWasteWeeks] = React.useState(0);
    const [averageWasteWeeksDate, setAverageWasteWeeksDate] = React.useState(0);
    const [averageWasteWeeksSales, setAverageWasteWeeksSales] = React.useState(0);
    const [averageWasteWeeksCovers, setAverageWasteWeeksCovers] = React.useState(0);

    const [wastePerCover, setWastePerCover] = React.useState(0);
    const [wastePerSales, setWastePerSales] = React.useState(0);

    const [lastWastePerCover, setLastWastePerCover] = React.useState(0);
    const [lastWastePerSales, setLastWastePerSales] = React.useState(0);

    useEffect(() => {

          getPerformanceData(props.companyID, props.companyName, props.siteName).then((data) => {

            // console.log("data.response.lastWastePerCover",data.response.lastWastePerCover)
            if (data.response.lastWastePerCover) {
              setLastWastePerCover((data.response.lastWastePerCover).toFixed(2));
              setLastWastePerSales((data.response.lastWastePerSales).toFixed(2));
            }

            if (data.response.wastePerCover) {
              setWastePerCover((data.response.wastePerCover).toFixed(2));
              setWastePerSales((data.response.wastePerSales).toFixed(2));
            }

            setAverageWasteWeeks(data.response.averageWasteWeeks)
            setAverageWasteWeeksDate(data.response.averageWasteWeeksDate)
            setAverageWasteWeeksSales(data.response.averageWasteWeeksSales)
            setAverageWasteWeeksCovers(data.response.averageWasteWeeksCovers)


            setNumberOfMealsLost(data.response.numberOfMealsLostInTotal);
            setTotalCo2Contributions(data.response.totalCo2Contribution)

            setBestWasteWeeksDate(data.response.bestWasteWeeksDate)
            setBestWasteWeeksCovers(data.response.bestWasteWeeksCovers)
            setBestWasteWeeksSales(data.response.bestWasteWeeksSales)

            setLastWeekDate(data.response.lastWeekDate)
            setLastWeekSales(data.response.lastWeekSales)
            setLastWeekCovers(data.response.lastWeekCovers)

            setBestWasteWeeks(data.response.bestWasteWeeks)
            setCo2Contributions(data.response.co2Contributions)
            setCostOfFoodDisposal(data.response.costOfFoodDisposal)
            setLastMonthSpendOnFoodWaste(data.response.lastMonthSpendOnFoodWaste)
            setLastWeek(data.response.lastWeek)
            setNumberOfMealsSavedThisMonth(data.response.numberOfMealsSavedThisMonth)
        })

    }, [
        props.companyID, props.companyName, props.siteName
    ])


  return (
    <PerformanceSummaryContext.Provider
        value={{
            bestWasteWeeks,
            co2Contributions,
            costOfFoodDisposal,
            lastMonthSpendOnFoodWaste,
            lastWeek,
            numberOfMealsSavedThisMonth,

            bestWasteWeeksDate,
            bestWasteWeeksCovers,
            bestWasteWeeksSales,

            lastWeekDate,
            lastWeekSales,
            lastWeekCovers,

            totalCo2Contributions,
            numberOfMealsLost,

            averageWasteWeeks,
            averageWasteWeeksDate,
            averageWasteWeeksSales,
            averageWasteWeeksCovers,

            wastePerCover,
            wastePerSales,

            lastWastePerCover,
            lastWastePerSales
        }}
    >
      {props.children}
    </PerformanceSummaryContext.Provider>
  )
}

export default PerformanceSummaryContextProvider