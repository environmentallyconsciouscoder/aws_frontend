

import {useState} from 'react'

import {
  setItemInLocalStorage,
} from "../../../utilities.js"

const Switches = () => {

  const initialStateForShowTotalWasteChart = JSON.parse(localStorage.getItem('showTotalWasteChart')) || false
  const [showTotalWasteChart, setShowTotalWasteChart] = useState(initialStateForShowTotalWasteChart);

  const initialStateForShowFoodWasteTargetSavings = JSON.parse(localStorage.getItem('showFoodWasteTargetSavings')) || false
  const [foodWasteTargetSavings, setFoodWasteTargetSavings] = useState(initialStateForShowFoodWasteTargetSavings);

  const initialStateForShowAiPredictions = JSON.parse(localStorage.getItem('showAiPredictions')) || false
  const [aiPredictions, setAiPredictions] = useState(initialStateForShowAiPredictions);

  const initialStateForShowWastePerCover = JSON.parse(localStorage.getItem('showWastePerCover')) || false
  const [wastePerCover, setWastePerCover] = useState(initialStateForShowWastePerCover);

  const initialStateForShowWastePerSales = JSON.parse(localStorage.getItem('showWastePerSales')) || false
  const [wastePerSales, setWastePerSales] = useState(initialStateForShowWastePerSales);

  const initialStateForShowWeeklyTrendChart = JSON.parse(localStorage.getItem('showWeeklyTrendChart')) || false
  const [showWeeklyTrendChart, setShowWeeklyTrendChart] = useState(initialStateForShowWeeklyTrendChart);

  const initialStateForShowHourlyChartSwitch = JSON.parse(localStorage.getItem('hourlyChartSwitch')) || false
  const [showHourlyChart, setShowHourlyChart] = useState(initialStateForShowHourlyChartSwitch);

  const initialStateForShowDailyChartSwitch = JSON.parse(localStorage.getItem('dailyChartSwitch')) || false
  const [showDailyChart, setShowDailyChart] = useState(initialStateForShowDailyChartSwitch);

  const initialStateForShowWeeklyChartSwitch = JSON.parse(localStorage.getItem('weeklyChartSwitch')) || false
  const [showWeeklyChart, setShowWeeklyChart] = useState(initialStateForShowWeeklyChartSwitch);

  const initialStateForShowMonthlyChartSwitch = JSON.parse(localStorage.getItem('monthlyChartSwitch')) || false
  const [showMonthlyChart, setShowMonthlyChart] = useState(initialStateForShowMonthlyChartSwitch);

  const initialStateForWasteOnADayOfTheWeek = JSON.parse(localStorage.getItem('wasteOnAdayOfTheWeek')) || false
  const [showWasteOnAdayOfTheWeek, setShowWasteOnAdayOfTheWeek] = useState(initialStateForWasteOnADayOfTheWeek);

  const initialStateForDailySalesVsWasteReport = JSON.parse(localStorage.getItem('dailySalesVsWasteReport')) || false
  const [showDailySalesVsWasteReport, setShowDailySalesVsWasteReport] = useState(initialStateForDailySalesVsWasteReport);

  const initialStateForEventProductionWasteReport = JSON.parse(localStorage.getItem('eventProductionWaste')) || false
  const [showEventProductionWaste, setShowEventProductionWaste] = useState(initialStateForEventProductionWasteReport);

  // const initialStateForEventCustomerWasteVcustomerRef = JSON.parse(localStorage.getItem('eventCustomerWasteVcustomerRef')) || false
  const [showEventCustomerWasteVcustomerRef, setShowEventCustomerWasteVcustomerRef] = useState(false);

  const initialStateForGroup = JSON.parse(localStorage.getItem('group')) || false
  const [showGroup, setShowGroup] = useState(initialStateForGroup);

  const initialStateForGroupOne = JSON.parse(localStorage.getItem('groupOne')) || false
  const [showGroupOne, setShowGroupOne] = useState(initialStateForGroupOne);

  const initialStateForGroupTwo = JSON.parse(localStorage.getItem('groupTwo')) || false
  const [showGroupTwo, setShowGroupTwo] = useState(initialStateForGroupTwo);

  const initialStateForGroupThree = JSON.parse(localStorage.getItem('groupThree')) || false
  const [showGroupThree, setShowGroupThree] = useState(initialStateForGroupThree);

  const handleChangeForCheckedAndAccordion = (value, checkedObject) => {

    if (checkedObject === "hourlyChartSwitch") {
      setShowHourlyChart(value)
      setItemInLocalStorage("hourlyChartSwitch",value)
    } else if ( checkedObject === "dailyChartSwitch") {
      setShowDailyChart(value)
      setItemInLocalStorage("dailyChartSwitch",value)
    } else if ( checkedObject === "weeklyChartSwitch") {
      setShowWeeklyChart(value)
      setItemInLocalStorage("weeklyChartSwitch",value)
    } else if ( checkedObject === "monthlyChartSwitch") {
      setShowMonthlyChart(value)
      setItemInLocalStorage("monthlyChartSwitch",value)
    }
  }


  ///HANDLE THE TOGGLE IN DISPLAY-SETTINGS:

  const initialStateForSwitches = JSON.parse(localStorage.getItem('switches')) || {
    hourlyChartSwitch: false,
    dailyChartSwitch: false,
    weeklyChartSwitch: false,
    monthlyChartSwitch: false,
    wastePerSalesSwitch: false,
    wastePerCoverSwitch: false,
    aiPredictionSwitch: false,
    foodWasteTargetSwitch: false,
    totalSiteWasteSwitch: false,
    weeklyWasteTrendSwitch: false,
    wasteOnAdayOfTheWeekSwitch: false,
    dailySalesVsWasteReportSwitch: false,
    eventProductionWasteSwitch: false,
    groupSwitch: false,
    groupOneSwitch: false,
    groupTwoSwitch: false,
    groupThreeSwitch: false
  };

  const [checked, setChecked] = useState(initialStateForSwitches);

  const handleChange = (event) => {
    // console.log("event.target.name",event.target.name)
    setChecked({ ...checked, [event.target.name]: event.target.checked });
    setItemInLocalStorage("switches", { ...checked, [event.target.name]: event.target.checked })
  };


    return {

      showHourlyChart,
      showDailyChart,
      showWeeklyChart,
      showMonthlyChart,
      setShowHourlyChart,
      setShowDailyChart,
      setShowWeeklyChart,
      setShowMonthlyChart,

      showTotalWasteChart,
      setShowTotalWasteChart,

      foodWasteTargetSavings,
      setFoodWasteTargetSavings,

      aiPredictions,
      setAiPredictions,

      wastePerCover,
      setWastePerCover,

      wastePerSales,
      setWastePerSales,

      showWeeklyTrendChart,
      setShowWeeklyTrendChart,

      showWasteOnAdayOfTheWeek,
      setShowWasteOnAdayOfTheWeek,

      showDailySalesVsWasteReport,
      setShowDailySalesVsWasteReport,

      checked,
      handleChange,
      handleChangeForCheckedAndAccordion,

      showEventProductionWaste,
      setShowEventProductionWaste,

      showEventCustomerWasteVcustomerRef,
      setShowEventCustomerWasteVcustomerRef,

      showGroup,
      setShowGroup,
      showGroupOne,
      setShowGroupOne,
      showGroupTwo,
      setShowGroupTwo,
      showGroupThree,
      setShowGroupThree
    }

}

export default Switches