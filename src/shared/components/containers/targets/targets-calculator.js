import React, { useState, useEffect, useContext } from "react";
import Menus from "./targets-menu"
import {
  getMonths,
  roundedUpNumberTwoPointsAndTurnBackToString,
  roundedUpNumberAndTurnBackToNumber,
} from "../../../../utilities"

import { MonthlyWasteContext } from "../../../../contexts/monthly-waste-context";
import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

import {
    postTargets,
    getLastYearMonthlyWaste,
    // getTargets
} from "../../../../api.js";

export default function Settings(props) {

  const { currentMonthCoverWasteArray, currentMonthPrepWasteArray, currentMonthSpoilageWasteArray } = useContext(MonthlyWasteContext);

  const { labels } = useContext(WasteLabelsContext);

  const [potentialSavingsInAday, setPotentialSavingsInAday] = useState(0);
  const [potentialSavingsInWeek, setPotentialSavingsInWeek] = useState(0);
  const [potentialSavingsInMonth, setPotentialSavingsInMonth] = useState(0);
  const [potentialSavingsInYear, setPotentialSavingsInYear] = useState(0);

  const [kiloOfCO2SavedYearlyDisplay, setKiloOfCO2SavedYearlyDisplay] = useState(0);
  const [numberOfMealsSavedYearlyDisplay, setNumberOfMealsSavedYearlyDisplay] = useState(0);

  const [cspWasteOfPreviousMonth, setCspWasteOfPreviousMonth] = useState(0);
  const [percentagedSavingsTotal, setPercentagedSavingsTotal] = useState(0);

  const [coverBreakDown, setCoverBreakDown] = useState(0);
  const [prepBreakDown, setPrepBreakDown] = useState(0);
  const [spoilageBreakDown, setSpoilageBreakDown] = useState(0);

  // const [poundsKGconverter, setPoundsKGconverter] = React.useState(2.075);
  const [poundsKGconverter, setPoundsKGconverter] = React.useState(2.775);
  const [savingPercentage, setSavingPercentage] = React.useState(JSON.parse(localStorage.getItem('targets')) || 0.0);

  const [sendToDataBase, setSendToDataBase] = useState(null);

  const [recommendTargetDisplay, setRecommendTargetDisplay] = useState(null);
  // const [percentagedDisplay, setPercentaged] = useState(null);

  let percentaged = 0.3

  useEffect(() => {

    // let id = props.companyID
    // let company = props.companyName
    // let siteid = props.selectedSiteValueID
    // console.log("id",id)
    // console.log("company",company)
    // console.log("siteid",siteid)
    // console.log("here props",props)

    props.recommendedTargets.map((data) => {
      setPotentialSavingsInAday(data.recommendedTargets.targets.percentSavingsInAday)
      setPotentialSavingsInWeek(data.recommendedTargets.targets.percentSavingsInAweek)
      setPotentialSavingsInMonth(data.recommendedTargets.targets.percentSavingsInAmonth)
      setPotentialSavingsInYear(data.recommendedTargets.targets.percentSavingsInAyear)

      setCoverBreakDown(data.recommendedTargets.targets.coverBreakDown)
      setPrepBreakDown(data.recommendedTargets.targets.prepBreakDown)
      setSpoilageBreakDown(data.recommendedTargets.targets.spoilageBreakDown)

      setRecommendTargetDisplay(data.recommendedTargets.targets.recommendTarget)

      setPercentagedSavingsTotal(data.recommendedTargets.targets.totalPercentagedSavingsTotal)
      setCspWasteOfPreviousMonth(data.recommendedTargets.targets.totalCSPforPreviousMonth)

      setKiloOfCO2SavedYearlyDisplay(data.recommendedTargets.targets.yearlyKilosOfCO2saved)
      setNumberOfMealsSavedYearlyDisplay(data.recommendedTargets.targets.yearlyMealsSaved)

      // const percentagedSavingsTotal = data.recommendedTargets.targets.totalPercentagedSavingsTotal
      // const cspWasteOfPreviousMonth = data.recommendedTargets.targets.totalCSPforPreviousMonth

      // setPercentaged(((percentagedSavingsTotal / cspWasteOfPreviousMonth) * 100))
      return ""
    });

       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.companyID, props.companyName, props.selectedSiteValueID, props.recommendedTargets]);

  const handleChange = (name, value) => {
    if (name === "sectors") {
        setPoundsKGconverter(value);
    } else if (name === "savings") {
        setSavingPercentage(value);
        percentaged = value
        showResults(percentaged)
    }
  }

  const checkActiveStep = (data) => {
    if (data === 0) {
      if (sendToDataBase !== null) {
        saveTargets()
      }
    }

    // if (data === 1) {
    //   if (sendToDataBase !== null) {
    //     saveTargets()
    //   }
    // }
  }

  const showResults = (percentaged) => {

    const monthNumber = getMonths();

    let previousMonthNumber = 5;
    let coverWaste = 0
    let preparationWaste = 0
    let spoilageWaste = 0
    let totalCSPforPreviousMonth = 0;

    if (monthNumber === 0) {
      previousMonthNumber = 11;
    } else {
      previousMonthNumber = monthNumber - 1
    }

    //1)Get the previous months cover, prep, spoilage and total CSP
    if (previousMonthNumber < 11) {
        coverWaste = currentMonthCoverWasteArray[previousMonthNumber]
        preparationWaste = currentMonthPrepWasteArray[previousMonthNumber]
        spoilageWaste = currentMonthSpoilageWasteArray[previousMonthNumber]
        totalCSPforPreviousMonth = parseInt(coverWaste + preparationWaste + spoilageWaste);
    } else {
      //if monthNumber is 0 you want to get array value in index 11 from last year list
      getLastYearMonthlyWaste(props.companyID, props.companyName, props.selectedSiteValueID).then((data) => {
        coverWaste = data[0].monthlyValue.monthly.coverWaste[11]
        preparationWaste = data[0].monthlyValue.monthly.preparationWaste[11]
        spoilageWaste = data[0].monthlyValue.monthly.spoilageWaste[11]
        totalCSPforPreviousMonth = parseInt(coverWaste + preparationWaste + spoilageWaste);
      });
    }

    //1)
    // get the percentage of savings the person wants
    // Get the previous months cover, prep, spoilage and total CSP

    console.log("previous coverWaste",coverWaste)
    console.log("previous preparationWaste",preparationWaste)
    console.log("previous spoilageWaste",spoilageWaste)
    console.log("previous totalCSPforPreviousMonth",totalCSPforPreviousMonth)
    console.log("this is the percentaged selected on the form percentaged",percentaged)

    setCspWasteOfPreviousMonth(totalCSPforPreviousMonth)


    //2) workout  the percentages of savings for CSP = C + S+ P
    const percentSavingsForCoverWaste = roundedUpNumberAndTurnBackToNumber(coverWaste * parseFloat(percentaged))
    const percentSavingsForPreparationWaste = roundedUpNumberAndTurnBackToNumber(preparationWaste * parseFloat(percentaged))
    const percentSavingsForSpoilageWaste = roundedUpNumberAndTurnBackToNumber(spoilageWaste * parseFloat(percentaged))

    console.log("The calculation is monthly cover waste x percentages of savings",percentSavingsForCoverWaste)
    console.log("The calculation is monthly prep waste x percentages of savings",percentSavingsForPreparationWaste)
    console.log("The calculation is monthly spoilage waste x percentages of savings",percentSavingsForSpoilageWaste)

    setPercentagedSavingsTotal(percentSavingsForCoverWaste + percentSavingsForPreparationWaste + percentSavingsForSpoilageWaste)

    console.log("Add all calculations up to get total CSP percentages saving", percentSavingsForCoverWaste + percentSavingsForPreparationWaste + percentSavingsForSpoilageWaste)

    setCoverBreakDown(coverWaste - percentSavingsForCoverWaste)
    setPrepBreakDown(preparationWaste - percentSavingsForPreparationWaste)
    setSpoilageBreakDown(spoilageWaste - percentSavingsForSpoilageWaste)

    const percentSavingsInAmonth = parseInt((percentSavingsForCoverWaste + percentSavingsForPreparationWaste + percentSavingsForSpoilageWaste) * poundsKGconverter);
    const percentSavingsInAyear = parseInt(percentSavingsInAmonth * 12)
    const percentSavingsInAweek = parseInt(percentSavingsInAmonth / 4)
    const percentSavingsInAday = parseInt(percentSavingsInAmonth / 30)

    setPotentialSavingsInMonth(percentSavingsInAmonth)
    setPotentialSavingsInYear(percentSavingsInAyear)
    setPotentialSavingsInWeek(percentSavingsInAweek)
    setPotentialSavingsInAday(percentSavingsInAday)

    const carbonMunicipalValue = parseFloat(props.carbonMunicipalValue);

    const kilosOfMonthlyCO2saved = (percentSavingsForCoverWaste + percentSavingsForPreparationWaste + percentSavingsForSpoilageWaste) * carbonMunicipalValue;

    const mealsSaved = (percentSavingsForCoverWaste + percentSavingsForPreparationWaste + percentSavingsForSpoilageWaste) / 0.36

    // console.log("percentSavingsForCoverWaste",percentSavingsForCoverWaste)
    // console.log("percentSavingsForPreparationWaste",percentSavingsForPreparationWaste)
    // console.log("percentSavingsForSpoilageWaste",percentSavingsForSpoilageWaste)

    const totalPercentagedSavingsTotal = parseFloat(percentSavingsForCoverWaste + percentSavingsForPreparationWaste + percentSavingsForSpoilageWaste)

    const coverBreakDown = parseInt(coverWaste - percentSavingsForCoverWaste)
    const spoilageBreakDown = parseInt(spoilageWaste - percentSavingsForSpoilageWaste)
    const prepBreakDown = parseInt(preparationWaste - percentSavingsForPreparationWaste)

    const yearlyKilosOfCO2saved = parseInt(kilosOfMonthlyCO2saved * 12);
    const yearlyMealsSaved = parseInt(mealsSaved * 12);

    setKiloOfCO2SavedYearlyDisplay(yearlyKilosOfCO2saved)
    setNumberOfMealsSavedYearlyDisplay(yearlyMealsSaved)

    // console.log("totalCSPforPreviousMonth",totalCSPforPreviousMonth)
    // console.log("totalPercentagedSavingsTotal",totalPercentagedSavingsTotal)

    const recommendTarget = parseInt(totalCSPforPreviousMonth - totalPercentagedSavingsTotal)

    const percents = ((totalPercentagedSavingsTotal / totalCSPforPreviousMonth) * 100).toFixed(0)
    setRecommendTargetDisplay(recommendTarget)
    // setPercentaged(percents)

    // console.log("percentSavingsInAday",percentSavingsInAday)
    // console.log("percentSavingsInAweek",percentSavingsInAweek)
    // console.log("percentSavingsInAmonth",percentSavingsInAmonth)
    // console.log("percentSavingsInAyear",percentSavingsInAyear)
    // console.log("yearlyKilosOfCO2saved",yearlyKilosOfCO2saved)
    // console.log("yearlyMealsSaved",yearlyMealsSaved)
    // console.log("percentaged",percentaged)
    // console.log("recommendTarget",recommendTarget)
    // console.log("totalCSPforPreviousMonth",totalCSPforPreviousMonth)
    // console.log("totalPercentagedSavingsTotal",totalPercentagedSavingsTotal)
    // console.log("coverBreakDown",coverBreakDown)
    // console.log("spoilageBreakDown",spoilageBreakDown)
    // console.log("prepBreakDown",prepBreakDown)

    const values = {
        percentSavingsInAday,
        percentSavingsInAweek,
        percentSavingsInAmonth,
        percentSavingsInAyear,
        yearlyKilosOfCO2saved,
        yearlyMealsSaved,
        percents,
        recommendTarget,
        totalCSPforPreviousMonth,
        totalPercentagedSavingsTotal,
        coverBreakDown,
        spoilageBreakDown,
        prepBreakDown
    }

    console.log("values",values);

    setSendToDataBase(values)
  }

  const saveTargets = () => {
    const data = {
        targets: sendToDataBase,
        companyname: props.companyName,
        siteID: props.selectedSiteValueID,
        companyId: props.companyID
    }

    console.log("data",data);

    postTargets(data).then(() => {
      console.log("props",props);
      props.updateValues("TARGETS")
    })

  }

  return (
      <>
        <div className="dashboard settings">
            <div className="settings--wrapper">
              <div className="settings--title">CALCULATE FOOD WASTE SAVINGS</div>
              <div className="settings--subHeading">See the potential impact on your bottom line</div>
              <Menus
                handleChange={handleChange}
                checkActiveStep={checkActiveStep}
                poundsKGconverter={poundsKGconverter}
                savingPercentage={savingPercentage}
                />


          <div className="settings--current--targets">
            <div className="settings--wrapper-recommend-targets">
              <div className="settings--title">RECOMMENDED TARGETS FOR CSP WASTE</div>
              <div className="settings--subHeading marginBottom">Yearly, monthly, weekly and daily targets</div>

              <div className="target__calculatorResults--styling">
              <div className="displayFlex">Potential savings could be £ <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">{roundedUpNumberAndTurnBackToNumber(potentialSavingsInAday)}</div> daily</div>
              <div className="displayFlex">Potential savings could be £ <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">{roundedUpNumberAndTurnBackToNumber(potentialSavingsInWeek)}</div> in a week</div>
              <div className="displayFlex">Potential savings could be £ <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">{roundedUpNumberAndTurnBackToNumber(potentialSavingsInMonth)}</div> in a month</div>
              <div className="displayFlex">Potential savings could be £ <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">{roundedUpNumberAndTurnBackToNumber(potentialSavingsInYear)}</div> in a year</div>
              <br />
              <div className="displayFlex">Equivalent of <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">{kiloOfCO2SavedYearlyDisplay}</div> KG of CO2 saved in a year</div>
              <div className="displayFlex">Equivalent of <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">{numberOfMealsSavedYearlyDisplay}</div> number of meals saved in a year</div>
              <br />

              <div className="displayFlex settings__recommendedTargets">
                <div className="settings__recommendedTargets__text">
                  Recommended target of
                  <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft"> {isNaN(percentagedSavingsTotal / cspWasteOfPreviousMonth) ? 0 : roundedUpNumberAndTurnBackToNumber((percentagedSavingsTotal / cspWasteOfPreviousMonth) * 100)} </div>
                  % MONTHLY CSP WASTE :
                </div>

                <div className="displayFlex">
                  <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">{recommendTargetDisplay}</div>
                  {" "}
                  KG
                  <br />
                  <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">
                  {roundedUpNumberTwoPointsAndTurnBackToString(cspWasteOfPreviousMonth)}
                  </div>
                  {" "}
                  - <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">{roundedUpNumberTwoPointsAndTurnBackToString(percentagedSavingsTotal)}</div> (percentaged savings)
                  {" "}
                </div>

              </div>
              <br />

              <div className="displayFlex">
                <div className="settings__recommendedTargets__exampleBreakDown">
                  Example breakdown
                  {" "}
                  <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">
                  {roundedUpNumberTwoPointsAndTurnBackToString(coverBreakDown)}
                  </div>
                  ({labels.titleLabels.c})
                  <div>
                   +
                  </div>
                  {" "}
                  <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">
                  {roundedUpNumberTwoPointsAndTurnBackToString(spoilageBreakDown)}
                  </div>
                  ({labels.titleLabels.s})
                  <div>
                   +
                  </div>
                  {" "}
                  <div className="applyPurpleColor cooperHewittBold applyMarginRightAndLeft">
                  {roundedUpNumberTwoPointsAndTurnBackToString(prepBreakDown)}
                  </div>
                  ({labels.titleLabels.p})
                </div>
              </div>

            </div>
            </div>
          </div>

            </div>
        </div>
      </>

  );
}
