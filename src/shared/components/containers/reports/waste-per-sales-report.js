import React, { useContext, useEffect, useState} from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

import useWindowDimensions from "../../libs/use-window-dimensions";

import { WastePerSalesContext } from "../../../../contexts/waste-per-sales-context";

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

let graphWidth = 500;
let graphHeight = 220;
// let fontSize = 7

export default function WastePerSalesGraph(props) {

const {
  allCappingValue,
  wastePerSalesCoverWastes,
  wastePerSalesSpoilageWastes,
  wastePerSalesPrepWastes,
} = useContext(WasteCapContext);

const {
  labels
 } = useContext(WasteLabelsContext);

const [tooltipIsOpen, setTooltipIsOpen] = React.useState(true);

const {
  totalCW,
  count,
  totalPW,
  totalSW,
  totalWaste,
  monthName,
  selectedYear,
  totalSalesInputs,
  percentageOfInputsAreZeros,
  display,
  toggleActive,
  activeState,
  montlyArray,
  yearlyArray,

  handleSearch,
  searchError,
  siteName,
  handleMonthly,

  wasteSteamValue,
  salesInputDataArray,

  datesLabel,
  foodWaste,
  foodWasteXaxis,

  showTooltip
} = useContext(WastePerSalesContext);

  const [ displayValue, setDisplay ] = React.useState([])

  const [totalCoverWaste, setTotalCW ] = useState(0)
  const [totalPrepWaste, setTotalPW ] = useState(0)
  const [totalSpoilageWaste, setTotalSW ] = useState(0)
  const [totalAllWaste, setTotalWaste ] = useState(0)

  const [showSearchError, setShowSearchError ] = useState(false)
  const [year, setSelectedYear] = React.useState(0);

  let [maxNumber, setMaxNumber] = React.useState(1);

  const [ inputsData, setInputsData ] = useState([])
  const [ wasteStreamValue, setWasteStreamValue] = useState([])

  useEffect(() => {

    setWasteStreamValue(wasteSteamValue);
    setInputsData(salesInputDataArray);

    setDisplay(foodWaste)
    setTotalCW(totalCW)
    setTotalPW(totalPW)
    setTotalSW(totalSW)
    setTotalWaste(totalWaste)
    let maxNumber = maxNumForCoverPerWasteChartFunction(display)
    setMaxNumber(maxNumber)
    setShowSearchError(searchError)
    setSelectedYear(selectedYear)

    if (props.wastePerSales && showTooltip) {
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
    salesInputDataArray,

    datesLabel,
    foodWaste,
    foodWasteXaxis,
    props.wastePerSales
  ])

  if (props.showPounds) {
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
    graphWidth = 700;
    graphHeight = 250;
  }

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

  indexes = getIndexesForBackgroundColours(foodWaste,allCappingValue, "wastePerSalesCappingValues", activeState);

  if (indexes) {
    indexes.targetIndexArray.map((data) => {

      barColors[data] = "rgba(255, 0, 0, 0.9)";
      return ""
    })
  }

  return (

    <>
      {!props.hideReport &&
      <>
        <AccordionHeading color={"primPurpleBackgroundColor"}>

          <div className="section-title">WASTE per SALES</div>
          <div className="container">
            <span onClick={() =>
                {
                  props.setWastePerSales(!props.wastePerSales)
                  setItemInLocalStorage("showWastePerSales", !props.wastePerSales)
                }
                }>

                {props.wastePerSales ? (
                "X ")
                :
                "| | | "
                }
            </span>
          </div>

        </AccordionHeading>
        <AccordionBody open={props.wastePerSales}>

        <div className= { props.showDarkTheme ? "darkTheme__reportBackgroundColor addPaddingOfHalveRem": "originalTheme__reportBackgroundColor addPaddingOfHalveRem"}>

          <div className="graph__row addSpaceBetween">
            <div className="report-subtitle">{siteName}</div>
            <div className="graph__heading">WASTE PER SALES
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
              <div className="graph__label applyMarginRightAndLeft">{year} {monthName} Total Monthly Sales</div>
              <div className="applyBlueTuckGreen">{totalSalesInputs}</div>
            </div>
          </div>
          <div className="graph__row">
            <div className="graph__labelWrapper">
              <div className="graph__label applyMarginRightAndLeft">Do we have Monthly Sales Inputs data in {monthName} {year}? {percentageOfInputsAreZeros > 50 ? "NO" : "YES"}</div>
            </div>
          </div>


          <div className="dashboard__wrapperForSelector">
              <div className="dashboard__selector">

                <Tooltip
                  open={tooltipIsOpen}
                  onClose={() => setTooltipIsOpen(false)}
                  title='clickable waste stream'
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
              coverWastes={wastePerSalesCoverWastes}
              spoilageWastes={wastePerSalesSpoilageWastes}
              prepWastes={wastePerSalesPrepWastes}
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
                            return (data * 2.775).toFixed(2)
                          }
                        }) : displayValue,
                        backgroundColor: barColors,
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
                        backgroundColor: null,
                        borderColor: null,
                        borderRadius: 4,
                        borderWidth: 1,
                        font: {
                          // size: fontSize,
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

              {montlyArray.map((month, i) => {
                return (
                  <div className={month.show? "active applyMarginRightAndLeft applyPurpleColor": "displayNone"} key={i} >
                    {month.month}
                  </div>
                )
              })}

              <h2 className="applyMarginRightAndLeft clickable" onClick={() => {handleMonthly("NEXT")}}>NEXT</h2>
              <h2 className="clickable" onClick={() => {handleMonthly("PREV")}}>PREV</h2>
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
