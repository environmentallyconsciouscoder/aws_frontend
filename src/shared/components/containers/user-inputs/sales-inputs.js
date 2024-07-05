import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";

import {
  weeklyDateFormat,
  getCurrentWeek
} from "../../../../helper";

import { InputsContext } from "../../../../contexts/inputs-context";

import Pagination from "./../reuseable-components/pagination/pagination.js"

export default function SalesInputs(props) {

  const {
    selectedSiteValueID,
    thisWeekSalesInputs,
    sendDataToDatabase,
    companyName,
    companyID,
    allWeekSalesInput,
    filterMenuItems,
   } = useContext(InputsContext);

  const { handleSubmit } = useForm();

  const defaultValues = [
    {
      day: "Monday",
      value: 0,
      require: false
    },
    {
      day: "Tuesday",
      value: 0,
      require: false
    },
    {
      day: "Wednesday",
      value: 0,
      require: false
    },
    {
      day: "Thursday",
      value: 0,
      require: false
    },
    {
      day: "Friday",
      value: 0,
      require: false
    },
    {
      day: "Saturday",
      value: 0,
      require: false
    },
    {
      day: "Sunday",
      value: 0,
      require: false
    }
  ]

  const [sales, setSales] = useState(defaultValues);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [pageCount, setPageCount] = useState(7);
  const [date, setDate] = useState(7);
  const [firstDateOfTheWeek, setFirstDateOfTheWeek] = useState(7);
  const [weekOfYear, setWeekOfYear] = useState(7);

  useEffect(() => {

      if (thisWeekSalesInputs !== undefined) {

        // const pageIndex = getCurrentWeek()
        // setIndex(pageIndex);
        setFirstDateOfTheWeek(thisWeekSalesInputs.Date)
        setWeekOfYear(thisWeekSalesInputs.weekOfYear)

        const date = weeklyDateFormat(thisWeekSalesInputs.Date)
        setDate(date)
        setPageCount(allWeekSalesInput.length)

        let newArray = [];
        thisWeekSalesInputs.salesInput.map((data, index) => {
          sales[index].value = data;
          newArray.push(sales[index]);
          return ""
        });
        setSales(newArray);
      }

      let numberOfDates;
      let today = new Date().getDay();
      if (today === 0) {
        numberOfDates = 7;
      } else {
        numberOfDates = today;
      }

      for (let i = 0; i < numberOfDates; i++) {

        if (sales[i].value === 0) {
          sales[i].require = true;
          setSales([...sales]);
        } else {
          sales[i].require = false;
          setSales([...sales]);
        }
      }

      setIsSubmitting(props.isSubmitting)
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, thisWeekSalesInputs]);

  const onSubmit = () => {
    setIsSubmitting(true)

    // console.log("firstDateOfTheWeek",firstDateOfTheWeek)
    // console.log("weekOfYear",weekOfYear)

    const confirmedSales = sales.map((data) => {
      return parseInt(data.value);
    });

    const params = {
      companyId: companyID,
      companyName: companyName,
      siteName: selectedSiteValueID,
      covers: confirmedSales,
      firstDateOfTheWeek: firstDateOfTheWeek,
      weekOfYear: weekOfYear
    }

    // console.log("params",params)

    sendDataToDatabase("SALES INPUTS",params)

    props.history.push('/dashboard');
  };

  const handleChange = (e) => {
    let newArray = [];

    sales.map((item) => {
      if (item.day === e.target.name) {
        item.value = e.target.value;
        newArray.push(item);
      } else {
        newArray.push(item);
      }
      return ""
    });

    setSales(newArray);
    return ""
  };

  const changePage = ({ selected }) => {
    // console.log("selected", selected)

    filterMenuItems(selected, "sales-inputs");
  };


  return (
      <>

       <div className="inputs__container">
            <div className="inputs__row">
                <div className="inputs__column">

                <div className="inputs__wrapperForLabels">
                  <div className="report-subtitle">{props.selectedSiteValueID.replace(/[^A-Za-z]+/g, '').toLowerCase()}</div>
                  <div className="section-title">Input Daily Sales Food</div>
                  <div className="applyBlueTuckGreen cooperHewittBold">WEEK {date}</div>
                </div>
                <div className="inputs__wrapper">

                <div className="inputs__labels">
                  {sales.map((data, i) => {
                    return (
                      <div className="applyBlueTuckGreen applyCooperHewittBold" key={i}>{data.day}</div>
                    )
                  })}
                </div>

                  <div className="col-sm-12">
                    <h3 className="applyBlueTuckGreen applyCooperHewittBold">Sales</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {sales.map((data, i) => {
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

      </>
  );
}