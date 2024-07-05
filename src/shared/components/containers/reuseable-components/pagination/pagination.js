import React from 'react'
import "./pagination.css"

import ReactPaginate from "react-paginate";

export default function pagination(props) {
    return (
        <div className="paginationWrapper">
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={props.pageCount}
            onPageChange={props.onPageChange}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            initialPage={props.index}
        />
    </div>
    )
}
