import moment from "moment";

/**
 * This returns a number string with 2 decimal places without rounding up 0.000
 * @param {String} number
 */
 export const keepTwoDecimalPlacesWithoutRoundingUp = (num) => {
    // console.log("num",num);
    let result = 0;
    if (num !== 0) {
        let str;
        str = num.toString().split('.');
        var res = str[1].slice(0, 2);
        result = str[0]+'.'+res;
        return result;
    } else {
        return result;
    };
  };

  /**
 * Returns true if number is an integer
 * @param {number}
 * @returns
 */
export const isInt = (n) => {
    return n % 1 === 0;
};

  /**
 * Returns data format 23-29 Aug
 * @param {string}
 * @returns
 */
export const weeklyDateFormat = (startDayOfTheWeek) => {
    let formatedDateLabel = [];
    let monthName;

    const startDate = moment(startDayOfTheWeek);
    const endDate = moment(startDayOfTheWeek).add(6, 'days');

    formatedDateLabel.push(parseInt(startDate.format("D")));
    formatedDateLabel.push(parseInt(endDate.format("D")));

    monthName = startDate.format("MMMM").substr(0, 3);
    return  monthName + " " + formatedDateLabel[0] + "-" + formatedDateLabel[1];
};

/**
 * Return the current week of the year
 * @returns {Number}
 */
 export const getCurrentWeek = () => {
    const formattedDate = moment().format('MM-DD-YYYY');
    const currentWeek = moment(formattedDate, "MMDDYYYY").isoWeek();
    return currentWeek;
  };

/**
 * Return indexes require red color
 * @returns {object}
 */
  export const getIndexesForBackgroundColours =(wasteValues, allCappings, type, activeState) => {

    // console.log("wasteValues",wasteValues)
    // console.log("allCappings",allCappings)
    // console.log("type",type)
    // console.log("activeState",activeState)

    let cwTarget = allCappings[type][0].value
    let spoilageTarget =  allCappings[type][1].value
    let prepTarget =  allCappings[type][2].value

    // console.log("cwTarget",cwTarget)
    // console.log("spoilageTarget",spoilageTarget)
    // console.log("prepTarget",prepTarget)

    let targetIndexArray = []
    // let coverWasteOverTargetIndexArray = []
    // let spoilageWasteOverTargetIndexArray = []
    // let prepWasteOverTargetIndexArray = []

    // console.log("activeState",activeState)
    // console.log("activeState.coverSelector",activeState.coverSelector)
    // console.log("activeState.spoilageSelector",activeState.spoilageSelector)
    // console.log("activeState.preparationSelector",activeState.preparationSelector)

    if (activeState.allSelector) {
        wasteValues.map((data, i) => {
            // console.log("cwTarget",cwTarget)
            // console.log("data",data)
            // console.log("data >= cwTarget",data >= cwTarget)
            const total = cwTarget + spoilageTarget + prepTarget

            if (data >= total) {
                targetIndexArray.push(i)
            }
            return ""
        })
    } else if (activeState.coverSelector) {

        wasteValues.map((data, i) => {
            if (data >= cwTarget) {
                targetIndexArray.push(i)
            }
            return ""
        })

    } else if (activeState.spoilageSelector) {

        wasteValues.map((data, i) => {
            if (data >= spoilageTarget) {
                targetIndexArray.push(i)
            }
            return ""
        })

    } else if (activeState.preparationSelector) {

        wasteValues.map((data, i) => {
            if (data >= prepTarget) {
                targetIndexArray.push(i)
            }
            return ""
        })

    }
    // console.log("targetIndexArray",targetIndexArray);

    return {
        targetIndexArray: targetIndexArray,
    }

  }

  export const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });

    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  /**
 * Return the current week of the year
 * @param {string} date format
 * @returns {Number}
 */
export const currentWeek = (date) => {
  const currentWeek = moment(date, "MMDDYYYY").isoWeek();
  return currentWeek;
};

export const colors = [
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

  /**ß
 * @param {*} String in date
 */
export const getCurrentWeekNumberInTheYear = (firstDate) => {
  //define a date object variable that will take the current system date
  let todaydate = firstDate;
  //find the year of the current date
  var oneJan =  new Date(todaydate.getFullYear(), 0, 1);
  // calculating number of days in given year before a given date
  var numberOfDays =  Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));
  // adding 1 since to current date and returns value starting from 0
  var result = Math.ceil(( todaydate.getDay() + 1 + numberOfDays) / 7);
  return result - 1;
};

 /**
 * This is add up all numbers from an array
 *  * [1,2,3,4].reduce(reducer); etc
 */
  export const reducer = (accumulator, currentValue) => accumulator + currentValue;