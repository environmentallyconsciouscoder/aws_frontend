import React, {  useEffect, useState, useContext } from "react";
import { TableHead, Table, TableContainer, TableBody } from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";
import { postCapping } from "../../../../api.js";

import { roundedUpNumberAndTurnBackToString } from "../../../../utilities";

import { WasteCapContext } from "../../../../contexts/waste-cap-context";

import { WasteLabelsContext } from "../../../../contexts/waste-labels-context";

let hourlyCoverWastesCap = 0
let hourlySpoliageWastesCap = 0
let hourlyPeparationWastesCap = 0

let dailyCoverWastesCap = 0
let dailySpoliageWastesCap = 0
let dailyPeparationWastesCap = 0

let weeklyCoverCap = 0
let weeklySpoliageCap = 0
let weeklyPreparationCap = 0

let monthlyCoverCap = 0
let monthlySpoliageCap = 0
let monthlyPreparationCap = 0

let totalCoverCap = 0
let totalSpoliageCap = 0
let totalPreparationCap = 0

let wastePerCoverCoverCap = 0
let wastePerCoverSpoliageCap = 0
let wastePerCoverPreparationCap = 0

let wastePerSalesCoverCap = 0
let wastePerSalesSpoliageCap = 0
let wastePerSalesPreparationCap = 0

