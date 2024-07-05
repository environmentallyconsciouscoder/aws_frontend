import React, { useState, useContext, useEffect } from "react";
import { formatSiteName } from "../../../../utilities.js";

import Subheadings from "../reuseable-components/labels/subheadings"

import { Bar } from "react-chartjs-2";

import Pagination from "./../reuseable-components/pagination/pagination.js"

import { LiveFeedContext } from "../../../../contexts/live-feed-context";

export default function DailySalesVsWasteReport(props) {

  const {

    dataForGraph,
    maxValue,
    numberOfWeeks,
    questions,
    sampleTotal,
    weekCommence,
    allWeeksOfTheYear,

    siteName,
    companyName,
    companyId,

    callLiveFeedContent,
    index
  } = useContext(LiveFeedContext);

  let graphHeight = 500;
  let graphWidth = 1100;

  const changePageForWeeks = ({ selected }) => {

    callLiveFeedContent(companyId, companyName, siteName, allWeeksOfTheYear[selected]);
};

  return (
    <div className= "dailyWasteChart">
        <div className="originalTheme__reportBackgroundColor addPaddingOfHalveRem">
            <Subheadings
              site={formatSiteName(siteName)}
              title="Live Green Feeds - Survey Weekly"
              date={"w/c" + " " + weekCommence}
            />

            <div className="applyBlueTuckGreen cooperHewittBold">
                <h4 className="cooperHewittBold">Survey Results</h4>
            </div>

            <Bar
                  data={{
                    labels: [1,2,3,4, "",1,2,3,4, "",1,2,3,4, "",1,2,3,4],
                    datasets: [

                      {
                        data: dataForGraph,
                        backgroundColor: "rgb(178, 191, 80)",
                        minBarLength: 0.3,
                        categoryPercentage: 1.0,
                        barPercentage: 0.5
                      },

                    ],
                  }}
                  width={graphWidth}
                  height={graphHeight}
                  options={{

                    responsive: true,
                    maintainAspectRatio: true,
                    layout: {
                      padding: {
                          left: 25,
                          right: 25,
                          top: 10,
                          bottom: 10
                      }
                    },
                    scales: {
                      xAxes: [
                        {
                          display: true,
                          gridLines: {
                            display: false,
                          },
                          ticks: {
                            autoSkip: false,
                            fontSize: 7
                          },
                        },
                      ],
                      yAxes: [
                        {
                          gridLines: {
                            display: false,
                          },
                          ticks: {
                            maxTicksLimit: 4,
                            display: false,
                            beginAtZero: true,
                            max: maxValue + 5
                          },
                        },
                      ],
                    },

                    plugins: {
                      datalabels: {
                        display: true,
                        color: "rgb(47, 64, 30)",
                        anchor: "end",
                        align: "end",
                        clamp: true,
                        font: {
                          size: 10,
                          weight: 900,
                        },
                        offset: 4,
                      },

                    },


                    tooltips: {
                    }

                  }}
              />

            <div className="graph__row">
                <div className="graph__message cooperHewittBold">
                  1 = Great and 4 = Bad
                </div>
            </div>

            <div className="applyBlueTuckGreen cooperHewittBold">
              <h4 className="applyBlueTuckGreen cooperHewittBold">Questions:</h4>
            </div>

            <div
            className="applyCooperHewittBold"
            style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  color: "#0f808c",
                  fontSize: "12px",
                  fontWeight: "bold",
            }}>
              {questions.map((data, i) => (
                <div className="applyPurpleColor" key={i}>{data}</div>
              ))}
            </div>

            <div>
              <h4 className="applyBlueTuckGreen cooperHewittBold">Sample Number:</h4>
            </div>

            <div
            className="applyCooperHewittBold"
            style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  color: "#0f808c",
                  fontSize: "12px",
                  fontWeight: "bold",
            }}>
              {sampleTotal.map((data, i) => (
                <div className="applyPurpleColor" key={i}>{data}</div>
              ))}
            </div>

            <div style={{
              display: "flex",
              padding: "2rem",
              fontSize: "10px"
            }}>
              <Pagination index={index} onPageChange={changePageForWeeks} pageCount={numberOfWeeks} />
            </div>

        </div>

    </div>
  );
}