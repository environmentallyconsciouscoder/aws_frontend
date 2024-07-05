import React, { createContext, useEffect, useState } from 'react'
import {
  getYear,
} from "../utilities";
import { getWasteOnAdayOfTheWeek } from "../api";
export const WasteOnAdayOfTheWeekContext = createContext()

const WasteOnAdayOfTheWeekProvider = props => {

  const [wasteOnAdayOfTheWeekData, setWasteOnAdayOfTheWeek] = useState([]);
  const [day, setDay] = React.useState(0);
  const [year, setYear] = React.useState(getYear());
  const [siteName, setSiteName] = React.useState();
  const [startDate, setStartDate] = React.useState(props.startDate);

  useEffect(() => {
    if (props.companyId && props.siteName) {
      getWasteOnAdayOfTheWeek(props.companyId, props.companyName, props.siteName, day, year)
      .then((data) =>{
        setWasteOnAdayOfTheWeek(data.responseData.wasteOnADayOfTheWeek[0]);
        setSiteName(props.siteName.replace(/[^A-Za-z]+/g, ''));
        setStartDate(props.startDate)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.siteName, day, year])

  return (
    <WasteOnAdayOfTheWeekContext.Provider
       value={{
        year,
        day,
        setYear,
        setDay,
        siteName,
        wasteOnAdayOfTheWeekData,
        startDate,
      }}
    >
      {props.children}
    </WasteOnAdayOfTheWeekContext.Provider>
  )
}

export default WasteOnAdayOfTheWeekProvider