export default function AddCapping(props) {

    const {
        allCappingValue
    } = useContext(WasteCapContext);

    const {
        labels
       } = useContext(WasteLabelsContext);

    let [ totalCappingValues, setTotalCappingValues] = useState([
            {
              id: 0,
              value: totalCoverCap,
              label: "totalCoverWastes",
              type: "C"
            },
            {
              id: 1,
              value: totalSpoliageCap,
              label: "totalSpoilageWastes",
              type: "S"
            },
            {
              id: 2,
              value: totalPreparationCap,
              label: "totalPreparationWastes",
              type: "P"
            }
          ]
        )

    let [ monthlyCappingValues, setMonthlyCappingValues] = useState([
            {
                id: 0,
                value: monthlyCoverCap,
                label: "monthlyCoverWastes",
                type: "C"
            },
            {
                id: 1,
                value: monthlySpoliageCap,
                label: "monthlySpoilageWastes",
                type: "S"
            },
            {
                id: 2,
                value: monthlyPreparationCap,
                label: "monthlyPreparationWastes",
                type: "P"
            }
        ]
    )

    let [ weeklyCappingValues, setWeeklyCappingValues] = useState([
        {
            id: 0,
            value: weeklyCoverCap,
            label: "weeklyCoverWastes",
            type: "C"
        },
        {
            id: 1,
            value: weeklySpoliageCap,
            label: "weeklySpoilageWastes",
            type: "S"
        },
        {
            id: 2,
            value: weeklyPreparationCap,
            label: "weeklyPreparationWastes",
            type: "P"
        }
    ]
    )

    let [ dailyCappingValues, setDailyCappingValues] = useState([
        {
            id: 0,
            value: dailyCoverWastesCap,
            label: "dailyCoverWastes",
            type: "C"
        },
        {
            id: 1,
            value: dailySpoliageWastesCap,
            label: "dailySpoilageWastes",
            type: "S"
        },
        {
            id: 2,
            value: dailyPeparationWastesCap,
            label: "dailyPreparationWastes",
            type: "P"
        },
    ]
    )

    let [ hourlyCappingValues, setHourlyCappingValues] = useState([
        {
            id: 0,
            value: hourlyCoverWastesCap,
            label: "hourlyCoverWastes",
            type: "C"
        },
        {
            id: 1,
            value: hourlySpoliageWastesCap,
            label: "hourlySpoilageWastes",
            type: "S"
        },
        {
            id: 2,
            value: hourlyPeparationWastesCap,
            label: "hourlyPreparationWastes",
            type: "P"
        }
    ]
    )

    let [ wastePerCoverCappingValues, setWastePerCoverCappingValues] = useState([
        {
            id: 0,
            value: wastePerCoverCoverCap,
            label: "wastePerCoverCoverWastes",
            type: "C"
        },
        {
            id: 1,
            value: wastePerCoverSpoliageCap,
            label: "wastePerCoverSpoilageWastes",
            type: "S"
        },
        {
            id: 2,
            value: wastePerCoverPreparationCap,
            label: "wastePerCoverPreparationWastes",
            type: "P"
        }
    ]
    )

    let [ wastePerSalesCappingValues, setWastePerSalesCappingValues] = useState([
        {
            id: 0,
            value: wastePerSalesCoverCap,
            label: "wastePerSalesCoverWastes",
            type: "C"
        },
        {
            id: 1,
            value: wastePerSalesSpoliageCap,
            label: "wastePerSalesSpoilageWastes",
            type: "S"
        },
        {
            id: 2,
            value: wastePerSalesPreparationCap,
            label: "wastePerSalesPreparationWastes",
            type: "P"
        }
    ]
    )

    const [ companyName, setCompanyName ] = useState("")
    const [ companyId, setCompanyId ] = useState("")
    const [ siteId, setSiteId ] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setCompanyName(props.companyName)
        setCompanyId(props.companyID)
        setSiteId(props.selectedSiteValueID)

        if (allCappingValue) {
            // console.log("YES allCappingValue", allCappingValue)

            setWastePerCoverCappingValues(allCappingValue.wastePerCoverCappingValues)
            setWastePerSalesCappingValues(allCappingValue.wastePerSalesCappingValues)

            setTotalCappingValues(allCappingValue.totalCappingValues)
            setMonthlyCappingValues(allCappingValue.monthlyCappingValues)
            setWeeklyCappingValues(allCappingValue.weeklyCappingValues)
            setDailyCappingValues(allCappingValue.dailyCappingValues)
            setHourlyCappingValues(allCappingValue.hourlyCappingValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsSubmitting(true)

        const data = {
            totalCappingValues: totalCappingValues,
            monthlyCappingValues: monthlyCappingValues,
            weeklyCappingValues: weeklyCappingValues,
            dailyCappingValues: dailyCappingValues,
            hourlyCappingValues: hourlyCappingValues,
            wastePerCoverCappingValues: wastePerCoverCappingValues,
            wastePerSalesCappingValues: wastePerSalesCappingValues,
            companyName: companyName,
            companyId: companyId,
            siteId: siteId
        }

        postCapping(data).then(() => {
            props.callGetCappingAPI(companyId, companyName, siteId)
            setIsSubmitting(false)
        })
    };

    const handleFieldChange = (event) => {
        const { name, value, id } = event.target;
        switch(name) {
            case "totalCoverWastes":
                let num = roundedUpNumberAndTurnBackToString(value);
                totalCappingValues[id].value = isNaN(num) ? 0 : num;
              break;
            case "totalSpoilageWastes":
                let numTwo = roundedUpNumberAndTurnBackToString(value);
                totalCappingValues[id].value = isNaN(numTwo) ? 0 : numTwo;
              break;
            case "totalPreparationWastes":
                let numThree = roundedUpNumberAndTurnBackToString(value);
                totalCappingValues[id].value = isNaN(numThree) ? 0 : numThree;
              break;

            case "monthlyCoverWastes":
                let numFour = roundedUpNumberAndTurnBackToString(value);
                monthlyCappingValues[id].value = isNaN(numFour) ? 0 : numFour;
              break;
            case "monthlySpoilageWastes":
                let numFive = roundedUpNumberAndTurnBackToString(value);
                monthlyCappingValues[id].value = isNaN(numFive) ? 0 : numFive;
              break;
            case "monthlyPreparationWastes":
                let numSix = roundedUpNumberAndTurnBackToString(value);
                monthlyCappingValues[id].value = isNaN(numSix) ? 0 : numSix;
              break;

            case "weeklyCoverWastes":
                let numSeven = roundedUpNumberAndTurnBackToString(value);
                weeklyCappingValues[id].value = isNaN(numSeven) ? 0 : numSeven;
              break;
            case "weeklySpoilageWastes":
                let numEight = roundedUpNumberAndTurnBackToString(value);
                weeklyCappingValues[id].value = isNaN(numEight) ? 0 : numEight;
              break;
            case "weeklyPreparationWastes":
                let numNine = roundedUpNumberAndTurnBackToString(value);
                weeklyCappingValues[id].value = isNaN(numNine) ? 0 : numNine;
              break;

            case "dailyCoverWastes":
                let numTen = roundedUpNumberAndTurnBackToString(value);
                dailyCappingValues[id].value = isNaN(numTen) ? 0 : numTen;
              break;
            case "dailySpoilageWastes":
                let numEleven = roundedUpNumberAndTurnBackToString(value);
                dailyCappingValues[id].value = isNaN(numEleven) ? 0 : numEleven;
              break;
            case "dailyPreparationWastes":
                let numTwelve = roundedUpNumberAndTurnBackToString(value);
                dailyCappingValues[id].value = isNaN(numTwelve) ? 0 : numTwelve;
              break;

            case "hourlyCoverWastes":
                let numThirteen = roundedUpNumberAndTurnBackToString(value);
                hourlyCappingValues[id].value = isNaN(numThirteen) ? 0 : numThirteen;
              break;
            case "hourlySpoilageWastes":
                let numFourteen = roundedUpNumberAndTurnBackToString(value);
                hourlyCappingValues[id].value = isNaN(numFourteen) ? 0 : numFourteen;
              break;
            case "hourlyPreparationWastes":
                let numFifteen = roundedUpNumberAndTurnBackToString(value);
                hourlyCappingValues[id].value = isNaN(numFifteen) ? 0 : numFifteen;
              break;

            case "wastePerCoverCoverWastes":
                // let numSixteen = roundedUpNumberAndTurnBackToString(value);
                wastePerCoverCappingValues[id].value = isNaN(value) ? 0 : parseFloat(value);
                break;
            case "wastePerCoverSpoilageWastes":
                // let numSeventeen = roundedUpNumberAndTurnBackToString(value);
                wastePerCoverCappingValues[id].value = isNaN(value) ? 0 : parseFloat(value);
                break;
            case "wastePerCoverPreparationWastes":
                // let numEighteen = roundedUpNumberAndTurnBackToString(value);
                wastePerCoverCappingValues[id].value = isNaN(value) ? 0 : parseFloat(value);
                break;

            case "wastePerSalesCoverWastes":
                // let numNineteen = roundedUpNumberAndTurnBackToString(value);
                wastePerSalesCappingValues[id].value = isNaN(value) ? 0 : parseFloat(value);
                break;
            case "wastePerSalesSpoilageWastes":
                // let numTwenty = roundedUpNumberAndTurnBackToString(value);
                wastePerSalesCappingValues[id].value = isNaN(value) ? 0 : parseFloat(value);
                break;
            case "wastePerSalesPreparationWastes":
                // let numTwentyOne = roundedUpNumberAndTurnBackToString(value);
                wastePerSalesCappingValues[id].value = isNaN(value) ? 0 : parseFloat(value);
                break;

            default:
        }
    }

    return (
        <>
        <div
            className="capping-wrapper"
        >
            <h2>{siteId.replace(/[^A-Za-z]+/g, '').toUpperCase()} Capping (in KG)</h2>
            <form onSubmit={handleSubmit}>
                <TableContainer className="dashboard__tableContainer">

                    <Table stickyHeader aria-label="sticky table">

                        <TableHead>
                            <tr>
                                <th className="userInput__tableCell cooperHewittBold">
                                Capping CSP{" "}
                                </th>
                                <th className="userInput__tableCell">
                                {/* <b className="applyPurpleColor">C</b>over Waste{" "} */}
                                {labels.titleLabels.c}
                                </th>
                                <th className="userInput__tableCell">
                                {/* <b className="applyPurpleColor">S</b>poilage Waste */}
                                {labels.titleLabels.s}
                                </th>
                                <th className="userInput__tableCell">
                                {/* <b className="applyPurpleColor">P</b>reparation{" "} Waste */}
                                {labels.titleLabels.p}
                                </th>
                            </tr>
                        </TableHead>

                        <TableBody>
                            <tr>
                                <td className="userInput__tableCell cooperHewittBold">Total Waste</td>
                                {totalCappingValues.map((data, i) => (
                                <td className="userInput__tableCell userInput__input cooperHewittBold">
                                    {data.type}
                                    <input
                                        className="capping__itemStyling applyMarginRightAndLeft inputBox"
                                        InputProps={{ disableUnderline: true }}
                                        placeholder={(data.value).toFixed(2)}
                                        type="number"
                                        id={i}
                                        name={data.label}
                                        onChange={handleFieldChange}
                                        onKeyDown={(evt) => ["e", "E", "+", "-", "NaN"].includes(evt.key) && evt.preventDefault()}
                                    ></input>
                                </td>
                                ))}
                            </tr>

                            <tr>
                                <td className="userInput__tableCell cooperHewittBold">Monthly Waste <span>(SMS Alerts Available)</span> </td>
                                {monthlyCappingValues.map((data, i) => (
                                <td className="userInput__tableCell userInput__input cooperHewittBold">
                                    {data.type}
                                    <input
                                        className="capping__itemStyling applyMarginRightAndLeft inputBox"
                                        placeholder={(data.value).toFixed(2)}
                                        InputProps={{ disableUnderline: true }}
                                        type="number"
                                        id={i}
                                        name={data.label}
                                        onChange={handleFieldChange}
                                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                    ></input>
                                </td>
                                ))}
                            </tr>

                            <tr>
                                <td className="userInput__tableCell cooperHewittBold">Weekly Waste <span>(SMS Alerts Available)</span></td>
                                {weeklyCappingValues.map((data, i) => (
                                <td className="userInput__tableCell userInput__input cooperHewittBold">
                                    {data.type}
                                    <input
                                        className="capping__itemStyling inputBox"
                                        placeholder={(data.value).toFixed(2)}
                                        InputProps={{ disableUnderline: true }}
                                        type="number"
                                        id={i}
                                        name={data.label}
                                        onChange={handleFieldChange}
                                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                    ></input>
                                </td>
                                ))}
                            </tr>

                            <tr>
                                <td className="userInput__tableCell cooperHewittBold">Daily Waste <span>(SMS Alerts Available)</span></td>
                                {dailyCappingValues.map((data, i) => (
                                <td className="userInput__tableCell userInput__input cooperHewittBold">
                                    {data.type}
                                    <input
                                        className="capping__itemStyling inputBox"
                                        placeholder={(data.value).toFixed(2)}
                                        InputProps={{ disableUnderline: true }}
                                        type="number"
                                        id={i}
                                        name={data.label}
                                        onChange={handleFieldChange}
                                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                    ></input>
                                </td>
                                ))}
                            </tr>

                            <tr>
                                <td className="userInput__tableCell cooperHewittBold">Hourly Waste</td>
                                {hourlyCappingValues.map((data, i) => (
                                <td className="userInput__tableCell userInput__input cooperHewittBold">
                                    {data.type}
                                    <input
                                        className="capping__itemStyling inputBox"
                                        placeholder={(data.value).toFixed(2)}
                                        InputProps={{ disableUnderline: true }}
                                        type="number"
                                        id={i}
                                        name={data.label}
                                        onChange={handleFieldChange}
                                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                    ></input>
                                </td>
                                ))}
                            </tr>

                            <tr>
                                <td className="userInput__tableCell cooperHewittBold">Waste Per Cover (SMS Alerts Available)</td>
                                {wastePerCoverCappingValues.map((data, i) => (
                                <td className="userInput__tableCell userInput__input cooperHewittBold">
                                    {data.type}
                                    <input
                                        className="capping__itemStyling applyMarginRightAndLeft inputBox"
                                        InputProps={{ disableUnderline: true }}
                                        placeholder={(data.value).toFixed(2)}
                                        // type="number"
                                        id={i}
                                        name={data.label}
                                        onChange={handleFieldChange}
                                        onKeyDown={(evt) => ["e", "E", "+", "-", "NaN"].includes(evt.key) && evt.preventDefault()}
                                    ></input>
                                </td>
                                ))}
                            </tr>

                            <tr>
                                <td className="userInput__tableCell cooperHewittBold">Waste Per Sales</td>
                                {wastePerSalesCappingValues.map((data, i) => (
                                <td className="userInput__tableCell userInput__input cooperHewittBold">
                                    {data.type}
                                    <input
                                        className="capping__itemStyling applyMarginRightAndLeft inputBox"
                                        InputProps={{ disableUnderline: true }}
                                        placeholder={(data.value).toFixed(2)}
                                        // type="number"
                                        id={i}
                                        name={data.label}
                                        onChange={handleFieldChange}
                                        onKeyDown={(evt) => ["e", "E", "+", "-", "NaN"].includes(evt.key) && evt.preventDefault()}
                                    ></input>
                                </td>
                                ))}
                            </tr>

                        </TableBody>

                    </Table>

                </TableContainer>

                <button className="marginTop">
                    {isSubmitting ? "resubmit" : "Save Cap"}
                </button>

            </form>
        </div>

        <div className="capping-info">
           <div>
                <span className="applyPurpleColor cooperHewittBold">Daily waste values</span> are checked against the daily capping values every day at <span className="applyPurpleColor cooperHewittBold">3 pm</span>.
           </div>
           <div>
                <span className="applyPurpleColor cooperHewittBold">Weekly waste values</span> are checked against the weekly capping values every week at <span className="applyPurpleColor cooperHewittBold">12 pm</span> on a Monday.
           </div>
           <div>
                <span className="applyPurpleColor cooperHewittBold">Monthly waste values</span> are checked against the monthly capping values on the 1st of the Month at <span className="applyPurpleColor cooperHewittBold">3 pm</span>.
           </div>
        </div>

        </>
    )
}
