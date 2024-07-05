import React, { createContext, useEffect, useState } from 'react'
import { getMenuInput, getTopCausesOfWaste } from "../api";
import { getWeekOfTheYear } from "./../utilities.js"

export const DailySalesVsWasteContext = createContext()

const DailySalesVsWasteInputsProvider = props => {

  const [dailyMenuInputs, setDailyMenuInputs] = useState([]);

  const [siteName, setSiteName] = useState("");
  const [id, setId] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [dataFromDB, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [allFormatedData, setAllFormatedData] = useState([])

  const [index, setIndex] = useState(0);

  const [allMenuItems, setAllMenuItems] = useState([]);

  const [firstDayOfTheWeek, setFirstDayOfTheWeek] = useState(1);

  useEffect(() => {

    // console.log("daily-sales-vs-waste-context updateGraph", props.updateGraph)

    // console.log("props.siteName",props.siteName)
    // console.log("props.companyID",props.companyId)
    // console.log("props.companyName",props.companyName)

    if (props.companyId && props.companyName && props.siteName) {

        const d = new Date();
        const n = d.getDay()
        let indexNumber = n === 0 ? 6: n - 1;

        getMenuInputData(props.companyId, props.companyName, props.siteName, indexNumber)

        getTopCausesOfWaste(props.companyId, props.companyName, props.siteName).then((data) => {
          setData(data.newMenuWaste)
          filterDataForChart(data.newMenuWaste)
        });

    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, [ props.siteName, props.companyId, props.companyName, props.updateGraph])


const filterDataForChart = (dataFromDB) => {
  // console.log("dataFromDB",dataFromDB)

  const noEmptyValues = dataFromDB.map((item) => {
    const result = item.menuItems.filter((val) => {
      return val.itemName !== ""
    })
    // console.log("result",result)
    return result;
  })

  const removeEmptyArray = noEmptyValues.filter((val) => {
    // console.log("val",val.length)
    return val.length !== 0;
  });

  let putAlllabelsInArray = []

  removeEmptyArray.map((item) => {
    item.map((data) => {
      putAlllabelsInArray.push(data.itemName.toLowerCase())
      return "";
    })
    return "";
  })

  // console.log("putAlllabelsInArray",putAlllabelsInArray)

  const uniqueArray = removeArrayDuplicates(putAlllabelsInArray)
  // console.log("uniqueArray",uniqueArray)

  let dataSet = []

  const colors = [
  "rgb(133, 165, 101)",
  "rgb(15, 128, 140)",
  "rgb(140, 112, 140)",
  "rgb(47, 67, 30)",
  "rgb(56, 166, 126)",
  "rgb(106, 217, 123)",
  "rgb(188, 242, 107)",
  "rgb(47, 64, 30)",
  "rgb(68, 89, 46)",
  "rgb(178, 191, 80)",

  "rgb(133, 165, 101)",
  "rgb(15, 128, 140)",
  "rgb(140, 112, 140)",
  "rgb(47, 67, 30)",
  "rgb(56, 166, 126)",
  "rgb(106, 217, 123)",
  "rgb(188, 242, 107)",
  "rgb(47, 64, 30)",
  "rgb(68, 89, 46)",
  "rgb(178, 191, 80)",

  "rgb(133, 165, 101)",
  "rgb(15, 128, 140)",
  "rgb(140, 112, 140)",
  "rgb(47, 67, 30)",
  "rgb(56, 166, 126)",
  "rgb(106, 217, 123)",
  "rgb(188, 242, 107)",
  "rgb(47, 64, 30)",
  "rgb(68, 89, 46)",
  "rgb(178, 191, 80)",

  "rgb(133, 165, 101)",
  "rgb(15, 128, 140)",
  "rgb(140, 112, 140)",
  "rgb(47, 67, 30)",
  "rgb(56, 166, 126)",
  "rgb(106, 217, 123)",
  "rgb(188, 242, 107)",
  "rgb(47, 64, 30)",
  "rgb(68, 89, 46)",
  "rgb(178, 191, 80)",

  "rgb(133, 165, 101)",
  "rgb(15, 128, 140)",
  "rgb(140, 112, 140)",
  "rgb(47, 67, 30)",
  "rgb(56, 166, 126)",
  "rgb(106, 217, 123)",
  "rgb(188, 242, 107)",
  "rgb(47, 64, 30)",
  "rgb(68, 89, 46)",
  "rgb(178, 191, 80)",

  "rgb(133, 165, 101)",
  "rgb(15, 128, 140)",
  "rgb(140, 112, 140)",
  "rgb(47, 67, 30)",
  "rgb(56, 166, 126)",
  "rgb(106, 217, 123)",
  "rgb(188, 242, 107)",
  "rgb(47, 64, 30)",
  "rgb(68, 89, 46)",
  "rgb(178, 191, 80)",

  "rgb(133, 165, 101)",
  "rgb(15, 128, 140)",
  "rgb(140, 112, 140)",
  "rgb(47, 67, 30)",
  "rgb(56, 166, 126)",
  "rgb(106, 217, 123)",
  "rgb(188, 242, 107)",
  "rgb(47, 64, 30)",
  "rgb(68, 89, 46)",
  "rgb(178, 191, 80)",
  ]

  uniqueArray.map((label, i) => {
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

  // console.log("dataFromDB",dataFromDB)

  dataFromDB.map((data, i) => {
    // console.log("menuItems",data.menuItems)
    data.menuItems.map((item) => {
      // console.log("item.itemName",item.itemName)
      dataSet.map((val) => {

        // console.log("val.lable === item.itemName.toLowerCase()",val.label === item.itemName.toLowerCase())

        if (val.label === item.itemName.toLowerCase()) {

          // console.log("true")
          // console.log("date",i)
          // console.log("totalWastePerItem",item.totalWastePerItem)
          val.data[i] = item.totalWastePerItem
          return "";
        } else {
          // console.log("false")
          return "";
        }

      })
      return "";
    })
    return "";
  })

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
  // setChartData(dataSet)
  setAllFormatedData(dataSet)
}

const removeArrayDuplicates = (data) => {
  // https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c
  let array = data
  // console.log("array",array)
  const uniqueSet = new Set(array);
  const backToArray = [...uniqueSet]
  // console.log("backToArray",backToArray)
  return backToArray;
}


const updateDailySalesVsWasteInput = (companyId, companyName, siteName, indexNumber) => {
  getMenuInputData(companyId, companyName, siteName, indexNumber);
};

const getMenuInputData = (companyId, companyName, siteName, index) => {
    getMenuInput(companyId, companyName, siteName).then((data) => {
        let indexNumber = index;

        setSiteName(siteName);
        setId(companyId);
        setCompanyName(companyName);

        // const d = new Date();
        // const n = d.getDay()
        // let indexNumber = n === 0 ? 6: n - 1;

        const weekOfTheYear = getWeekOfTheYear()
        // console.log("weekOfTheYear",weekOfTheYear)
        // console.log("n",n)

        data.map((item) => {

          // console.log("item.menuWaste",item.menuWaste)

            const weekOfTheYearData = item.menuWaste.filter((val) => {
              // console.log("weekOfTheYear",weekOfTheYear)
              // console.log("val.weekOfYear",val.weekOfYear)

                return val.weekOfYear === (weekOfTheYear).toString()
            })

            // console.log("weekOfTheYearData",weekOfTheYearData)

            const getFirstDayOfTheWeek = weekOfTheYearData.map((data) => {
              return data.Date;
            })

            setFirstDayOfTheWeek(getFirstDayOfTheWeek[0])

            // console.log("getFirstDayOfTheWeek",getFirstDayOfTheWeek[0])

            setAllMenuItems(weekOfTheYearData);
            // console.log("n",n)
            // console.log("indexNumber",indexNumber)

            const dailyMenuInputsData = weekOfTheYearData.map((data) => {
                return data.menuWasteWeek[indexNumber]
            })

            // console.log("dailyMenuInputsData",dailyMenuInputsData)
            const dailyMenuInputsDataAfterFiltered = filterOutEmptyObjects(dailyMenuInputsData[0])

            setDailyMenuInputs(dailyMenuInputsDataAfterFiltered)
            return ""
        })
    }).catch((err) =>{
        console.log("err",err)
    })
}

const filterOutEmptyObjects = (data) => {
  // console.log("dailyMenuInputsData",dailyMenuInputsData)

  // const filteredArray = dailyMenuInputsData.map((data, i) => {
    // console.log("data",data)

    const results = data.filter((item, i) => {
      // console.log("item",item)
      // console.log("i",i)
      // console.log("  item.menuItem !==  && item.menuItem ==! menu item ",item.menuItem !== "" && item.menuItem !== "menu item")

      return item.menuItem !== "" && item.menuItem !== "menu item";
    })
    // console.log("results",results)
    return results;
  // })
  // return filteredArray;
}

const filterDataByDate = (index) => {
  // console.log("index",index);
  // console.log("allFormatedData",allFormatedData);

  let result = allFormatedData.filter((item) => {
      return item.data[index] > 0;
  });
  setChartData(result)
  setIndex(index)
  // console.log("result",result)

}

const filterMenuItems = (selectedPage) => {
  // console.log("selectedPage",selectedPage);

  const menuItemsForSelectedPage = allMenuItems.map((data) => {
    return data.menuWasteWeek[selectedPage]
  })

  // console.log("menuItemsForSelectedPage",menuItemsForSelectedPage);

  const dailyMenuInputsDataAfterFiltered = filterOutEmptyObjects(menuItemsForSelectedPage[0])

  // console.log("dailyMenuInputsDataAfterFiltered",dailyMenuInputsDataAfterFiltered);

  setDailyMenuInputs(dailyMenuInputsDataAfterFiltered)
  return ""

};

  return (
    <DailySalesVsWasteContext.Provider
      value={{
        dailyMenuInputs,
        siteName,
        companyName,
        id,
        filterOutEmptyObjects,
        chartData,
        dataFromDB,
        filterDataByDate,
        index,
        filterMenuItems,
        firstDayOfTheWeek,
        updateDailySalesVsWasteInput
      }}
    >
      {props.children}
    </DailySalesVsWasteContext.Provider>
  )
}

export default DailySalesVsWasteInputsProvider