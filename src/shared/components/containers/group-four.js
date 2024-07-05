import React, {useState} from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import EventProductionWaste from "./reports/event-production-waste-report";
import EventCustomerWasteVcustomerRef from "./reports/event-customer-waste-v-customer-ref";

import { AccordionHeading, AccordionBody } from "./accordion"

import {
    onDragEnd
  } from "../../../helper.js"

import { setItemInLocalStorage } from "../../../utilities.js";

const graphs = [
    {
      id: '0',
      type: 'eventProductionWaste'
    },
    {
      id: '1',
      type: 'eventCustomerWasteVcustomerRef'
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
                            <AccordionHeading color={"lightPrimaryGreenBackGroundColor"} group={true}>
                                <div className="group_title">WASTE EVENTS</div>
                                <div className="container">
                                    <span onClick={() => {
                                                props.setShowGroupThree(
                                                    !props.showGroupThree
                                                );
                                                setItemInLocalStorage(
                                                    "groupThree",
                                                    !props.showGroupThree
                                                );
                                            }}
                                        >
                                        {props.showGroupThree ? ("X"):"| | | "}
                                    </span>
                                </div>
                            </AccordionHeading>

                            <AccordionBody open={props.showGroupThree}>
                                {column.items.map(({id, type}, index) => {
                                        return (
                                            <>
                                            {type === "eventProductionWaste" &&
                                                <Draggable draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <div className="dashboard__draggableReport marginBottomBy1rem" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <EventProductionWaste
                                                                siteName={props.siteNameDailySalesVsWasteReport}
                                                                showPounds={props.showPoundsDailySalesVsWasteReport}
                                                                showEventProductionWaste={props.showEventProductionWaste}
                                                                setShowEventProductionWaste={props.setShowEventProductionWaste}
                                                                hideReport={props.hideReportDailySalesVsWasteReport}
                                                                weeklyDailyLabels={props.weeklyDailyLabels}
                                                                weeklyDailyRange={props.weeklyDailyRange}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            }

                                            {type === "eventCustomerWasteVcustomerRef" &&
                                                <Draggable draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <div className="dashboard__draggableReport marginBottomBy1rem" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <EventCustomerWasteVcustomerRef
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