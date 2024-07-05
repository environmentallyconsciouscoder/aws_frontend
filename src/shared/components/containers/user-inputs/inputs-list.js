import React from 'react'

import { Link } from "react-router-dom";

export default function inputsList(props) {
    return (
        <>
            <div className="inputs__list__container">
                <div className="inputs__link-wrapper">
                    {/* <Link className="inputs__link-wrapper-center" to="/inputs">Add Cover Inputs & Add Sales Inputs</Link> */}
                    <Link className="inputs__link-wrapper-center" to="/dailySalesVsWasteInputs">Add Menu Items</Link>
                    <Link className="inputs__link-wrapper-center" to="/salesInputs">Add Sales Inputs</Link>
                    <Link className="inputs__link-wrapper-center" to="/coverInputs">Add Cover Inputs</Link>
                    <Link className="inputs__link-wrapper-center" to="/ProductionPreparationInputs">Add production Inputs</Link>
                </div>
            </div>
        </>
    )
}
