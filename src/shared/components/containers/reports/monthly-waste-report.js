
import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";
import useWindowDimensions from "../../libs/use-window-dimensions";
import { getEndDate, reducer, roundedUpNumberAndTurnBackToNumber } from "../../../../utilities";

import { MonthlyWasteContext } from "../../../../contexts/monthly-waste-context";

import { AccordionHeading, AccordionBody } from "../accordion"

import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

import Tooltip from "@material-ui/core/Tooltip";

export default function MonthlyWasteChart(props) {
  Chart.defaults.global.defaultFontFamily = "CooperHewitt-Book";

  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(true);

  const {
    labels
   } = useContext(WasteLabelsContext);

  const {
    coverWasteInCurrentMonth,
    preparationWasteInCurrentMonth,
    spoilageWasteInCurrentMonth,

    currentMonthCoverWasteArray,
    currentMonthPrepWasteArray,
    currentMonthSpoilageWasteArray,

    monthlyChanges,

    handleMonthlyValues,
    displayMonthlyTrends,
    monthlySelectedValue,

    showTooltip
  } = useContext(MonthlyWasteContext);

  const [monthlyCoverWaste, setCurrentMonthCoverWasteArray] = React.useState([0]);
  const [monthlyPreparationWaste, setCurrentMonthPrepWasteArray] = React.useState([0]);
  const [monthlySpoilageWaste, setCurrentMonthSpoilageWasteArray] = React.useState([0]);

  let graphHeight = 130;
  let graphWidth = 400;

  const { width } = useWindowDimensions();

  let siteId;

  let totalMonthlyValueFontSize = "13"
  let xAxisLabel = "13"

  if (width <= 700) {
    graphWidth = 260;
    graphHeight = 279;
    totalMonthlyValueFontSize="8"
    xAxisLabel = "8"
  }

  let barColors;

  const [appState, changeState] = useState({
    activeObject: {
      id: 3,
      val: props.monthlySelectedValue,
      name: "TOTAL WASTE",
    },
    objects: [
      { id: 0, val: "C", name: "COVER WASTE" },
      { id: 1, val: "S", name: "SPOILAGE WASTE" },
      { id: 2, val: "P", name: "PREPARATION WASTE" },
      { id: 3, val: "A", name: "TOTAL WASTE" },
    ],
  });

  const [activeState, changeActiveState] = useState({
    coverWaste: false,
    spoliageWaste: false,
    productionWaste: false,
    allWaste: true,
  });


  function toggleActive(type) {
    switch (type) {
      case "cover":
        changeActiveState({
          coverWaste: true,
          spoliageWaste: false,
          productionWaste: false,
          allWaste: false,
        });
        changeState({ ...appState, activeObject: appState.objects[0] });
        break;
      case "production":
        changeActiveState({
          coverWaste: false,
          spoliageWaste: false,
          productionWaste: true,
          allWaste: false,
        });
        changeState({ ...appState, activeObject: appState.objects[2] });
        break;
      case "spoliage":
        changeActiveState({
          coverWaste: false,
          spoliageWaste: true,
          productionWaste: false,
          allWaste: false,
        });
        changeState({ ...appState, activeObject: appState.objects[1] });
        break;
      case "all":
        changeActiveState({
          coverWaste: false,
          spoliageWaste: false,
          productionWaste: false,
          allWaste: true,
        });
        changeState({ ...appState, activeObject: appState.objects[3] });
        break;
      default:
    }
  }


  useEffect(() => {

    setCurrentMonthCoverWasteArray(currentMonthCoverWasteArray)
    setCurrentMonthPrepWasteArray(currentMonthPrepWasteArray)
    setCurrentMonthSpoilageWasteArray(currentMonthSpoilageWasteArray)

    if (props.showMonthlyChart && showTooltip) {
      setTooltipIsOpen(true)
    } else {
      setTooltipIsOpen(false)
    }


    if (monthlySelectedValue === "C") {
      changeActiveState({
        coverWaste: true,
        spoliageWaste: false,
        productionWaste: false,
        allWaste: false,
      });
      changeState({ ...appState, activeObject: appState.objects[0] });
    } else if (monthlySelectedValue === "S") {
      changeActiveState({
        coverWaste: false,
        spoliageWaste: true,
        productionWaste: false,
        allWaste: false,
      });
      changeState({ ...appState, activeObject: appState.objects[1] });
    } else if (monthlySelectedValue === "P") {
      changeActiveState({
        coverWaste: false,
        spoliageWaste: false,
        productionWaste: true,
        allWaste: false,
      });
      changeState({ ...appState, activeObject: appState.objects[2] });
    } else if (monthlySelectedValue === "A") {
      changeActiveState({
        coverWaste: false,
        spoliageWaste: false,
        productionWaste: false,
        allWaste: true,
      });
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
},[currentMonthCoverWasteArray, currentMonthPrepWasteArray, currentMonthSpoilageWasteArray, monthlySelectedValue, props.showMonthlyChart]);


  if (props.siteID !== undefined) {
    siteId = props.siteID;
  }

  const getChartData = (canvas) => {
    const data = {
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUNE",
        "JULY",
        "AUG",
        "SEPT",
        "OCT",
        "NOV",
        "DEC",
      ],
      datasets: [
        {
          label: "Total wastes",
          siteId: siteId,
          data: props.showPounds
          ? displayMonthlyTrends.map((data) => {
            return (data * 2.775).toFixed(0);
          })
          : displayMonthlyTrends.map((data) => {
            return data.toFixed(0);
          }),
          backgroundColor: barColors,
          barPercentage: 0.7,
          categoryPercentage: 0.9,
          lineTension: 0,
        }
      ],
    };
    return data;
  };

  let months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUNE",
    "JULY",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  let monthlyWasteTextColor;

  if (props.showDarkTheme) {
    monthlyWasteTextColor = "rgb(255, 231, 227)"
  } else {
    monthlyWasteTextColor = "rgb(15, 128, 140)"
  }

  return (
    <div className={props.hideReport ? "monthlyWasteChart displayNone":"monthlyWasteChart"}>

      <AccordionHeading>
        <div className="section-title">MONTHLY WASTE & MONTHLY TREND</div>
        <div className="container">
          <span onClick={() => props.handleChangeForCheckedAndAccordion(!props.showMonthlyChart, "monthlyChartSwitch")}>
            {props.showMonthlyChart ? ("X"):"| | | "}
          </span>
        </div>
      </AccordionHeading>


      <AccordionBody open={props.showMonthlyChart}>

        <div className= { props.showDarkTheme ? "darkTheme__reportBackgroundColor addPaddingOfHalveRem": "originalTheme__reportBackgroundColor addPaddingOfHalveRem"}>

          <div className="report-subtitle">{props.siteName} </div>

          <div
            className="monthlyWasteChart__titleWrapper"
          >
            <div className="section-title">MONTHLY WASTE <div className="applyMarginRightAndLeft">{props.showPounds? "(£)" : "(Kg)" }</div></div>
          </div>

          <div className="MonthlyWasteChart--spacing--secondRow">


            <div className="MonthlyWasteChart--spacing--secondRow--csp">
                <>
              <div
                style={{
                  display: "flex",
                  width: "13%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className={activeState.coverWaste ? "active" : "inactive"}
                  id={1}
                  onClick={() => {
                    toggleActive("cover");
                  }}
                >
                </div>
                <div
                  className={activeState.spoliageWaste ? "active" : "inactive"}
                  id={1}
                  onClick={() => {
                    toggleActive("spoliage");
                  }}
                >
                </div>
                <div
                  className={activeState.productionWaste ? "active" : "inactive"}
                  id={1}
                  onClick={() => {
                    toggleActive("production");
                  }}
                >
                </div>
                <div
                  className={activeState.allWaste ? "active" : "inactive"}
                  id={1}
                  onClick={() => {
                    toggleActive("all");
                  }}
                >
                </div>
              </div>

              <div>
                <div className="monthlyWasteChart__dateLabel__CSP">
                  <div className="monthlyWasteChart__dateLabel__CSP__coverwastesSquare"></div>
                  {labels.titleLabels.c}
                  <div className="monthlyWasteChart__dateLabel__CSP__spoliageSquare"></div>
                  {labels.titleLabels.s}
                  <div className="monthlyWasteChart__dateLabel__CSP__preparationSquare"></div>
                  {labels.titleLabels.p}
                </div>
              </div>

              </>

            </div>
            </div>


          <div className="monthlyWasteChart--labelTrends--title">
            <div>
              <div className="cooperHewittBold applyBlueTuckGreen">Monthly Trend: {(appState.activeObject.name).toLowerCase()}</div>
            </div>
          </div>


          <div className="monthlyWasteChart--labelTrends">
            {props.showPounds?
              displayMonthlyTrends.map((data, i) => (
                <div className="monthlyWasteChart--labelTrends__spacing" key={i}>
                  {data > 0 ? <div className="applyCooperHewittBold monthlyWasteChart--labelTrends__spacing">{"+"}{(data * 2.775).toFixed(0)}</div>:

                  <div className={props.showDarkTheme? "darkTheme__numberColor cooperHewittBold monthlyWasteChart--labelTrends__spacing" :"applyPurpleColor monthlyWasteChart--labelTrends__spacing"}>
                    {(data * 2.775).toFixed(0)}
                  </div>}

                </div>
              )) :
              displayMonthlyTrends.map((data, i) => (
                <div className="monthlyWasteChart--labelTrends__spacing" key={i}>
                  {data > 0 ? <div className="applyCooperHewittBold monthlyWasteChart--labelTrends__spacing">{"+"}{data}</div>:

                  <div className={props.showDarkTheme? "darkTheme__numberColor cooperHewittBold monthlyWasteChart--labelTrends__spacing" :"applyPurpleColor monthlyWasteChart--labelTrends__spacing"}>
                    {data}
                  </div>}
                </div>
              ))

            }
          </div>

          <div className="monthlyWasteChart--labelTrends--title">
            <div>
              <div className="cooperHewittBold applyBlueTuckGreen">Monthly Waste:</div>
            </div>
          </div>

          <Bar
            data={{
              labels: [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
              datasets: [
                {
                  label: "coverWaste",
                  data: props.showPounds
                  ? monthlyCoverWaste.map((data) => {
                    return (data * 2.775).toFixed(0);
                  }) : monthlyCoverWaste,
                  fill: false,
                  backgroundColor: "rgba(140, 112, 140, 0.5)",
                  minBarLength: 0.3,
                  barPercentage: 0.7,
                  categoryPercentage: 0.7,
                },
                {
                  label: "spoilage",
                  data: props.showPounds
                  ? monthlySpoilageWaste.map((data) => {
                    return (data * 2.775).toFixed(0);
                  }) : monthlySpoilageWaste,
                  fill: false,
                  backgroundColor: "rgb(212, 190, 0)",
                  minBarLength: 0.3,
                  barPercentage: 0.7,
                  categoryPercentage: 0.7,
                },
                {
                  label: "preparation",
                  data: props.showPounds
                  ? monthlyPreparationWaste.map((data) => {
                    return (data * 2.775).toFixed(0);
                  }) : monthlyPreparationWaste,
                  fill: false,
                  backgroundColor: "rgba(133, 165, 101, 0.5)",
                  minBarLength: 0.3,
                  barPercentage: 0.7,
                  categoryPercentage: 0.7,
                },
              ],
            }}
            width={graphWidth}
            height={graphHeight}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              scales: {

                xAxes: [
                  {
                    stacked: true,
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                      fontColor: "rgb(15, 128, 140)",
                    },
                    display: false,
                  },
                ],
                yAxes: [
                  {
                    stacked: true,
                    display: false,
                    gridLines: {
                      display: false,
                    }
                  },
                ],
              },

              plugins: {
                datalabels: {
                  display: true,
                  anchor: "top",
                  align: "middle",
                  color: monthlyWasteTextColor,
                  font: {
                          size: 9,
                          weight: "bold",
                        }
                },
              },
            }}
          />

          <div
            className="monthlyWasteChart--axisLabel"
          >
            {months.map((data, i) => (
              <div key={i}>{data}</div>
            ))}
          </div>

          <div className="monthlyWasteChart__currentMonth applyBlueTuckGreen CSPFullLabelNameFontsize cooperHewittBold">
                <div className="applyMarginRightAndLeft cooperHewittBold applyGoldColor">{"(" + (getEndDate()) + ")"}</div>

                  <div className="applyMarginRightAndLeft cooperHewittBold">Current Month Food Waste</div>
                    {labels.acronyms.c}

                  <div className={props.showDarkTheme? "darkTheme__numberColor applyMarginRightAndLeft cooperHewittBold" :"applyPurpleColor applyMarginRightAndLeft cooperHewittBold"}>
                    {props.showPounds ? (coverWasteInCurrentMonth * 2.755).toFixed(0)  : roundedUpNumberAndTurnBackToNumber(coverWasteInCurrentMonth) }
                  </div>

                  <div className="applyMarginRightAndLeft cooperHewittBold">+</div>

                  {labels.acronyms.s}

                  <div className={props.showDarkTheme? "darkTheme__numberColor applyMarginRightAndLeft cooperHewittBold" :"applyPurpleColor applyMarginRightAndLeft cooperHewittBold"}>
                    {props.showPounds ? (spoilageWasteInCurrentMonth * 2.755).toFixed(0)  : roundedUpNumberAndTurnBackToNumber(spoilageWasteInCurrentMonth) }
                  </div>

                  <div className="applyMarginRightAndLeft cooperHewittBold">+</div>

                  {labels.acronyms.p}

                  <div className={props.showDarkTheme? "darkTheme__numberColor applyMarginRightAndLeft cooperHewittBold" :"applyPurpleColor applyMarginRightAndLeft cooperHewittBold"}>
                    {props.showPounds ? (preparationWasteInCurrentMonth * 2.755).toFixed(0)  : roundedUpNumberAndTurnBackToNumber(preparationWasteInCurrentMonth) }
                  </div>

                  <div className="applyMarginRightAndLeft cooperHewittBold">=</div>

                  <div className={props.showDarkTheme? "darkTheme__numberColor applyMarginRightAndLeft cooperHewittBold" :"applyPurpleColor applyMarginRightAndLeft cooperHewittBold"}>
                    {" "}
                    {props.showPounds
                    ? "£" + ((roundedUpNumberAndTurnBackToNumber(coverWasteInCurrentMonth) + roundedUpNumberAndTurnBackToNumber(spoilageWasteInCurrentMonth) + roundedUpNumberAndTurnBackToNumber(preparationWasteInCurrentMonth)) * 2.775).toFixed(0)
                    : (roundedUpNumberAndTurnBackToNumber(coverWasteInCurrentMonth) + roundedUpNumberAndTurnBackToNumber(spoilageWasteInCurrentMonth) + roundedUpNumberAndTurnBackToNumber(preparationWasteInCurrentMonth)) + "Kg"}
                  </div>

              </div>

          <div
            className="monthlyWasteChart__headingSection--spacing"
          >

          <div className="monthlyWasteChart__CspLabel">
            <div
              className={activeState.coverWaste ? "active" : "inactive"}
              id={1}
              onClick={() => {
                toggleActive("cover");
              }}
            >

              <Tooltip
                open={tooltipIsOpen}
                onClose={() => setTooltipIsOpen(false)}
                title="clickable waste stream"
                arrow
              >

              <h2 id={"C"}
              onClick={handleMonthlyValues}
                  className={activeState.coverWaste ? "reduceOpacity" : ""}
              >
                {labels.acronyms.c}
              </h2>

              </Tooltip>

            </div>
            <div
              className={activeState.spoliageWaste ? "active" : "inactive"}
              id={1}
              onClick={() => {
                toggleActive("spoliage");
              }}
            >

              <Tooltip
                open={tooltipIsOpen}
                onClose={() => setTooltipIsOpen(false)}
                arrow
              >

              <h2 id={"S"}
              onClick={handleMonthlyValues}
                  className={activeState.spoliageWaste ? "reduceOpacity" : ""}
              >
                {labels.acronyms.s}
              </h2>

              </Tooltip>

            </div>
            <div
              className={activeState.productionWaste ? "active" : "inactive"}
              id={1}
              onClick={() => {
                toggleActive("production");
              }}
            >

              <Tooltip
                open={tooltipIsOpen}
                onClose={() => setTooltipIsOpen(false)}
                arrow
              >

                <h2 id={"P"}
                onClick={handleMonthlyValues}
                    className={activeState.productionWaste ? "reduceOpacity" : ""}
                >
                  {labels.acronyms.p}
                </h2>

              </Tooltip>

            </div>
            <div
              className={activeState.allWaste ? "active" : "inactive"}
              id={1}
              onClick={() => {
                toggleActive("all");
              }}
            >

              <Tooltip
                open={tooltipIsOpen}
                onClose={() => setTooltipIsOpen(false)}
                arrow
              >

                <h2 id={"A"}
                onClick={handleMonthlyValues}
                  className={activeState.allWaste ? "reduceOpacity" : ""}
                >
                  ALL
                </h2>

              </Tooltip>

            </div>
          </div>

          <div className="section-title">MONTHLY TREND</div>


            <div className="section-title">
            </div>
            <div className="section-title">
              <div className="applyMarginRightAndLeft">Total Change</div>
              <div className="applyPurpleColor">
                {props.showPounds ? (monthlyChanges.reduce(reducer) * 2.775).toFixed(0) : (monthlyChanges.reduce(reducer)).toFixed(0) }
              </div>
            </div>




          </div>

          <div
          className="monthlyWasteChart__lineChart"
          style={{ position: "relative" }}>
            <Bar
              data={getChartData}
              width={graphWidth}
              height={graphHeight}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                tooltips: {
                  enabled: false,
                },
                legend: {
                  display: false,
                },
                scales: {
                  xAxes: [
                    {
                      display: true,
                      gridLines: {
                        display: false,
                      },
                      ticks: {
                        fontColor: "rgb(15, 128, 140)",
                        fontSize: xAxisLabel
                      },
                    },
                  ],
                  yAxes: [
                    {
                      display: false,
                      gridLines: {},
                    },
                  ],
                },
                plugins: {
                  datalabels: {
                    display: true,
                    anchor: "bottom",
                    align: "bottom",
                    color: function (context) {
                          var index = context.dataIndex;
                          var value = context.dataset.data[index];

                          if (value > 0) {
                            return "rgba(255, 0, 0, 0.9)";
                          } else {
                            if (props.showDarkTheme) {
                              return "rgb(255, 231, 227)";
                            } else {
                              return "rgba(133, 165, 101, 1)";
                            }

                          }
                    },
                    font: {
                          size: totalMonthlyValueFontSize,
                          weight: 900,
                        },
                    formatter: function (value, context) {

                      if (value > 0) {

                      return `+ ${value}`
                      } else {
                      return value;
                      }
                    },
                  },
                },
              }}
            />
          </div>

        </div>

      </AccordionBody>

    </div>
  );
}

