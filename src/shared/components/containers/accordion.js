import React from "react";

export const AccordionHeading = (props) => {
    return (
        // <div className={`accordion__heading originalTheme__accordionHeading ${props.color}`}>
        <div className={props.group? `accordion__group` : `accordion__heading originalTheme__accordionHeading ${props.color}` }>
            {props.children}
        </div>
    )
};

export const AccordionBody = (props) => {
    return (
        <div className={(props.open ? "accordion__opening" : "displayNone accordion__closing")}>
            {props.children}
        </div>
    )
};

