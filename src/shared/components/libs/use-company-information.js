import { useState } from "react";

import {

} from "../../../api";

import {
    setItemInLocalStorage,
    getMonthAsAnumber,
    getYearsArray,
} from "../../../utilities.js"

const CompanyInformation = () => {

    const [startDate, setStartDate] = useState("");
    const [companyID, setCompanyID] = useState("");
    const [selectedSiteValueID, setSelectedValueID] = useState("");
    const [companyName, setcompanyName] = useState("");
    const [siteName, setSiteName] = useState();
    const [carbonMunicipalValue, setCarbonMunicipalValue] = useState();

    const [yearlyArray, setYearlyArray] = useState([{
        year: 0,
        show: true
    }]);

    const [monthlyArr, setMonthArray] = useState([
        {
          month: "JAN",
          index: 1,
          show: false
        },
        {
          month: "FEB",
          index: 2,
          show: false
        },
        {
          month: "MAR",
          index: 3,
          show: false
        },
        {
          month: "APR",
          index: 4,
          show: false
        },
        {
          month: "MAY",
          index: 5,
          show: false
        },
        {
          month: "JUN",
          index: 6,
          show: false
        },
        {
          month: "JUL",
          index: 7,
          show: false
        },
        {
          month: "AUG",
          index: 8,
          show: false
        },
        {
          month: "SEP",
          index: 9,
          show: false
        },
        {
          month: "OCT",
          index: 10,
          show: false
        },
        {
          month: "NOV",
          index: 11,
          show: false
        },
        {
          month: "DEC",
          index: 12,
          show: false
        },
    ]);

    const getCurrentMonthlyAndYear = (startData) => {
        // startData is YYYY-MM-DD
        const yearlyArray = getYearsArray(startData);
        const monthNumber = getMonthAsAnumber();
        monthlyArr.map((data) => {
          if (data.index === parseInt(monthNumber)) {
            data.show = true;
            return ""
          } else {
            data.show = false;
            return ""
          }

        });
        // console.log("monthlyArr",monthlyArr)
        setMonthArray(monthlyArr)
        setYearlyArray(yearlyArray)

        setItemInLocalStorage("yearlyArray", yearlyArray);
        setItemInLocalStorage("monthlyArr", monthlyArr);
    };

    return {
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
    }

}

export default CompanyInformation