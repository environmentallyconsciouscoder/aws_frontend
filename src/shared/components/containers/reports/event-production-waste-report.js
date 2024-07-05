import React, { useState, useContext, useEffect } from "react";
import { AccordionHeading, AccordionBody } from "../accordion";
import { setItemInLocalStorage, formatSiteName } from "../../../../utilities.js";

import Subheadings from "../reuseable-components/labels/subheadings"
import SlackChart from "../reuseable-components/charts/slack-chart/slack-chart"

import { DailySalesVsWasteContext } from "../../../../contexts/daily-sales-vs-waste-context";
import { EventProductionWasteContext } from "../../../../contexts/event-production-waste-context";
import { ProductionPreparationContext } from "../../../../contexts/production-preparation-context";

import Pagination from "./../reuseable-components/pagination/pagination.js"

import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

export default function DailySalesVsWasteReport(props) {

  const {
    labels
  } = useContext(WasteLabelsContext);

  const {
    siteName,
    companyName,
    id,
    dataFromDB,
   } = useContext(DailySalesVsWasteContext);

   const {
    chartData,
    index,
    filterDataByDate,
    callProductionPreparationInputsFunc,
    prodPrepInputsData
   } = useContext(EventProductionWasteContext);

   const {
    numberOfWeeks,
    weeklyNumbers,
    weeklyStartDateArry,
    paginationIndex
   } = useContext(ProductionPreparationContext);

  // const [dateLabels, setDateLabels] = useState([]);
  // const [formatedDate, setFormatedDate] = useState([]);
  // const [showDate, setShowDate] = useState(true);
  const [weeksCommencing, setWeeksCommencing] = useState([]);

  const [dailyCoverWaste, setDailyCoverWaste] = useState([0,0,0,0,0,0,0]);
  const [dailyPrepWaste, setDailyPrepWaste] = useState([0,0,0,0,0,0,0]);
  const [dailySpoilageWaste, setDailySpoilageWaste] = useState([0,0,0,0,0,0,0]);
  const [dailyTotalWaste, setDailyTotalWaste] = useState([0,0,0,0,0,0,0]);

  useEffect(() => {
    // setDateLabels(props.weeklyDailyRange)

    // if (props.weeklyDailyLabels) {
    //   setFormatedDate(props.weeklyDailyLabels)
    // }

    if (prodPrepInputsData.dailyCoverWasteArrayFormated !== undefined) {
      setDailyCoverWaste(prodPrepInputsData.dailyCoverWasteArrayFormated)
      setDailyPrepWaste(prodPrepInputsData.dailyPrepWasteArrayFormated)
      setDailySpoilageWaste(prodPrepInputsData.dailySpoilageWasteArrayFormated)
      setDailyTotalWaste(prodPrepInputsData.totalDailyWaste)
    }

   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[siteName, companyName, id, props, chartData,numberOfWeeks])

  const changePageForWeeks = ({ selected }) => {

    const date = "w/c" + " " + weeklyStartDateArry[selected]
    setWeeksCommencing(date)
    // setShowDate(false)
    //get the data for the graph
    if (id && companyName && siteName && weeklyNumbers[selected]) {
      callProductionPreparationInputsFunc(id ,companyName ,siteName, weeklyNumbers[selected]);
    }
};

  return (
    <div
      className={
        props.hideReport ? "dailyWasteChart displayNone" : "dailyWasteChart"
      }
    >
      <AccordionHeading color={"primPurpleBackgroundColor"}>
        <div className="section-title">EVENT PRODUCTION WASTE</div>
        <div className="container">
          <span
            onClick={() => {
              props.setShowEventProductionWaste(
                !props.showEventProductionWaste
              );
              setItemInLocalStorage(
                "eventProductionWaste",
                !props.showEventProductionWaste
              );
            }}
          >
            {props.showEventProductionWaste ? "X " : "| | | "}
          </span>
        </div>
      </AccordionHeading>

      <AccordionBody open={props.showEventProductionWaste}>
        <div className="originalTheme__reportBackgroundColor addPaddingOfHalveRem">
            <Subheadings
              site={formatSiteName(siteName)}
              title="Production Preparation Waste"
              date={weeksCommencing}
            />

            <div className="applyBlueTuckGreen cooperHewittBold">
              <h4>Production Preparation Waste</h4>
            </div>

            <div style={{
              flexDirection: "row",
              justifyContent: "space-between",
              display:"flex",
              padding: "10px",
              fontSize: "10px",
              color: "rgb(140, 112, 140)"
            }}>

              {dataFromDB.map((item, i) => {

                return (
                  <div style={{
                    display:"flex",
                    flexDirection: "column",
                  }}>
                    <div style={{display:"flex"}}>{labels.acronyms.c} {" "} {dailyCoverWaste[i]}</div>
                    <div>{labels.acronyms.s} {" "} {dailySpoilageWaste[i]}</div>
                    <div>{labels.acronyms.p} {" "} {dailyPrepWaste[i]}</div>
                    <div>ALL {" "} {dailyTotalWaste[i]}</div>
                  </div>
                )
              })}

            </div>

            <div className="applyBlueTuckGreen cooperHewittBold">
              <h4>Production Volume</h4>
            </div>

            <SlackChart chartData={chartData} />

            <div className="dailyWasteChart__dateLabel">
              {["MON","TUES", "WED", "THURS", "FRI","SAT", "SUN"].map((data, i) => (
                <div className={index === i ? "applyGoldColor": ""} key={i} onClick={(() => {filterDataByDate(i)})}>{data}</div>
              ))}
            </div>

            <div className="graph__row">
                <div className="graph__message">
                  Click on the date to see data from that day
                </div>
            </div>

            <div style={{
              display: "flex",
              padding: "2rem",
              fontSize: "10px"
            }}>
              <Pagination index={paginationIndex} onPageChange={changePageForWeeks} pageCount={numberOfWeeks} />
            </div>

        </div>
      </AccordionBody>
    </div>
  );
}