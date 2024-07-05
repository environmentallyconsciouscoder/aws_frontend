import React, { useState } from "react";

import Routes from "./routes";
import { withRouter } from "react-router-dom";
import MainNavigation from "./shared/components/navigation/main-navigation";

import { getMasterTableData } from "./api";

import {
  getMonthAsAnumber,
  getYear,
} from "./utilities";

import UsersInformation from "./shared/components/libs/use-user-information";
import CompanyInformation from "./shared/components/libs/use-company-information";
import useGetRequests from "./shared/components/libs/use-get-request";
import KgPoundsConverter from "./shared/components/libs/use-kg-pounds-converter";

import WasteCapContextProvider from "./contexts/waste-cap-context";
import TotalWasteContextProvider from "./contexts/total-waste-context";
import MonthlyWasteContextProvider from "./contexts/monthly-waste-context";
import WeeklyWasteTrendProvider from "./contexts/weekly-trends-context";
import DailyWasteContextProvider from "./contexts/daily-waste-context";
import DashboardContextProvider from "./contexts/dashboard-context";
import WastePerCoverContextProvider from "./contexts/waste-per-cover-context";
import WastePerSalesContextProvider from "./contexts/waste-per-sales-context";
import WeeklyWasteContextProvider from "./contexts/weekly-waste-context";
import TargetContextProvider from "./contexts/target-context";
import HourlyFoodWasteContextProvider from "./contexts/hourly-food-waste-context";
import AiPredictionDataContextProvider from "./contexts/ai-prediction-data-context";
import WasteOnAdayOfTheWeekProvider from "./contexts/waste-on-a-day-of-the-week-context";
import InputsContextProvider from "./contexts/inputs-context";
import DailySalesVsWasteInputsProvider from "./contexts/daily-sales-vs-waste-context";
import PerformanceSummaryProvider from "./contexts/performance-summary-context";
import ProductionPreparationProvider from "./contexts/production-preparation-context";
import EventProductionWasteProvider from "./contexts/event-production-waste-context";
import WasteLabelsContextProvider from "./contexts/waste-labels-context";
import LiveFeedContextProvider from "./contexts/live-feed-context";
import IdCustomerWasteProvider from "./contexts/id-customer-waste-context";

