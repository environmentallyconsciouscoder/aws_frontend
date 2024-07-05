import React, { useState, useContext, useEffect } from "react";
import { AccordionHeading, AccordionBody } from "../accordion";
import { setItemInLocalStorage, formatSiteName, roundedUpNumberAndTurnBackToNumber } from "../../../../utilities.js";

import Subheadings from "./../reuseable-components/labels/subheadings"
import SlackChart from "./../reuseable-components/charts/slack-chart/slack-chart"

import { DailySalesVsWasteContext } from "../../../../contexts/daily-sales-vs-waste-context";

import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

export default function DailySalesVsWasteReport(props) {

  const {
    labels
   } = useContext(WasteLabelsContext);

  const {
    siteName,
    companyName,
    id,
    chartData,
    dataFromDB,
    filterDataByDate,
    index
   } = useContext(DailySalesVsWasteContext);

  const [dateLabels, setDateLabels] = useState([]);
  const [formatedDate, setFormatedDate] = useState([]);

  useEffect(() => {

    setDateLabels(props.weeklyDailyRange)

    if (props.weeklyDailyLabels) {
      setFormatedDate(props.weeklyDailyLabels)
    }
    // console.log("chartData", chartData)

   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[siteName, companyName, id, props, chartData])

  return (
    <div
      className={
        props.hideReport ? "dailyWasteChart displayNone" : "dailyWasteChart"
      }
    >
      <AccordionHeading color={"primPurpleBackgroundColor"}>
        <div className="section-title">DAILY SALES VS WASTE REPORT</div>
        <div className="container">
          <span
            onClick={() => {
              props.setShowDailySalesVsWasteReport(
                !props.showDailySalesVsWasteReport
              );
              setItemInLocalStorage(
                "dailySalesVsWasteReport",
                !props.showDailySalesVsWasteReport
              );
            }}
          >
            {props.showDailySalesVsWasteReport ? "X " : "| | | "}
          </span>
        </div>
      </AccordionHeading>

      <AccordionBody open={props.showDailySalesVsWasteReport}>
        <div className="originalTheme__reportBackgroundColor addPaddingOfHalveRem">
            <Subheadings
              site={formatSiteName(siteName)}
              title="Daily Sales Vs Waste"
              date={dateLabels}
            />

            <div className="applyBlueTuckGreen cooperHewittBold">
              <h4>Daily Waste</h4>
            </div>

            <div style={{
              flexDirection: "row",
              justifyContent: "space-between",
              display:"flex",
              padding: "10px",
              fontSize: "10px",
              color: "rgb(140, 112, 140)"
            }}>

              {dataFromDB.map((item) => {

                return (
                  <div style={{
                    display:"flex",
                    flexDirection: "column",
                  }}>
                    <div style={{display:"flex"}}>{labels.acronyms.c} {" "} {item.coverWasteMaxDailyValue}</div>
                    <div>{labels.acronyms.s} {" "} {item.spoilageWasteMaxDailyValue}</div>
                    <div>{labels.acronyms.p} {" "} {item.preparationWasteMaxDailyValue}</div>
                    <div>ALL {" "} {roundedUpNumberAndTurnBackToNumber(item.coverWasteMaxDailyValue + item.spoilageWasteMaxDailyValue + item.preparationWasteMaxDailyValue)}</div>
                  </div>
                )
              })}

            </div>

            <div className="applyBlueTuckGreen cooperHewittBold">
              <h4>Menu Sales</h4>
            </div>

            <SlackChart chartData={chartData} />

            <div className="dailyWasteChart__dateLabel">
              {formatedDate.map((data, i) => (
                <div className={index === i ? "applyGoldColor": ""} key={i} onClick={(() => {filterDataByDate(i)})}>{data}</div>
              ))}
            </div>

            <div className="graph__row">
                <div className="graph__message">
                  Click on the date to see data from that day
                </div>
            </div>

        </div>
      </AccordionBody>
    </div>
  );
}