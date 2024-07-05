import React, { createContext, useEffect, useState } from 'react'
import { getProductionPreparationInputsForGraph } from "../api";
import { getWeekOfTheYear, reducer } from "../utilities.js"
import { colors } from "../helper.js"

export const EventProductionWasteContext = createContext()

const EventProductionWasteProvider = props => {

  const [chartData, setChartData] = useState([]);
  const [allFormatedData, setAllFormatedData] = useState([])
  const [index, setIndex] = useState(0);
  const [prodPrepInputsData, setProdPrepInputsData] = useState([]);

  useEffect(() => {

    if (props.companyId && props.companyName && props.siteName) {

        // const companyNumber = props.companyId;
        // const companyName = props.companyName;
        // const siteID = props.siteName;
        // const weekOfYear = getWeekOfTheYear();
        // const weekOfYear = 43;

        // getProductionPreparationInputsForGraph(companyNumber, companyName, siteID, weekOfYear).then((data) => {
        //   filterDataForChart(data[0].productionWasteWeek);
        // });

    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, [ props.siteName, props.companyId, props.companyName, props.updateGraph])

  const callProductionPreparationInputsFunc = ((companyNumber, companyName, siteID, weekOfYear) => {
    getProductionPreparationInputsForGraph(companyNumber, companyName, siteID, weekOfYear).then((data) => {
      setProdPrepInputsData(data);
      if (data.productionPrepWaste[0].productionWasteWeek) {
        filterDataForChart(data.productionPrepWaste[0].productionWasteWeek);
      }
    });
  })

  const filterDataForChart = (data) => {

    const dataFromDB = data;
    let sumOfTotalWeight = [];
    [0,1,2,3,4,5,6].map((num) => {
      let arr = [];
      dataFromDB[num].map((data) => {
        arr.push(Math.round(data.totalWeight));
      });
      sumOfTotalWeight.push(arr.reduce(reducer))
    })

    let removeEmptyArray = [];

    data.filter((item, i) => {
      item.filter((val, index) => {
        if (val.productionFood !== "") {
          const totalWeight = sumOfTotalWeight[i]
          const percent = (Math.round(val.totalWeight) / totalWeight) * 100;
          val.productionFood = val.productionFood + " " + Math.round(percent) + "%";
          removeEmptyArray.push(val);
        }
        return ""
      });
    });

    let putAlllabelsInArray = []

    removeEmptyArray.map((item) => {
        putAlllabelsInArray.push(item.productionFood.toLowerCase())
      return "";
    })

    let dataSet = []

    putAlllabelsInArray.map((label, i) => {
      const dataFormatForChart = {
        label: label,
        data: [0, 0, 0, 0, 0, 0, 0],
        fill: false,
        backgroundColor: colors[i],
        minBarLength: 0.3,
        barPercentage: 0.7,
        categoryPercentage: 0.7,
      };
      dataSet.push(dataFormatForChart)
      return "";
    })

    if (removeEmptyArray.length !== 0) {
      dataFromDB.map((itemArr, i) => {
        itemArr.map((item) => {
          dataSet.map((val) => {
            if (val.label === item.productionFood.toLowerCase()) {
              val.data[i] = parseInt(item.totalWeight)
              return "";
            } else {
              return "";
            };
          });
        });
      });
    };

    var d = new Date();
    var n = d.getDay()
    let day;
    if (n=== 0) {
      day = 6;
    } else {
      day = n - 1;
    }

    let result = dataSet.filter((item) => {
      return item.data[day] > 0;
    });


    setIndex(day)
    setChartData(result)
    setAllFormatedData(dataSet)
  };

  const filterDataByDate = (index) => {
    let result = allFormatedData.filter((item) => {
        return item.data[index] > 0;
    });
    setChartData(result)
    setIndex(index)

  }

  return (
    <EventProductionWasteContext.Provider
      value={{
        filterDataByDate,
        chartData,
        allFormatedData,
        index,
        callProductionPreparationInputsFunc,
        prodPrepInputsData
      }}
    >
      {props.children}
    </EventProductionWasteContext.Provider>
  )
}

export default EventProductionWasteProvider