import { useState } from "react";
import useSpinner from "./use-spinner";
import moment from "moment";

import {
  getWastePerCover,
  getWastePerSales,
  getMonthlyWastes,
  getAllSitesData,
  getWeeklyWaste,
  getTargets,
  getAiPredictionData,
  getCapping,
  getDailyAndWeeklyDatesData,
  getCoverInput,
  getSalesInput,
} from "../../../api";

import {
  setItemInLocalStorage,
  convertDate,
  wasteDailyDateRange
} from "../../../utilities.js"

const useGetRequests = () => {

    const [ spinner, showSpinner, hideSpinner ] = useSpinner();

    //CALL WASTE PER COVER
    const [wastePerCover, setWastePerCover] = useState([]);
    const [searchError, setSearchError] = useState(null);
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);

    const callWastePerCover = (id, company, site, month , year) => {
        getWastePerCover(id, company, site, month , year).then((data) => {
          setSelectedYear(year)
          hideSpinner()
          setWastePerCover(data)
          setSearchError(null)
        }).catch((err) => {
          hideSpinner()
          setWastePerCover(null)
          setSearchError(err.message)
        })
    };

    //CALL WASTE PER SALES
    const [wastePerSales, setWastePerSales] = useState([]);
    const [searchErrorForWastePerSales, setSearchErrorForWastePerSales] = useState(null);
    const [selectedYearForWastePerSales, setSelectedYearForWastePerSales] = useState(0);

    const callWastePerSales = (id, company, site, month , year) => {
      getWastePerSales(id, company, site, month , year).then((data) => {
        setSelectedYearForWastePerSales(year)
        hideSpinner()
        setWastePerSales(data)
        setSearchErrorForWastePerSales(null)
      }).catch((err) => {
        hideSpinner()
        setWastePerSales(null)
        setSearchErrorForWastePerSales(err.message)
      })
    };

    //CALL MONTHLY WASTE
    const [coverWasteInCurrentMonth, setCoverWasteInCurrentMonth] = useState(0);
    const [preparationWasteInCurrentMonth, setPreparationWasteInCurrentMonth] = useState(0);
    const [spoilageWasteInCurrentMonth, setSpoilageWasteInCurrentMonth] = useState(0);

    const [currentMonthCoverWasteArray, setCurrentMonthCoverWasteArray] = useState(0);
    const [currentMonthPrepWasteArray, setCurrentMonthPrepWasteArray] = useState(0);
    const [currentMonthSpoilageWasteArray, setCurrentMonthSpoilageWasteArray] = useState(0);

    const [coverMonthlyChanges, setCoverMonthlyChanges] = useState(0);
    const [prepMonthlyChanges, setPrepMonthlyChanges] = useState(0);
    const [spoilageMonthlyChanges, setSpoilageMonthlyChanges] = useState(0);
    const [monthlyChanges, setMonthlyChanges] = useState([0]);

    const callMonthlyWastesAPI = (companyNumber, companyName, siteID) => {
      getMonthlyWastes(companyNumber, companyName, siteID).then((data) => {
        setCoverWasteInCurrentMonth(data.coverWasteInCurrentMonth)
        setPreparationWasteInCurrentMonth(data.preparationWasteInCurrentMonth)
        setSpoilageWasteInCurrentMonth(data.spoilageWasteInCurrentMonth)

        setCurrentMonthCoverWasteArray(data.currentMonthCoverWasteArray)
        setCurrentMonthPrepWasteArray(data.currentMonthPrepWasteArray)
        setCurrentMonthSpoilageWasteArray(data.currentMonthSpoilageWasteArray)

        setCoverMonthlyChanges(data.coverMonthlyChanges)
        setPrepMonthlyChanges(data.prepMonthlyChanges)
        setSpoilageMonthlyChanges(data.spoilageMonthlyChanges)
        setMonthlyChanges(data.monthlyChanges)
      }).then(() => {
        hideSpinner();
      })
    }

    //CALL ALL SITES DATA
    const [allSites, setAllSites] = useState([]);
    const [totalWasteFromSelectedSite, setTotalWasteFromSelectedSite] = useState([]);

    const getAllSites = (companyId, companyName, siteId) => {
      getAllSitesData(companyId, companyName).then((data) => {

        const selectedValue = data.filter((item) => {
          return item.siteName === siteId;
        });

        setAllSites(data)
        setTotalWasteFromSelectedSite(selectedValue)
      })
    }

    // CALL WEEKLY WASTE API
    const [weeklyWaste, setWeeklyWaste] = useState(null);
    const [weeklyTrend, setWeeklyTrend] = useState(null);
    const [weeklyWasteValuesForCurrentWeekAndLastWeek, setWeeklyWasteValuesForCurrentWeekAndLastWeek] = useState(null);

    const callWeeklyWasteAPI = (companyId, companyName, companySite) => {
      getWeeklyWaste(companyId, companyName, companySite).then((data) => {
        setWeeklyWaste(data.currentWeeklyValues);
        setWeeklyTrend(data.weeklyWasteTrend);

        const weeklyWasteValuesForCurrentWeekAndLastWeekData = {
          currentWeek: data.currentWeeklyValues,
          lastWeek: data.lastWeekWasteValues
        }

        setWeeklyWasteValuesForCurrentWeekAndLastWeek(weeklyWasteValuesForCurrentWeekAndLastWeekData);

      });
    }

    //TARGETS RECOMMENDATION
    const [ recommendedTargets, setRecommendedTargets ] = useState([]);

    const getTargetsData = (id, company, site) => {
      getTargets(id, company, site).then((data) => {
        // console.log("getTargets",data.Items)
        setRecommendedTargets(data.Items)
      });
    };

    //AI PREDICTION
    const [ aiPredictionsData, setAiPredictionsData ] = useState([]);
    const getAiPrediction = (id, company, site) => {
      getAiPredictionData(id, company, site).then((data) => {
        setAiPredictionsData(data)
      });
    };

    //CAPPING API
    const [ cappingValue, setCappingValue ] = useState(0)
    const callGetCappingAPI = (companyId, companyName, companySite) => {
      getCapping(companyId, companyName, companySite).then((data) =>{
        setCappingValue(data)
      });
    }

    //daily and hourly
    const [ dailyWaste, setDailyWaste ] = useState([]);
    const [ hourlyWaste, sethourlyWaste ] = useState([]);

    //mon-sun x-axis labels
    const [ weeklyDailyLabels, setWeeklyDaysLabels ] = useState([]);

    //date range e..g 12-19 July
    const [ weeklyDailyRange, setWeeklyDaysRange ] = useState([]);

    const callDailyAndWeeklyDatesData = (id, company, site, indexNumber) => {
      getDailyAndWeeklyDatesData(id, company, site).then((data) => {


        let formatedXaxis = convertDate(data.weeklyData);
        let dateRangeLabel = wasteDailyDateRange(data.weeklyData);

        setWeeklyDaysLabels(formatedXaxis);
        setWeeklyDaysRange(dateRangeLabel)

        setItemInLocalStorage("dailyChartXaxis", data.weeklyData);
        setItemInLocalStorage("formatedXaxis", formatedXaxis);

        setDailyWaste({
          coverWaste: data.dailyCoverWasteArrayFormated,
          prepWaste: data.dailyPrepWasteArrayFormated,
          spoilageWaste: data.dailySpoilageWasteArrayFormated,
          totalWaste: data.totalDailyWaste,
          weeklyDates: data.weeklyData
        })

        const date = new Date();
        const numberInDay = date.getDay();

        let indexForNumberInDay = 0;

        if (numberInDay === 0) {
          indexForNumberInDay = 6
        } else {
          indexForNumberInDay = numberInDay - 1
        }

        // let index = indexNumber;
        let index = indexNumber ? indexNumber: indexForNumberInDay

        // console.log("indexForNumberInDay",indexForNumberInDay)
        // console.log("index",index)

        sethourlyWaste({
          hourlyWaste: data.hourlyWastesWeeklyArray,
          index: index,
          date: data.weeklyData[indexForNumberInDay]
        })
      });
    };

    //call input for covers and sales
    const [thisWeekCoverInputs, setThisWeekCoverInputs] = useState({
      salesInput: [0, 0, 0, 0, 0, 0, 0],
      Date: "",
      weekOfYear: ""
    });
    const [thisWeekSalesInput, setThisWeekSalesInputs] = useState({
      salesInput: [0, 0, 0, 0, 0, 0, 0],
      Date: "",
      weekOfYear: ""
    });

    const [allWeekSalesInput, setAllWeekSalesInputs] = useState([]);
    const [allWeekCoverInput, setAllWeekCoverInputs] = useState([]);

    const callCoverInput = (companyID, companyName, siteNameSelected) => {
      getCoverInput(companyID, companyName, siteNameSelected).then((data) => {
        const formatedDate = moment().format('MM-DD-YYYY');
        const weeknumber = moment(formatedDate, "MMDDYYYY").isoWeek();
        const getThisWeekCoverInput = data[0].weeklyCovers.filter((data) => {
          return parseInt(data.weekOfYear) === weeknumber;
        });

        setAllWeekCoverInputs(data[0].weeklyCovers);

        setThisWeekCoverInputs(getThisWeekCoverInput);
      })
    };

    const callSalesInput = (companyID, companyName, siteNameSelected) => {
      getSalesInput(companyID, companyName, siteNameSelected).then((data) => {
        const formatedDate = moment().format('MM-DD-YYYY');
        const weeknumber = moment(formatedDate, "MMDDYYYY").isoWeek();
        const getThisWeekSalesInput = data[0].weeklySales.filter((data) => {
          return parseInt(data.weekOfYear) === weeknumber;
        });

        setAllWeekSalesInputs(data[0].weeklySales);

        setThisWeekSalesInputs(getThisWeekSalesInput);
      })
    }

    //call get waste on a day of the week
    // const [wasteOnAdayOfTheWeekData, setWasteOnAdayOfTheWeek] = useState([]);

    // const getWasteOnAdayOfTheWeekAPI = (id, company, site, day, year) => {
    //   getWasteOnAdayOfTheWeek(id, company, site, day, year).then((data) => {
    //     setWasteOnAdayOfTheWeek(data)
    //   });
    // };

    return {
      //call input for covers and sales
      callCoverInput,
      callSalesInput,
      thisWeekCoverInputs,
      thisWeekSalesInput,
      allWeekSalesInput,
      allWeekCoverInput,

      //daily and hourly
      callDailyAndWeeklyDatesData,
      dailyWaste,
      hourlyWaste,

      //CAPPING API
      callGetCappingAPI,
      cappingValue,

      //AI PREDICTION
      getAiPrediction,
      aiPredictionsData,

      //TARGETS RECOMMENDATION
      getTargetsData,
      recommendedTargets,

      // CALL WEEKLY WASTE API
      callWeeklyWasteAPI,
      weeklyWaste,
      weeklyTrend,

      //MONTHLY WASTE
      callMonthlyWastesAPI,
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

      //WASTE PER COVER
      callWastePerCover,
      wastePerCover,

      //WASTE PER SALES
      callWastePerSales,
      wastePerSales,
      searchErrorForWastePerSales,
      selectedYearForWastePerSales,

      searchError,
      setSearchError,

      selectedYear,
      setSelectedYear,
      selectedMonth,
      setSelectedMonth,

      //CALL ALL SITES DATA
      getAllSites,
      allSites,
      totalWasteFromSelectedSite,

      spinner,
      showSpinner,
      hideSpinner,

      // get waste on a dy of the week
      // getWasteOnAdayOfTheWeekAPI,
      // wasteOnAdayOfTheWeekData

      //mon-sun x-axis labels
      weeklyDailyLabels,
      //date range e..g 12-19 July
      weeklyDailyRange,

      weeklyWasteValuesForCurrentWeekAndLastWeek
    }

}

export default useGetRequests