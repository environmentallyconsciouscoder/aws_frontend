import React, {useState} from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import WastePerCover from "./reports/waste-per-cover-report";
import WastePerSales from "./reports/waste-per-sales-report";
import DailySalesVsWasteReport from "./reports/daily-sales-vs-waste-report";

import { setItemInLocalStorage } from "../../../utilities.js";

import { AccordionHeading, AccordionBody } from "./accordion"

import {
    onDragEnd
  } from "../../../helper.js"

const graphs = [
    {
      id: '0',
      type: 'waste per cover'
    },
    {
       id: '1',
       type: 'waste per sales'
    },
    {
        id: '2',
        type: 'daily sales vs waste report'
     },
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
                            <main className="group_card" {...provided.droppableProps} ref={provided.innerRef}>

                                <AccordionHeading color={"lightPrimaryGreenBackGroundColor"} group={true}>
                                    <div className="group_title">WASTE INPUTS</div>
                                    <div className="container">
                                        <span onClick={() => {
                                            // props.handleChangeForCheckedAndAccordion(!props.showGroup, "group")}
                                                props.setShowGroup(
                                                    !props.showGroup
                                                );
                                                setItemInLocalStorage(
                                                    "group",
                                                    !props.showGroup
                                                );
                                            }}
                                        >
                                        {props.showGroup ? ("X"):"| | | "}
                                        </span>
                                    </div>
                                </AccordionHeading>

                                <AccordionBody open={props.showGroup}>
                                    {column.items.map(({id, type}, index) => {
                                        return (
                                            <>
                                            {type === "waste per cover" &&
                                                <Draggable draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <div className="dashboard__draggableReport marginBottomBy1rem" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <WastePerCover
                                                                wastePerCover={props.wastePerCover}
                                                                setWastePerCover={props.setWastePerCover}
                                                                showPounds={props.showPoundsWastePerCover}
                                                                hideReport={props.hideReportWastePerCover}
                                                                siteName={props.siteNameWastePerCover}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            }

                                            {type === "waste per sales" &&
                                                <Draggable draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <div className="dashboard__draggableReport marginBottomBy1rem" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <WastePerSales
                                                                wastePerSales={props.wastePerSales}
                                                                setWastePerSales={props.setWastePerSales}
                                                                showPounds={props.showPoundsWastePerSales}
                                                                hideReport={props.hideReportWastePerSales}
                                                                siteName={props.siteNameWastePerSales}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            }

                                            {type === "daily sales vs waste report" &&
                                                <Draggable draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <div className="dashboard__draggableReport marginBottomBy1rem" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <DailySalesVsWasteReport
                                                                siteName={props.siteNameDailySalesVsWasteReport}
                                                                showPounds={props.showPoundsDailySalesVsWasteReport}
                                                                showDailySalesVsWasteReport={props.showDailySalesVsWasteReport}
                                                                setShowDailySalesVsWasteReport={props.setShowDailySalesVsWasteReport}
                                                                hideReport={props.hideReportDailySalesVsWasteReport}
                                                                weeklyDailyLabels={props.weeklyDailyLabels}
                                                                weeklyDailyRange={props.weeklyDailyRange}
                                                            />
                                                        </div>
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
