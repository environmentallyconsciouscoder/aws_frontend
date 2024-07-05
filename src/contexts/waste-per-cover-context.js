import React, { createContext, useEffect, useState } from 'react'
// import { getYearsArray, getMonthAsAnumber } from "./../utilities.js"

export const WastePerCoverContext = createContext()

const WastePerCoverContextProvider = props => {

  const initialStateForyearlyArray = JSON.parse(localStorage.getItem('yearlyArray')) || []
  const initialStateFormontlyArray = JSON.parse(localStorage.getItem('monthlyArr')) || []

  const [yearlyArray, setYearlyArray] = useState(initialStateForyearlyArray);
  const [montlyArray, setMonthArray] = useState(initialStateFormontlyArray);

  const [count, setCount ] = useState(0)

  const [activeState, changeActiveState] = useState({
    coverSelector: false,
    spoilageSelector: false,
    preparationSelector: false,
    allSelector: true,
  });

  const [totalCW, setTotalCW ] = useState(0)
  const [totalPW, setTotalPW ] = useState(0)
  const [totalSW, setTotalSW ] = useState(0)
  const [totalWaste, setTotalWaste ] = useState(0)
  const [xAxis, setXaxis ] = useState(0)

  const [wastePerCoverForAllWaste, setForAllWaste ] = useState([])
  const [wastePerCoverForCoverWaste, setCoverWaste ] = useState([])
  const [wastePerCoverForPreparationWaste, setPreparationWaste ] = useState([])
  const [wastePerCoverForSpoilageWaste, setSpoilageWaste ] = useState([])

  const [ totalCoverInputs, setTotalCoverInputs] = useState(0)

  const [ percentageOfInputsAreZeros, setPercentageOfInputsAreZeros] = useState(0)

  const [ monthName, setMonthName] = useState(0)

  const [display, setDisplay ] = useState([])

  const [searchError, setSearchError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(0);

  const [siteName, setSiteName] = useState();

  // const [weekOneArray, setWeekOneArray ] = useState([])
  // const [weekTwoArray, setWeekTwoArray ] = useState([])
  // const [weekThreeArray, setWeekThreeArray ] = useState([])
  // const [weekFourArray, setWeekFourArray ] = useState([])
  // const [weekFiveArray, setWeekFiveArray ] = useState([])
  // const [weekSixArray, setWeekSixArray ] = useState([])
  // const [weekSevenArray, setWeekSevenArray ] = useState([])
  const [dates, setDates ] = useState([])
  const [datesLabel, setDatesLabel ] = useState([])
  const [datesBeforeFormating, setDatesBeforeFormating ] = useState([])

  const [foodWaste, setFoodWaste] = useState([]);
  const [foodWasteXaxis, setFoodWasteXaxis] = useState([]);

  const [coverInputDataArray, setCoverInputDataArray] = useState([]);
  const [coverWasteDataArray, setCoverWasteDataArray] = useState([]);
  const [preparationWasteDataArray, setPreparationWasteDataArray] = useState([]);
  const [spoilageWasteDataArray, setSpoilageWasteDataArray] = useState([]);
  const [totalDailyWasteDataArray, setTotalDailyWasteDataArray] = useState([]);
  const [wasteSteamValue, setWasteSteamValue] = useState([]);

  const [showTooltip, setTooltip] = React.useState(true);

  useEffect(() => {

    changeActiveState({
      coverSelector: false,
      spoilageSelector: false,
      preparationSelector: false,
      allSelector: true,
    });

    if (props.wastePerCover.totalDailyWasteDataArray) {

      // getCurrentMonthlyAndYear(props.startDate)

      // console.log("props.wastePerCover",props.wastePerCover);

      setCoverInputDataArray(addGap(props.wastePerCover.coverInputDataArray))
      setCoverWasteDataArray(addGap(props.wastePerCover.coverWasteDataArray))
      setPreparationWasteDataArray(addGap(props.wastePerCover.preparationWasteDataArray))
      setSpoilageWasteDataArray(addGap(props.wastePerCover.spoilageWasteDataArray))

      let addGapToTotalDailyWasteDataArray = addGap(props.wastePerCover.totalDailyWasteDataArray);

      setTotalDailyWasteDataArray(addGapToTotalDailyWasteDataArray)
      setWasteSteamValue(addGapToTotalDailyWasteDataArray)

      // addGap

      setYearlyArray(props.yearlyArray)
      setMonthArray(props.monthlyArray)

      setTotalCW(props.wastePerCover.totalCW)
      setTotalPW(props.wastePerCover.totalPW)
      setTotalSW(props.wastePerCover.totalSW)
      setTotalWaste(props.wastePerCover.totalWaste)
      setXaxis(props.wastePerCover.xAxis)

      setMonthName(props.wastePerCover.monthsName)

      setDisplay(props.wastePerCover.wastePerCoverForAllWaste)

      setPercentageOfInputsAreZeros(props.wastePerCover.percentageOfInputsAreZeros)

      //new function
      const waste = props.wastePerCover.wastePerCoverForAllWaste
      const foodWaste = addGap(waste);
      const foodWasteXaxis = addGap(props.wastePerCover.xAxis, "xaxis");

      setFoodWaste(foodWaste)
      setFoodWasteXaxis(foodWasteXaxis)

      // const allfoodWaste = addGap(props.wastePerCover.wastePerCoverForAllWaste);
      setForAllWaste(foodWaste)

      const prepfoodWaste = addGap(props.wastePerCover.wastePerCoverForPreparationWaste);
      setPreparationWaste(prepfoodWaste)

      const coverfoodWaste = addGap(props.wastePerCover.wastePerCoverForCoverWaste);
      setCoverWaste(coverfoodWaste)

      const spoilagefoodWaste = addGap(props.wastePerCover.wastePerCoverForSpoilageWaste);
      setSpoilageWaste(spoilagefoodWaste)


      // separateWastePerCover(waste, props.wastePerCover.xAxis)
      setDatesBeforeFormating(props.wastePerCover.xAxis)

      // setForAllWaste(props.wastePerCover.wastePerCoverForAllWaste)
      // setCoverWaste(props.wastePerCover.wastePerCoverForCoverWaste)
      // setPreparationWaste(props.wastePerCover.wastePerCoverForPreparationWaste)
      // setSpoilageWaste(props.wastePerCover.wastePerCoverForSpoilageWaste)

      setTotalCoverInputs(props.wastePerCover.totalCoverInputs)
      setSiteName(props.wastePerCover.siteName)
    }

    setSearchError(props.searchError)
    setSelectedYear(props.selectedYear)

        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.wastePerCover, props.searchError, props.monthlyArray, props.yearlyArray])

  const addGap = (dataSet, type) => {

    Array.prototype.insert = function ( index, item ) {
      this.splice( index, 0, item );
    };

    let array = dataSet;

    if (dataSet !== undefined) {
      // console.log("dataSet.lengt",dataSet.length)
      for (let i = 7; i <= dataSet.length; i += 8) {
        // console.log("i",i)
        const value = type === "xaxis" ? "" : null;
        array.insert(i, value);
      }
    }

    return array;

  }

  // const separateWastePerCover = (waste, xAxis) => {

  //   if (waste !== undefined) {
  //     // console.log("waste",waste.wastePerCoverForAllWaste)
  //     // console.log("xAxis",xAxis);
  //     // let waste = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31]
  //     // let dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31]
  //     // let waste = [1, 2, 3, 4, 5]
  //     // let dates = [1, 2, 3, 4, 5]
  //     // const formatedCW = filterByWeeks(waste, dates)

  //     const formatedWastesData = filterByWeeks(waste, xAxis)
  //     // console.log("formatedWastesData",formatedWastesData);
  //     // console.log("formatedWastesData.newArrayForDates",formatedWastesData.newArrayForDates);
  //     const dates = spitDatesIntoArray(formatedWastesData.newArrayForDates)
  //     setDatesLabel(dates);

  //     setWeekOneArray(formatedWastesData.sevenArraysForChart.reformatedArrayOne)
  //     setWeekTwoArray(formatedWastesData.sevenArraysForChart.reformatedArrayTwo)
  //     setWeekThreeArray(formatedWastesData.sevenArraysForChart.reformatedArrayThree)
  //     setWeekFourArray(formatedWastesData.sevenArraysForChart.reformatedArrayFour)
  //     setWeekFiveArray(formatedWastesData.sevenArraysForChart.reformatedArrayFive)
  //     setWeekSixArray(formatedWastesData.sevenArraysForChart.reformatedArraySix)
  //     setWeekSevenArray(formatedWastesData.sevenArraysForChart.reformatedArraySeven)

  //     setDates(formatedWastesData.newArrayForDates)
  //   }
  // }

  const spitDatesIntoArray = (data) => {
    let arrayOfDates = [];
    data.map((item) => {
      const splitItem = item.split(",");
      arrayOfDates.push(splitItem)
    });
    return arrayOfDates;
  };

  const filterByWeeks = (wastes, xAxis) => {
    const numOfCoverPerWaste = wastes.length
    const dates = xAxis;
    const howManyWeeksinTheArray = (numOfCoverPerWaste / 7);
    // console.log("howManyWeeksinTheArray",howManyWeeksinTheArray)
    // console.log("dates",dates)
    // console.log("numOfCoverPerWaste",numOfCoverPerWaste)
    let newArray;
    let newArrayForDates = []

    if (howManyWeeksinTheArray <= 1) {

      // console.log("1 week only")
      const datesInWeekOne = []

      let num
      for (num = 0; num <= 6; ++num) {
        datesInWeekOne.push(dates[num])
      }

      const turnDatesToString = datesInWeekOne.join()
      newArrayForDates.push(turnDatesToString)

      const sevenArraysForChart = reformatDataToShowWastePerWeek(wastes, numOfCoverPerWaste)

      newArray = {
        newArrayForDates,
        sevenArraysForChart
      }

    } else if (howManyWeeksinTheArray > 1 && howManyWeeksinTheArray <= 2) {
      // console.log("2 weeks only")

      const datesInWeekOne = []
      const datesInWeekTwo = []

      let num;
      for (num = 0; num <= 6; ++num) {
        datesInWeekOne.push(dates[num])
      }

      let numTwo;
      for (numTwo = 7; numTwo <= dates.length - 1; ++numTwo) {
        datesInWeekTwo.push(dates[numTwo])
      }

      let turnDatesToString;

      turnDatesToString = datesInWeekOne.join()
      newArrayForDates.push(turnDatesToString)

      turnDatesToString = datesInWeekTwo.join()
      newArrayForDates.push(turnDatesToString)

      const sevenArraysForChart = reformatDataToShowWastePerWeek(wastes, numOfCoverPerWaste)

      newArray = {
        newArrayForDates,
        sevenArraysForChart
      }

    } else if (howManyWeeksinTheArray > 2 && howManyWeeksinTheArray <= 3) {
    // console.log("3 weeks only")

      const datesInWeekOne = []
      const datesInWeekTwo = []
      const datesInWeekThree = []

      let num
      for (num = 0; num <= 6; ++num) {
        datesInWeekOne.push(dates[num])
      }

      let numTwo
      for (numTwo = 7; numTwo <= 13; ++numTwo) {
        datesInWeekTwo.push(dates[numTwo])
      }

      let numThree
      for (numThree = 14; numThree <= dates.length - 1; ++numThree) {
        datesInWeekThree.push(dates[numThree])
      }

      let turnDatesToString;

      turnDatesToString = datesInWeekOne.join()
      newArrayForDates.push(turnDatesToString)

      turnDatesToString = datesInWeekTwo.join()
      newArrayForDates.push(turnDatesToString)

      turnDatesToString = datesInWeekThree.join()
      newArrayForDates.push(turnDatesToString)

      const sevenArraysForChart = reformatDataToShowWastePerWeek(wastes, numOfCoverPerWaste)

      newArray = {
        newArrayForDates,
        sevenArraysForChart
      }


    } else if (howManyWeeksinTheArray > 3 && howManyWeeksinTheArray <= 4) {
    // console.log("4 weeks only")

      const datesInWeekOne = []
      const datesInWeekTwo = []
      const datesInWeekThree = []
      const datesInWeekFour = []

      let num
      for (num = 0; num <= 6; ++num) {
        datesInWeekOne.push(dates[num])
      }

      let numTwo
      for (numTwo = 7; numTwo <= 13; ++numTwo) {
        datesInWeekTwo.push(dates[numTwo])
      }

      let numThree
      for (numThree = 14; numThree <= 20; ++numThree) {
        datesInWeekThree.push(dates[numThree])
      }

      let numFour
      for (numFour = 21; numFour <= dates.length - 1; ++numFour) {
        datesInWeekFour.push(dates[numFour])
      }

      let turnDatesToString;

      turnDatesToString = datesInWeekOne.join()
      newArrayForDates.push(turnDatesToString)

      turnDatesToString = datesInWeekTwo.join()
      newArrayForDates.push(turnDatesToString)

      turnDatesToString = datesInWeekThree.join()
      newArrayForDates.push(turnDatesToString)

      turnDatesToString = datesInWeekFour.join()
      newArrayForDates.push(turnDatesToString)

      const sevenArraysForChart = reformatDataToShowWastePerWeek(wastes, numOfCoverPerWaste)

      newArray = {
        newArrayForDates,
        sevenArraysForChart
      }

    } else if (howManyWeeksinTheArray > 4) {
    // console.log("5 weeklys only")

      const datesInWeekOne = []
      const datesInWeekTwo = []
      const datesInWeekThree = []
      const datesInWeekFour = []
      const datesInWeekFive = []

      let num
      for (num = 0; num <= 6; ++num) {
        datesInWeekOne.push(dates[num])
      }

      let numTwo
      for (numTwo = 7; numTwo <= 13; ++numTwo) {
        datesInWeekTwo.push(dates[numTwo])
      }

      let numThree
      for (numThree = 14; numThree <= 20; ++numThree) {
        datesInWeekThree.push(dates[numThree])
      }

      let numFour
      for (numFour = 21; numFour <= 27; ++numFour) {
        datesInWeekFour.push(dates[numFour])
      }

      let numFive
      for (numFive = 28; numFive <= dates.length - 1; ++numFive) {
        datesInWeekFive.push(dates[numFive])
      }

      let turnDatesToString;

      turnDatesToString = datesInWeekOne.join()
      newArrayForDates.push(turnDatesToString)

      turnDatesToString = datesInWeekTwo.join()
      newArrayForDates.push(turnDatesToString)

      turnDatesToString = datesInWeekThree.join()
      newArrayForDates.push(turnDatesToString)

      turnDatesToString = datesInWeekFour.join()
      newArrayForDates.push(turnDatesToString)

      turnDatesToString = datesInWeekFive.join()
      newArrayForDates.push(turnDatesToString)

      const sevenArraysForChart = reformatDataToShowWastePerWeek(wastes, numOfCoverPerWaste)

    newArray = {
      newArrayForDates,
      sevenArraysForChart
    }
    }

    return newArray;
  }

  const reformatDataToShowWastePerWeek = (wastes, numOfCoverPerWaste) => {
    const arrayOne = [];
    const arrayTwo = [];
    const arrayThree = [];
    const arrayFour = [];
    const arrayFive = [];
    const arraySix = [];
    const arraySeven = [];

    let numOne;
    for (numOne = 0; numOne <= numOfCoverPerWaste; numOne += 7) {
      arrayOne.push(wastes[numOne])
    }

    let numTwo;
    for (numTwo = 1; numTwo <= numOfCoverPerWaste; numTwo += 7) {
      arrayTwo.push(wastes[numTwo])
    }

    let numThree;
    for (numThree = 2; numThree <= numOfCoverPerWaste; numThree += 7) {
      arrayThree.push(wastes[numThree])
    }

    let numFour;
    for (numFour = 3; numFour <= numOfCoverPerWaste; numFour += 7) {
      arrayFour.push(wastes[numFour])
    }

    let numFive;
    for (numFive = 4; numFive <= numOfCoverPerWaste; numFive += 7) {
      arrayFive.push(wastes[numFive])
    }

    let numSix;
    for (numSix = 5; numSix <= numOfCoverPerWaste; numSix += 7) {
      arraySix.push(wastes[numSix])
    }

    let numSeven;
    for (numSeven = 6; numSeven <= numOfCoverPerWaste; numSeven += 7) {
      arraySeven.push(wastes[numSeven])
    }

    const reformatedArrayOne = arrayOne.filter((data) => {
      return data !== undefined;
    })

      // console.log("reformatedArrayOne", reformatedArrayOne)

    const reformatedArrayTwo = arrayTwo.filter((data) => {
      return data !== undefined;
    })

      // console.log("reformatedArrayTwo", reformatedArrayTwo)

    const reformatedArrayThree = arrayThree.filter((data) => {
      return data !== undefined;
    })

      // console.log("reformatedArrayThree", reformatedArrayThree)

    const reformatedArrayFour = arrayFour.filter((data) => {
      return data !== undefined;
    })

      // console.log("reformatedArrayFour", reformatedArrayFour)

    const reformatedArrayFive = arrayFive.filter((data) => {
      return data !== undefined;
    })

      // console.log("reformatedArrayFive", reformatedArrayFive)

    const reformatedArraySix = arraySix.filter((data) => {
      return data !== undefined;
    })

      // console.log("reformatedArraySix", reformatedArraySix)

    const reformatedArraySeven = arraySeven.filter((data) => {
      return data !== undefined;
    })

    // console.log("reformatedArraySeven", reformatedArraySeven)

    const results = {
      reformatedArrayOne,
      reformatedArrayTwo,
      reformatedArrayThree,
      reformatedArrayFour,
      reformatedArrayFive,
      reformatedArraySix,
      reformatedArraySeven
    }

    return results;
  }

  const handleSearch = () => {
    const monthlyIndexArray = montlyArray.filter((data) => {
      return data.show;
    });
    const yearlyIndexArray = yearlyArray.filter((data) => {
      return data.show;
    });

    const data = {
      monthlyIndex: monthlyIndexArray[0].index,
      yearlyIndex: yearlyIndexArray[0].year
    }

    // props.handleSearch(monthlyIndex, yearlyIndex)
    props.handleSearch(data, "wastePerCover")
  }

  const handleYearly = (step) => {

    let getIndex;
    let highestIndex = yearlyArray.length - 1;

    yearlyArray.find((data) => {
      if (data.show === true) {
        getIndex = yearlyArray.indexOf(data)
      }
    })


    if (step === "NEXT" && getIndex !== highestIndex) {

      yearlyArray.map((data) => {
          let index = yearlyArray.indexOf(data)

          if (index === getIndex + 1) {
            data.show = true;
          } else {
            data.show = false;
          }

      })

    } else if (step === "PREV" && getIndex !== 0) {

      yearlyArray.map((data) => {
        let index = yearlyArray.indexOf(data)

        if (index === getIndex - 1) {
          data.show = true
        } else {
          data.show = false
        }
      })
    }

    setYearlyArray(yearlyArray)

    setCount((prevCount) => {
      return prevCount + 1
    })
  }

  const handleMonthly = (step) => {

    let getIndex;

      montlyArray.find((data) => {
        if (data.show === true) {
          getIndex = data.index
        }
      })

    ///NEXT
    if (step === "NEXT" && getIndex !== 12) {

      montlyArray.map((data) => {
        if (data.index <= 12) {
          if (data.index === getIndex + 1) {
            data.show = true;
          } else {
            data.show = false;
          }
        }
      })

    } else if (step === "PREV" && getIndex !== 1) {
      ///PREV

      montlyArray.map((data) => {
        if (data.index <= 12) {
          if (data.index === getIndex - 1) {
            data.show = true;
          } else {
            data.show = false;
          }
        }
      })
    }

    setMonthArray(montlyArray)

    setCount((prevCount) => {
      return prevCount + 1
    })

  }

  function toggleActive(type) {

    switch (type) {
      case "coverSelector":

        changeActiveState({
          coverSelector: true,
          spoilageSelector: false,
          preparationSelector: false,
          allSelector: false,
        });

        setFoodWaste(wastePerCoverForCoverWaste)

        setWasteSteamValue(coverWasteDataArray)


        break;
      case "spoilageSelector":

        changeActiveState({
          coverSelector: false,
          spoilageSelector: true,
          preparationSelector: false,
          allSelector: false,
        });

        setFoodWaste(wastePerCoverForSpoilageWaste)

        setWasteSteamValue(spoilageWasteDataArray)

        break;
      case "preparationSelector":

        changeActiveState({
          coverSelector: false,
          spoilageSelector: false,
          preparationSelector: true,
          allSelector: false,
        });

        setFoodWaste(wastePerCoverForPreparationWaste)

        setWasteSteamValue(preparationWasteDataArray)

        break;
      case "allSelector":

        changeActiveState({
          coverSelector: false,
          spoilageSelector: false,
          preparationSelector: false,
          allSelector: true,
        });

        setFoodWaste(wastePerCoverForAllWaste)

        setWasteSteamValue(totalDailyWasteDataArray)

        break;
      default:
    }

    setTooltip(false);

  }

  return (
    <WastePerCoverContext.Provider
      value={{
          activeState,
          toggleActive,
          yearlyArray,
          montlyArray,
          // triggerHandleYearly,
          // triggerHandleMonthly,
          count,

          totalCW,
          totalPW,
          totalSW,
          totalWaste,
          xAxis,
          display,
          totalCoverInputs,
          percentageOfInputsAreZeros,
          monthName,
          handleSearch,
          searchError,
          selectedYear,
          siteName,

          // weekOneArray,
          // weekTwoArray,
          // weekThreeArray,
          // weekFourArray,
          // weekFiveArray,
          // weekSixArray,
          // weekSevenArray,
          dates,

          handleYearly,
          handleMonthly,

          datesLabel,
          // yearlyArrayForWastePerCover,
          // montlyArrayForWastePerCover
          foodWaste,
          foodWasteXaxis,

          wasteSteamValue,
          coverInputDataArray,
          showTooltip
      }}
  >
      {props.children}
  </WastePerCoverContext.Provider>
  )
}

export default WastePerCoverContextProvider