function App() {

  const [mySiteId, setMySiteId] = React.useState();

  const {
    saveUserType,
    getUserDetails,
    getNoOfUsersCreated,
    userType,
    userDetail,
    noOfUsers,
    isAuthenticated,
    userHasAuthenticated,
    saveLoginTime,
    getTheLoginTimeFromUsers,
    superAdminCreatedUsers
  }
  = UsersInformation()

  const {
    startDate,
    setStartDate,
    companyID,
    setCompanyID,
    selectedSiteValueID,
    setSelectedValueID,
    companyName,
    setcompanyName,
    getCurrentMonthlyAndYear,
    yearlyArray,
    monthlyArr,
    siteName,
    setSiteName,
    carbonMunicipalValue,
    setCarbonMunicipalValue
  } = CompanyInformation()

  const {
    //call input for covers and sales
    callCoverInput,
    callSalesInput,
    thisWeekCoverInputs,
    thisWeekSalesInput,
    allWeekSalesInput,
    allWeekCoverInput,

    //TARGETS RECOMMENDATION
    getTargetsData,
    recommendedTargets,

    //WASTE PER COVER
    callWastePerCover,
    wastePerCover,

    searchError,

    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,

    spinner,
    showSpinner,

    //WASTE PER SALES
    callWastePerSales,
    wastePerSales,
    searchErrorForWastePerSales,
    selectedYearForWastePerSales,

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

    //CALL ALL SITES DATA
    getAllSites,
    allSites,
    totalWasteFromSelectedSite,

    // CALL WEEKLY WASTE API
    callWeeklyWasteAPI,
    weeklyWaste,
    weeklyTrend,

    //AI PREDICTION
    getAiPrediction,
    aiPredictionsData,

    //CAPPING API
    callGetCappingAPI,
    cappingValue,

    //daily and hourly
    callDailyAndWeeklyDatesData,
    dailyWaste,
    hourlyWaste,

    //mon-sun x-axis labels
    weeklyDailyLabels,
    //date range e..g 12-19 July
    weeklyDailyRange,

    weeklyWasteValuesForCurrentWeekAndLastWeek
  } = useGetRequests()

  const {
    showPounds,
    kgPoundsConverter
  } = KgPoundsConverter()

  const [ showHamburgerButton, setShowHamburgerButton] = useState(false);

  let [ updateGraph, setUpdateGraph ] = useState(0);

  let [ index, setIndex ] = useState(0);
  const changeIndex = (index) => {
    setIndex(index)
  }

  //THE FUNCTION TRIGGERS WHEN SEARCHING THE DATA FROM A PARTICULAR MONTH OR YEAR
  const handleSearch = (data, type) => {
    const monthly = data.monthlyIndex
    const yearly = data.yearlyIndex

    switch(type) {
      case "wastePerCover":
        setSelectedMonth(monthly)
        showSpinner()
        callWastePerCover(companyID, companyName, selectedSiteValueID, monthly, yearly)
        break;
      case "wastePerSales":
        setSelectedMonth(monthly)
        showSpinner()
        callWastePerSales(companyID, companyName, selectedSiteValueID, monthly, yearly)
        break;
      default:
        // code block
    }
  }

  //THE FUNCTION TRIGGERS WHEN THE FORMS ARE UPDATING
  const updateValues = (type) => {

    switch(type) {
      case "COVER INPUTS":
        callCoverInput(companyID, companyName, selectedSiteValueID)
        callWastePerCover(companyID, companyName, selectedSiteValueID, selectedMonth, selectedYear);
        break;
      case "SALES INPUTS":
        callSalesInput(companyID, companyName, selectedSiteValueID)
        callWastePerSales(companyID, companyName, selectedSiteValueID, selectedMonth, selectedYear);
        break;
      case "TARGETS":
        getTargetsData(companyID, companyName, selectedSiteValueID)
        break;
      case "UPDATE GRAPH":
        setUpdateGraph(updateGraph + 1)
        break;
      default:
        setUpdateGraph(true)
        // code block
    }
  }

  //THE FUNCTION TRIGGERS WHEN SWITCH TO A DIFFERENT SITE
  const handleSiteIDchange = (event) => {
    showSpinner()

    const siteNameSelected = event.target.value
    setMySiteId(siteNameSelected)
    const siteName = siteNameSelected.replace(/[^A-Za-z]+/g, '').toLowerCase()

    setSelectedValueID(siteNameSelected)
    setSiteName(siteName)

    const monthNumber = getMonthAsAnumber()
    const year = getYear()

    // console.log("siteNameSelected",siteNameSelected)
    // console.log("companyID",companyID)
    // console.log("companyName",companyName)
    // console.log("year",year)
    // console.log("monthNumber",monthNumber)

    getCurrentMonthlyAndYear(startDate)
    callMonthlyWastesAPI(companyID, companyName, siteNameSelected)
    callWeeklyWasteAPI(companyID, companyName, siteNameSelected)
    callWastePerCover(companyID, companyName, siteNameSelected, monthNumber , year)
    callWastePerSales(companyID, companyName, siteNameSelected, monthNumber , year)
    callCoverInput(companyID, companyName, siteNameSelected)
    callSalesInput(companyID, companyName, siteNameSelected)
    callGetCappingAPI(companyID, companyName, siteNameSelected)
    getAllSites(companyID, companyName, siteNameSelected)
    callDailyAndWeeklyDatesData(companyID, companyName, siteNameSelected)
    getTargetsData(companyID, companyName, siteNameSelected)
    getAiPrediction(companyID, companyName, siteNameSelected);
  }


  //THE FUNCTION TRIGGERS WHEN USER LOGIN
  const getAllData = (companyName, email, userDetails, companyId) => {

    showSpinner()

    let response;

    getMasterTableData(companyName, companyId)
      .then((res) => {

        response = res

        const companyId = response.companyId;
        const allSites = response.sites;
        const startDate = response.startDate;
        const carbonMunicipalValue = response.carbonMunicipalValue;

        // console.log("companyId", companyId)
        // console.log("allSites", allSites)

        //save user information
        saveLoginTime(userDetails, companyId);
        getTheLoginTimeFromUsers(companyId, companyName);

        //save company information
        setStartDate(startDate);
        setCompanyID(companyId);
        setcompanyName(companyName);

        setCarbonMunicipalValue(carbonMunicipalValue);

        const sitesID = Object.entries(allSites).map(([attribute, item]) => {
          return attribute;
        }).reverse();
        setMySiteId(sitesID[0]);

        //You need to change sitesID[1] back to sitesID[0] because it will break there is only one site
        setSelectedValueID(sitesID[0])

        const currentMonthNumber = getMonthAsAnumber()
        setSelectedMonth(currentMonthNumber)
        const currentYear = getYear()
        setSelectedYear(currentYear)

        callWastePerCover(companyId, companyName, sitesID[0], currentMonthNumber, currentYear);
        callWastePerSales(companyId, companyName, sitesID[0], currentMonthNumber, currentYear);

        callMonthlyWastesAPI(companyId, companyName, sitesID[0]);
        getAllSites(companyId, companyName, sitesID[0]);
        callWeeklyWasteAPI(companyId, companyName, sitesID[0]);
        getTargetsData(companyId, companyName, sitesID[0])
        getAiPrediction(companyId, companyName, sitesID[0]);
        callGetCappingAPI(companyId, companyName, sitesID[0]);

        const date = new Date();
        const numberInDay = date.getDay();
        const indexForNumberInDay = numberInDay === 0 ? 6 : numberInDay - 1
        callDailyAndWeeklyDatesData(companyId, companyName, sitesID[0], indexForNumberInDay);

        //get data for the form
        callCoverInput(companyId, companyName, sitesID[0]);
        callSalesInput(companyId, companyName, sitesID[0]);

        //get waste on a day of the week
        // getWasteOnAdayOfTheWeekAPI(companyId, companyName, sitesID[0], 0, currentYear)

        getCurrentMonthlyAndYear(response.startDate)

        setShowHamburgerButton(true)

      }).catch((error) => {
        console.log("error from master table", error);
      })
  };
  return (
    <>
      {spinner}
      <div className="App">

          <IdCustomerWasteProvider
            companyId={companyID}
            companyName={companyName}
            siteName={mySiteId}
          >

          <LiveFeedContextProvider
            companyId={companyID}
            companyName={companyName}
            siteName={mySiteId}
          >

          <WasteLabelsContextProvider
            companyId={companyID}
            companyName={companyName}
            siteName={mySiteId}
          >

          <InputsContextProvider
            companyId={companyID}
            companyName={companyName}
            selectedSiteValueID={selectedSiteValueID}
            thisWeekCoverInputs={thisWeekCoverInputs}
            thisWeekSalesInput={thisWeekSalesInput}
            updateValues={updateValues}
            allWeekSalesInput={allWeekSalesInput}
            allWeekCoverInput={allWeekCoverInput}
          >

          <DailySalesVsWasteInputsProvider
            siteName={mySiteId}
            companyId={companyID}
            companyName={companyName}
            updateGraph={updateGraph}
            // weeklyDailyRange={weeklyDailyRange}
          >

          <ProductionPreparationProvider
            siteName={mySiteId}
            companyId={companyID}
            companyName={companyName}
            updateValues={updateValues}
          >

          <WasteOnAdayOfTheWeekProvider
            siteName={mySiteId}
            companyId={companyID}
            companyName={companyName}
            totalWasteFromSelectedSite={totalWasteFromSelectedSite}
            startDate={startDate}
          >

          <TargetContextProvider
            aiPredictionsData={aiPredictionsData}
            recommendedTargets={recommendedTargets}
            currentMonthCoverWasteArray={currentMonthCoverWasteArray}
            currentMonthPrepWasteArray={currentMonthPrepWasteArray}
            currentMonthSpoilageWasteArray={currentMonthSpoilageWasteArray}
            carbonMunicipalValue={carbonMunicipalValue}
          >

          <WasteCapContextProvider
            companyName={companyName}
            selectedSiteValueID={selectedSiteValueID}
            companyID={companyID}
            cappingValue={cappingValue}
            showPounds={showPounds}
          >

          <MainNavigation
            appProps={{
              isAuthenticated,
              userHasAuthenticated,
              kgPoundsConverter,
            }}
            siteName={mySiteId}
            userDetail={userDetail}
            showHamburgerButton={showHamburgerButton}
          />

          <TotalWasteContextProvider
            siteName={siteName}
            // totalWasteFromSite={totalWasteFromSite}
            allSites={allSites}
            totalWasteFromSelectedSite={totalWasteFromSelectedSite}
          >

          <WastePerCoverContextProvider
            startDate={startDate}
            handleSearch={handleSearch}
            monthlyArray={monthlyArr}
            yearlyArray={yearlyArray}
            wastePerCover={wastePerCover}
            searchError={searchError}
            selectedYear={selectedYear}
            companyId={companyID}
            companyName={companyName}
          >

          <WastePerSalesContextProvider
            siteName={mySiteId}
            wastePerSales={wastePerSales}
            monthlyArray={monthlyArr}
            yearlyArray={yearlyArray}
            handleSearch={handleSearch}
            searchErrorForWastePerSales={searchErrorForWastePerSales}
            selectedYearForWastePerSales={selectedYearForWastePerSales}
          >

          <EventProductionWasteProvider
            companyId={companyID}
            companyName={companyName}
            siteName={mySiteId}
            updateGraph={updateGraph}
          >

          <DashboardContextProvider
            // monthlySelectedValue={monthlySelectedValue}
            // selectedValue={selectedValue}
            siteName={mySiteId}
            companyName={companyName}
            sites={allSites}
            // handleMonthlyValues={handleMonthlyValues}
            // displayMonthlyValue={displayMonthlyValue}
            // allMonthlyData={allMonthlyData}
            // monthlyChartMaxValue={monthlyChartMaxValue}
            // monthlyChangesValue={monthlyChangesValue}
            startDate={startDate}
            showPounds={showPounds}
            // userEmail={userEmail}
            // adminType={adminType}
            // totalMonthlyWaste={totalMonthlyWaste}
            // clickOnMonthlyBarChart={clickOnMonthlyBarChart}
            changeIndex={changeIndex}
            userType={userType}
            userDetail={userDetail}
            // sitesID={sitesID}
            handleSiteIDchange={handleSiteIDchange}
            selectedSiteValueID={selectedSiteValueID}
            companyID={companyID}
            thisWeekCoverInputs={thisWeekCoverInputs}

            weeklyDailyLabels={weeklyDailyLabels}
            weeklyDailyRange={weeklyDailyRange}
          >

          <AiPredictionDataContextProvider
            companyName={companyName}
            siteName={siteName}
            aiPredictionsData={aiPredictionsData}
          >

          <HourlyFoodWasteContextProvider
            companyName={companyName}
            index={index}
            hourlyWaste={hourlyWaste}
          >

          <DailyWasteContextProvider
            siteName={siteName}
            // siteChange={siteChange}
            // dailyWasteData={dailyWasteData}
            // dailyCoverWaste={dailyCoverWaste}
            // dailyPreparationWaste={dailyPreparationWaste}
            // dailySpoilageWaste={dailySpoilageWaste}
            // weeklyDailyWaste={weeklyDailyWaste}
            showPounds={showPounds}
            dailyWaste={dailyWaste}
          >

          <WeeklyWasteTrendProvider
            companyName={companyName}
            siteName={siteName}
            weeklyWasteValuesForCurrentWeekAndLastWeek={weeklyWasteValuesForCurrentWeekAndLastWeek}
            weeklyTrend={weeklyTrend}
          >

          <WeeklyWasteContextProvider
            weeklyWaste={weeklyWaste}
            siteName={siteName}
          >

          <MonthlyWasteContextProvider
            companyName={companyName}
            siteName={siteName}
            companyID={companyID}
            // selectedSiteID={selectedSiteID}

            coverWasteInCurrentMonth={coverWasteInCurrentMonth}
            preparationWasteInCurrentMonth={preparationWasteInCurrentMonth}
            spoilageWasteInCurrentMonth={spoilageWasteInCurrentMonth}

            currentMonthCoverWasteArray={currentMonthCoverWasteArray}
            currentMonthPrepWasteArray={currentMonthPrepWasteArray}
            currentMonthSpoilageWasteArray={currentMonthSpoilageWasteArray}

            coverMonthlyChanges={coverMonthlyChanges}
            prepMonthlyChanges={prepMonthlyChanges}
            spoilageMonthlyChanges={spoilageMonthlyChanges}
            monthlyChanges={monthlyChanges}
          >

          <PerformanceSummaryProvider
            companyID={companyID}
            companyName={companyName}
            siteName={mySiteId}
          >

          <Routes
            appProps={{
              siteName,
              getUserDetails,
              isAuthenticated,
              userHasAuthenticated,
              getAllData,
              saveUserType,
              companyName,
              userType,
              getNoOfUsersCreated,
              noOfUsers,
              userDetail,
              companyID,
              superAdminCreatedUsers,
              selectedSiteValueID,
              thisWeekCoverInputs,
              thisWeekSalesInput,
              // updateValues,
              callGetCappingAPI,
              recommendedTargets,
              updateValues,
              startDate,
              carbonMunicipalValue
            }}
          />

          </PerformanceSummaryProvider>

          </MonthlyWasteContextProvider>

          </WeeklyWasteContextProvider>

          </WeeklyWasteTrendProvider>

          </DailyWasteContextProvider>

          </HourlyFoodWasteContextProvider>

          </AiPredictionDataContextProvider>

          </DashboardContextProvider>

          </EventProductionWasteProvider>

          </WastePerSalesContextProvider>

          </WastePerCoverContextProvider>

          </TotalWasteContextProvider>

          </WasteCapContextProvider>

          </TargetContextProvider>

          </WasteOnAdayOfTheWeekProvider>

          </ProductionPreparationProvider>

          </DailySalesVsWasteInputsProvider>

          </InputsContextProvider>

          </WasteLabelsContextProvider>

          </LiveFeedContextProvider>

          </IdCustomerWasteProvider>
      </div>
    </>
  );
}

export default withRouter(App);
