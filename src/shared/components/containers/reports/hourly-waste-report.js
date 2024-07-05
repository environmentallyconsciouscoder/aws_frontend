import React, { useState, useEffect, useContext } from "react";
import Chart from "chart.js";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import useWindowDimensions from "../../libs/use-window-dimensions";

import { WasteCapContext } from "../../../../contexts/waste-cap-context";
import { HourlyFoodWasteContext } from "../../../../contexts/hourly-food-waste-context";

import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

import { AccordionHeading, AccordionBody } from "../accordion"

import { hourlyWasteDateConverter, maxNumForHourlyChartFunction, roundedUpNumberAndTurnBackToNumber } from "../../../../utilities";

import Tooltip from "@material-ui/core/Tooltip";

Chart.defaults.global.defaultFontFamily = "CooperHewitt-Book";
Chart.defaults.global.legend.display = false;
Chart.defaults.global.hover.intersect = false;
Chart.defaults.global.tooltips.enabled = false;

export default function HourlyWasteChart(props) {

  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(true);

  const {
    labels
   } = useContext(WasteLabelsContext);

  const {
    hourlyWasteValues,
    hourlyWasteSelector,

    hourlyCoverWasteData,
    hourlyPreparationWasteData,
    hourlySpoilageWasteData,

    showCoverWasteLabelRed,
    handleHourlyWasteCategory,

    hourlyWasteDate,
    clickOnHourlyBarChart,

    getIndexesForBackgroundColours,

    showTooltip
   } = useContext(HourlyFoodWasteContext);


  const {
    hourlyCoverWastes,
    hourlySpoliageWastes,
    hourlyPeparationWastes
   } = useContext(WasteCapContext);

  //  console.log("hourlyCoverWaste",hourlyCoverWaste)
  //  console.log("hourlyPreparationWaste",hourlyPreparationWaste)
  //  console.log("hourlySpoilageWaste",hourlySpoilageWaste)

  //  console.log("hourlyCoverWasteData",hourlyCoverWasteData)
  //  console.log("hourlyPreparationWasteData",hourlyPreparationWasteData)
  //  console.log("hourlySpoilageWasteData",hourlySpoilageWasteData)

  const { width } = useWindowDimensions();
  let hourlyWasteHeight = 129;
  let hourlyWasteWidth = 400;
  let fontSize = 12

  const [activeState, changeActiveState] = useState({
    coverWaste: false,
    spoliageWaste: false,
    productionWaste: true,
  });


  const [ dailyWasteCappingInPounds, setDailyWasteCappingInPounds ] = useState([])
  const [ prepWasteCappingInPounds, setPrepWasteCappingInPounds ] = useState([])
  const [ spoilageWasteCappingInPounds, setSpoilageWasteCappingInPounds ] = useState([])

  // let hourlyWasteDataFormated = hourlyWasteValues ? hourlyWasteValues : []

  let hourlyCoverWastesCap = hourlyCoverWastes ? hourlyCoverWastes : 0
  let hourlySpoliageWastesCap = hourlySpoliageWastes ? hourlySpoliageWastes : 0
  let hourlyPeparationWastesCap = hourlyPeparationWastes ? hourlyPeparationWastes : 0

  const [warning, setWarning] = useState(hourlyPeparationWastesCap);

  const [ displayValues, setDisplayValues ] = useState([])

  // let barColors = "rgb(178, 191, 80)";

  const [appState, changeState] = useState({
    activeObject: {
      id: 2,
      val: hourlyWasteSelector,
      name: "PREPARATION WASTE",
    },
    objects: [
      { id: 0, val: "C", name: "COVER WASTE" },
      { id: 1, val: "S", name: "SPOILAGE WASTE" },
      { id: 2, val: "P", name: "PREPARATION WASTE" },
    ],
  });

  let barColors = [
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
    "rgb(178, 191, 80)",
  ];


  let indexes;

  const targetsInPounds = {
    dailyWasteCappingInPounds,
    prepWasteCappingInPounds,
    spoilageWasteCappingInPounds
  }

  const allCappings = {
    hourlyCoverWastesCap,
    hourlySpoliageWastesCap,
    hourlyPeparationWastesCap
  }

  // if (targets) {
  //   indexes = getIndexesForBackgroundColours(props.showPounds, targetsInPounds, allCappings)
  // }
  indexes = getIndexesForBackgroundColours(props.showPounds, targetsInPounds, allCappings)


  if (indexes) {
    if (appState.activeObject.name === "PREPARATION WASTE") {
      indexes.prepWasteOverTargetIndexArray.map((data) => {
        barColors[data] = "rgba(255, 0, 0, 0.9)";
        return ""
      })
    } else if (appState.activeObject.name === "COVER WASTE") {
      indexes.coverWasteOverTargetIndexArray.map((data) => {
        barColors[data] = "rgba(255, 0, 0, 0.9)";
        return ""
      })
    } else if (appState.activeObject.name === "SPOILAGE WASTE") {
      indexes.spoilageWasteOverTargetIndexArray.map((data) => {
        barColors[data] = "rgba(255, 0, 0, 0.9)";
        return ""
      })
    }
  }




  useEffect(() => {
    const dailyWasteWarningInPounds = roundedUpNumberAndTurnBackToNumber(hourlyCoverWastes * 2.775)
    const prepWasteWarningInPounds = roundedUpNumberAndTurnBackToNumber(hourlyPeparationWastes * 2.775)
    const spoilageWasteWarningInPounds = roundedUpNumberAndTurnBackToNumber(hourlySpoliageWastes * 2.775)

    setDailyWasteCappingInPounds(dailyWasteWarningInPounds)
    setPrepWasteCappingInPounds(prepWasteWarningInPounds)
    setSpoilageWasteCappingInPounds(spoilageWasteWarningInPounds)


    toggleActive(hourlyWasteSelector)

    setDisplayValues(hourlyWasteValues)

    if (props.showHourlyChart && showTooltip){
      setTooltipIsOpen(true)
    } else {
      setTooltipIsOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [ hourlyPeparationWastesCap, hourlyCoverWastesCap, hourlySpoliageWastesCap, hourlyWasteSelector, hourlyWasteValues, props]);


  if (width <= 700) {
    hourlyWasteWidth = 400;
    hourlyWasteHeight = 200;
    fontSize = 12 * 0.60
  }

  let maxNumForHourlyChart = maxNumForHourlyChartFunction(
    displayValues
  );

  let maxNumForHourlyChartInPounds = maxNumForHourlyChart * 2.775;

  function toggleActive(type) {
    switch (type) {
      case "cover":
        changeActiveState({
          coverWaste: true,
          spoliageWaste: false,
          productionWaste: false,
        });
        changeState({ ...appState, activeObject: appState.objects[0] });
          setWarning(hourlyCoverWastesCap)

        break;
      case "production":
        changeActiveState({
          coverWaste: false,
          spoliageWaste: false,
          productionWaste: true,
        });
        changeState({ ...appState, activeObject: appState.objects[2] });
          setWarning(hourlyPeparationWastesCap)

        break;
      case "spoliage":
        changeActiveState({
          coverWaste: false,
          spoliageWaste: true,
          productionWaste: false,
        });
        changeState({ ...appState, activeObject: appState.objects[1] });
        setWarning(hourlySpoliageWastesCap)

        break;
      default:
    }
  }

  // const coverWasteLableRed = showCoverWasteLabelRed(hourlyCoverWastesCap,hourlyCoverWaste, props.showPounds, converterValue, dailyWasteCappingInPounds)
  // const prepWasteLableRed = showCoverWasteLabelRed(hourlyPeparationWastesCap,hourlyPreparationWaste, props.showPounds, converterValue, prepWasteCappingInPounds)
  // const spoilageWasteLableRed = showCoverWasteLabelRed(hourlySpoliageWastesCap,hourlySpoilageWaste, props.showPounds, converterValue, spoilageWasteCappingInPounds)


  const coverWasteLableRed = showCoverWasteLabelRed(hourlyCoverWastesCap,hourlyCoverWasteData, props.showPounds, dailyWasteCappingInPounds)
  const prepWasteLableRed = showCoverWasteLabelRed(hourlyPeparationWastesCap,hourlyPreparationWasteData, props.showPounds, prepWasteCappingInPounds)
  const spoilageWasteLableRed = showCoverWasteLabelRed(hourlySpoliageWastesCap,hourlySpoilageWasteData, props.showPounds, spoilageWasteCappingInPounds)


  let hourlyWasteXaxisColors;

  if (props.showDarkTheme) {
    hourlyWasteXaxisColors =   "rgb(255, 231, 227)";
  } else {
    hourlyWasteXaxisColors =   "rgb(133, 165, 101)";
  }

  return (
    <div className={props.hideReport ? "HourWasteChart displayNone":"HourWasteChart"}>

      <AccordionHeading color={"primPurpleBackgroundColor"}>

        <div className="section-title">HOURLY WASTE</div>
        <div className="container">
            <span onClick={() => props.handleChangeForCheckedAndAccordion(!props.showHourlyChart, "hourlyChartSwitch")}>
              {props.showHourlyChart ? ("X"):"| | | "}
            </span>
        </div>

      </AccordionHeading>

      <AccordionBody open={props.showHourlyChart}>

        <div className= { props.showDarkTheme ? "darkTheme__reportBackgroundColor addPaddingOfHalveRem": "originalTheme__reportBackgroundColor addPaddingOfHalveRem"}>

          <div className="HourWasteChart--spacing">
            <div className="report-subtitle">{props.siteName}</div>
            <p>
                {" "}
                <b className="HourWasteChart--dateStyling"> {hourlyWasteDateConverter(hourlyWasteDate)} </b>
              </p>
          </div>

          <div className="HourWasteChart__headingWrapper">
            <div className="section-title center">WASTE BY TIME OF DAY<div className="applyMarginRightAndLeft">{props.showPounds? "(£)" : "(Kg)" }</div></div>
          </div>

          <div className="HourWasteChart--spacing--secondRow">
            <div className="HourWasteChart--spacing--secondRow--csp">
              {clickOnHourlyBarChart && (
                <>
                  <div
                    className={activeState.coverWaste ? "active" : "inactive"}
                    id={0}
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

                    <h2
                      id={"C"}
                      onClick={handleHourlyWasteCategory}
                      className="HourWasteChart--CSPlabel"
                      className={activeState.coverWaste ? "reduceOpacity" : ""}
                      className={coverWasteLableRed? "showRedColor": ""}
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
                    // title="click on C, S or P waste stream"
                    arrow
                  >

                    <h2
                      id={"S"}
                      onClick={handleHourlyWasteCategory}
                      className="HourWasteChart--CSPlabel"
                      className={activeState.spoliageWaste ? "reduceOpacity" : ""}
                      className={spoilageWasteLableRed ? "showRedColor": ""}
                    >
                      {labels.acronyms.s}
                    </h2>

                    </Tooltip>


                  </div>
                  <div
                    className={activeState.productionWaste ? "active" : "inactive"}
                    id={2}
                    onClick={() => {
                      toggleActive("production");
                    }}
                  >

                    <Tooltip
                    open={tooltipIsOpen}
                    onClose={() => setTooltipIsOpen(false)}
                    // title="click on C, S or P waste stream"
                    arrow
                  >

<h2
                      id={"P"}
                      onClick={handleHourlyWasteCategory}
                      className="HourWasteChart--CSPlabel"
                      className={activeState.productionWaste ? "reduceOpacity" : ""}
                      className={prepWasteLableRed ? "showRedColor": ""}
                    >
                      {labels.acronyms.p}
                    </h2>


                    </Tooltip>


                  </div>
                </>
              )}
            </div>
            {/* <p className="HourWasteChart--CSPheadingSize">{appState.activeObject.name}</p> */}

            <div className="capping__hourWasteChartWrapper">
              <b className="capping">
                <div className="applyPurpleColor cooperHewittBold">Cap</div>
                <div className="capping__text applyMarginRightAndLeft">
                  <div className={props.showDarkTheme? "darkTheme__selectedLabelColor cooperHewittBold" : "applyPurpleColor cooperHewittBold"}> {labels.acronyms.c}</div>
                </div>
                  <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                    {props.showPounds ? dailyWasteCappingInPounds : roundedUpNumberAndTurnBackToNumber(hourlyCoverWastesCap)}
                  </div>
                <div className="capping__text applyMarginRightAndLeft applyPurpleColor">
                  <div className={props.showDarkTheme? "darkTheme__selectedLabelColor cooperHewittBold" : "applyPurpleColor cooperHewittBold"}> {labels.acronyms.s}</div>
                </div>
                  <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                    {props.showPounds ? spoilageWasteCappingInPounds : roundedUpNumberAndTurnBackToNumber(hourlySpoliageWastesCap)}
                  </div>
                <div className="capping__text applyMarginRightAndLeft applyPurpleColor cooperHewittBold">
                  <div className={props.showDarkTheme? "darkTheme__selectedLabelColor cooperHewittBold" : "applyPurpleColor cooperHewittBold"}> {labels.acronyms.p}</div>
                </div>
                  <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                    {props.showPounds ? prepWasteCappingInPounds : roundedUpNumberAndTurnBackToNumber(hourlyPeparationWastesCap)}
                  </div>
                </b>
              </div>

          </div>

          <div>
            <div>
              <Bar
                data={{
                  labels: [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                  ],
                  datasets: [
                    {
                      data: props.showPounds
                        ? displayValues.map((data) => {
                            return roundedUpNumberAndTurnBackToNumber(data * 2.775);
                        }) : displayValues,
                      fill: false,
                      backgroundColor: barColors,
                      minBarLength: 0.3,
                      barPercentage: 0.3,
                      categoryPercentage: 0.7,
                    },
                  ],
                }}
                width={hourlyWasteWidth}
                height={hourlyWasteHeight}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        ticks: {
                          fontColor: hourlyWasteXaxisColors,
                          fontSize
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
                          max: props.showPounds
                          ? maxNumForHourlyChartInPounds: Math.round(maxNumForHourlyChart)
                        },
                      },
                    ],
                  },

                  plugins: {
                    datalabels: {
                      display: true,
                      // color: "rgb(47, 64, 30)",
                      anchor: "end",
                      align: "end",
                      clamp: true,
                      backgroundColor: null,
                      borderColor: null,
                      borderRadius: 4,
                      borderWidth: 1,
                      font: {
                        size: fontSize,
                        weight: 900,
                      },
                      offset: 4,
                      padding: 0,
                      color: function (context) {
                          var index = context.dataIndex;
                          var value = context.dataset.data[index];
                          let warningKGConverted;

                            if (props.showPounds) {

                              warningKGConverted = parseInt(warning * 2.775);

                              let numberValue = parseInt(value)

                              if (numberValue >= warningKGConverted) {
                                return "rgba(255, 0, 0, 0.9)";
                              } else {
                                return "rgba(133, 165, 101, 1)";
                              }

                            } else {

                              let numberValue = parseInt(value)

                              if (numberValue >= parseInt(warning)) {
                                return "rgba(255, 0, 0, 0.9)";
                              } else {

                                  if (props.showDarkTheme) {
                                    return "rgb(255, 231, 227)";
                                  } else {
                                    return "rgba(133, 165, 101, 1)";
                                  }

                              }

                            }
                        },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="weeklyWaste__message">
              (summer and winter time are not change on the day but on the month)
          </div>

        </div>

      </AccordionBody>


    </div>
  );
}
