import React, {useState} from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import DailyWasteChart from "./reports/daily-waste-report";
import HourlyWasteChart from "./reports/hourly-waste-report";
import WeeklyWaste from "./reports/weekly-waste-report";
import TotalWaste from "./reports/total-waste-report";
import WasteOnAdayOfTheWeek from "./reports/waste-on-a-day-of-the-week-report";

import { AccordionHeading, AccordionBody } from "./accordion"

import { setItemInLocalStorage } from "../../../utilities.js";

import {
    onDragEnd
  } from "../../../helper.js"

const graphs = [
    {
      id: '0',
      type: 'wasteOnAdayOfTheWeek'
    },
    {
       id: '1',
       type: 'hourlyWaste'
    },
    {
        id: '2',
        type: 'dailyWaste'
    },
    {
        id: "3",
        type: "totalWaste"
    },
    {
        id: "4",
        type: "weeklyWaste"
    }
  ]


const group = {
column: {
    // name: "right-hand-side",
    items: graphs,
},
};

export default function Group(props) {

const [columns, setColumns] = useState(group);

    return (

        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
            <div className="group_card">
                {Object.entries(columns).map(([columnId, column], index) => {

                return (
                    <Droppable droppableId="" droppableId={columnId} key={index}>
                    {(provided) => (
                        <main className="" {...provided.droppableProps} ref={provided.innerRef}>
                            {/* <div className="group_title">
                                <h1>WEEKLY WASTE REPORTS</h1>
                            </div> */}

                            <AccordionHeading color={"lightPrimaryGreenBackGroundColor"} group={true}>
                                <div className="group_title">WEEKLY WASTE REPORTS</div>
                                <div className="container">
                                    {/* <span onClick={() => props.handleChangeForCheckedAndAccordion(!props.showGroupTwo, "groupTwo")}>
                                    {props.showGroupTwo ? ("X"):"| | | "}
                                    </span> */}
                                    <span onClick={() => {
                                            // props.handleChangeForCheckedAndAccordion(!props.showGroup, "group")}
                                                props.setShowGroupTwo(
                                                    !props.showGroupTwo
                                                );
                                                setItemInLocalStorage(
                                                    "groupTwo",
                                                    !props.showGroupTwo
                                                );
                                            }}
                                        >
                                        {props.showGroupTwo ? ("X"):"| | | "}
                                    </span>
                                </div>
                            </AccordionHeading>

                            <AccordionBody open={props.showGroupTwo}>
                                {column.items.map(({id, type}, index) => {
                                    return (
                                        <>
                                        {type === "totalWaste" &&
                                            <Draggable draggableId={id} index={index}>
                                                {(provided) => (
                                                    <div className="dashboard__draggableReport marginBottomBy1rem" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <TotalWaste
                                                            startDate={props.startDateTotalWaste}
                                                            showPounds={props.showPoundsTotalWaste}
                                                            showTotalWasteChart={props.showTotalWasteChart}
                                                            setShowTotalWasteChart={props.setShowTotalWasteChart}
                                                            hideReport={props.hideReportTotalWaste}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        }

                                        {type === "hourlyWaste" &&
                                            <Draggable draggableId={id} index={index}>
                                            {(provided) => (
                                                <section className="dashboard__report marginBottomBy1rem" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <HourlyWasteChart
                                                        siteName={props.siteNameHourlyWaste}
                                                        showPounds={props.showPoundsHourlyWaste}
                                                        showHourlyChart={props.showHourlyChart}
                                                        setShowHourlyChart={props.setShowHourlyChart}
                                                        handleChangeForCheckedAndAccordion={props.handleChangeForCheckedAndAccordionHourlyWaste}
                                                        hideReport={props.hideReportHourlyWaste}
                                                    />
                                                </section>
                                            )}
                                            </Draggable>
                                        }

                                        {type === "dailyWaste" &&
                                            <Draggable draggableId={id} index={index}>
                                                {(provided) => (
                                                    <section className="dashboard__report marginBottomBy1rem" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <DailyWasteChart
                                                        siteName={props.siteNameDailyWaste}
                                                        showPounds={props.showPoundsDailyWaste}
                                                        showDailyChart={props.showDailyChart}
                                                        setShowDailyChart={props.setShowDailyChart}
                                                        handleChangeForCheckedAndAccordion={props.handleChangeForCheckedAndAccordionDailyWaste}
                                                        hideReport={props.hideReportDailyWaste}
                                                    />
                                                    </section>
                                                )}
                                            </Draggable>
                                        }

                                        {type === "weeklyWaste" &&
                                            <Draggable draggableId={id} index={index}>
                                                {(provided) => (
                                                    <section className="dashboard__report marginBottomBy1rem" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                        >
                                                    <WeeklyWaste
                                                        showPounds={props.showPoundsWeeklyChart}
                                                        showWeeklyChart={props.showWeeklyChart}
                                                        setShowWeeklyChart={props.setShowWeeklyChart}
                                                        handleChangeForCheckedAndAccordion={props.handleChangeForCheckedAndAccordionWeeklyChart}
                                                        hideReport={props.hideReportWeekyChart}
                                                    />
                                                    </section>
                                                )}
                                            </Draggable>
                                        }

                                        {type === "wasteOnAdayOfTheWeek" &&
                                            <Draggable draggableId={id} index={index}>
                                                {(provided) => (
                                                    <section className="dashboard__report marginBottomBy1rem" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <WasteOnAdayOfTheWeek
                                                        siteName={props.siteNameWasteOnAdayOfTheWeek}
                                                        showPounds={props.showPoundsWasteOnAdayOfTheWeek}
                                                        showWasteOnAdayOfTheWeek={props.showWasteOnAdayOfTheWeek}
                                                        setShowWasteOnAdayOfTheWeek={props.setShowWasteOnAdayOfTheWeek}
                                                        hideReport={props.hideReportWasteOnAdayOfTheWeek}
                                                    />
                                                    </section>
                                                )}
                                            </Draggable>
                                        }


                                        </>
                                    )
                                })}
                            </AccordionBody>

                        </main>
                            )}
                    </Droppable>
                )})}
            </div>
        </DragDropContext>



    )
}
