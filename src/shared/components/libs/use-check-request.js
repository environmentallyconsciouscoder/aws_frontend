// import React, { useState } from "react";

const CheckRequest = () => {

    const checkWeeklyWasteData = (data) => {
        // console.log("data", data)

        let result;
        if (Object.keys(data).length === 0 || data === null || data === undefined) {
                result = {
                    currentWeeklyValues: [
                        [{
                            coverWaste: [0],
                            preparationWaste: [0],
                            spoilageWaste: [0],
                            weekOfYear: "0",
                            Date:""
                        }]
            ],
            weeklyWasteTrend:
             [
                 {
                     totalWaste: 0,
                     coverWaste: 0,
                     prepWaste: 0,
                     spoilageWaste: 0
                 }
             ]
        };
        } else {
            result = data;
        }

        return result;
    };

    const checkWastePerCoverOrSales = (data) => {
        let result;
        if (Object.keys(data).length === 0 || data === null || data === undefined) {
            result = {
                monthsName: "",
                percentageOfInputsAreZeros: 0,
                siteName: "",
                totalCW: "",
                totalCoverInputs: 0,
                totalPW: "",
                totalSW: "",
                totalWaste: "",
                wastePerCoverForAllWaste:[0],
                wastePerCoverForCoverWaste: [0],
                wastePerCoverForPreparationWaste: [0],
                wastePerCoverForSpoilageWaste: [0],
                xAxis: []
                }
        } else {
            result = data
        }

        return result;
    }

    const checkAllSitesData = (data) => {
        // console.log("data",data)
        let result;
        if (Object.keys(data).length === 0 || data === null || data === undefined) {
            result = [{
                coverWaste: 0,
                prepWaste: 0,
                siteName: "",
                spoilageWaste: 0,
                totalWaste: 0,
                trends: 0
            }]
        } else {
            result = data
        }

        return result;
    }

    const checkGetDailyAndWeeklyDatesData = (data) => {
        // console.log("data",data)
        let result;
        if (Object.keys(data).length === 0 || data === null || data === undefined) {
            result = {
                dailyCoverWasteArrayFormated: [0],
                dailyPrepWasteArrayFormated: [0],
                dailySpoilageWasteArrayFormated: [0],
                hourlyWastesWeeklyArray: [{
                    date: "",
                    data: {
                        coverWaste: [0],
                        preparationWaste: [0],
                        spoilageWaste: [0]
                    }
                }],
                totalDailyWaste: [0],
                weeklyData: ["2021-05-17", "2021-05-18", "2021-05-19", "2021-05-20", "2021-05-21", "2021-05-22", "2021-05-23"]
            }
        } else {
            result = data
        }

        return result;
    };

    return {
        checkWeeklyWasteData,
        checkWastePerCoverOrSales,
        checkAllSitesData,
        checkGetDailyAndWeeklyDatesData
    }

}

export default CheckRequest