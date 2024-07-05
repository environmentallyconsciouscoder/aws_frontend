import React, { createContext, useEffect, useState } from 'react'
import { getProductionPreparationInputs } from "../api";
import { getWeekOfTheYear, setItemInLocalStorage } from "../utilities.js"

export const ProductionPreparationContext = createContext()

const ProductionPreparationProvider = props => {

  const [productionInputs, setProductionInputs] = useState([]);
  const [siteName, setSiteName] = useState("");
  const [id, setId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [index, setIndex] = useState(0);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [firstDayOfTheWeek, setFirstDayOfTheWeek] = useState(1);
  const [numberOfWeeks, setNumberOfWeeks] = useState(0);
  const [weeklyArry, setWeeklyArry] = useState([]);
  const [weeklyStartDateArry, setWeeklyStartDateArry] = useState([]);
  const [weeklyNumbers, setWeeklyNumbers] = useState([]);
  const [paginationIndex, setPaginationIndex] = useState(0);

  useEffect(() => {



    if (props.companyId && props.companyName && props.siteName) {

        const d = new Date();
        const n = d.getDay()
        let indexNumber = n === 0 ? 6: n - 1;

        productionPreparationInputsFunc(props.companyId, props.companyName, props.siteName, indexNumber)

    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, [ props.siteName, props.companyId, props.companyName, props.updateGraph])


const updateProductionInputs = (companyId, companyName, siteName, indexNumber) => {
  props.updateValues("UPDATE GRAPH")
  productionPreparationInputsFunc(companyId, companyName, siteName, indexNumber);
};

const productionPreparationInputsFunc = (companyId, companyName, siteName, index) => {
  getProductionPreparationInputs(companyId, companyName, siteName).then((data) => {

        let allTheWeeks = data.map((item) => {
          return item.productionPreparation.map((data) => {
            return data.weekOfYear;
          })
        });

        setWeeklyNumbers(allTheWeeks[0])

        let indexNumber = index;
        setSiteName(siteName);
        setId(companyId);
        setCompanyName(companyName);

        const weekOfTheYear = getWeekOfTheYear()

        data.map((item) => {
            const weeksNumber = item.productionPreparation.length;
            let allStartDateOfEachWeekAvailable = [];

            item.productionPreparation.map((data) => {
              allStartDateOfEachWeekAvailable.push(data.Date)
            })

            setWeeklyStartDateArry(allStartDateOfEachWeekAvailable);

            // console.log("weeksNumber",weeksNumber);
            // setItemInLocalStorage("index",weeksNumber)
            setNumberOfWeeks(weeksNumber);

            const index = weeksNumber - 1 < 0 ? 0 : weeksNumber - 1;
            setPaginationIndex(index);

            setWeeklyArry(item.productionPreparation);

            const weekOfTheYearData = item.productionPreparation.filter((val) => {
                return val.weekOfYear === (weekOfTheYear).toString()
            });

            const getFirstDayOfTheWeek = weekOfTheYearData.map((data) => {
              return data.Date;
            })

            setFirstDayOfTheWeek(getFirstDayOfTheWeek[0])

            setAllMenuItems(weekOfTheYearData);

            const productionInputsData = weekOfTheYearData.map((data) => {
                return data.productionWasteWeek[indexNumber]
            })

            const productionInputsDataAfterFiltered = filterOutEmptyObjects(productionInputsData[0])
            setProductionInputs(productionInputsDataAfterFiltered)
            return ""
        })
    }).catch((err) =>{
        console.log("err",err)
    })
}

const filterOutEmptyObjects = (data) => {
    const results = data.filter((item, i) => {
      return item.productionFood !== "";
    })
    return results;
}

const filterMenuItems = (selectedPage) => {
  const menuItemsForSelectedPage = allMenuItems.map((data) => {
    return data.productionWasteWeek[selectedPage]
  })

  const dailyMenuInputsDataAfterFiltered = filterOutEmptyObjects(menuItemsForSelectedPage[0])
  setProductionInputs(dailyMenuInputsDataAfterFiltered)
  return ""

};

const filterbyWeeks = (data, pageNumber) => {
  setAllMenuItems([data])
  const prodWasteWeek = filterOutEmptyObjects(data.productionWasteWeek[pageNumber])
  setProductionInputs(prodWasteWeek)
  setFirstDayOfTheWeek(data.Date)
  return ""
};

  return (
    <ProductionPreparationContext.Provider
      value={{
        siteName,
        companyName,
        id,
        filterOutEmptyObjects,
        index,
        filterMenuItems,
        firstDayOfTheWeek,
        updateProductionInputs,
        productionInputs,
        numberOfWeeks,
        weeklyArry,
        filterbyWeeks,
        weeklyStartDateArry,
        weeklyNumbers,
        paginationIndex
      }}
    >
      {props.children}
    </ProductionPreparationContext.Provider>
  )
}

export default ProductionPreparationProvider