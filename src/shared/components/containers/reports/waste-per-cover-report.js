import React, { useContext, useEffect, useState} from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

import useWindowDimensions from "../../libs/use-window-dimensions";

import { WastePerCoverContext } from "../../../../contexts/waste-per-cover-context";

import { WasteCapContext } from "../../../../contexts/waste-cap-context";

import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

import { AccordionHeading, AccordionBody } from "../accordion"

import {
  setItemInLocalStorage,
  maxNumForCoverPerWasteChartFunction
} from "../../../../utilities.js";

import {
  keepTwoDecimalPlacesWithoutRoundingUp,
  isInt,
  getIndexesForBackgroundColours
} from "../../../../helper.js";

import Capping from "./../reuseable-components/labels/capping"

import Tooltip from "@material-ui/core/Tooltip";

let graphHeight = 500;
let graphWidth = 1100;

export default function CoverPerWasteGraph(props) {

  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(true);

  const {
    labels
   } = useContext(WasteLabelsContext);

  const {
    activeState,
    toggleActive,
    yearlyArray,
    montlyArray,
    handleSearch,
    count,

    totalCW,
    totalPW,
    totalSW,
    totalWaste,

    display,
    totalCoverInputs,
    percentageOfInputsAreZeros,
    monthName,
    searchError,
    selectedYear,
    siteName,

    wasteSteamValue,
    coverInputDataArray,

    handleYearly,
    handleMonthly,

    datesLabel,

    foodWaste,
    foodWasteXaxis,
    showTooltip
  } = useContext(WastePerCoverContext);

  const {
    allCappingValue,
    wastePerCoverCoverWastes,
    wastePerCoverSpoilageWastes,
    wastePerCoverPrepWastes
  } = useContext(WasteCapContext);

  const [ monthly, setMonthlyArray] = useState([])
  const [ yearly, setYearlyArray ] = useState([])

  const [ displayValue, setDisplay ] = useState([])

  const [totalCoverWaste, setTotalCW ] = useState(0)
  const [totalPrepWaste, setTotalPW ] = useState(0)
  const [totalSpoilageWaste, setTotalSW ] = useState(0)
  const [totalAllWaste, setTotalWaste ] = useState(0)

  const [showSearchError, setShowSearchError ] = useState(false)
  const [year, setSelectedYear] = useState(0);

  const [ inputsData, setInputsData ] = useState([])
  const [ wasteStreamValue, setWasteStreamValue] = useState([])

  // let maxNumber = 1;
  let [maxNumber, setMaxNumber ] = useState(1)

  let indexes;

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

  indexes = getIndexesForBackgroundColours(foodWaste,allCappingValue, "wastePerCoverCappingValues", activeState);
  // console.log("indexes",indexes);

  if (indexes) {
    indexes.targetIndexArray.map((data) => {
      // console.log("data",data)
      // console.log("barColors",barColors)

      barColors[data] = "rgba(255, 0, 0, 0.9)";
      return ""
    })
  }

  useEffect(() => {

    setWasteStreamValue(wasteSteamValue);
    setInputsData(coverInputDataArray);

    // console.log("montlyArray",montlyArray)

    // console.log("foodWaste",foodWaste)
    // console.log("foodWasteXaxis",foodWasteXaxis)
    setDisplay(foodWaste)

    // setMonthlyArray(montlyArray)
    // setYearlyArray(yearlyArray)
    // setLabel(datesLabel)

    setMonthlyArray(montlyArray)
    setYearlyArray(yearlyArray)

    setTotalCW(totalCW)
    setTotalPW(totalPW)
    setTotalSW(totalSW)
    setTotalWaste(totalWaste)

    let maxNumber = maxNumForCoverPerWasteChartFunction(display)
    setMaxNumber(maxNumber)

    setShowSearchError(searchError)
    setSelectedYear(selectedYear)

    if (props.wastePerCover && showTooltip){
      setTooltipIsOpen(true)
    } else {
      setTooltipIsOpen(false)
    }

        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    montlyArray,
    yearlyArray,
    count,
    display,
    searchError,
    selectedYear,

    wasteSteamValue,
    coverInputDataArray,

    datesLabel,

    foodWaste,
    foodWasteXaxis,
    props.wastePerCover
  ])

  if (props.showPounds) {
    // console.log("display",display);
    if (display) {
      const monetaryValues = display.map((data) => {
        return data * 2.775;
      })
      maxNumber = maxNumForCoverPerWasteChartFunction(monetaryValues)
    }
  } else {
    maxNumber = maxNumForCoverPerWasteChartFunction(display)
  }

  const { width } = useWindowDimensions();

  if (width <= 700) {
    graphWidth = 260;
    graphHeight = 65;
  } else if (width >= 1600) {
    // graphWidth = 700;
    // graphHeight = 250;

    graphHeight = 424;
    graphWidth = 893;
  }

  return (

    <>
      {!props.hideReport &&
      <>
        <AccordionHeading color={"primPurpleBackgroundColor"}>

          <div className="section-title">WASTE per COVER</div>
          <div className="container">
            <span onClick={() =>
                {
                  props.setWastePerCover(!props.wastePerCover)
                  setItemInLocalStorage("showWastePerCover", !props.wastePerCover)
                }
                }>

                {props.wastePerCover ? (
                "X ")
                :
                "| | | "
                }
            </span>
          </div>

        </AccordionHeading>
        <AccordionBody open={props.wastePerCover}>

        <div className= { props.showDarkTheme ? "darkTheme__reportBackgroundColor addPaddingOfHalveRem": "originalTheme__reportBackgroundColor addPaddingOfHalveRem"}>

          <div className="graph__row addSpaceBetween">
            <div className="report-subtitle">{siteName}</div>
            <div className="graph__heading">WASTE PER COVER
              <div className="applyMarginRightAndLeft">{props.showPounds? "(£)" : "(Kg)" } /Person in {monthName} {year}</div>
            </div>
          </div>

          <div className="graph__row">

            <div className="graph__labelWrapper">

                <div className="graph__label applyMarginRightAndLeft">{year}</div>
                {" "}
                <div className="graph__label applyMarginRightAndLeft">{monthName}</div>
                {" "}
                <div className="graph__label applyMarginRightAndLeft">
                  Total Waste
                </div>
                <div className="applyMarginRightAndLeft graph__label">
                  {labels.acronyms.c}
                </div>
                <div
                  id={1}
                  key={0}
                >
                  <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                    {totalCoverWaste}
                  </div>
                </div>
                <div>+</div>
                <div className="graph__label applyMarginRightAndLeft">
                 {labels.acronyms.s}
                 </div>
                <div
                  id={2}
                  key={1}
                >
                  <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                    {totalSpoilageWaste}
                  </div>
                </div>
                <div>+</div>
                <div className="applyMarginRightAndLeft graph__label">
                 {labels.acronyms.p}
                </div>
                <div
                  id={3}
                  key={2}
                >
                  <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                    {totalPrepWaste} = {totalAllWaste}
                  </div>
                </div>
              </div>

          </div>

          <div className="graph__row">
            <div className="graph__labelWrapper">
              <div className="graph__label applyMarginRightAndLeft">{year} {monthName} Total Monthly Covers</div>
              <div className="applyBlueTuckGreen">{totalCoverInputs}</div>
            </div>
          </div>
          <div className="graph__row">
            <div className="graph__labelWrapper">
              <div className="graph__label applyMarginRightAndLeft">Do we have Monthly Cover Inputs data in {monthName} {year}? {percentageOfInputsAreZeros > 50 ? "NO" : "YES"}</div>
            </div>
          </div>


          <div className="dashboard__wrapperForSelector">
              <div className="dashboard__selector">

                <Tooltip
                  open={tooltipIsOpen}
                  onClose={() => setTooltipIsOpen(false)}
                  title="clickable waste stream"
                  arrow
                >

                <h2
                  className={activeState.coverSelector ? "active" : "inactive"}
                  id={0}
                  onClick={() => {
                    toggleActive("coverSelector");
                  }}
                  >{labels.acronyms.c}</h2>
                </Tooltip>

                <Tooltip
                  open={tooltipIsOpen}
                  onClose={() => setTooltipIsOpen(false)}
                  arrow
                >

                <h2
                  className={activeState.spoilageSelector ? "active" : "inactive"}
                  id={1}
                  onClick={() => {
                    toggleActive("spoilageSelector");
                  }}
                  >{labels.acronyms.s}</h2>

                </Tooltip>

                <Tooltip
                  open={tooltipIsOpen}
                  onClose={() => setTooltipIsOpen(false)}
                  arrow
                >

                <h2
                  className={activeState.preparationSelector ? "active" : "inactive"}
                  id={2}
                  onClick={() => {
                    toggleActive("preparationSelector");
                  }}
                  >{labels.acronyms.p}</h2>

                </Tooltip>

                <h2
                  className={activeState.allSelector ? "active" : "inactive"}
                  id={3}
                  onClick={() => {
                    toggleActive("allSelector");
                  }}
                  >ALL</h2>
              </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "center"
          }}>
            <Capping
              coverWastes={wastePerCoverCoverWastes}
              spoilageWastes={wastePerCoverSpoilageWastes}
              prepWastes={wastePerCoverPrepWastes}
              showPounds={props.showPounds}
              c={labels.acronyms.c}
              s={labels.acronyms.s}
              p={labels.acronyms.p}
            />
          </div>

          <div className="dashboard__wrapperForGraph">
            <div
              style={{
                width: "100%",
                overflow: "auto"
              }}
            >

              <Bar
                  data={{
                    labels: foodWasteXaxis,
                    wasteSteamsValue: wasteStreamValue,
                    inputData: inputsData,
                    datasets: [

                      {
                        label: "array 1",
                        data: props.showPounds? displayValue.map((data) => {
                          if (data) {
                            return (data * 2.775).toFixed(1)
                          }
                        }) : displayValue,
                        backgroundColor: barColors,
                        // minBarLength: 0.3,
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
                            max: maxNumber
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
                          size: 5,
                          weight: 900,
                        },
                        offset: 4,
                      },

                    },


                    tooltips: {
                      enabled: true,
                      callbacks: {
                        title: function(tooltipItems, data) {
                          return '';
                        },
                        label: function(tooltipItem, data) {
                          let inputData = data.inputData[tooltipItem.index];

                          let wasteSteamValue = isInt(data.wasteSteamsValue[tooltipItem.index]) ? data.wasteSteamsValue[tooltipItem.index] :  keepTwoDecimalPlacesWithoutRoundingUp(data.wasteSteamsValue[tooltipItem.index])

                          const val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                          return val + "(" +  wasteSteamValue + "/" + inputData + ")"
                        }
                      }
                    }

                  }}
              />

            </div>
          </div>

          <div className="graph__row">
              <div className="dateLabel__wrapper">
                <div className="dateLabel__coverwastesSquare"></div>
                {labels.titleLabels.c}
                <div className="dateLabel__spoliageSquare"></div>
                {labels.titleLabels.s}
                <div className="dateLabel__preparationSquare"></div>
                {labels.titleLabels.p}
                <div className="dateLabel__allWasteSquare"></div>
                ALL
              </div>
          </div>


          <div className="graph__row">
            <div className="graph__selector-spacing">
              <div className="graph__title">MONTH:
              </div>

              {monthly.map((month, i) => {
                return (
                  <div className={month.show? "active applyMarginRightAndLeft applyPurpleColor": "displayNone"} key={i} >
                    {month.month}
                  </div>
                )
              })}

              <h2 className="applyMarginRightAndLeft clickable" onClick={() => {handleMonthly("NEXT", "wastePerCover")}}>NEXT</h2>
              <h2 className="clickable" onClick={() => {handleMonthly("PREV", "wastePerCover")}}>PREV</h2>
            </div>
            <div className="graph__title clickable applyPurpleColor" onClick={() => {handleSearch()}}>
              SEARCH
            </div>
          </div>

          <div className="graph__row">
             <div className="graph__message">
              (Starts on the first Monday of the Month)
             </div>
          </div>

        </div>

      </AccordionBody>
      </>
      }
    </>
  );
}