import moment from "moment";

export const addDaysToDate = (firstDayOfTheWeek, numberOfdays) => {
  const new_date = moment(firstDayOfTheWeek).add(numberOfdays, 'days');
  return new_date.format('MMM DD YYYY');
}

export const formatSiteName = (name) => {
  if (name) {
    return name.replace(/[^A-Za-z]+/g, '').toLowerCase();
  }
}

export const formatDateToDatabaseDateFormat = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const getWeekOfTheYear = () => {

  Date.prototype.getWeek = function () {
    var target  = new Date(this.valueOf());
    var dayNr   = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
  }

  const d= new Date();
  return d.getWeek()
}

// function getWeek() {
//   // Create a copy of this date object
//   var target  = new Date(this.valueOf());

//   // ISO week date weeks start on monday, so correct the day number
//   var dayNr   = (this.getDay() + 6) % 7;

//   // Set the target to the thursday of this week so the
//   // target date is in the right year
//   target.setDate(target.getDate() - dayNr + 3);

//   // ISO 8601 states that week 1 is the week with january 4th in it
//   var jan4    = new Date(target.getFullYear(), 0, 4);

//   // Number of days between target date and january 4th
//   var dayDiff = (target - jan4) / 86400000;

//   if(new Date(target.getFullYear(), 0, 1).getDay() < 5) {
//     // Calculate week number: Week 1 (january 4th) plus the
//     // number of weeks between target date and january 4th
//     return 1 + Math.ceil(dayDiff / 7);
//   }
//   else {  // jan 4th is on the next week (so next week is week 1)
//     return Math.ceil(dayDiff / 7);
//   }
// }

export const getMonthAsAnumber = () => {
  const currentDate = new Date();
  const getMonthAsAnumber = moment(currentDate).format('M');
  return getMonthAsAnumber;
}

export const getYear = () => {
  var d = new Date();
  var n = d.getFullYear();
  return n;
}

export const getYearsArray = (data) => {

  let yearsArray = [];

  let date = moment(data).format('YYYY')
  let todayDate = new Date();
  let currentYear = todayDate.getFullYear();

  if (currentYear === date) {
    yearsArray.push({
      year: date,
      show: true
    });
  } else {
    for (let year = currentYear; year >= date; year--) {
      yearsArray.push({
        year: year,
        show: year === currentYear
      });
    }
  }
  return yearsArray.reverse();
};

export const splitCamelCaseStringAndMakeFirstCharacterUpperCase = (data) => {
  if (data) {
    const formatedData = data.replace(/([a-z])([A-Z])/g, '$1 $2');
    const makeFirstCharacterCapital = formatedData.charAt(0).toUpperCase() + formatedData.slice(1)
    return makeFirstCharacterCapital;
  }
}

export const getTotalMonthlyValue = (
  monthlyValueCoverWaste,
  monthlyValuePreparationWaste,
  monthlyValueSpoliageWaste
) => {
  let totalMonthlyValue = [];
  let i;
  if (monthlyValueCoverWaste !== undefined) {
    for (i = 0; i < 12; i++) {
      let coverWaste = monthlyValueCoverWaste[i];
      let preparationWaste =
        monthlyValuePreparationWaste[i];
      let spoliageWaste = monthlyValueSpoliageWaste[i];

      totalMonthlyValue.push(coverWaste + preparationWaste + spoliageWaste);
    }
  }
  return totalMonthlyValue;
};

export const reducer = (accumulator, currentValue) => {
  return accumulator + currentValue;
}

export const getCurrentAndPreviousMonths = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date  = new Date();
  const currentMonthNum = date.getMonth();
  let previousMonthNum;
  if (currentMonthNum === 0) {
    previousMonthNum = 11
  } else {
    previousMonthNum = currentMonthNum - 1
  }
  let values = {
    currentMonth: months[currentMonthNum],
    previousMonth: months[previousMonthNum]
  }
  return values;
}

export const getMonths = () => {
  const date  = new Date();
  const month = date.getMonth();
  return month;
}

export const getMonthsWord = () => {
  const date  = new Date();
  const month = date.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month];
}

export const roundedUpNumberAndTurnBackToString = (data) => {
  if (data) {
    let changeToNumber = parseFloat(data)
    let roundUp = parseInt(changeToNumber.toFixed(0));
    return parseInt(roundUp)
  }
  if(0){
    return parseInt(data)
  }
  if("0"){
    return parseInt(data)
  }
};

export const roundedUpNumberAndTurnBackToNumber = (data) => {
  if (data) {
    let changeToNumber = parseFloat(data)
    let roundUp = parseInt(changeToNumber.toFixed(0));
    return parseInt(roundUp)
  }
  if(0){
    return parseInt(data)
  }
  if("0"){
    return parseInt(data)
  }
};

export const roundedUpNumberTwoPointsAndTurnBackToString = (data) => {
  if (data) {
    // let roundUp = parseFloat(data).toFixed(2);
    let roundUp = parseFloat(data.toFixed(2));
    return parseFloat(roundUp)
  }
  if(0){
    return data
  }
}

export const getLocalStorageData = (data) => {
  const localData = localStorage.getItem(data);
  return localData ? JSON.parse(localData) : [];
};

export const setItemInLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const formatStartDate = (startDate) => {
  var data = moment(startDate);
  var newDateFormat =
    data.format("MMM").toUpperCase().substr(0, 3) + "-" + data.format("D");
  return newDateFormat;
};

