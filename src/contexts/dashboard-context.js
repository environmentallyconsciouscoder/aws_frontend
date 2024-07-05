import React, { createContext } from 'react'

export const DashboardContext = createContext()

const DashboardContextProvider = props => {

    let monthlySelectedValue = props.monthlySelectedValue
    let handleSiteChange = props.handleSiteChange
    let selectedValue = props.selectedValue
    let siteName = props.siteName
    let companyName = props.companyName
    let sites = props.sites
    let handleMonthlyValues = props.handleMonthlyValues
    let displayMonthlyValue = props.displayMonthlyValue
    let allMonthlyData = props.allMonthlyData
    let monthlyChartMaxValue = props.monthlyChartMaxValue
    let monthlyChangesValue = props.monthlyChangesValue
    let startDate = props.startDate
    let showPounds = props.showPounds
    let userEmail = props.userEmail
    let adminType = props.adminType
    let count = props.count
    let totalMonthlyWaste = props.totalMonthlyWaste
    let clickOnMonthlyBarChart = props.clickOnMonthlyBarChart
    let changeIndex = props.changeIndex
    let userType = props.userType
    let userDetail = props.userDetail
    let sitesID = props.sitesID

    let handleSiteIDchange = props.handleSiteIDchange
    let selectedSiteValueID = props.selectedSiteValueID
    let companyID = props.companyID

    let weeklyDailyLabels = props.weeklyDailyLabels
    let weeklyDailyRange = props.weeklyDailyRange

  return (
    <DashboardContext.Provider
      value={{
        monthlySelectedValue,
        handleSiteChange,
        selectedValue,
        siteName,
        companyName,
        sites,
        handleMonthlyValues,
        displayMonthlyValue,
        allMonthlyData,
        monthlyChartMaxValue,
        monthlyChangesValue,
        startDate,
        showPounds,
        userEmail,
        adminType,
        count,
        totalMonthlyWaste,
        clickOnMonthlyBarChart,
        changeIndex,
        userType,
        userDetail,
        sitesID,
        companyID,

        handleSiteIDchange,
        selectedSiteValueID,

        weeklyDailyLabels,
        weeklyDailyRange
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  )
}

export default DashboardContextProvider
