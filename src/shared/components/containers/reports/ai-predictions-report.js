import React, { useContext, useEffect} from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

import {
  setItemInLocalStorage,
} from "../../../../utilities.js";

import useWindowDimensions from "../../libs/use-window-dimensions";

import { AiPredictionDataContext } from "../../../../contexts/ai-prediction-data-context";
import { AccordionHeading, AccordionBody } from "../accordion"

import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

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

let graphHeight = 65;
let graphWidth = 400;
let labelFont = 10;
let pointRadius = 5;
let layoutPadding = 20;

const getCoverData = (values, props) => {
  const data = {
    labels: months,
    datasets: [
      {
        label: "Ai Prediction",
        data: props.showPounds
        ? values.map((item) => {
            return (item * 2.775).toFixed(0);
          }) :
          values,
        backgroundColor: "rgba(153, 177, 165, 0)",
        barPercentage: 0.7,
        categoryPercentage: 0.9,
        lineTension: 0,
        borderColor: 'rgba(140, 112, 140, 0.5)',
        pointRadius: pointRadius,
        pointBackgroundColor: 'rgba(140, 112, 140, 0.5)',
      }
    ],
  };
  return data;
};

const getSpoilageData = (values, props) => {
  const data = {
    labels: months,
    datasets: [
      {
        label: "Ai Prediction",
        data: props.showPounds
        ? values.map((item) => {
            return (item * 2.775).toFixed(0);
          }) :
          values,
        backgroundColor: "rgba(153, 177, 165, 0)",
        barPercentage: 0.7,
        categoryPercentage: 0.9,
        lineTension: 0,
        borderColor: '#ff8c00',
        pointRadius: pointRadius,
        pointBackgroundColor: '#ff8c00',
      }
    ],
  };
  return data;
};

const getPreparationData = (values, props) => {
  const data = {
    labels: months,
    datasets: [
      {
        label: "Ai Prediction",
        data: props.showPounds
        ? values.map((item) => {
            return (item * 2.775).toFixed(0);
          }) :
          values,
        backgroundColor: "rgba(153, 177, 165, 0)",
        barPercentage: 0.7,
        categoryPercentage: 0.9,
        lineTension: 0,
        borderColor: 'rgba(133, 165, 101, 0.5)',
        pointRadius: pointRadius,
        pointBackgroundColor: 'rgba(133, 165, 101, 0.5)',
      }
    ],
  };
  return data;
};