export const getEndDate = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const dayNumber = String(today.getDate());
  const monthNumber = parseInt(String(today.getMonth())); //January is 0!
  const monthName = months[monthNumber];
  const monthName3Characters = monthName.toUpperCase().substr(0, 3);
  return monthName3Characters + "-" + dayNumber;
};

export const hourlyWasteDateConverter = (data) => {
  var date = moment(data, "YYYY-MM-DD");
  return (
    date.format("dddd").toUpperCase().substr(0, 3) + " " + date.format("Do")
  );
};

export const total = (data) => {
  return data.reduce((a, b) => a + b, 0);
};

export const totalCosts = (allSites, data) => {
  return allSites
    .map((site) => {
      return site[data];
    })
    .reduce((a, b) => a + b, 0);
};

export const numberOfMonthsBetweenStartDateAndCurrentDate = (startData) => {

  const startYear = new Date(startData).getFullYear();
  const thisYear = new Date().getFullYear();
  const thisYearMinisStartYear = thisYear - startYear;

  let totalNumberOfMonths = [];

  for (let i = 0; i <= thisYearMinisStartYear; i++) {
    const year = startYear + i

    if (year === thisYear) {
      const thisYearMonths = new Date().getMonth();
      const formatedMonthsToGet1To12Not0To11 = thisYearMonths + 1
      totalNumberOfMonths.push(formatedMonthsToGet1To12Not0To11);
    } else if (year === startYear) {
      const formatedToMomentData = moment(startData, "YYYY-MM-DD");
      const months = formatedToMomentData.format('M');
      //if the start date is in december it will count that one month
      let numOfMonths;
      if ((12 - months) === 0) {
        numOfMonths = 1
      } else {
        numOfMonths = 12 - months
      }
      totalNumberOfMonths.push(numOfMonths);
    } else {
      totalNumberOfMonths.push(12);
    }
  }

  const sumOfTotalNumberOfMonths = totalNumberOfMonths.reduce((a, b) => a + b, 0)
  return sumOfTotalNumberOfMonths;
};

export const convertDate = (dateLabel) => {
  let formatedDateLabel;
  let formattingDataLabel = dateLabel.map((date) => {
    var data = moment(date, "YYYY-MM-DD");
    let formatedDateLabel = [];
    formatedDateLabel.push(
      data.format("dddd").toUpperCase().substr(0, 3) + " " + data.format("D")
    );
    return formatedDateLabel;
  });
  formatedDateLabel = formattingDataLabel
  return formatedDateLabel;
};

export const weeklyWasteDateRange = (dateLabel) => {
  if (dateLabel !== undefined) {
    let lastWeek = moment(dateLabel.lastWeek, "YYYY-MM-DD");
    let thisWeek = moment(dateLabel.thisWeek, "YYYY-MM-DD");
    let lastWeekMonthName = lastWeek.format("MMMM").substr(0, 3);
    let thisWeekMonthName = thisWeek.format("MMMM").substr(0, 3);

    let convertToJavascriptDataOflastWeekDate = new Date(lastWeek);
    let dateNumberOfLastWeek = convertToJavascriptDataOflastWeekDate.getDate()

    let convertToJavascriptData = new Date(thisWeek);
    let sixDays = (60 * 60 * 24 * 1000) * 6;
    let datein6daysTime = new Date(convertToJavascriptData.getTime() + sixDays);
    let dateNumber = datein6daysTime.getDate()

    return `${dateNumberOfLastWeek} ${lastWeekMonthName} to ${dateNumber} ${thisWeekMonthName} `
  }
}

export const wasteDailyDateRange = (dateLabel) => {
  let formatedDateLabel;
  let monthName;

  let formatingDateLabel = dateLabel.map((date) => {

    var data = moment(date, "YYYY-MM-DD");

    let formatedDateLabel = [];
    formatedDateLabel.push(parseInt(data.format("D")));

    monthName = data.format("MMMM").substr(0, 3);
    return formatedDateLabel
  });

  formatedDateLabel = formatingDateLabel

  let indexOfLastArrayValue = formatedDateLabel.length - 1

  let smallestNumber = formatedDateLabel[0];
  let highestNumber = formatedDateLabel[indexOfLastArrayValue];

  return smallestNumber + "-" + highestNumber + " " + monthName;
};

export const maxNumForHourlyChartFunction = (hourlyWasteValues) => {
  // return Math.max.apply(Math, hourlyWasteValues) + 5;
  let maxNum = Math.max.apply(Math, hourlyWasteValues)
  return Math.max.apply(Math, hourlyWasteValues) + maxNum
};

export const maxNumForCoverPerWasteChartFunction = (data) => {
  // let maxNum = 0.5;
  let maxNum = Math.max.apply(Math, data)
  return Math.max.apply(Math, data) + maxNum;
};

export const maxNumArrays = (array1, array2, array3) => {
  let newArray = [];
  newArray.push(Math.max.apply(Math, array1));
  newArray.push(Math.max.apply(Math, array2));
  newArray.push(Math.max.apply(Math, array3));
  return Math.max.apply(Math, newArray);
};

export const maxNumArray = (array) => {
  return Math.max.apply(Math, array) + 50;
};

export const minNumArray = (array) => {
  return Math.min.apply(Math, array);
};

export const calculateTodaysDate = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const dayNumber = String(today.getDate());
  const monthNumber = parseInt(String(today.getMonth())); //January is 0!
  const monthName = months[monthNumber];
  const year = today.getFullYear();
  const date = new Date();
  const index = date.getDay();
  const daysName = days[index];

  return daysName + " " + dayNumber + " " + monthName + " " + year;
};
