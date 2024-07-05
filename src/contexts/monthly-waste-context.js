import React, { createContext, useEffect } from 'react'

export const MonthlyWasteContext = createContext()

const MonthlyTargetContextProvider = props => {

  const [coverWasteInCurrentMonth, setCoverWasteInCurrentMonth] = React.useState(0);
  const [preparationWasteInCurrentMonth, setPreparationWasteInCurrentMonth] = React.useState(0);
  const [spoilageWasteInCurrentMonth, setSpoilageWasteInCurrentMonth] = React.useState(0);

  const [currentMonthCoverWasteArray, setCurrentMonthCoverWasteArray] = React.useState([0]);
  const [currentMonthPrepWasteArray, setCurrentMonthPrepWasteArray] = React.useState([0]);
  const [currentMonthSpoilageWasteArray, setCurrentMonthSpoilageWasteArray] = React.useState([0]);

  const [coverMonthlyChanges, setCoverMonthlyChanges] = React.useState([0]);
  const [prepMonthlyChanges, setPrepMonthlyChanges] = React.useState([0]);
  const [spoilageMonthlyChanges, setSpoilageMonthlyChanges] = React.useState([0]);
  const [monthlyChanges, setMonthlyChanges] = React.useState([0]);

  const [displayMonthlyTrends, setDisplayMonthlyTrends] = React.useState([0]);
  const [monthlySelectedValue, setMonthlySelectedValue] = React.useState("A");

  const [showTooltip, setTooltip] = React.useState(true);

  useEffect(() => {

    setCoverWasteInCurrentMonth(props.coverWasteInCurrentMonth)
    setPreparationWasteInCurrentMonth(props.preparationWasteInCurrentMonth)
    setSpoilageWasteInCurrentMonth(props.spoilageWasteInCurrentMonth)

    setCurrentMonthCoverWasteArray(props.currentMonthCoverWasteArray)
    setCurrentMonthPrepWasteArray(props.currentMonthPrepWasteArray)
    setCurrentMonthSpoilageWasteArray(props.currentMonthSpoilageWasteArray)

    setCoverMonthlyChanges(props.coverMonthlyChanges)
    setPrepMonthlyChanges(props.prepMonthlyChanges)
    setSpoilageMonthlyChanges(props.spoilageMonthlyChanges)
    setMonthlyChanges(props.monthlyChanges)

    setDisplayMonthlyTrends(props.monthlyChanges)
}, [
  props.siteName,
  props.coverWasteInCurrentMonth,
  props.preparationWasteInCurrentMonth,
  props.spoilageWasteInCurrentMonth,
  props.currentMonthCoverWasteArray,
  props.currentMonthPrepWasteArray,
  props.currentMonthSpoilageWasteArray,
  props.coverMonthlyChanges,
  props.prepMonthlyChanges,
  props.spoilageMonthlyChanges,
  props.monthlyChanges
])

  const handleMonthlyValues = (e) => {
    const selector = e.target.id;

    if (selector === "C") {
      setDisplayMonthlyTrends(coverMonthlyChanges)
      setMonthlySelectedValue("C");

    } else if (selector === "S") {
      setDisplayMonthlyTrends(spoilageMonthlyChanges)
      setMonthlySelectedValue("S");

    } else if (selector === "P") {
      setDisplayMonthlyTrends(prepMonthlyChanges)
      setMonthlySelectedValue("P");

    } else if (selector === "A") {
      setDisplayMonthlyTrends(monthlyChanges)
      setMonthlySelectedValue("A");
    }

    setTooltip(false)
  }

  return (
    <MonthlyWasteContext.Provider
        value={{

            coverWasteInCurrentMonth,
            preparationWasteInCurrentMonth,
            spoilageWasteInCurrentMonth,

            currentMonthCoverWasteArray,
            currentMonthPrepWasteArray,
            currentMonthSpoilageWasteArray,

            coverMonthlyChanges,
            prepMonthlyChanges,
            spoilageMonthlyChanges,
            monthlyChanges,

            handleMonthlyValues,
            displayMonthlyTrends,
            monthlySelectedValue,

            showTooltip
        }}
    >
      {props.children}
    </MonthlyWasteContext.Provider>
  )
}

export default MonthlyTargetContextProvider