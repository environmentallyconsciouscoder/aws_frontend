import React, { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { WasteCapContext } from "../../../../contexts/waste-cap-context";
import { WeeklyWasteContext } from "../../../../contexts/weekly-waste-context";

import { AccordionHeading, AccordionBody } from "../accordion"

import {
  wasteDailyDateRange,
  getLocalStorageData,
  roundedUpNumberAndTurnBackToNumber
} from "../../../../utilities";

import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

function ReportOne({
  showDarkTheme,
  showWeeklyChart,
  handleChangeForCheckedAndAccordion,
  hideReport
}) {

  const {
    labels
  } = useContext(WasteLabelsContext);

  const {
    weeklyCoverWastes,
    weeklySpoliageWastes,
    weeklyPeparationWastes,
    showPounds
  } = useContext(WasteCapContext);

  const {
    // cover,
    // production,
    // spoliage,
    coverWaste,
    productionWaste,
    spoliageWaste,
    siteName
  } = useContext(WeeklyWasteContext);

  let cover = 0
  let production = 0
  let spoliage = 0

  if (showPounds) {
    cover = roundedUpNumberAndTurnBackToNumber(coverWaste * 2.775)
    spoliage = roundedUpNumberAndTurnBackToNumber(spoliageWaste * 2.775)
    production = roundedUpNumberAndTurnBackToNumber(productionWaste * 2.775)
  } else {
    cover = coverWaste
    spoliage = spoliageWaste
    production = productionWaste
  }

  const totalWaste = parseInt(cover) + parseInt(spoliage) + parseInt(production);

  let weeklyCoverCap = 0
  let weeklySpoliageCap = 0
  let weeklyPreparationCap = 0

  if (showPounds) {
    weeklyCoverCap = weeklyCoverWastes * 2.775
    weeklySpoliageCap = weeklySpoliageWastes * 2.775
    weeklyPreparationCap = weeklyPeparationWastes * 2.775
  } else {
    weeklyCoverCap = weeklyCoverWastes
    weeklySpoliageCap = weeklySpoliageWastes
    weeklyPreparationCap = weeklyPeparationWastes
  }

let coverWastepercentage;
let spoliageWastepercentage;
let productionWastepercentage;

if (isNaN((cover / weeklyCoverCap) * 100)) {
  coverWastepercentage = 100
} else {
  coverWastepercentage = (cover / weeklyCoverCap) * 100
}

if (isNaN((spoliage / weeklySpoliageCap) * 100)) {
  spoliageWastepercentage = 100
} else {
  spoliageWastepercentage = (spoliage / weeklySpoliageCap) * 100
}

if (isNaN((production / weeklyPreparationCap) * 100)) {
  productionWastepercentage = 100
} else {
  productionWastepercentage = (production / weeklyPreparationCap) * 100
}

let totalWastepercentage;

const totalCapping = roundedUpNumberAndTurnBackToNumber(weeklyCoverCap + weeklySpoliageCap + weeklyPreparationCap)

if (isNaN((totalWaste / totalCapping) * 100)) {
  totalWastepercentage = 100
} else {
  totalWastepercentage = (totalWaste / totalCapping) * 100
}

  let totalWasteColor;
  if (totalWaste >= totalCapping) {
    totalWasteColor = "rgba(255, 0, 0, 0.9)";
  } else if (totalWaste === 0) {
    totalWasteColor = "rgb(163, 181, 44)"
  } else {
    totalWasteColor = "rgb(47, 67, 30)";
  }

  let coverWasteColor;
  if (cover >= weeklyCoverCap) {
    coverWasteColor = "rgba(255, 0, 0, 0.9)";
  } else if (cover === 0) {
    coverWasteColor = "rgb(163, 181, 44)"
  } else {
    coverWasteColor = "rgb(47, 67, 30)";
  }

  let spoliageWasteColor;
  if (spoliage >= weeklySpoliageCap) {
    spoliageWasteColor = "rgba(255, 0, 0, 0.9)";
  } else if (spoliage === 0) {
    spoliageWasteColor = "rgb(163, 181, 44)"
  } else {
    spoliageWasteColor = "rgb(47, 67, 30)";
  }

  let preparationWasteColor;
  if (production >= weeklyPreparationCap) {
    preparationWasteColor = "rgba(255, 0, 0, 0.9)";
  } else if (production === 0) {
    preparationWasteColor = "rgb(163, 181, 44)"
  } else {
    preparationWasteColor = "rgb(47, 67, 30)";
  }

  const xAxis = getLocalStorageData("dailyChartXaxis");
  let dateRangeLable = wasteDailyDateRange(xAxis);

  let textColor;

  if (showDarkTheme) {
    textColor = "rgb(255, 231, 227)";
    } else {
    textColor = "rgb(140, 112, 140)";
  }

  return (
    <div className={hideReport ? "dashboard__weeklyWaste displayNone":"dashboard__weeklyWaste"}>

      {/* <div className= { showDarkTheme ? "dashboard__weeklyWaste__accordionHeading darkTheme__accordionHeading":"dashboard__weeklyWaste__accordionHeading originalTheme__accordionHeading"}> */}

          <AccordionHeading color={"primPurpleBackgroundColor"}>

            <div className="section-title">WEEKLY WASTE</div>
            <div className="container">

              <span onClick={() => handleChangeForCheckedAndAccordion(!showWeeklyChart, "weeklyChartSwitch")}>
                {showWeeklyChart ? ("X"):"| | | "}
              </span>

            </div>

          </AccordionHeading>

       {/* </div> */}

       {/* <div className={(showWeeklyChart ? "dashboard__weeklyWaste__accordionContent"  + " dashboard__weeklyWaste__accordionContentOpening" : "displayNone" + " dashboard__weeklyWaste__accordionContentClosing")}> */}

       <AccordionBody open={showWeeklyChart}>

          <div className= { showDarkTheme ? "darkTheme__reportBackgroundColor addPaddingOfHalveRem": "addPaddingOfHalveRem"}>

            <div className="dashboard__overviewSitesReportHeading">
              <div className="report-subtitle">{siteName}</div>
            </div>

            <div className="weeklyWaste__headingWrapper">
              <div className="section-title center">WEEKLY WASTE<div className="applyMarginRightAndLeft">{showPounds? "(£)" : "(Kg)" }</div></div>
            </div>

            <div
              className="dashboard__overviewSitesReport__capping"
              style={{ justifyContent: "space-evenly" }}
            >
              <div className="capping__weeklyWasteChart leftPadding">

                  <div className="capping__text applyPurpleColor cooperHewittBold capping__flex">
                    Total
                    <div className={showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                      {roundedUpNumberAndTurnBackToNumber(weeklyCoverCap + weeklySpoliageCap + weeklyPreparationCap)}
                    </div>
                  </div>

                  <>
                  <div className="capping__text applyPurpleColor cooperHewittBold">=</div>

                    <div className="capping__text applyMarginRightAndLeft applyPurpleColor cooperHewittBold">{labels.acronyms.c}</div>

                    <div className={showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                      {roundedUpNumberAndTurnBackToNumber(weeklyCoverCap)}
                    </div>

                    <div className="capping__text applyMarginRightAndLeft applyPurpleColor cooperHewittBold">{labels.acronyms.s}</div>

                    <div className={showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                      {roundedUpNumberAndTurnBackToNumber(weeklySpoliageCap)}
                    </div>

                    <div className="capping__text applyMarginRightAndLeft applyPurpleColor cooperHewittBold">{labels.acronyms.p}</div>

                    <div className={showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                      {roundedUpNumberAndTurnBackToNumber(weeklyPreparationCap)}
                    </div>

                  </>
              </div>
            </div>

            <div className="dashboard__overviewSitesReportProgressBarWrapper">


            <div className="dashboard__progressBar">


              <div className="dashboard__weeklyWaste__progressBarWrapper">


              <div className="dashboard__progressBar__size">

              {totalWaste >= totalCapping ? (
                <div className="dashboard__progressBar__warningText">WARNING!</div>
              ) : (
                <div
                  style={{
                    marginTop: "1rem",
                  }}
                ></div>
              )}


              <div className="dashboard__progressBar__wrapper">
                <CircularProgressbar
                  value={totalWastepercentage}
                  text={
                    // showPounds ?  (`${totalWaste}` * 2.775).toFixed(0) : `${totalWaste}`
                    `${totalWaste}`
                  }
                  styles={buildStyles({
                    textColor: textColor,
                    pathColor: totalWasteColor,
                    trailColor: "rgb(163, 181, 44)",
                    textSize: "20px",
                    strokeLinecap: "butt",
                  })}
                  strokeWidth={10}
                />
                <div className="dashboard__progressBar__text">
                  <div className="dashboard__progressBar__textSize">
                    <div className="foodWasteTrackingProgress__date">{dateRangeLable}</div>
                  </div>
                </div>
              </div>

              </div>

              <div className="dashboard__progressBar__totalWasteValue--icon">=</div>



                <div className="dashboard__progressBar__size">

                {cover >= weeklyCoverCap ? (
                  <div className="dashboard__progressBar__warningText">WARNING!</div>
                ) : (
                  <div
                    style={{
                      marginTop: "1rem",
                    }}
                  ></div>
                )}

                <div className="dashboard__progressBar__wrapper">
                  <CircularProgressbar
                    value={coverWastepercentage}
                    text={
                      // showPounds ?  (`${cover}` * 2.775).toFixed(0) : `${cover}`
                      `${cover}`
                    }
                    styles={buildStyles({
                      textColor: textColor,
                      pathColor: coverWasteColor,
                      trailColor: "rgb(163, 181, 44)",
                      textSize: "20px",
                      strokeLinecap: "butt",
                    })}
                    strokeWidth={10}
                  />
                  <div className="dashboard__progressBar__text">
                    <div className="dashboard__progressBar__textSize">
                      {labels.titleLabels.c}
                    </div>
                  </div>
                </div>

                </div>

                <div className="dashboard__progressBar__totalWasteValue--icon">+</div>

                <div className="dashboard__progressBar__size">

                {spoliage >= weeklySpoliageCap ? (
                  <div className="dashboard__progressBar__warningText">WARNING!</div>
                ) : (
                  <div
                    style={{
                      marginTop: "1rem",
                    }}
                  ></div>
                )}

                  <CircularProgressbar
                    value={spoliageWastepercentage}
                    text={
                      // showPounds ?  (`${spoliage}` * 2.775).toFixed(0) : `${spoliage}`
                       `${spoliage}`
                    }
                    styles={buildStyles({
                      textColor: textColor,
                      pathColor: spoliageWasteColor,
                      trailColor: "rgb(163, 181, 44)",
                      textSize: "20px",
                      strokeLinecap: "butt",
                    })}
                    strokeWidth={10}
                  />
                    <div className="dashboard__progressBar__text">
                      <div className="dashboard__progressBar__textSize">
                        {labels.titleLabels.s}
                      </div>
                    </div>
                </div>

                <div className="dashboard__progressBar__totalWasteValue--icon">+</div>

                <div className="dashboard__progressBar__size">

                {production >= weeklyPreparationCap ? (
                <div className="dashboard__progressBar__warningText">WARNING!</div>
                ) : (
                  <div
                    style={{
                      marginTop: "1rem",
                    }}
                  ></div>
                )}


                <CircularProgressbar
                  value={productionWastepercentage}
                  text={
                    // showPounds ?  (`${production}` * 2.775).toFixed(0) : `${production}`
                    `${production}`
                  }
                  styles={buildStyles({
                    textColor: textColor,
                    pathColor: preparationWasteColor,
                    trailColor: "rgb(163, 181, 44)",
                    textSize: "20px",
                    strokeLinecap: "butt",
                  })}
                  strokeWidth={10}
                />

                <div className="dashboard__progressBar__text">
                  <div className="dashboard__progressBar__textSize">
                   {labels.titleLabels.p}
                  </div>
                </div>


              </div>
              </div>

            </div>

            <div className="weeklyWaste__message">
                (Weekly waste is updated 11pm everyday)
            </div>

            </div>

          </div>

        </AccordionBody>

        {/* </div> */}

      </div>
  );
}

export default ReportOne;
