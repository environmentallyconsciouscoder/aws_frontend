import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";

// import {
//   wasteDailyDateRange,
// } from "../../../../utilities";

import {
  weeklyDateFormat,
  getCurrentWeek
} from "../../../../helper";

import { InputsContext } from "../../../../contexts/inputs-context";

import Pagination from "./../reuseable-components/pagination/pagination.js"

import Checkbox from '@mui/material/Checkbox';

export default function CoverInputs(props) {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const {
    thisWeekCoverInputs,
    allWeekCoverInput,
    selectedSiteValueID,
    sendDataToDatabase,
    companyName,
    companyID,
    filterMenuItems,
   } = useContext(InputsContext);

  const { handleSubmit } = useForm();

  const [covers, setCovers] = useState([
    {
      day: "Monday",
      value: 0,
      require: false,
      checkBox: false
    },
    {
      day: "Tuesday",
      value: 0,
      require: false,
      checkBox: false
    },
    {
      day: "Wednesday",
      value: 0,
      require: false,
      checkBox: false
    },
    {
      day: "Thursday",
      value: 0,
      require: false,
      checkBox: false
    },
    {
      day: "Friday",
      value: 0,
      require: false,
      checkBox: false
    },
    {
      day: "Saturday",
      value: 0,
      require: false,
      checkBox: false
    },
    {
      day: "Sunday",
      value: 0,
      require: false,
      checkBox: false
    }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // const dailyChartXaxis = JSON.parse(localStorage.getItem('dailyChartXaxis')) || ""
  // let dateRangeLable = wasteDailyDateRange(dailyChartXaxis);

  const [pageCount, setPageCount] = useState(7);
  const [date, setDate] = useState(7);
  const [firstDateOfTheWeek, setFirstDateOfTheWeek] = useState(7);
  const [weekOfYear, setWeekOfYear] = useState(7);

  useEffect(() => {

      if (thisWeekCoverInputs !== undefined) {

        setFirstDateOfTheWeek(thisWeekCoverInputs.Date)
        setWeekOfYear(thisWeekCoverInputs.weekOfYear)

        const date = weeklyDateFormat(thisWeekCoverInputs.Date)
        setDate(date)
        setPageCount(allWeekCoverInput.length)

        let newArray = [];

        // console.log("thisWeekCoverInputs",thisWeekCoverInputs);

        thisWeekCoverInputs.coversInput.map((data, index) => {
          covers[index].value = data;
          covers[index].checkBox = false;

          newArray.push(covers[index]);
          return ""
        });

        if (thisWeekCoverInputs.checkBox !== undefined) {
          thisWeekCoverInputs.checkBox.map((data, index) => {
            newArray[index].checkBox = data === 1 ? true : false;
            return ""
          });
        }

        // console.log("newArray",newArray);

        setCovers(newArray);
      }

      let numberOfDates;
      let today = new Date().getDay();
      if (today === 0) {
        numberOfDates = 7;
      } else {
        numberOfDates = today;
      }

      for (let i = 0; i < numberOfDates; i++) {

        if (covers[i].value === 0) {
          covers[i].require = true;
          setCovers([...covers]);
        } else {
          covers[i].require = false;
          setCovers([...covers]);
        }
      }

      setIsSubmitting(isSubmitting)

        // eslint-disable-next-line react-hooks/exhaustive-deps
}, [thisWeekCoverInputs]);


  const onSubmit = () => {
    setIsSubmitting(true)


    const confirmedCovers = covers.map((data) => {
      return parseInt(data.value);
    });

    const checkBox = covers.map((data) => {
      if (data.checkBox) {
        return 1
      } else {
        return 0;
      }
    });
    // console.log("checkBox",checkBox);

    const params = {
      companyId: companyID,
      companyName: companyName,
      siteName: selectedSiteValueID,
      covers: confirmedCovers,
      checkBox: checkBox,
      firstDateOfTheWeek: firstDateOfTheWeek,
      weekOfYear: weekOfYear
    }

    // console.log("params",params)

    sendDataToDatabase("COVER INPUTS", params)

    props.history.push('/dashboard');
  };

  const handleChange = (e) => {
    let newArray = [];

    covers.map((item) => {
      if (item.day === e.target.name) {
        item.value = e.target.value;
        newArray.push(item);
      } else {
        newArray.push(item);
      }
      return ""
    });

    setCovers(newArray);
    return ""
  };

  const handleChangeForCheckBox = (e) => {
    let newArray = [];

    covers.map((item) => {
      if (item.day === e.target.name) {
        const newValue = !item.checkBox;
        item.checkBox = newValue;
        newArray.push(item);
      } else {
        newArray.push(item);
      }
      return ""
    });

    // console.log("newArray",newArray);

    setCovers(newArray);
    return ""
  };

  const changePage = ({ selected }) => {
    // console.log("selected", selected)

    // console.log("covers",covers);

    filterMenuItems(selected, "cover-inputs");
  };

  return (

        <div className="inputs__container">
            <div className="inputs__row">
                <div className="inputs__column">

                  <div className="inputs__wrapperForLabels">
                      <div className="report-subtitle">{selectedSiteValueID.replace(/[^A-Za-z]+/g, '').toLowerCase()}</div>
                      <div className="section-title">Input No. of Covers</div>
                      <div className="applyBlueTuckGreen cooperHewittBold">WEEK {date}</div>
                    </div>
                    <div className="inputs__wrapper">

                    <div className="inputs__labels">
                      {covers.map((data, i) => {
                        return (
                          <div className="applyBlueTuckGreen applyCooperHewittBold marginTop" key={i}>{data.day}</div>
                        )
                      })}
                    </div>

                    <div className="col-sm-12">
                      <h3 className="applyBlueTuckGreen applyCooperHewittBold">People /  Events</h3>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        {covers.map((data, i) => {
                          return (
                              <div className="form-group" key={i}>
                                <input
                                  className="form-control"
                                  type="number"
                                  id={i}
                                  name={data.day}
                                  onChange={handleChange}
                                  // placeholder={data.value}
                                  value={data.value}
                                  required={data.require}
                                  onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                />
                                {/* <Checkbox {...label} /> */}
                                <Checkbox checked={data.checkBox} value={data.checkBox} onChange={handleChangeForCheckBox} name={data.day} />
                              </div>
                          );
                        })}

                        <div className="button__wrapper">
                          <button className="btn btn-primary" type="submit">
                            {isSubmitting ? "Submitted" : "Submit"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                </div>

                <Pagination index={getCurrentWeek()} onPageChange={changePage} pageCount={pageCount} />

            </div>
        </div>
  );
}