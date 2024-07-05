import React, {useState} from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import AiPredictionsReport from "./reports/ai-predictions-report";
import FoodWasteTrackingProgress from "./reports/food-waste-target";
import MonthlyWasteChart from "./reports/monthly-waste-report";
// import TotalWaste from "./reports/total-waste-report";
import WeeklyWasteTrends from "./reports/weekly-trend-report";

import { AccordionHeading, AccordionBody } from "./accordion"

import { setItemInLocalStorage } from "../../../utilities.js";

import {
    onDragEnd
  } from "../../../helper.js"

const graphs = [
    {
      id: '0',
      type: 'foodWasteTargetSavings'
    },
    {
       id: '1',
       type: 'aiPredictions'
    },
    {
        id: '2',
        type: 'monthlyWaste'
    },
    {
        id: "3",
        type: "weeklyWasteTrend"
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
                                <h1>WASTE TRENDS</h1>
                            </div> */}

                            <AccordionHeading color={"lightPrimaryGreenBackGroundColor"} group={true}>
                                <div className="group_title">WASTE TRENDS</div>
                                <div className="container">
                                    <span onClick={() => {
                                            // props.handleChangeForCheckedAndAccordion(!props.showGroup, "group")}
                                                props.setShowGroupOne(
                                                    !props.showGroupOne
                                                );
                                                setItemInLocalStorage(
                                                    "groupOne",
                                                    !props.showGroupOne
                                                );
                                            }}
                                        >
                                        {props.showGroupOne ? ("X"):"| | | "}
                                    </span>
                                </div>
                            </AccordionHeading>

                            <AccordionBody open={props.showGroupOne}>
                                {column.items.map(({id, type}, index) => {
                                    return (
                                        <>
                                        {type === "foodWasteTargetSavings" &&
                                            <Draggable draggableId={id} index={index}>
                                                {(provided) => (
                                                    <div className="dashboard__draggableReport marginBottomBy1rem" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <FoodWasteTrackingProgress
                                                            foodWasteTargetSavings={props.foodWasteTargetSavings}
                                                            setFoodWasteTargetSavings={props.setFoodWasteTargetSavings}
                                                            hideReport={props.hideReportFoodWasteTargetSavings}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        }

                                        {type === "aiPredictions" &&
                                            <Draggable draggableId={id} index={index}>
                                                {(provided) => (

                                                    <div className="dashboard__aiPredictionsReport marginBottomBy1rem" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <AiPredictionsReport
                                                        aiPredictions={props.aiPredictions}
                                                        setAiPredictions={props.setAiPredictions}
                                                        showPounds={props.showPoundsAiPredictions}
                                                        hideReport={props.hideReportAiPredictions}
                                                    />
                                                    </div>
                                                )}
                                            </Draggable>
                                        }

                                        {type === "monthlyWaste" &&
                                            <Draggable draggableId={id} index={index}>
                                                {(provided) => (
                                                    <section className="dashboard__report" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <MonthlyWasteChart
                                                            siteName={props.siteNameMonthlyChart}
                                                            showPounds={props.showPoundsMonthlyChart}
                                                            showMonthlyChart={props.showMonthlyChart}
                                                            setShowMonthlyChart={props.setShowMonthlyChart}
                                                            handleChangeForCheckedAndAccordion={props.handleChangeForCheckedAndAccordionMonthlyChart}
                                                            hideReport={props.hideReportMonthlyChart}
                                                        />
                                                    </section>
                                                )}
                                            </Draggable>
                                        }

                                        {type === "weeklyWasteTrend" &&
                                            <Draggable draggableId={id} index={index}>
                                            {(provided) => (
                                                <section className="dashboard__report" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <div className="weeklyWasteTrend__reportWrapper">
                                                    <WeeklyWasteTrends
                                                        siteName={props.siteNameWeeklyTrend}
                                                        showPounds={props.showPoundsWeeklyTrend}
                                                        showWeeklyTrendChart={props.showWeeklyTrendChart}
                                                        setShowWeeklyTrendChart={props.setShowWeeklyTrendChart}
                                                        handleChangeForCheckedAndAccordion={props.handleChangeForCheckedAndAccordionWeeklyTrend}
                                                        hideReport={props.hideReportWeeklyTrend}
                                                    />
                                                    </div>
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
