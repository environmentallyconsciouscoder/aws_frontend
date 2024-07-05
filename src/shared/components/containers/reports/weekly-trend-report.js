import React, { useContext, useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  weeklyWasteDateRange,
  setItemInLocalStorage
} from "../../../../utilities";

import { WeeklyWasteTrendContext } from "../../../../contexts/weekly-trends-context";

import BarChart from "./../reuseable-components/charts/bar-chart/bar-chart"

import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

import { AccordionHeading, AccordionBody } from "../accordion"

import Tooltip from "@material-ui/core/Tooltip";

function ReportOne({
  siteName,
  showPounds,
  setShowWeeklyTrendChart,
  showWeeklyTrendChart,
  showDarkTheme,
  hideReport,
}) {

  const {
    labels
   } = useContext(WasteLabelsContext);

  const { setDateRange, coverWaste, preparationWaste, spoilageWaste, totalWaste, weeklyWasteValuesForCurrentWeekAndLastWeek, handleWeeklyTrendValues, showTooltip } = useContext(WeeklyWasteTrendContext);

  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(true);

  const dateRange = setDateRange();
  const formatedDateRange  = weeklyWasteDateRange(dateRange)

  let cover = coverWaste
  let production = preparationWaste
  let spoliage = spoilageWaste

  let coverWastepercentage = 0
  let spoliageWastepercentage = 0
  let productionWastepercentage = 0

  let coverWasteColor;
  let spoliageWasteColor;
  let preparationWasteColor;


  if (cover > 0) {
    coverWasteColor = "rgba(255, 0, 0, 0.9)"
  } else if (cover === 0) {
    coverWasteColor = "rgb(237, 242, 99)"
  } else {
    coverWasteColor = "rgb(47, 67, 30)"
  }

  if (production > 0) {
    preparationWasteColor = "rgba(255, 0, 0, 0.9)"
  } else if (production === 0) {
    preparationWasteColor = "rgb(237, 242, 99)"
  } else {
    preparationWasteColor = "rgb(47, 67, 30)"
  }

  if (spoliage > 0) {
    spoliageWasteColor = "rgba(255, 0, 0, 0.9)"
  } else if (spoliage === 0) {
    spoliageWasteColor = "rgb(237, 242, 99)"
  } else {
    spoliageWasteColor = "rgb(47, 67, 30)"
  }

  let textColor;

  if (showDarkTheme) {
    textColor = "rgb(255, 231, 227)";
    } else {
    textColor = "rgb(140, 112, 140)";
  }

  const [appState, changeState] = useState({
    activeObject: {
      id: 3,
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
    if (showWeeklyTrendChart && showTooltip) {
      setTooltipIsOpen(true)
    } else {
      setTooltipIsOpen(false)
    }
  },[showWeeklyTrendChart, showTooltip])

  return (


    <div className="weeklyWasteTrend">
      {!hideReport &&
        <>
          <AccordionHeading>
            <div className="section-title">WEEKLY WASTE TREND</div>
            <div className="container">
              {showWeeklyTrendChart ? (
                <span onClick={() =>
                {
                  setShowWeeklyTrendChart(!showWeeklyTrendChart)
                  setItemInLocalStorage("showWeeklyTrendChart", !showWeeklyTrendChart)
                }
                }>X</span>
              ) : (
                <span onClick={() =>
                {
                  setShowWeeklyTrendChart(!showWeeklyTrendChart)
                  setItemInLocalStorage("showWeeklyTrendChart", !showWeeklyTrendChart)
                }
                }> | | | </span>
                )}
            </div>
          </AccordionHeading>

          <AccordionBody open={showWeeklyTrendChart}>
            <div className= { showDarkTheme ? "darkTheme__reportBackgroundColor addPaddingOfHalveRem": "originalTheme__reportBackgroundColor addPaddingOfHalveRem"}>

            <div className="dashboard__overviewSitesReportHeading">
              <div className="report-subtitle">{siteName}</div>
            </div>

            <div
              className="dashboard__overviewSitesReport__capping"
              style={{ justifyContent: "space-evenly" }}
            >

            </div>

            <div className="dashboard__overviewSitesReportProgressBarWrapper">

            <div className="dashboard__progressBar">


              <div className="dashboard__progressBar__one">

              <div className="dashboard__progressBar__totalWasteValue__wrapper">

              <div className="dashboard__progressBar__totalWasteValue">

              <div className="weeklyWasteTrend--poundsKgsAndDateWrapper">
                <div className="weeklyWasteTrend--totalWasteAndKgAndPounds">

                  <div className={showDarkTheme? "dashboard__progressBar__totalWasteValue--fontSize darkTheme__numberColor cooperHewittBold" :"dashboard__progressBar__totalWasteValue--fontSize applyPurpleColor cooperHewittBold"}>
                    {showPounds ? "£": ""}
                  </div>

                  <div className={showDarkTheme? "dashboard__progressBar__totalWasteValue--fontSize darkTheme__numberColor" :"dashboard__progressBar__totalWasteValue--fontSize applyPurpleColor"}>
                    {showPounds ? (totalWaste * 2.775).toFixed(0) : totalWaste}
                  </div>

                  <div className={showDarkTheme? "dashboard__progressBar__totalWasteValue--fontSize darkTheme__numberColor cooperHewittBold" :"dashboard__progressBar__totalWasteValue--fontSize applyPurpleColor cooperHewittBold"}>
                    {showPounds ? "": "Kg"}
                  </div>


                </div>
                <div className="weeklyWasteTrend--dataRangeStyle applyCooperHewittBold">{formatedDateRange}</div>
              </div>

              </div>
              <div className="dashboard__progressBar__dataRange">
              </div>
          </div>

          <div className="dashboard__progressBar__totalWasteValue--icon">=</div>

          </div>


              <div className="dashboard__progressBar__two">

                  <div className="dashboard__progressBar__size">

                    <div className="dashboard__progressBar__wrapper">
                      <CircularProgressbar
                        value={coverWastepercentage}
                        text={
                          showPounds ?  (`${cover}` * 2.775).toFixed(0) : `${cover}`
                        }
                        styles={buildStyles({
                          textColor: textColor,
                          pathColor: coverWasteColor,
                          trailColor: coverWasteColor,
                          textSize: "20px",
                          strokeLinecap: "butt",
                        })}
                        strokeWidth={10}
                      />
                      <div className="dashboard__progressBar__text">
                        <div className="dashboard__progressBar__textSize">
                          {/* <b>C</b>OVER WASTE */}
                          {labels.titleLabels.c}
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="dashboard__progressBar__totalWasteValue--icon">+</div>

                  <div className="dashboard__progressBar__size">

                    <CircularProgressbar
                      value={spoliageWastepercentage}
                      text={
                        showPounds ?  (`${spoliage}` * 2.775).toFixed(0) : `${spoliage}`
                      }
                      styles={buildStyles({
                        textColor: textColor,
                        pathColor: spoliageWasteColor,
                        trailColor: spoliageWasteColor,
                        textSize: "20px",
                        strokeLinecap: "butt",
                      })}
                      strokeWidth={10}
                    />
                      <div className="dashboard__progressBar__text">
                        <div className="dashboard__progressBar__textSize">
                          {/* <b>S</b>POILAGE */}
                          {labels.titleLabels.s}
                        </div>
                      </div>
                  </div>

                  <div className="dashboard__progressBar__totalWasteValue--icon">+</div>

                  <div className="dashboard__progressBar__size">

                  <CircularProgressbar
                    value={productionWastepercentage}
                    text={
                      showPounds ?  (`${production}` * 2.775).toFixed(0) : `${production}`
                    }
                    styles={buildStyles({
                      textColor: textColor,
                      pathColor: preparationWasteColor,
                      trailColor: preparationWasteColor,
                      textSize: "20px",
                      strokeLinecap: "butt",
                    })}
                    strokeWidth={10}
                  />

                    <div className="dashboard__progressBar__text">
                      <div className="dashboard__progressBar__textSize">
                        {/* <b>P</b>REPARATION */}
                        {labels.titleLabels.p}
                      </div>
                    </div>


                </div>

                </div>



                </div>

                <div className="weeklyWaste__message">
                  (The difference between this and last week)
                </div>

                <div className="weeklyWaste__message cooperHewittBold" style={{
                  fontSize: "20px"
                }}>
                  THIS WEEK{'   '}VS{'   '}LAST WEEK
                </div>

                <BarChart data={weeklyWasteValuesForCurrentWeekAndLastWeek} showPounds={showPounds} />

                <div
                  style={{ marginTop: "1rem"}}
                >
                  <div className="monthlyWasteChart__CspLabel" style={{
                    width: "100%"
                  }}>
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
                    onClick={handleWeeklyTrendValues}
                        className={activeState.coverWaste ? "reduceOpacity" : ""}
                    >
                      {labels.acronyms.c} +
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
                    onClick={handleWeeklyTrendValues}
                        className={activeState.spoliageWaste ? "reduceOpacity" : ""}
                    >
                      {labels.acronyms.s} +
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
                    onClick={handleWeeklyTrendValues}
                        className={activeState.productionWaste ? "reduceOpacity" : ""}
                    >
                      {labels.acronyms.p} =
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
                    <h2 id={"A"}
                    onClick={handleWeeklyTrendValues}
                      className={activeState.allWaste ? "reduceOpacity" : ""}
                    >
                      ALL
                    </h2>
                  </div>
                </div>
                </div>

            </div>

          </div>
          </AccordionBody>
        </>
      }
    </div>

  );
}

export default ReportOne;

