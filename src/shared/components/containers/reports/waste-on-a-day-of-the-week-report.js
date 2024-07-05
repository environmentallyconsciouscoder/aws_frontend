import React, { useContext, useEffect, useState } from "react";

// import useSpinner from "../../libs/use-spinner";
import { WasteOnAdayOfTheWeekContext } from "../../../../contexts/waste-on-a-day-of-the-week-context";
import { WasteCapContext } from "../../../../contexts/waste-cap-context";
import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

import { AccordionHeading, AccordionBody } from "../accordion";

import LeftArr from "../../../../image/previous_icon.svg";
import RightArr from "../../../../image/next_icon.svg";

import {
  MainContainer,
  BarChartContainer,
  Number,
  MakeBar,
} from "../../../../styles/graph/barchart.styles";

import { setItemInLocalStorage, roundedUpNumberAndTurnBackToNumber } from "../../../../utilities.js";

import Tooltip from "@material-ui/core/Tooltip";

export default function WasteOnAdayOfTheWeek(props) {

  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(true);

  const {
    labels
   } = useContext(WasteLabelsContext);

  const {
    year,
    day,
    setYear,
    setDay,
    wasteOnAdayOfTheWeekData,
    siteName,
    startDate,
  } = useContext(WasteOnAdayOfTheWeekContext);

  const [gapArray, setGapArray] = useState([]);

  const getGapArray = (input) => {
    wasteOnAdayOfTheWeekData.weeks.map((num) => {
      for (let i = 1; i <= num; i++) {
        if (i === num) {
          input.push(1);
        } else {
          input.push(0);
        }
      }
      return ""
    });
    return input;
  };

  useEffect(() => {
    if (wasteOnAdayOfTheWeekData.weeks) {
      setGapArray(getGapArray([]));
    }

    if (props.showWasteOnAdayOfTheWeek) {
      setTooltipIsOpen(true);
    } else {
      setTooltipIsOpen(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasteOnAdayOfTheWeekData, props]);


  const getMonthNum = (index) => {
    let ret = 0, rem = index;
    wasteOnAdayOfTheWeekData.weeks.map((num) => {
      rem -= num
      if (rem >= 0)
        ret++;
        return "";
    })
    return ret;
  }

  const { showPounds } = useContext(WasteCapContext);

  const { dailyCoverWastes, dailySpoliageWastes, dailyPeparationWastes } =
    useContext(WasteCapContext);

  let totalCoverCap = 0;
  let totalSpoliageCap = 0;
  let totalPreparationCap = 0;

  if (showPounds) {
    totalCoverCap = roundedUpNumberAndTurnBackToNumber(
      dailyCoverWastes * 2.775
    );
    totalSpoliageCap = roundedUpNumberAndTurnBackToNumber(
      dailySpoliageWastes * 2.775
    );
    totalPreparationCap = roundedUpNumberAndTurnBackToNumber(
      dailyPeparationWastes * 2.775
    );
  } else {
    totalCoverCap = dailyCoverWastes > 0 ? dailyCoverWastes : 0;
    totalSpoliageCap = dailySpoliageWastes > 0 ? dailySpoliageWastes : 0;
    totalPreparationCap = dailyPeparationWastes > 0 ? dailyPeparationWastes : 0;
  }

  const [activeState, setActiveState] = React.useState("");
  const [capLimit, setCapLimit] = React.useState(dailyCoverWastes);

  const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

  const onPrevYear = () => {
    let startYear = parseInt(startDate.split("-")[0]);
    console.log("startyear: ", startYear, year, startYear > year);
    if (startYear < year) {
      setYear(year - 1);
    }
  };

  const onNextYear = () => {
    const date = new Date();
    let currentYear = date.getFullYear();
    if (currentYear > year) {
      setYear(year + 1);
    }
  };

  return (
    <div
      className={
        props.hideReport ? "dailyWasteChart displayNone" : "dailyWasteChart"
      }
    >
      <AccordionHeading color={"primPurpleBackgroundColor"}>
        <div className="section-title">WASTE ON A DAY OF THE WEEK</div>
        <div className="container">
          <span
            onClick={() => {
              props.setShowWasteOnAdayOfTheWeek(
                !props.showWasteOnAdayOfTheWeek
              );
              setItemInLocalStorage(
                "wasteOnAdayOfTheWeek",
                !props.showWasteOnAdayOfTheWeek
              );
            }}
          >
            {props.showWasteOnAdayOfTheWeek ? "X " : "| | | "}
          </span>
        </div>
      </AccordionHeading>

      <AccordionBody open={props.showWasteOnAdayOfTheWeek}>
        <div
          className={
            props.showDarkTheme
              ? "darkTheme__reportBackgroundColor addPaddingOfHalveRem"
              : "originalTheme__reportBackgroundColor addPaddingOfHalveRem"
          }
        >
          <div className="my-2 graph__row space-between">
            <div className="report-subtitle">{siteName?.toLowerCase()}</div>
            <div className="graph__heading">
              <div className="year-ele">YEAR: {year}</div>
              <img
                className="arr-btn year-ele"
                src={LeftArr}
                onClick={onPrevYear}
                alt="prev arrow"
              />
              <img
                className="arr-btn year-ele"
                src={RightArr}
                onClick={onNextYear}
                alt="next arrow"
              />
            </div>
            <b className="capping">
              <div className="applyPurpleColor cooperHewittBold year-ele">
                Cap
              </div>
              <div className="capping__text  year-ele">
                <div
                  className={
                    props.showDarkTheme
                      ? "darkTheme__selectedLabelColor cooperHewittBold"
                      : "applyPurpleColor cooperHewittBold"
                  }
                >
                  {" "}
                  {labels.acronyms.c}
                </div>
              </div>
              <div
                className={
                  props.showDarkTheme
                    ? "darkTheme__numberColor"
                    : "applyBlueTuckGreen"
                }
              >
                {totalCoverCap}
              </div>
              <div className="capping__text  year-ele applyPurpleColor">
                <div
                  className={
                    props.showDarkTheme
                      ? "darkTheme__selectedLabelColor cooperHewittBold"
                      : "applyPurpleColor cooperHewittBold"
                  }
                >
                  {" "}
                  {labels.acronyms.s}
                </div>
              </div>
              <div
                className={
                  props.showDarkTheme
                    ? "darkTheme__numberColor"
                    : "applyBlueTuckGreen"
                }
              >
                {totalSpoliageCap}
              </div>
              <div className="capping__text  year-ele applyPurpleColor cooperHewittBold">
                <div
                  className={
                    props.showDarkTheme
                      ? "darkTheme__selectedLabelColor cooperHewittBold"
                      : "applyPurpleColor cooperHewittBold"
                  }
                >
                  {" "}
                  {labels.acronyms.p}
                </div>
              </div>
              <div
                className={
                  props.showDarkTheme
                    ? "darkTheme__numberColor"
                    : "applyBlueTuckGreen"
                }
              >
                {totalPreparationCap}
              </div>
            </b>
          </div>
          <div className="space-between-center inactive week-box">
            <div className="applyBlueTuckGreen font-bold">Waste on a:</div>
            <div className="weekly__selector">
              {weeks.map((dayName, index) => (
                <div
                  className={
                    (day === (index + 1) % 7) ? "week-active font-bold" : "week-inactive"
                  }
                  key={index}
                  onClick={() => {
                    setDay((index + 1)%7);
                  }}
                >
                  {dayName}
                </div>
              ))}
            </div>
            <div className="applyBlueTuckGreen font-bold">Each Week</div>
          </div>
          <div className="mt-1 dashboard__wrapperForSelector">
            <div className="dashboard__selector">

            <Tooltip
                open={tooltipIsOpen}
                // onOpen={() => setTooltipIsOpen(true)}
                onClose={() => setTooltipIsOpen(false)}
                title="clickable waste stream"
                arrow
              >

              <h2
                className={activeState === "cover" ? "active" : "inactive"}
                id={0}
                onClick={() => {
                  const label = labels.titleLabels.c
                  setActiveState(label);
                  setCapLimit(dailyCoverWastes);
                }}
              >
                {labels.acronyms.c}
              </h2>

            </Tooltip>

              <Tooltip
                open={tooltipIsOpen}
                // onOpen={() => setTooltipIsOpen(true)}
                onClose={() => setTooltipIsOpen(false)}
                arrow
              >

              <h2
                className={activeState === "spoilage" ? "active" : "inactive"}
                id={1}
                onClick={() => {
                  const label = labels.titleLabels.s
                  setActiveState(label);
                  setCapLimit(dailySpoliageWastes);
                }}
              >
                {labels.acronyms.s}
              </h2>

              </Tooltip>

              <Tooltip
                open={tooltipIsOpen}
                // onOpen={() => setTooltipIsOpen(true)}
                onClose={() => setTooltipIsOpen(false)}
                arrow
              >

              <h2
                className={
                  activeState === "preparation" ? "active" : "inactive"
                }
                id={2}
                onClick={() => {
                  const label = labels.titleLabels.p
                  setActiveState(label);
                  setCapLimit(dailyPeparationWastes);
                }}
              >
                {labels.acronyms.p}
              </h2>

              </Tooltip>

              <Tooltip
                open={tooltipIsOpen}
                // onOpen={() => setTooltipIsOpen(true)}
                onClose={() => setTooltipIsOpen(false)}
                arrow
              >

              <h2
                className={activeState === "all" ? "active" : "inactive"}
                id={3}
                onClick={() => {
                  setActiveState("all");
                  setCapLimit(
                    dailyCoverWastes +
                      dailySpoliageWastes +
                      dailyPeparationWastes
                  );
                }}
              >
                ALL
              </h2>

              </Tooltip>

            </div>
            <div className="font-bold">
              {activeState.charAt(0).toUpperCase() + activeState.slice(1)} waste
              shown
            </div>
          </div>
          <div className="graph__row">
            <MainContainer>
              {wasteOnAdayOfTheWeekData &&
                wasteOnAdayOfTheWeekData[activeState + "Waste"] &&
                wasteOnAdayOfTheWeekData[activeState + "Waste"].map(
                  (val, index) => {
                    const chart =
                      <BarChartContainer key={index} isGap={gapArray[index]}>
                        <Number color={"rgba(34, 73, 33)"}>
                          {/* {showPounds ? Math.round(val * 2.775) : Math.round(val)} */}
                          {showPounds ? Math.round(val * 2.775) : val}
                        </Number>
                        <MakeBar
                          height={val * 1.3}
                          color={
                            showPounds
                             ?
                              capLimit === 0
                                ? Math.round(val * 2.775) >= Math.round(dailyCoverWastes * 2.775)
                                  ? "#e72226"
                                  : "#a2a42b"
                                : Math.round(val * 2.775) >= Math.round(capLimit * 2.775)
                                  ? "#e72226"
                                  : "#a2a42b"
                             :
                              capLimit === 0
                                ? Math.round(val) >= Math.round(dailyCoverWastes)
                                  ? "#e72226"
                                  : "#a2a42b"
                                : Math.round(val) >= Math.round(capLimit)
                                  ? "#e72226"
                                  : "#a2a42b"
                          }
                        />
                        {gapArray[index + 2] === 1 ? (
                          <Number color={"#0f808c"} style={{marginTop: "5px"}}>
                            {months[getMonthNum(index)]}
                          </Number>
                        ) : (
                          <div style={{width: "23px", marginTop: "19px"}}></div>
                        )}
                      </BarChartContainer>
                    return chart;
                  }
                )}
            </MainContainer>
          </div>

          <div className="applyBlueTuckGreen" style={{
              display: "flex",
              justifyContent: "center"
            }}>
              Scroll right to see more months
          </div>

        </div>

      </AccordionBody>
    </div>
  );
}
