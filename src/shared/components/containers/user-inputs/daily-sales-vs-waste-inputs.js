import React, {  useContext,  useState, useEffect} from "react";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import moment from "moment";

import Pagination from "./../reuseable-components/pagination/pagination.js"

import { DailySalesVsWasteContext } from "../../../../contexts/daily-sales-vs-waste-context";

import {
    formatDateToDatabaseDateFormat,
    formatSiteName,
    addDaysToDate
} from "../../../../utilities";

import {
    addMenuInput,
} from "../../../../api";

const getWeight = (salesNum, weightNum, wasteNum) => {

    // console.log("salesNum",salesNum)
    // console.log("weightNum",weightNum)
    // console.log("wasteNum",wasteNum)

    const sales = salesNum === "" || salesNum === undefined ? 0: salesNum;
    const weight = weightNum === "" || weightNum === undefined ? 0: weightNum;
    const waste = wasteNum === "" || wasteNum === undefined ? 0: wasteNum;

    const weightAsWaste = (parseFloat(sales) * parseFloat(weight) * parseFloat(waste))/ 100
    return (weightAsWaste).toFixed(2);
}

const getWastePerSales = (salesNum, weightNum, wasteNum) => {

    // console.log("salesNum",salesNum)
    // console.log("weightNum",weightNum)
    // console.log("wasteNum",wasteNum)

    const sales = salesNum === "" || salesNum === undefined ? 0: salesNum;
    const weight = weightNum === "" || weightNum === undefined  ? 0: weightNum;
    const waste = wasteNum === "" || wasteNum === undefined ? 0: wasteNum;

    const weightAsWaste = (parseFloat(sales) * parseFloat(weight) * parseFloat(waste))/ 100

    if (weightAsWaste === 0 && parseFloat(sales) === 0) {
        return 0;
    } else {
        const result = weightAsWaste / parseFloat(sales);
        return result.toFixed(2)
    }
}

