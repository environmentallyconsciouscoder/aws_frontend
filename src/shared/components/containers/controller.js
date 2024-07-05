import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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

import Tooltip from "@material-ui/core/Tooltip";

import useWindowDimensions from "../libs/use-window-dimensions";

export default function Controller(props) {

    const [tooltipIsOpen, setTooltipIsOpen] = React.useState(true);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };

    const removeCache = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload(true);
    };

    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width <= 700) {
            setTooltipIsOpen(false)
        }
    })


    return (
        <>
        <header className="dashboard__reportMenu">

            <div className="controller-wrapper">

            <div className="dashboard__reportMenu--positioning marginTop">
                <div className="dashboard__overviewSitesReportTable report-subtitle">

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
                            <div className="report-subtitle applyMarginRightAndLeft">
                            Total CSP Waste
                            </div>
                        </TableCell>
                        <TableCell className="dashboard__tableCell">
                            <div className="report-subtitle applyMarginRightAndLeft">
                            Monthly CSP Trend
                            </div>
                        </TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                    {props.allsites.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((site, index) => (
                            <TableRow key={index}>
                            <TableCell className="dashboard__tableCell--style">
                                <div className="dashboard__radio">
                                <Radio
                                    checked={props.selectedSiteValueID === site.siteName}
                                    onChange={props.handleSiteIDchange}
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

                                {props.showPounds ? (
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
                                {props.showPounds ? (
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
                    count={props.allsites.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                </Paper>
                </div>
                </div>

                <div className="dashboard__reportMenu--positioning">

                    <>
                        { props.userType !== "user" &&
                            <h3 className="dashboard__reportMenu--fontSize applyPurpleColor cooperHewittBold">Settings</h3>
                        }

                        { props.userType !== "user" &&
                            <div className="dashboard__controlledLabel">
                                <Link to="/settings">Set Targets</Link>
                            </div>
                        }

                        { props.userType !== "user" &&
                            <div className="dashboard__controlledLabel">
                                <Link to="/capping">Add Capping</Link>
                            </div>
                        }

                        { props.userType !== "user" &&  props.userType !== "admin"?
                            <div className="dashboard__controlledLabel">
                                <Link to="/signup">Add Team member</Link>
                            </div>
                        : null}

                        { props.userType === "greenkodeUser" &&
                            <div className="dashboard__controlledLabel">
                                <Link to="/signupsuperadmin">Sign Up Super Admin</Link>
                            </div>
                        }

                        <div className="dashboard__controlledLabel">
                            <Link to="/InputsList">Add Inputs</Link>
                        </div>

                        <div className="dashboard__controlledLabel">
                            <Link to="/setDisplays">Show Or Hide Reports</Link>
                        </div>

                        <div className="dashboard__controlledLabel">
                            <Link to="/liveFeed">Live Feed</Link>
                        </div>

                        <div onClick={removeCache} style={{marginTop: "1rem"}} className="remove-tooltip">
                            {/* <Tooltip
                                open={tooltipIsOpen}
                                onClose={() => setTooltipIsOpen(false)}
                                title="RESET DASHBOARD TO UPDATE NEW CHANGES"
                                arrow
                            > */}
                            <a href="">
                                Reset Dashboard
                            </a>
                            {/* </Tooltip> */}
                        </div>


                    </>

                </div>

            </div>

        </header>
        </>
    )
}

