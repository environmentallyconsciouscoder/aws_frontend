import React, { useContext, useState } from "react";

import { DashboardContext } from "../../../contexts/dashboard-context.js";

import Switches from "../libs/use-switches";

import PerformanceSummary from "./performance-summary"

import {
  Radio,
  TableRow,
  Paper,
  TablePagination,
  TableHead,
  Table,
  TableContainer,
  TableCell,
  TableBody,
} from "@material-ui/core";

import Controller from "./controller.js";
// import Group from "./group.js";
// import GroupTwo from "./group-one.js";
// import GroupThree from "./group-two.js";
// import GroupFour from "./group-three.js";

import Group from "./group-one.js";
import GroupTwo from "./group-two.js";
import GroupThree from "./group-three.js";
import GroupFour from "./group-four.js";

import {
  setItemInLocalStorage,
  calculateTodaysDate,
  splitCamelCaseStringAndMakeFirstCharacterUpperCase
} from "../../../utilities.js"

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Dashboard(props) {

  const {
    showHourlyChart,
    showDailyChart,
    showWeeklyChart,
    showMonthlyChart,
    setShowHourlyChart,
    setShowDailyChart,
    setShowWeeklyChart,
    setShowMonthlyChart,
    showTotalWasteChart,
    setShowTotalWasteChart,
    foodWasteTargetSavings,
    setFoodWasteTargetSavings,
    aiPredictions,
    setAiPredictions,
    wastePerCover,
    setWastePerCover,
    wastePerSales,
    setWastePerSales,
    showWeeklyTrendChart,
    setShowWeeklyTrendChart,
    checked,
    handleChangeForCheckedAndAccordion,

    showWasteOnAdayOfTheWeek,
    setShowWasteOnAdayOfTheWeek,

    showDailySalesVsWasteReport,
    setShowDailySalesVsWasteReport,

    showEventProductionWaste,
    setShowEventProductionWaste,

    showEventCustomerWasteVcustomerRef,
    setShowEventCustomerWasteVcustomerRef,

    showGroup,
    setShowGroup,
    showGroupOne,
    setShowGroupOne,
    showGroupTwo,
    setShowGroupTwo,
    showGroupThree,
    setShowGroupThree
  } = Switches()

  const {
    handleSiteChange,
    selectedValue,
    siteName,
    companyName,
    sitesID,
    sites,
    startDate,
    showPounds,
    userType,
    userDetail,
    handleSiteIDchange,
    selectedSiteValueID,
    companyID,

    weeklyDailyLabels,
    weeklyDailyRange
  } = useContext(DashboardContext)

  const leftColumn = [
    {
      id: '0',
      type: 'WASTE INPUTS'
    },
    {
      id: '1',
      type: 'WASTE TRENDS'
    },
    {
      id: '2',
      type: 'WEEKLY WASTE REPORTS'
    }
  ]

  const rightColumn = [
    {
      id: '3',
      type: 'WASTE EVENTS'
    }
  ]

  const twoColumns = {
    leftColumn: {
      name: "left-hand-side",
      // items: rightColumnDisplay,
      items: leftColumn,
    },
    rightColumn: {
      name: "right-hand-side",
      // items: leftColumnDisplay,
      items: rightColumn,
    },
  };

  const initialStateForColumns = JSON.parse(localStorage.getItem('twoColumns')) || twoColumns
  const [columns, setColumns] = useState(initialStateForColumns);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
      setItemInLocalStorage("twoColumns", {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });

    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
      setItemInLocalStorage("twoColumns", {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });

    }
  };

    return (
      <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >

      <PerformanceSummary />

      <div className="dashboard">

          {Object.entries(columns).map(([columnId, column], index) => {

          return (


            <Droppable droppableId="dashboard" droppableId={columnId} key={index}>

            {(provided) => (
              <main className="dashboard__reportsWrapper" {...provided.droppableProps} ref={provided.innerRef}>
                {column.items.map(({id, type}, index) => {

                  return (
                    <div key={index}>

                    {type === "companyInfor" &&
                      <>
                      <div className="dashboard__overviewSites--positioning showOnMobile">
                        <div className="dashboard__date__user dashboard__userInformationWrapper cooperHewittBold">
                            <div className="dashboard__userDateNameAndUserType cooperHewittBold">
                                {calculateTodaysDate()}
                              <div className="dashboard__date__user__type cooperHewittBold">
                                {userDetail.typeOfUser}
                              </div>
                              <div className="dashboard__date__user__name cooperHewittBold">
                                Welcome back
                                {" "}
                                {userDetail.fullName}
                              </div>
                            </div>
                          <div className="dashboard__companyName">{splitCamelCaseStringAndMakeFirstCharacterUpperCase(userDetail.companyname)}</div>
                        </div>
                      </div>

                      <div className="dashboard__overviewSitesReportTable report-subtitle showOnMobile">
                        <div className="report-subtitle">
                          Sites
                        </div>

                        <Paper className="dashboard__paper">
                          <TableContainer className="dashboard__tableContainer">
                            <Table
                              stickyHeader
                              aria-label="sticky table"
                              className="dashboard__table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="dashboard__tableCell"></TableCell>
                                  <TableCell className="dashboard__tableCell">
                                    <div className="report-subtitle">
                                      TOTAL CSP WASTE
                                    </div>
                                  </TableCell>
                                  <TableCell className="dashboard__tableCell">
                                    <div className="report-subtitle">
                                    MONTHLY CSP TREND
                                    </div>
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {sites
                                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                  .map((site, index) => (
                                    <TableRow key={index}>
                                      <TableCell className="dashboard__tableCell--style">
                                        <div className="dashboard__radio">
                                          <Radio
                                            checked={selectedSiteValueID === site.siteName}
                                            onChange={handleSiteIDchange}
                                            value={site.siteName}
                                            color="default"
                                            inputProps={{ "aria-label": "D" }}
                                          />
                                          <div className="dashboard__siteName--color">
                                            {" "}
                                            {site.siteName.replace(/[^A-Za-z]+/g, '').toLowerCase()}
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="dashboard__tableCell--style">

                                        {showPounds ? (
                                          <>
                                            <span className="dashboard__tableCell__icon applyMarginRightAndLeft applyCooperHewittBold">
                                              £
                                            </span>
                                            {parseInt((site.totalWaste * 2.775).toFixed(0))}
                                          </>
                                        ) : (
                                          <>
                                          {parseInt(site.totalWaste.toFixed(0))}
                                            <span className="dashboard__tableCell__icon applyMarginRightAndLeft applyCooperHewittBold">
                                              Kg
                                            </span>
                                          </>
                                        )}

                                      </TableCell>
                                      <TableCell className="dashboard__tableCell--style">
                                        {showPounds ? (
                                          <>
                                          {parseInt((site.trends * 2.775).toFixed(0))}
                                          </>
                                        ) :
                                        <>
                                        {parseInt(site.trends.toFixed(0))}
                                            <span className="dashboard__tableCell__icon applyMarginRightAndLeft applyCooperHewittBold">
                                              Kg
                                            </span>
                                            </>
                                        }

                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </TableContainer>

                          <TablePagination
                            rowsPerPageOptions={[2]}
                            component="div"
                            count={sites.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                          />
                        </Paper>
                      </div>
                      </>
                    }

                    {type === "WASTE INPUTS" &&
                      <Draggable draggableId={id} index={index}>
                        {(provided) => (
                          <div>
                            <section className="group" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <Group
                                columnId={columnId}
                                index={index}

                                wastePerCover={wastePerCover}
                                setWastePerCover={setWastePerCover}
                                showPoundsWastePerCover={showPounds}
                                hideReportWastePerCover={checked.wastePerCoverSwitch}
                                siteNameWastePerCover={siteName}

                                wastePerSales={wastePerSales}
                                setWastePerSales={setWastePerSales}
                                showPoundsWastePerSales={showPounds}
                                hideReportWastePerSales={checked.wastePerSalesSwitch}
                                siteNameWastePerSales={siteName}

                                siteNameDailySalesVsWasteReport={siteName}
                                showPoundsDailySalesVsWasteReport={showPounds}
                                showDailySalesVsWasteReport={showDailySalesVsWasteReport}
                                setShowDailySalesVsWasteReport={setShowDailySalesVsWasteReport}
                                hideReportDailySalesVsWasteReport={checked.dailySalesVsWasteReportSwitch}
                                weeklyDailyLabels={weeklyDailyLabels}
                                weeklyDailyRange={weeklyDailyRange}

                                showGroup={showGroup}
                                setShowGroup={setShowGroup}
                                handleChangeForCheckedAndAccordion={handleChangeForCheckedAndAccordion}
                              />
                            </section>
                          </div>
                        )}
                      </Draggable>
                    }

                    {type === "WASTE TRENDS" &&
                      <Draggable draggableId={id} index={index}>
                        {(provided) => (
                          <div>
                            <section className="group" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <GroupTwo
                                columnId={columnId}
                                index={index}

                                foodWasteTargetSavings={foodWasteTargetSavings}
                                setFoodWasteTargetSavings={setFoodWasteTargetSavings}
                                hideReportFoodWasteTargetSavings={checked.foodWasteTargetSwitch}

                                aiPredictions={aiPredictions}
                                setAiPredictions={setAiPredictions}
                                showPoundsAiPredictions={showPounds}
                                hideReportAiPredictions={checked.aiPredictionSwitch}

                                siteNameMonthlyChart={siteName}
                                showPoundsMonthlyChart={showPounds}
                                showMonthlyChart={showMonthlyChart}
                                setShowMonthlyChart={setShowMonthlyChart}
                                handleChangeForCheckedAndAccordionMonthlyChart={handleChangeForCheckedAndAccordion}
                                hideReportMonthlyChart={checked.monthlyChartSwitch}

                                siteNameWeeklyTrend={siteName}
                                showPoundsWeeklyTrend={showPounds}
                                showWeeklyTrendChart={showWeeklyTrendChart}
                                setShowWeeklyTrendChart={setShowWeeklyTrendChart}
                                handleChangeForCheckedAndAccordionWeeklyTrend={handleChangeForCheckedAndAccordion}
                                hideReportWeeklyTrend={checked.weeklyWasteTrendSwitch}

                                showGroupOne={showGroupOne}
                                setShowGroupOne={setShowGroupOne}
                                handleChangeForCheckedAndAccordion={handleChangeForCheckedAndAccordion}

                              />
                            </section>
                          </div>
                        )}
                      </Draggable>
                    }

                    {type === "WEEKLY WASTE REPORTS" &&
                      <Draggable draggableId={id} index={index}>
                        {(provided) => (
                          <div>
                            <section className="group" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <GroupThree
                                startDateTotalWaste={startDate}
                                showPoundsTotalWaste={showPounds}
                                showTotalWasteChart={showTotalWasteChart}
                                setShowTotalWasteChart={setShowTotalWasteChart}
                                hideReportTotalWaste={checked.totalSiteWasteSwitch}

                                siteNameHourlyWaste={siteName}
                                showPoundsHourlyWaste={showPounds}
                                showHourlyChart={showHourlyChart}
                                setShowHourlyChart={setShowHourlyChart}
                                handleChangeForCheckedAndAccordionHourlyWaste={handleChangeForCheckedAndAccordion}
                                hideReportHourlyWaste={checked.hourlyChartSwitch}

                                siteNameDailyWaste={siteName}
                                showPoundsDailyWaste={showPounds}
                                showDailyChart={showDailyChart}
                                setShowDailyChart={setShowDailyChart}
                                handleChangeForCheckedAndAccordionDailyWaste={handleChangeForCheckedAndAccordion}
                                hideReportDailyWaste={checked.dailyChartSwitch}

                                showPoundsWeeklyChart={showPounds}
                                showWeeklyChart={showWeeklyChart}
                                setShowWeeklyChart={setShowWeeklyChart}
                                handleChangeForCheckedAndAccordionWeeklyChart={handleChangeForCheckedAndAccordion}
                                hideReportWeekyChart={checked.weeklyChartSwitch}

                                siteNameWasteOnAdayOfTheWeek={siteName}
                                showPoundsWasteOnAdayOfTheWeek={showPounds}
                                showWasteOnAdayOfTheWeek={showWasteOnAdayOfTheWeek}
                                setShowWasteOnAdayOfTheWeek={setShowWasteOnAdayOfTheWeek}
                                hideReportWasteOnAdayOfTheWeek={checked.wasteOnAdayOfTheWeekSwitch}

                                showGroupTwo={showGroupTwo}
                                setShowGroupTwo={setShowGroupTwo}
                                handleChangeForCheckedAndAccordion={handleChangeForCheckedAndAccordion}

                              />
                            </section>
                          </div>
                        )}
                      </Draggable>
                    }

                    {type === "WASTE EVENTS" &&
                      <Draggable draggableId={id} index={index}>
                        {(provided) => (
                          <div>
                            <section className="group" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <GroupFour
                                siteNameDailySalesVsWasteReport={siteName}
                                showPoundsDailySalesVsWasteReport={showPounds}
                                showEventProductionWaste={showEventProductionWaste}
                                setShowEventProductionWaste={setShowEventProductionWaste}
                                hideReportDailySalesVsWasteReport={checked.dailySalesVsWasteReportSwitch}
                                weeklyDailyLabels={weeklyDailyLabels}
                                weeklyDailyRange={weeklyDailyRange}

                                showGroupThree={showGroupThree}
                                setShowGroupThree={setShowGroupThree}
                                handleChangeForCheckedAndAccordion={handleChangeForCheckedAndAccordion}

                                showEventCustomerWasteVcustomerRef={showEventCustomerWasteVcustomerRef}
                                setShowEventCustomerWasteVcustomerRef={setShowEventCustomerWasteVcustomerRef}

                              />
                            </section>
                          </div>
                        )}
                      </Draggable>
                    }

                    </div>
                  )
              })}
              {provided.placeholder}
              </main>
            )}



            </Droppable>

          )

          })}

          <Controller
            checked={checked}
            showHourlyChart={showHourlyChart}
            setShowHourlyChart={setShowHourlyChart}
            sitesID={sitesID}
            handleSiteChange={handleSiteChange}
            selectedValue={selectedValue}
            allsites={sites}
            showPounds={showPounds}
            companyName={companyName}
            userType={userType}
            handleSiteIDchange={handleSiteIDchange}
            selectedSiteValueID={selectedSiteValueID}
            companyID={companyID}
          />

        </div>

      </DragDropContext>
    );

}