export default function CoverInputs(props) {

    const {
        dailyMenuInputs,
        siteName,
        companyName,
        id,
        filterOutEmptyObjects,
        filterMenuItems,
        firstDayOfTheWeek,
        updateDailySalesVsWasteInput,
        index
    } = useContext(DailySalesVsWasteContext);


    const [displays, setDisplays] = useState([]);
    const [site, setSite] = useState([]);
    const [date, setDate] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        setDisplays(dailyMenuInputs)
        const formatedSiteName = formatSiteName(siteName)
        setSite(formatedSiteName)

        // console.log("props",props)

        if (date.length === 0) {
            let formatedDate = moment().format('MMM DD YYYY');
            setDate(formatedDate);
        }

        setIsSubmitting(false)

    }, [props, dailyMenuInputs]);

    const handleSubmit = (e) => {
        // console.log("e",e)
        e.preventDefault();
        // console.log("displays",displays);
        // let date = new Date()
        const formatedDate = formatDateToDatabaseDateFormat(date)
        // console.log("formatedDate",formatedDate)

        const addDateToObject = displays.map((data) => {
             return Object.assign(data, {date: formatedDate});
        })

        // console.log("addDateToObject",addDateToObject)
        const removeEmptyFields = filterOutEmptyObjects(addDateToObject)
        // console.log("removeEmptyFields",removeEmptyFields)

        let objectReturnedToDB;

        if (removeEmptyFields.length === 0) {
            objectReturnedToDB = [{
                "menuItem": "",
                "sales": 0,
                "wastePerCent": 0,
                "weightPerItem": 0,
                "date": formatedDate
            }]
        } else {
            objectReturnedToDB = removeEmptyFields
        }

        // console.log("removeEmptyFields",removeEmptyFields);
        // console.log("objectReturnedToDB",objectReturnedToDB);

        addMenuInput(objectReturnedToDB, siteName, companyName, id).then(() => {
           updateDailySalesVsWasteInput(props.companyID, props.companyName, props.selectedSiteValueID, pageNumber)
        }).then(() => {
            // console.log("pageNumber",pageNumber);
            // let formatedDate = moment().format('MMM DD YYYY');
            // setDate(formatedDate);
            const newDate = addDaysToDate(firstDayOfTheWeek, pageNumber);
            setDate(newDate);
        })
        setIsSubmitting(true)
    }

    const handleAddFields = () => {
        if (displays.length <= 20) {
            setDisplays([...displays,
                {
                    weightPerItem: 0, menuItem: "menu item", sales: 0, wastePerCent: 0
                },
            ])
        }
    };

    const handleChangeInput = (id, event) => {
        // console.log("id", id)
        // console.log("event", event)

        const newInputFields =
        displays.map((data, i)=> {
            if(id === i) {
                // console.log("data[event.target.name]",data[event.target.name])
                // console.log("event.target.value",event.target.value)

                data[event.target.name] = event.target.value
            }
            return data;
        })

        // console.log("newInputFields",newInputFields)
        setDisplays(newInputFields);
    }

    const deleteItem = (data, id) => {
        // console.log("id",id)
        // console.log("displays",displays);
        const values  = [...displays];
        values.splice(id, 1);
        // console.log("values",values)
        setDisplays(values)
    }

    const changePage = ({ selected }) => {
        // console.log("selected", selected)
        //this gives page number starting from 0
        setPageNumber(selected);
        filterMenuItems(selected);

        const newDate = addDaysToDate(firstDayOfTheWeek, selected);
        setDate(newDate)
    };

  return (

    <>

    <div className="DailySalesVsWasteReport applyBlueTuckGreen">


        <div
        className="DailySalesVsWasteReport__spacing"
        >

            <div className="DailySalesVsWasteReport__heading">
                <div
                className="DailySalesVsWasteReport__label"
                >
                    <div className="applyPurpleColor cooperHewittBold">{site}</div>
                    <div className="section-title">Top Daily Sales</div>
                    <div className="applyPurpleColor cooperHewittBold">{date}</div>
                </div>
                <div>
                    <IconButton
                        onClick={handleAddFields}
                        >
                        <AddIcon />
                    </IconButton>
                </div>
            </div>

            <div
            className="DailySalesVsWasteReport__tableLayout"

            >

                <div>Top 10 or 20 sales</div>
                <div>Sales</div>
                <div>Weight Kg</div>
                <div>Waste %</div>
                <div>(Weight)</div>
                <div>Waste per sales</div>
                <div style={{marginLeft: "2rem"}}></div>


            </div>

            <div
            className="DailySalesVsWasteReport__tableLayout"
            >

                <form style={{
                    width: "100%"
                }}>

                    {displays.map((data, id) => {
                        return (
                            <div
                                className="DailySalesVsWasteReport__inputLayout"
                            >
                                <div style={{display: "flex"}}>
                                    <input
                                        placeholder={data.menuItem}
                                        name="menuItem"
                                        onChange={event => handleChangeInput(id, event)}
                                        type="text"
                                        onKeyDown={(evt) => ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].includes(evt.key) && evt.preventDefault()}
                                    />
                                    <input
                                        placeholder={data.sales}
                                        name="sales"
                                        onChange={event => handleChangeInput(id, event)}
                                        type="number"
                                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                    />
                                    <input
                                        placeholder={data.weightPerItem}
                                        name="weightPerItem"
                                        onChange={event => handleChangeInput(id, event)}
                                        type="number"
                                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                    />
                                    <input
                                        placeholder={data.wastePerCent}
                                        name="wastePerCent"
                                        onChange={event => handleChangeInput(id, event)}
                                        type="number"
                                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                    />
                                </div>
                                <div
                                className="DailySalesVsWasteReport__autoCalculator"

                                >( {getWeight(data.sales, data.weightPerItem, data.wastePerCent)} ) Kg</div>
                                <div
                                className="DailySalesVsWasteReport__autoCalculator"

                                > {getWastePerSales(data.sales, data.weightPerItem, data.wastePerCent)} </div>
                                <div style={{marginLeft: "2rem", fontFamily: "CooperHewitt-Bold", cursor: "pointer"}} onClick={()=> deleteItem(data, id)}>Delete</div>
                            </div>
                        )
                    })}

                    <div
                        className="DailySalesVsWasteReport__buttonLayout"
                    >
                        <button
                            onClick={event => handleSubmit(event)}
                        >
                            {isSubmitting ? "Submitted" : "Submit"}
                        </button>
                    </div>

                </form>

            </div>
        </div>

    </div>

    <Pagination index={index} onPageChange={changePage} pageCount={7} />
    </>

  );
}