export default function ProgressBar(props) {

  const {
    labels
   } = useContext(WasteLabelsContext);

  const {
    aiPredictionsDisplayValueForCoverWaste,
    aiPredictionsDisplayValueForPrepWaste,
    aiPredictionsDisplayValueForSpoilageWaste,
    aiPredictionsActiveState,
    aiPredictionsToggleActive,
    month,
  } = useContext(AiPredictionDataContext);


  const [ coverWaste, setCoverWaste] = React.useState([])
  const [ prepWaste, setPrepWaste ] = React.useState([])
  const [ spoilageWaste, setSpoilageWaste ] = React.useState([])

  useEffect(() => {

    //the code breaks when switch to FOXCAFE and to pounds because it is changing from array to 0 only. expects array.
    const coverWaste = aiPredictionsDisplayValueForCoverWaste === 0 ? [] : aiPredictionsDisplayValueForCoverWaste;
    const prepWaste = aiPredictionsDisplayValueForPrepWaste === 0 ? [] : aiPredictionsDisplayValueForPrepWaste;
    const spoilageWaste = aiPredictionsDisplayValueForSpoilageWaste === 0 ? [] : aiPredictionsDisplayValueForSpoilageWaste;

    setCoverWaste(coverWaste)
    setPrepWaste(prepWaste)
    setSpoilageWaste(spoilageWaste)

  }, [
    aiPredictionsDisplayValueForCoverWaste,
    aiPredictionsDisplayValueForPrepWaste,
    aiPredictionsDisplayValueForSpoilageWaste,
  ])

  const { width } = useWindowDimensions();

  if (width <= 700) {
    graphWidth = 260;
    graphHeight = 65;
    labelFont = 8;
    pointRadius = 3;
    layoutPadding = 20;
  }

  return (
    <>
    {!props.hideReport &&
    <>

      <AccordionHeading>
        <div className="section-title">AI PREDICTIONS</div>
        <div className="container">
          {props.aiPredictions ? (
            <span onClick={() =>
            {
              props.setAiPredictions(!props.aiPredictions)
              setItemInLocalStorage("showAiPredictions", !props.aiPredictions)
            }
            }>X</span>
          ) : (
            <span onClick={() =>
            {
              props.setAiPredictions(!props.aiPredictions)
              setItemInLocalStorage("showAiPredictions", !props.aiPredictions)
            }
            }> | | | </span>
          )}
        </div>
      </AccordionHeading>

      <AccordionBody open={props.aiPredictions}>
        <div className= { props.showDarkTheme ? "darkTheme__reportBackgroundColor addPaddingOfHalveRem": "originalTheme__reportBackgroundColor addPaddingOfHalveRem"}>

          <div className="dashboard__aiPredictionsReportHeading">
            <div className="section-title">AI PREDICTIONS
              <div className="applyMarginRightAndLeft">{props.showPounds? "(£)" : "(Kg)" }</div>
            </div>
          </div>

            <div className="dashboard__aiPredictionsReport__headingWrapper">
              <div className="dashboard__aiPredictionsReport__subHeading marginRight">WASTE PREDICTION FOR</div>
              <div className="dashboard__aiPredictionsReport__timePeriodMenu">
                <h2
                  className={aiPredictionsActiveState.yearlyForcasts ? "active" : "inactive"}
                  id={0}
                  onClick={() => {
                    aiPredictionsToggleActive("yearlyForcasts");
                  }}
                  >Yr</h2>
                <h2
                  className={aiPredictionsActiveState.monthlyForcasts ? "active" : "inactive"}
                  id={1}
                  onClick={() => {
                    aiPredictionsToggleActive("monthlyForcasts");
                  }}
                  >Mth</h2>
                <h2
                  className={aiPredictionsActiveState.weeklyForcasts ? "active" : "inactive"}
                  id={2}
                  onClick={() => {
                    aiPredictionsToggleActive("weeklyForcasts");
                  }}
                  >Wk</h2>
                <h2
                  className={aiPredictionsActiveState.dailyForcasts ? "active" : "inactive"}
                  id={3}
                  onClick={() => {
                    aiPredictionsToggleActive("dailyForcasts");
                  }}
                  >Dy</h2>
              </div>
              <div className="marginRight applyPurpleColor cooperHewittBold">IN {month}</div>
            </div>

            <div className="dashboard__aiPredictionsReportWrapper">

              <div className="dashboard__aiPredictionsReport__height">
              <Line
                data={getCoverData(coverWaste, props)}
                width={graphWidth}
                height={graphHeight}
                options={{
                  layout: {
                      padding: {
                          left: layoutPadding,
                          right: layoutPadding,
                          top: 30,
                          bottom: 30
                      }
                  },
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
                        display: false,
                        gridLines: {
                          display: false,
                        },
                        ticks: {
                          fontColor: "rgb(15, 128, 140)",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: false,
                        gridLines: {},
                        ticks: {
                          maxTicksLimit: 1,
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                  plugins: {
                    datalabels: {
                      display: true,
                      anchor: "top",
                      align: "top",
                      font: {
                        size: labelFont,
                        weight: 600,
                      },
                      color: function (context) {
                          var index = context.dataIndex;
                          var value = context.dataset.data[index];

                            if (props.showPounds) {

                              let prevValue = coverWaste[index - 1] * 2.775
                              if (value > prevValue) {
                                return "rgba(255, 0, 0, 0.9)"
                              } else {
                                // return "rgba(140, 112, 140, 1)"

                                if (props.showDarkTheme) {
                                  return "rgb(255, 231, 227)";
                                } else {
                                  return "rgba(133, 165, 101, 1)";
                                }

                              }

                            } else {
                                if (value > coverWaste[index - 1]) {
                                  return "rgba(255, 0, 0, 0.9)"
                                } else {
                                  // return "rgba(140, 112, 140, 1)"

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

            <div className="dashboard__aiPredictionsReport__height">
              <Line
                data={getSpoilageData(spoilageWaste, props)}
                width={graphWidth}
                height={graphHeight}
                options={{
                  layout: {
                      padding: {
                          left: layoutPadding,
                          right: layoutPadding,
                          top: 30,
                          bottom: 30
                      }
                  },
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
                        display: false,
                        gridLines: {
                          display: false,
                        },
                        ticks: {
                          fontColor: "rgb(15, 128, 140)",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: false,
                        gridLines: {},
                        ticks: {
                          maxTicksLimit: 1,
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                  plugins: {
                    datalabels: {
                      display: true,
                      anchor: "top",
                      align: "top",
                      font: {
                        size: labelFont,
                        weight: 600,
                      },
                      color: function (context) {
                            var index = context.dataIndex;
                            var value = context.dataset.data[index];

                            if (props.showPounds) {

                              let prevValue = spoilageWaste[index - 1] * 2.775
                              if (value > prevValue) {
                                return "rgba(255, 0, 0, 0.9)"
                              } else {

                                // return "rgba(140, 112, 140, 1)"

                                if (props.showDarkTheme) {
                                return "rgb(255, 231, 227)";
                                } else {
                                  return "rgba(133, 165, 101, 1)";
                                }


                              }

                            } else {
                              if (value > spoilageWaste[index - 1]) {
                                return "rgba(255, 0, 0, 0.9)"
                              } else {

                                // return "rgba(140, 112, 140, 1)"


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

            <div className="dashboard__aiPredictionsReport__height">
              <Line
                data={getPreparationData(prepWaste, props)}
                width={graphWidth}
                height={graphHeight}
                options={{
                  layout: {
                      padding: {
                          left: layoutPadding,
                          right: layoutPadding,
                          top: 30,
                          bottom: 30
                      }
                  },
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
                        display: false,
                        gridLines: {
                          display: false,
                        },
                        ticks: {
                          fontColor: "rgb(15, 128, 140)",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: false,
                        gridLines: {},
                        ticks: {
                          maxTicksLimit: 1,
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                  plugins: {
                    datalabels: {
                      display: true,
                      anchor: "top",
                      align: "top",
                      font: {
                        size: labelFont,
                        weight: 600,
                      },
                      color: function (context) {
                            var index = context.dataIndex;
                            var value = context.dataset.data[index];

                            if (props.showPounds) {

                              let prevValue = prepWaste[index - 1] * 2.775
                              if (value > prevValue) {
                                return "rgba(255, 0, 0, 0.9)"
                              } else {
                                // return "rgba(140, 112, 140, 1)"


                                if (props.showDarkTheme) {
                                return "rgb(255, 231, 227)";
                                } else {
                                  return "rgba(133, 165, 101, 1)";
                                }

                              }

                              } else {
                              if (value > prepWaste[index - 1]) {
                                return "rgba(255, 0, 0, 0.9)"
                              } else {
                                // return "rgba(140, 112, 140, 1)"


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


            <div className="dashboard__aiPredictionsReport__axisLabel">
              {months.map((data, i) => (
                <div key={i}>{data}</div>
              ))}
            </div>

            <div>
              <div className="dashboard__aiPredictionsReport__dateLabel__CSP">
                <div className="dashboard__aiPredictionsReport__dateLabel__CSP__coverwastesSquare"></div>
                {labels.titleLabels.c}
                <div className="dashboard__aiPredictionsReport__dateLabel__CSP__spoliageSquare"></div>
                {labels.titleLabels.s}
                <div className="dashboard__aiPredictionsReport__dateLabel__CSP__preparationSquare"></div>
                {labels.titleLabels.p}
              </div>

              <div className="graph__row">
              <div className="graph__message">
                (Updated every Sunday)
              </div>
              </div>

            </div>




            </div>

        </div>
      </AccordionBody>

    </>
    }
    </>


  );
}
