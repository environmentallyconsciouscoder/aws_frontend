import React, {useContext} from "react";
import {
  setItemInLocalStorage,
  roundedUpNumberAndTurnBackToNumber,
  getCurrentAndPreviousMonths
} from "../../../../utilities.js";

import meals from "../../../../image/meals.svg";
import  co2  from "../../../../image/co2.svg";
import  money  from "../../../../image/money.svg";

import { TargetContext } from "../../../../contexts/target-context";

import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

import { AccordionHeading, AccordionBody } from "../accordion"

const currentAndPreviousMonths = getCurrentAndPreviousMonths()

export default function ProgressBar({
  setFoodWasteTargetSavings,
  foodWasteTargetSavings,
  showDarkTheme,
  hideReport
}) {

   const {
    targetsAndImpact,
    prevMonthWaste,
    showPercentagedWarning,
    label,
    activeState,
    toggleActive,
   } = useContext(TargetContext);

   const {
    labels
   } = useContext(WasteLabelsContext);

  return (
    <>
      {!hideReport &&
        <>
          <AccordionHeading>
            <div className="section-title">FOOD WASTE TARGET</div>
            <div className="container">
              {foodWasteTargetSavings ? (
                <span onClick={() =>
                {
                  setFoodWasteTargetSavings(!foodWasteTargetSavings)
                  setItemInLocalStorage("showFoodWasteTargetSavings", !foodWasteTargetSavings)
                }
                }>X</span>
              ) : (
                <span onClick={() =>
                {
                  setFoodWasteTargetSavings(!foodWasteTargetSavings)
                  setItemInLocalStorage("showFoodWasteTargetSavings", !foodWasteTargetSavings)
                }
                }> | | | </span>
              )}
            </div>
          </AccordionHeading>

          <AccordionBody open={foodWasteTargetSavings}>
            <div className= { showDarkTheme ? "darkTheme__reportBackgroundColor addPaddingOfHalveRem": "originalTheme__reportBackgroundColor addPaddingOfHalveRem"}>

              <div className="dashboard__targetsMenu">
                <div className="foodWasteTrackingProgress__timePeriodHeading">TIME PERIOD</div>
                <h2
                  className={activeState.yearlyTargets ? "active" : "inactive"}
                  id={0}
                  onClick={() => {
                    toggleActive("yearlyTargets");
                  }}
                  >Yr</h2>
                <h2
                  className={activeState.monthlyTargets ? "active" : "inactive"}
                  id={1}
                  onClick={() => {
                    toggleActive("monthlyTargets");
                  }}
                  >Mth</h2>
                <h2
                  className={activeState.weeklyTargets ? "active" : "inactive"}
                  id={2}
                  onClick={() => {
                    toggleActive("weeklyTargets");
                  }}
                  >Wk</h2>
                <h2
                  className={activeState.dailyTargets ? "active" : "inactive"}
                  id={3}
                  onClick={() => {
                    toggleActive("dailyTargets");
                  }}
                  >Dy</h2>
              </div>

              <div className="dashboard__foodWasteTrackingProgressBarWrapper">

                <div className="foodWasteTrackingProgress__section">
                    <div className="foodWasteTrackingProgress__progressBar__wrapper">

                          <div className="foodWasteTrackingProgress__waste foodWasteTrackingProgress__waste--marginBottom">

                            <div className="foodWasteTrackingProgress__subheading foodWasteTrackingProgress__flexBasis__month">
                              <div className="cooperHewittBold applyPurpleColor">
                                {currentAndPreviousMonths.previousMonth}
                              </div>

                            </div>

                            <div className="cooperHewittBold applyBlueTuckGreen foodWasteTrackingProgress__wasteValues foodWasteTrackingProgress__flexBasis__label">
                                Total
                            </div>

                            <div className={showDarkTheme? "darkTheme__numberColor foodWasteTrackingProgress__wasteValues cooperHewittBold foodWasteTrackingProgress__flexBasis__kgOrPounds" :"foodWasteTrackingProgress__wasteValues cooperHewittBold applyBlueTuckGreen foodWasteTrackingProgress__flexBasis__kgOrPounds"}>
                              {prevMonthWaste} Kg CSP
                            </div>

                          </div>

                    </div>
                  </div>

                  <div className="foodWasteTrackingProgress__section">
                    <div className="foodWasteTrackingProgress__progressBar__wrapper">

                          <div className="foodWasteTrackingProgress__targets">
                            <div className="foodWasteTrackingProgress__subheading cooperHewittBold applyPurpleColor foodWasteTrackingProgress__flexBasis__month">
                              {currentAndPreviousMonths.currentMonth}
                            </div>

                            <div className="foodWasteTrackingProgress__wasteValues cooperHewittBold applyBlueTuckGreen foodWasteTrackingProgress__flexBasis__label">
                            Target
                            </div>

                            <div className={showDarkTheme? "darkTheme__numberColor foodWasteTrackingProgress__wasteValues cooperHewittBold foodWasteTrackingProgress__flexBasis__kgOrPounds" :"foodWasteTrackingProgress__wasteValues cooperHewittBold applyBlueTuckGreen foodWasteTrackingProgress__flexBasis__kgOrPounds"}>
                              {targetsAndImpact.targets} kg CSP
                            </div>

                          </div>

                    </div>
                  </div>


                  <div className="foodWasteTrackingProgress__section">
                    <div className="foodWasteTrackingProgress__progressBar__wrapper">

                      <div className="foodWasteTrackingProgress__flexBasis__month">
                      </div>

                      <div className={showDarkTheme? "darkTheme__numberColor foodWasteTrackingProgress__styling cooperHewittBold foodWasteTrackingProgress__flexBasis__percentaged" :"foodWasteTrackingProgress__styling cooperHewittBold applyBlueTuckGreen foodWasteTrackingProgress__flexBasis__percentaged"}>
                        {targetsAndImpact.percentaged * 100} % reduction
                      </div>

                      <div className={showDarkTheme? "darkTheme__numberColor foodWasteTrackingProgress__styling cooperHewittBold displayFlex" :"foodWasteTrackingProgress__styling cooperHewittBold applyBlueTuckGreen displayFlex"}>

                        <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">(
                        {labels.acronyms.c}</div> {roundedUpNumberAndTurnBackToNumber(targetsAndImpact.monthlyCoverWasteTarget)} kg +

                        <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">
                        {labels.acronyms.s}</div> {roundedUpNumberAndTurnBackToNumber(targetsAndImpact.monthlySpoilageWasteTarget)} kg +

                        <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">
                        {labels.acronyms.p}</div> {roundedUpNumberAndTurnBackToNumber(targetsAndImpact.monthlyPrepWasteTarget)} kg)

                      </div>


                    </div>
                  </div>

                  <div className="foodWasteTrackingProgress__section">
                    <div className="foodWasteTrackingProgress__flexBasis__month">
                    </div>
                    <div className="showRedColor foodWasteTrackingProgress__warningFontSize cooperHewittBold">{showPercentagedWarning ? `Targets may not be achievable as AI predictions are ${targetsAndImpact.percentaged * 100} % than what is expected`: ""}</div>
                  </div>

                  <div className="foodWasteTrackingProgress__section">
                    <div className="foodWasteTrackingProgress__progressBar__wrapper">

                          <div className="foodWasteTrackingProgress__targets">
                            <div className="foodWasteTrackingProgress__subheading cooperHewittBold applyPurpleColor foodWasteTrackingProgress__flexBasis__month">
                              AI predicted
                            </div>

                            <div className={showDarkTheme? "darkTheme__numberColor foodWasteTrackingProgress__wasteValues cooperHewittBold foodWasteTrackingProgress__flexBasis__kgOrPounds" :"foodWasteTrackingProgress__wasteValues cooperHewittBold applyBlueTuckGreen foodWasteTrackingProgress__flexBasis__kgOrPounds"}>
                              {targetsAndImpact.totalMonthlyForecasts} Kg
                            </div>

                            <div className={showDarkTheme? "darkTheme__numberColor foodWasteTrackingProgress__styling cooperHewittBold displayFlex" :"foodWasteTrackingProgress__styling cooperHewittBold applyBlueTuckGreen displayFlex"}>
                              <div className={showDarkTheme? "darkTheme__numberColor cooperHewittBold" : "applyPurpleColor cooperHewittBold applyMarginRightAndLeft"}>{targetsAndImpact.totalShortFall} kg =</div>
                              <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">(
                              {labels.acronyms.c}</div> {roundedUpNumberAndTurnBackToNumber(targetsAndImpact.coverWasteShortFall)} kg + <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">
                              {labels.acronyms.s}</div> {roundedUpNumberAndTurnBackToNumber(targetsAndImpact.spoilageWasteShortFall)} kg + <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">
                              {labels.acronyms.p}</div> {roundedUpNumberAndTurnBackToNumber(targetsAndImpact.prepWasteShortFall)} kg)
                            </div>


                          </div>

                    </div>
                  </div>

                  <div className="foodWasteTrackingProgress__section">
                    <div className="foodWasteTrackingProgress__flexBasis__month">
                    </div>
                    <div className="showRedColor foodWasteTrackingProgress__warningFontSize cooperHewittBold">{targetsAndImpact.targetIsRealistic ? "" : "Targets are not actionable, please reduce waste behaviour!"}</div>
                  </div>



                  <div className="foodWasteTrackingProgress__section">
                    <div className="foodWasteTrackingProgress__impact">

                          <div className="foodWasteTrackingProgress__styling cooperHewittBold applyPurpleColor">
                            {label} Target Savings
                          </div>

                          <div className="foodWasteTrackingProgress__savingTargets">


                            <div className="foodWasteTrackingProgress__styling cooperHewittBold ">
                              <div className="foodWasteTrackingProgress__impact__wrapper">
                                <img className="foodWasteTrackingProgress__logo applyMarginRightAndLeft" src={meals} alt="logo" />
                                <div className="foodWasteTrackingProgress__impact__text cooperHewittBold">
                                  <div className={showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                                    {roundedUpNumberAndTurnBackToNumber(targetsAndImpact.mealsSavings)} Meals
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="foodWasteTrackingProgress__styling cooperHewittBold ">
                              <div className="foodWasteTrackingProgress__impact__wrapper">
                                <img className="foodWasteTrackingProgress__logo applyMarginRightAndLeft" src={co2} alt="logo" />
                                <div className="foodWasteTrackingProgress__impact__text cooperHewittBold">
                                  <div className={showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                                    {roundedUpNumberAndTurnBackToNumber(targetsAndImpact.co2Reduction)} Kg of C02
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="foodWasteTrackingProgress__styling cooperHewittBold ">
                              <div className="foodWasteTrackingProgress__impact__wrapper">
                                <img className="foodWasteTrackingProgress__logo applyMarginRightAndLeft" src={money} alt="logo" />
                                <div className="foodWasteTrackingProgress__impact__text cooperHewittBold">
                                  <div className={showDarkTheme? "darkTheme__numberColor" :"applyBlueTuckGreen"}>
                                    £ {roundedUpNumberAndTurnBackToNumber(targetsAndImpact.moneySavings)}
                                  </div>
                                </div>
                              </div>
                            </div>

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
