
import React, { useState, useContext, useEffect } from "react";

import { Bar } from "react-chartjs-2";
import Chart from "chart.js";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

import {
  wasteDailyDateRange,
  roundedUpNumberAndTurnBackToNumber,
} from "../../../../utilities";

import useWindowDimensions from "../../libs/use-window-dimensions";

import { DailyWasteContext } from "../../../../contexts/daily-waste-context";
// import { HourlyWasteContext } from "../../../../contexts/hourly-waste-context";

import { WasteCapContext } from "../../../../contexts/waste-cap-context";
import { HourlyFoodWasteContext } from "../../../../contexts/hourly-food-waste-context";

import { AccordionHeading, AccordionBody } from "../accordion"

import { InputsContext } from "../../../../contexts/inputs-context";

import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

export default function DailyWasteChart(props) {
  Chart.defaults.global.defaultFontFamily = "CooperHewitt-Book";

  const {
    thisWeekCoverInputs,
   } = useContext(InputsContext);

   const {
    labels
   } = useContext(WasteLabelsContext);

  const {
    dailyCoverWastes,
    dailySpoliageWastes,
    dailyPeparationWastes
   } = useContext(WasteCapContext);

  const targets = {
    dailyCoverWastes,
    dailySpoliageWastes,
    dailyPeparationWastes
  }

  let chartReference = {};

  const {
    coverWaste,
    prepWaste,
    spoilageWaste,
    getIndexesForBackgroundColours,
    dailyWasteData,
  } = useContext(DailyWasteContext);

  const { allHourlyWasteData, handleHourlyWaste, index } = useContext(HourlyFoodWasteContext)

  const [ coverWasteData, setCoverWaste] = useState([])
  const [ prepWasteData, setPrepWaste ] = useState([])
  const [ spoilageWasteData, setSpoilageWaste ] = useState([])
  const [ totalWasteData, setDailyWasteData ] = useState([])

  const [ totalCappingInPounds, setTotalCappingInPounds ] = useState([])

  const [ dailyWasteCappingInPounds, setDailyWasteCappingInPounds ] = useState([])
  const [ prepWasteCappingInPounds, setPrepWasteCappingInPounds ] = useState([])
  const [ spoilageWasteCappingInPounds, setSpoilageWasteCappingInPounds ] = useState([])


  let dailyCoverWastesCap = dailyCoverWastes ? dailyCoverWastes: 0
  let dailySpoliageWastesCap = dailySpoliageWastes ? dailySpoliageWastes : 0
  let dailyPeparationWastesCap = dailyPeparationWastes ? dailyPeparationWastes : 0

  const formatedDate = JSON.parse(localStorage.getItem('formatedXaxis')) || []
  const dailyChartXaxis = JSON.parse(localStorage.getItem('dailyChartXaxis')) || []

  const [ checkBox, setCheckBox ] = useState([0, 0, 0, 0, 0, 0, 0])


  // const initialStateForDailyChartXaxis = JSON.parse(localStorage.getItem('dailyChartXaxis')) || []
  // const initialStateForFormatedDate = JSON.parse(localStorage.getItem('formatedXaxis')) || []

  // const [dailyChartXaxis, setDateLabels] = useState(initialStateForDailyChartXaxis);
  // const [formatedDate, setFormatedDate] = useState(initialStateForFormatedDate);

  useEffect(() => {

    // const formatedDate = JSON.parse(localStorage.getItem('formatedXaxis')) || []
    // const dailyChartXaxis = JSON.parse(localStorage.getItem('dailyChartXaxis')) || []
    // setDateLabels(props.weeklyDailyRange)
    // setFormatedDate(props.weeklyDailyLabels)

    // console.log("thisWeekCoverInputs",thisWeekCoverInputs.checkBox);

    if (thisWeekCoverInputs !== undefined) {
      setCheckBox(thisWeekCoverInputs.checkBox)
    }

    setCoverWaste(coverWaste)
    setPrepWaste(prepWaste)
    setSpoilageWaste(spoilageWaste)
    setDailyWasteData(dailyWasteData)

    const totalCappings = dailyCoverWastesCap + dailyPeparationWastesCap + dailySpoliageWastesCap

    const totalWarningInPounds = roundedUpNumberAndTurnBackToNumber(totalCappings * 2.775)
    setTotalCappingInPounds(totalWarningInPounds)

    const dailyWasteWarningInPounds = roundedUpNumberAndTurnBackToNumber(dailyCoverWastesCap * 2.775)
    const prepWasteWarningInPounds = roundedUpNumberAndTurnBackToNumber(dailyPeparationWastesCap * 2.775)
    const spoilageWasteWarningInPounds = roundedUpNumberAndTurnBackToNumber(dailySpoliageWastesCap * 2.775)

    setDailyWasteCappingInPounds(dailyWasteWarningInPounds)
    setPrepWasteCappingInPounds(prepWasteWarningInPounds)
    setSpoilageWasteCappingInPounds(spoilageWasteWarningInPounds)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prepWaste, coverWaste, spoilageWaste, dailyWasteData, props])

  // console.log("dailyCoverWastesCap",dailyCoverWastesCap)
  // console.log("dailySpoliageWastesCap",dailySpoliageWastesCap)
  // console.log("dailyPeparationWastesCap",dailyPeparationWastesCap)

  // console.log("dailyWasteWarningInPounds",dailyWasteCappingInPounds)
  // console.log("prepWasteWarningInPounds",prepWasteCappingInPounds)
  // console.log("spoilageWasteWarningInPounds",spoilageWasteCappingInPounds)

  // console.log("props.showPounds", props.showPounds)

  let background = [
    "rgba(255, 255, 255, 0.4)",
    "rgba(255, 255, 255, 0.4)",
    "rgba(255, 255, 255, 0.4)",
    "rgba(255, 255, 255, 0.4)",
    "rgba(255, 255, 255, 0.4)",
    "rgba(255, 255, 255, 0.4)",
    "rgba(255, 255, 255, 0.4)",
  ];

  if (checkBox !== undefined) {
    checkBox.map((data, index) => {
      if (data === 1) {
        background[index] = "rgba(242, 240, 196, 0.4)"
      }
      return;
    })
  }

  if(index > 0) {
    background[index] = "rgba(106, 217, 123, 0.2)";
  } else if (index === 0) {
    background[index] = "rgba(106, 217, 123, 0.2)";
  }

  let coverWasteBackgroundColours = [
    "rgb(140, 112, 140)",
    "rgb(140, 112, 140)",
    "rgb(140, 112, 140)",
    "rgb(140, 112, 140)",
    "rgb(140, 112, 140)",
    "rgb(140, 112, 140)",
    "rgb(140, 112, 140)",
  ];

  let spoilageWasteBackgroundColours = [
    "#ff8c00",
    "#ff8c00",
    "#ff8c00",
    "#ff8c00",
    "#ff8c00",
    "#ff8c00",
    "#ff8c00",
  ];

  let prepWasteBackgroundColours = [
    "rgb(133, 165, 101)",
    "rgb(133, 165, 101)",
    "rgb(133, 165, 101)",
    "rgb(133, 165, 101)",
    "rgb(133, 165, 101)",
    "rgb(133, 165, 101)",
    "rgb(133, 165, 101)"
  ];

  let indexes;

  if (targets) {
    indexes = getIndexesForBackgroundColours(targets)
  }

  if (indexes) {
    indexes.coverWasteOverTargetIndexArray.map((data) => {
      coverWasteBackgroundColours[data] = "rgba(255, 0, 0, 0.9)";
      return ""
    })

    indexes.spoilageWasteOverTargetIndexArray.map((data) => {
      spoilageWasteBackgroundColours[data] = "rgba(255, 0, 0, 0.9)";
      return ""
    })

    indexes.prepWasteOverTargetIndexArray.map((data) => {
      prepWasteBackgroundColours[data] = "rgba(255, 0, 0, 0.9)";
      return ""
    })
  }

  // console.log("dailyChartXaxis",dailyChartXaxis)
  let dateRangeLable = wasteDailyDateRange(dailyChartXaxis);
  // console.log("dateRangeLable",dateRangeLable)

  const { width } = useWindowDimensions();

  let dailyWasteHeight = 120;
  let dailyWasteWidth = 400;

  let CSPlabelFont = 10;
  let totalLabelFont = 12

  if (width <= 700) {
    dailyWasteWidth = 260;
    dailyWasteHeight = 179;
    totalLabelFont = 8
    CSPlabelFont = 8 * 0.6;
  }

  return (
    <div className={props.hideReport ? "dailyWasteChart displayNone":"dailyWasteChart"}>

      <AccordionHeading color={"primPurpleBackgroundColor"}>
        <div className="section-title">DAILY WASTE</div>
        <div className="container">
            <span onClick={() => props.handleChangeForCheckedAndAccordion(!props.showDailyChart, "dailyChartSwitch")}>
              {props.showDailyChart ? ("X"):"| | | "}
            </span>
        </div>
      </AccordionHeading>

      <AccordionBody open={props.showDailyChart}>
        <div className= { props.showDarkTheme ? "darkTheme__reportBackgroundColor addPaddingOfHalveRem addHeightOfFithyVh": "originalTheme__reportBackgroundColor addPaddingOfHalveRem dailyWasteChart__height"}>

          <div className="report-subtitle">{props.siteName}</div>
          <div className="dailyWasteChart__title--style">
          <div className="dailyWasteChart--dateStyling">{dateRangeLable}</div>
            <div className="dailyWasteChart--titleWrapper">
              <div>
                <div className="section-title">
                  DAILY WASTE
                  <div className="applyMarginRightAndLeft">{props.showPounds? "(£)" : "(Kg)" }</div>
                </div>

                <div className="dailyWasteChart__instructions">
                  Click on the bars for waste in 24hrs
                </div>

              </div>
            </div>

              <div className="dailyWasteChart__cappingWrapper">
                <div className="capping__text applyPurpleColor cooperHewittBold capping__flex">
                  Total
                  <div className="applyMarginRightAndLeft">
                    {props.showPounds ?
                      roundedUpNumberAndTurnBackToNumber(dailyWasteCappingInPounds + spoilageWasteCappingInPounds + prepWasteCappingInPounds)
                     : roundedUpNumberAndTurnBackToNumber(dailyCoverWastesCap + dailySpoliageWastesCap + dailyPeparationWastesCap)}
                    <div className="cooperHewittBold capping__headingCappingStyling">
                      Capping =
                    </div>
                  </div>
                </div>
                <div className="capping__text applyMarginRightAndLeft applyPurpleColor cooperHewittBold">
                  {labels.acronyms.c}
                </div>
                <div
                  id={1}
                  key={0}
                >
                  <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                    {props.showPounds ? roundedUpNumberAndTurnBackToNumber(dailyWasteCappingInPounds) : roundedUpNumberAndTurnBackToNumber(dailyCoverWastesCap)}
                  </div>
                </div>
                <div>+</div>
                <div className="capping__text applyMarginRightAndLeft applyPurpleColor cooperHewittBold">
                  {labels.acronyms.s}
                 </div>
                <div
                  id={2}
                  key={1}
                >
                  <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                    {props.showPounds ? roundedUpNumberAndTurnBackToNumber(spoilageWasteCappingInPounds) : roundedUpNumberAndTurnBackToNumber(dailySpoliageWastesCap)}
                  </div>
                </div>
                <div>+</div>
                <div className="capping__text applyMarginRightAndLeft applyPurpleColor cooperHewittBold">
                  {labels.acronyms.p}
                </div>
                <div
                  id={3}
                  key={2}
                >
                  <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                    {props.showPounds ? roundedUpNumberAndTurnBackToNumber(prepWasteCappingInPounds) : roundedUpNumberAndTurnBackToNumber(dailyPeparationWastesCap)}
                  </div>
                </div>
              </div>

          </div>

          <div className="dailyWasteChart__wrapperPosition">
          <div className="dailyWasteChart__chartPosition1">
              <Bar
                data={{
                  labels: [
                    "C  S  P",
                    "C  S  P",
                    "C  S  P",
                    "C  S  P",
                    "C  S  P",
                    "C  S  P",
                    "C  S  P",
                  ],
                  datasets: [
                    {
                      label: "cover waste",
                      data: props.showPounds
                        ? coverWasteData.map((item) => {
                            return (item * 2.775).toFixed(0);
                          }) :
                          coverWasteData,
                      fill: false,
                      backgroundColor: coverWasteBackgroundColours.slice(),
                      minBarLength: 0.3,
                      barPercentage: 0.3,
                      categoryPercentage: 0.7,
                    },
                    {
                      label: "spoliage waste",
                      data: props.showPounds
                        ? spoilageWasteData.map((item) => {
                            return (item * 2.775).toFixed(0);
                          }) :
                          spoilageWasteData,
                      fill: false,
                      backgroundColor: spoilageWasteBackgroundColours.slice(),
                      minBarLength: 0.3,
                      barPercentage: 0.3,
                      categoryPercentage: 0.7,
                    },
                    {
                      label: "preparation waste",
                      data: props.showPounds
                        ?  prepWasteData.map((item) => {
                            return (item * 2.775).toFixed(0);
                          }) :
                          prepWasteData,
                      fill: false,
                      backgroundColor: prepWasteBackgroundColours,
                      minBarLength: 0.3,
                      barPercentage: 0.3,
                      categoryPercentage: 0.7,
                    },
                  ],
                }}
                width={dailyWasteWidth}
                height={dailyWasteHeight}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  legend: {
                    display: false,
                  },
                  scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        ticks: {
                          fontColor: "rgb(133, 165, 101, 0)",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        display: false,
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },

                  plugins: {
                    datalabels: {
                      anchor: "start",
                      align: "bottom",
                      display: true,
                      backgroundColor: null,
                      borderColor: null,
                      borderRadius: 4,
                      borderWidth: 1,
                      font: {
                        size: CSPlabelFont,
                        weight: 600,
                      },
                      offset: 4,
                      padding: 0,
                      color: function (context) {
                        var index = context.dataIndex;
                        var value = parseInt(context.dataset.data[index]);

                        let warningNum;

                        if (context.dataset.label === "cover waste") {

                          let warningForCoverWasteCap = dailyCoverWastesCap;

                          if (props.showPounds) {
                            // warningNum = Math.round(warningForCoverWasteCap * 2.775);
                            warningNum = dailyWasteCappingInPounds;
                          } else {
                            warningNum = warningForCoverWasteCap;
                          }

                          if (value >= warningNum) {
                            return "rgba(255, 0, 0, 0.9)";
                          } else if (value === 0) {
                            return "rgba(255, 255, 255, 0)";
                          } else {
                            // return "rgba(133, 165, 101, 1)";

                            if (props.showDarkTheme) {
                            return "rgb(255, 231, 227)";
                            } else {
                              return "rgba(133, 165, 101, 1)";
                            }

                          }

                        }

                        if (context.dataset.label === "preparation waste") {

                          let warningForPreparationWasteCap = dailyPeparationWastesCap;

                          if (props.showPounds) {
                            // warningNum = Math.round(warningForPreparationWasteCap * 2.775);
                            warningNum = prepWasteCappingInPounds
                          } else {
                            warningNum = warningForPreparationWasteCap;
                          }


                          if (value >= warningNum) {
                            return "rgba(255, 0, 0, 0.9)";
                          } else if (value === 0) {
                            return "rgba(255, 255, 255, 0)";
                          } else {

                            // return "rgba(133, 165, 101, 1)";

                            if (props.showDarkTheme) {
                            return "rgb(255, 231, 227)";
                            } else {
                              return "rgba(133, 165, 101, 1)";
                            }

                          }


                        }

                        if (context.dataset.label === "spoliage waste") {

                          let warningForSpoilageWasteCap = dailySpoliageWastesCap;


                          if (props.showPounds) {
                            // warningNum = Math.round(warningForSpoilageWasteCap * 2.775);
                            warningNum = spoilageWasteCappingInPounds
                          } else {
                            warningNum = warningForSpoilageWasteCap;
                          }

                          if (value >= warningNum) {
                            return "rgba(255, 0, 0, 0.9)";
                          } else if (value === 0) {
                            return "rgba(255, 255, 255, 0)";
                          } else {
                            // return "rgba(133, 165, 101, 1)";

                            if (props.showDarkTheme) {
                            return "rgb(255, 231, 227)";
                            } else {
                              return "rgba(133, 165, 101, 1)";
                            }

                          }


                        }

                      },
                      formatter: function (value, context) {
                        // var index = context.dataIndex;
                        // var value = parseInt(context.dataset.data[index]);

                        let warningNum;

                        if (context.dataset.label === "cover waste") {

                          let warningForCoverWasteCap = dailyCoverWastesCap;

                          if (props.showPounds) {
                            // warningNum = Math.round(warningForCoverWasteCap * 2.775);
                            warningNum = dailyWasteCappingInPounds;
                          } else {
                            warningNum = warningForCoverWasteCap;
                          }

                        if (value >= warningNum) {
                            return `${value}`;

                          }

                        } else if (context.dataset.label === "preparation waste") {

                          let warningForPreparationWasteCap = dailyPeparationWastesCap;


                          if (props.showPounds) {
                            // warningNum = Math.round(warningForPreparationWasteCap * 2.775);
                            warningNum = prepWasteCappingInPounds
                          } else {
                            warningNum = warningForPreparationWasteCap;
                          }

                          if (value >= warningNum) {
                            return `${value}`;

                          }

                        } else if (context.dataset.label === "spoliage waste") {

                          let warningForSpoilageWasteCap = dailySpoliageWastesCap;

                          if (props.showPounds) {
                            // warningNum = Math.round(warningForSpoilageWasteCap * 2.775);
                            warningNum = spoilageWasteCappingInPounds
                          } else {
                            warningNum = warningForSpoilageWasteCap;
                          }

                          if (value >= warningNum) {
                            return `${value}`;

                          }

                        }

                      },
                    },
                  },
                }}
              />

          </div>

          <div className="dailyWasteChart__chartPosition">
              <Bar
                ref={(reference) => (chartReference = reference)}
                data={{
                  labels: ["mon","tues","wed","thurs","fri","sat","sun"],
                  datasets: [
                    {
                      label: "Total wastes",
                      siteName: props.siteName,
                      dates: dailyChartXaxis,
                    data: props.showPounds
                      ? totalWasteData.map((waste) => {
                        return (waste * 2.775).toFixed(0);
                      }) : totalWasteData,
                      fill: true,
                      backgroundColor: background.slice(),
                      barPercentage: 0.9,
                      categoryPercentage: 1,
                      ticks: {
                        fontColor: "rgba(255,255,255, 0.1)",
                      },
                      hoverBackgroundColor: [
                        'rgba(56, 166, 126, 0.5)',
                        'rgba(56, 166, 126, 0.5)',
                        'rgba(56, 166, 126, 0.5)',
                        'rgba(56, 166, 126, 0.5)',
                        'rgba(56, 166, 126, 0.5)',
                        'rgba(56, 166, 126, 0.5)',
                        'rgba(56, 166, 126, 0.5)',
                      ]
                    },
                  ],
                }}
                width={dailyWasteWidth}
                height={dailyWasteHeight}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  tooltips: {
                    enabled: false,
                  },
                  legend: {
                    display: false,
                  },

                  onClick: (event, array) => {
                    let index;

                    if (array.length) {
                      array[0]._chart.config.data.datasets[0].data.forEach(
                        (value, i) => {
                          if (i === array[0]._index) {
                            index = i
                          }
                        }
                      );
                    }

                    let barChart = chartReference.chartInstance;
                    barChart.update()

                      // let item = {
                      //   siteName: array[0]._chart.config.data.datasets[0].siteName,
                      //   index,
                      //   date:
                      //     array[0]._chart.config.data.datasets[0].dates[
                      //       array[0]._index
                      //     ],
                      // };

                      // handleChangeHourlyWaste(item);

                      let item = {
                        hourlyWaste: allHourlyWasteData.hourlyWaste,
                        index: index,
                        date:
                        array[0]._chart.config.data.datasets[0].dates[
                          array[0]._index
                        ],
                      }

                      // console.log("item",item)
                      // console.log("allHourlyWasteData",allHourlyWasteData)

                      handleHourlyWaste(item)

                  },
                  scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        display: false,
                        ticks: {
                          fontColor: "rgba(255,255,255, 0.1)",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: false,
                        gridLines: {
                          display: false,
                        },
                        ticks: {
                          maxTicksLimit: 1,
                          max: 1
                        },
                      },
                    ],
                  },

                  plugins: {
                    datalabels: {
                      color: function (context) {
                        var index = context.dataIndex;
                        var value = context.dataset.data[index];

                        let warning = dailyCoverWastesCap + dailyPeparationWastesCap + dailySpoliageWastesCap

                        let warningNum;
                        if (props.showPounds) {
                          warningNum = totalCappingInPounds;
                        } else {
                          warningNum = warning;
                        }

                        if (value >= warningNum) {
                          return "rgba(255, 0, 0, 0.9)";
                        } else {
                          // return "rgba(133, 165, 101, 1)";

                          if (props.showDarkTheme) {
                            return "rgb(255, 231, 227)";
                          } else {
                            return "rgba(133, 165, 101, 1)";
                          }

                        }
                      },
                      anchor: "end",
                      align: "start",
                      clamp: true,
                      display: true,
                      borderColor: null,
                      borderRadius: 4,
                      borderWidth: 1,
                      font: {
                        size: totalLabelFont,
                        weight: 600,
                      },
                      offset: 4,
                      padding: 0,
                      formatter: function (value, context) {

                        let warning = dailyCoverWastesCap + dailyPeparationWastesCap + dailySpoliageWastesCap

                        let warningNum;
                        if (props.showPounds) {
                          warningNum = totalCappingInPounds;
                        } else {
                          warningNum = warning;
                        }

                        if (value >= warningNum) {

                          let formatedData = roundedUpNumberAndTurnBackToNumber(value)

                          var text = "WARNING";
                          return `${text} \n      ${formatedData} `;
                        } else {
                          return value;
                        }
                      },
                    },
                  },
                }}
              />

            <div className="dailyWasteChart__dateLabel">
              {formatedDate.map((data, i) => (
                <div className={i === index ? "applyCooperHewittBold applyGoldColor" : ""} key={i}>{data}</div>
              ))}
            </div>

              <div>
                <div className="dailyWasteChart__dateLabel__CSP">
                  <div className="dailyWasteChart__dateLabel__CSP__coverwastesSquare"></div>
                  {labels.titleLabels.c}
                  <div className="dailyWasteChart__dateLabel__CSP__spoliageSquare"></div>
                  {labels.titleLabels.s}
                  <div className="dailyWasteChart__dateLabel__CSP__preparationSquare"></div>
                  {labels.titleLabels.p}
                </div>
              </div>

              <div className="applyBlueTuckGreen" style={{
                    display: "flex",
                    justifyContent: "center"
              }}>
                The yellow bar represents a special event on the day
              </div>

          </div>
        </div>

        </div>
      </AccordionBody>

    </div>
  );
}
