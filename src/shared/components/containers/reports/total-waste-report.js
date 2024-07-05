import React, {  useContext } from "react";

import { OverviewWasteContext } from "../../../../contexts/total-waste-context";

import { WasteCapContext } from "../../../../contexts/waste-cap-context";

import { formatStartDate, roundedUpNumberAndTurnBackToNumber, setItemInLocalStorage } from "../../../../utilities";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { AccordionHeading, AccordionBody } from "../accordion"

import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

export default function TotalWaste(props) {

    const {
      labels
    } = useContext(WasteLabelsContext);

    const {
      selectedSiteCoverWastes,
      selectedSiteSpoliageWastes,
      selectedSitePeparationWastes,
      showPounds
     } = useContext(WasteCapContext);

    const {
      coverWaste,
      prepWaste,
      spoilageWaste,
      siteName
    } = useContext(OverviewWasteContext);

    let totalCoverCap = 0
    let totalSpoliageCap = 0
    let totalPreparationCap = 0

    if (showPounds) {
      totalCoverCap = roundedUpNumberAndTurnBackToNumber(selectedSiteCoverWastes * 2.775)
      totalSpoliageCap = roundedUpNumberAndTurnBackToNumber(selectedSiteSpoliageWastes * 2.775)
      totalPreparationCap = roundedUpNumberAndTurnBackToNumber(selectedSitePeparationWastes * 2.775)
    } else {
      totalCoverCap = selectedSiteCoverWastes > 0 ? selectedSiteCoverWastes : 0
      totalSpoliageCap = selectedSiteSpoliageWastes > 0 ? selectedSiteSpoliageWastes : 0
      totalPreparationCap = selectedSitePeparationWastes > 0 ? selectedSitePeparationWastes : 0
    }

    let totalCapValue = totalCoverCap + totalSpoliageCap + totalPreparationCap;

    let cover = 0;
    let spoliage = 0;
    let production = 0;

    // console.log("coverWaste",coverWaste)
    // console.log("spoilageWaste",spoilageWaste)
    // console.log("prepWaste",prepWaste)

    if (showPounds) {
      cover = roundedUpNumberAndTurnBackToNumber(coverWaste * 2.775)
      spoliage = roundedUpNumberAndTurnBackToNumber(spoilageWaste * 2.775)
      production = roundedUpNumberAndTurnBackToNumber(prepWaste * 2.775)
    } else {
      cover = coverWaste > 0 ? coverWaste: 0;
      spoliage = spoilageWaste > 0? spoilageWaste: 0;
      production = prepWaste > 0 ? prepWaste : 0;
    }

    let totalWaste = !isNaN(cover + spoliage + production) ? cover + spoliage + production : 0;

    // const totalWasteInPounds = roundedUpNumberAndTurnBackToNumber(totalWaste * 2.775)
    // console.log("totalWasteInPounds",totalWasteInPounds)
    // console.log("totalWaste",totalWaste)

    // const totalWasteInPoundsFormated = totalWasteInPounds

    let coverWastepercentage = 0
    let spoliageWastepercentage = 0
    let productionWastepercentage = 0

    if (isNaN((cover / totalCoverCap) * 100)) {
      coverWastepercentage = 100
    } else {
      coverWastepercentage = (cover / totalCoverCap) * 100
    }

    if (isNaN((spoliage / totalSpoliageCap) * 100)) {
      spoliageWastepercentage = 100
    } else {
      spoliageWastepercentage = (spoliage / totalSpoliageCap) * 100
    }

    if (isNaN((production / totalPreparationCap) * 100)) {
      productionWastepercentage = 100
    } else {
      productionWastepercentage = (production / totalPreparationCap) * 100
    }


    let coverWasteColor;
    if (cover >= totalCoverCap) {
      coverWasteColor = "rgba(255, 0, 0, 0.9)";
    } else if (cover === 0) {
      coverWasteColor = "rgb(163, 181, 44)"
    } else {
      coverWasteColor = "rgb(47, 67, 30)";
    }

    let spoliageWasteColor;
    if (spoliage >= totalSpoliageCap) {
      spoliageWasteColor = "rgba(255, 0, 0, 0.9)";
    } else if (spoliage === 0) {
      spoliageWasteColor = "rgb(163, 181, 44)"
    } else {
      spoliageWasteColor = "rgb(47, 67, 30)";
    }

    let preparationWasteColor;
    if (production >= totalPreparationCap) {
      preparationWasteColor = "rgba(255, 0, 0, 0.9)";
    } else if (production === 0) {
      preparationWasteColor = "rgb(163, 181, 44)"
    } else {
      preparationWasteColor = "rgb(47, 67, 30)";
    }

    let textColor;

    if (props.showDarkTheme) {
      textColor = "rgb(255, 231, 227)";
      } else {
      textColor = "rgb(140, 112, 140)";
    }

    return (

      <div className="total__wasteReport">
        {!props.hideReport &&
          <>
            <AccordionHeading color={"primPurpleBackgroundColor"}>
              <div className="section-title">TOTAL WASTE FROM {siteName}</div>
              <div className="container">
                {props.showTotalWasteChart ? (
                  <span onClick={() =>
                  {
                    setItemInLocalStorage("showTotalWasteChart", !props.showTotalWasteChart)
                    props.setShowTotalWasteChart(!props.showTotalWasteChart)
                  }
                  }>X</span>
                ) : (
                  <span onClick={() =>
                  {
                    props.setShowTotalWasteChart(!props.showTotalWasteChart)
                    setItemInLocalStorage("showTotalWasteChart", !props.showTotalWasteChart)
                  }
                  }> | | | </span>
                )}
              </div>
            </AccordionHeading>

            <AccordionBody open={props.showTotalWasteChart}>
              <div className= { props.showDarkTheme ? "darkTheme__reportBackgroundColor addPaddingOfHalveRem": "originalTheme__reportBackgroundColor addPaddingOfHalveRem"}>

                <div className="report-subtitle">Overview</div>

                  <div className="total__wasteReport__reportHeading">
                  <div className="start-date cooperHewittBold">START DATE: {formatStartDate(props.startDate)}</div>
                  </div>

                  <div className="total__wasteReport__capping">
                  <div className="capping--displayFlex">
                      <div className="applyMarginRightAndLeft applyPurpleColor cooperHewittBold">Total Cap</div>

                      <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                        {roundedUpNumberAndTurnBackToNumber(totalCapValue)}
                      </div>

                  </div>
                  <b className="capping">
                          <div className="applyPurpleColor cooperHewittBold">Cap</div>
                          <div className="capping__text applyMarginRightAndLeft applyPurpleColor cooperHewittBold">
                            {labels.acronyms.c}
                          </div>

                          <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                            {roundedUpNumberAndTurnBackToNumber(totalCoverCap)}
                          </div>

                          <div className="capping__text applyMarginRightAndLeft applyPurpleColor cooperHewittBold">
                            {labels.acronyms.s}
                          </div>

                          <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                            {roundedUpNumberAndTurnBackToNumber(totalSpoliageCap)}
                          </div>

                          <div className="capping__text applyMarginRightAndLeft applyPurpleColor cooperHewittBold">
                            {labels.acronyms.p}
                          </div>

                          <div className={props.showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                            {roundedUpNumberAndTurnBackToNumber(totalPreparationCap)}
                          </div>
                  </b>
                  </div>

                  <div className="total__wasteReport__progressBarWrapper">

                      <>

                      <div className="dashboard__progressBar">

                        <div className="dashboard__progressBar__one">

                          <div className="dashboard__progressBar__totalWasteValue__wrapper">
                              <div className="dashboard__progressBar__totalWasteValue">
                                {props.showPounds ? (
                                  <>


                                    <div className={props.showDarkTheme? "dashboard__progressBar__totalWasteValue--fontSize darkTheme__numberColor cooperHewittBold" :"dashboard__progressBar__totalWasteValue--fontSize applyPurpleColor cooperHewittBold"}>
                                      £
                                    </div>

                                    <div className={props.showDarkTheme? "dashboard__progressBar__totalWasteValue--fontSize darkTheme__numberColor" :"dashboard__progressBar__totalWasteValue--fontSize applyPurpleColor"}>
                                      {/* {totalWasteInPoundsFormated} */}
                                      {totalWaste}
                                    </div>
                                  </>
                                ) : (
                                  <>

                                    <div className={props.showDarkTheme? "dashboard__progressBar__totalWasteValue--fontSize darkTheme__numberColor" :"dashboard__progressBar__totalWasteValue--fontSize applyPurpleColor"}>
                                      {totalWaste}
                                    </div>

                                    <div className={props.showDarkTheme? "dashboard__progressBar__totalWasteValue--fontSize darkTheme__numberColor cooperHewittBold" :"dashboard__progressBar__totalWasteValue--fontSize applyPurpleColor cooperHewittBold"}>
                                      Kg
                                    </div>
                                  </>
                                )}
                              </div>
                          </div>


                        </div>

                        <div className="dashboard__progressBar__two">

                          <div className="dashboard__progressBar__totalWasteValue--icon">=</div>

                          <div className="dashboard__progressBar__size">
                            {cover >= totalCoverCap ? (
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
                                  cover
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
                            {spoliage >= totalSpoliageCap ? (
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
                                value={spoliageWastepercentage}
                                text={
                                  spoliage
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
                            </div>
                              <div className="dashboard__progressBar__text">
                                <div className="dashboard__progressBar__textSize">
                                  {labels.titleLabels.s}
                                </div>
                              </div>
                          </div>


                          <div className="dashboard__progressBar__totalWasteValue--icon">+</div>

                          <div className="dashboard__progressBar__size">
                          {production >= totalPreparationCap ? (
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
                              value={productionWastepercentage}
                              text={
                                production
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
                          </div>

                            <div className="dashboard__progressBar__text">
                              <div className="dashboard__progressBar__textSize">
                                {labels.titleLabels.p}
                              </div>
                            </div>
                          </div>

                        </div>


                      </div>

                      </>

                  </div>

                </div>
            </AccordionBody>
          </>
        }
      </div>

    );
}





