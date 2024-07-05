import React, {  useContext,  useState, useEffect} from "react";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import moment from "moment";

import Pagination from "./../reuseable-components/pagination/pagination.js"

import { ProductionPreparationContext } from "../../../../contexts/production-preparation-context";

import {
    formatDateToDatabaseDateFormat,
    formatSiteName,
    addDaysToDate
} from "../../../../utilities";

import {
    addProductionPreparationInputs,
} from "../../../../api";

const totalWeight = (totalNumber, weightPerMeal) => {
    return (totalNumber * weightPerMeal).toFixed(2);
}

export default function CoverInputs(props) {

    const {
        productionInputs,
        filterMenuItems,
        updateProductionInputs,
        filterOutEmptyObjects,
        firstDayOfTheWeek,
        index,
        siteName,
        companyName,
        id,
        numberOfWeeks,
        weeklyArry,
        filterbyWeeks,
        weeklyStartDateArry
    } = useContext(ProductionPreparationContext);


    const [displays, setDisplays] = useState([]);
    const [site, setSite] = useState([]);
    const [date, setDate] = useState([]);

    const [selectedDate, setSelectedDate] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [pageNumber, setPageNumber] = useState(0);

    const [showDate, setShowDate] = useState(true);

    useEffect(() => {
        // console.log("firstDayOfTheWeek",firstDayOfTheWeek);
        // setDate(firstDayOfTheWeek)

        // console.log("moment().format('MMM DD YYYY')",moment(firstDayOfTheWeek).format('MMM DD YYYY'));
        if (productionInputs !== undefined) {
            // console.log("productionInputs",productionInputs);
            setDisplays(productionInputs)
        }

        const formatedSiteName = formatSiteName(siteName)
        setSite(formatedSiteName)

        // console.log("props",props)

        // if (date.length === 0) {
        //     let formatedDate = moment().format('MMM DD YYYY');
        //     setDate(formatedDate);
        // }

        setIsSubmitting(false)

    }, [props, productionInputs]);

    const handleSubmit = (e) => {
        // console.log("e",e)
        e.preventDefault();
        console.log("date",date);
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
                "productionFood": "",
                "ingredients": "",
                "weightPerMeal": 0,
                "totalWeight": 0,
                "totalNumber": 0,
                "date": formatedDate
            }]
        } else {
            objectReturnedToDB = removeEmptyFields
        }

        // console.log("objectReturnedToDB",objectReturnedToDB);

        addProductionPreparationInputs(objectReturnedToDB, siteName, companyName, id).then(() => {

        //    console.log("pageNumber",pageNumber);
           updateProductionInputs(props.companyID, props.companyName, props.selectedSiteValueID, pageNumber)
           props.history.push('/dashboard');
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
                    totalNumber: 0, productionFood: "Food Item", ingredients: "", weightPerMeal: 0
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
        // console.log("selected changePage", selected)
        //this gives page number starting from 0
        setPageNumber(selected);
        filterMenuItems(selected);

        const newDate = addDaysToDate(firstDayOfTheWeek, selected);
        const date = moment(newDate).format('YYYY-MM-DD');
        setDate(date)

        // setDate(newDate)
        setShowDate(true)
        setSelectedDate(newDate)
    };

    // export const addDaysToDate = (firstDayOfTheWeek, numberOfdays) => {
    //     const new_date = moment(firstDayOfTheWeek).add(numberOfdays, 'days');
    //     return new_date.format('MMM DD YYYY');
    //   }

    const changePageForWeeks = ({ selected }) => {
        const startDate = weeklyStartDateArry[selected];
        // console.log("selected",startDate);
        setDate(startDate)
        // console.log("weeklyArry",weeklyArry[selected]);
        // setDate(moment(firstDayOfTheWeek).format('MMM DD YYYY'))
        setShowDate(false)
        filterbyWeeks(weeklyArry[selected], pageNumber, weeklyArry)
    };

  return (

    <>

    <div className="ProductionPreparation applyBlueTuckGreen">


        <div
        className="ProductionPreparation__spacing"
        >

            <div className="ProductionPreparation__heading">
                <div
                className="ProductionPreparation__label"
                >
                    <div className="applyPurpleColor cooperHewittBold">{site}</div>
                    <div className="section-title">Production Preparation</div>

                    {!showDate &&
                        <div className="applyPurpleColor cooperHewittBold">w/c {date}</div>
                    }

                    {showDate &&
                        <div className="applyPurpleColor cooperHewittBold">{selectedDate}</div>
                    }
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
            className="ProductionPreparation__tableHeading"

            >

                <div>Production Food</div>
                <div>Ingredients</div>
                <div>Total Number</div>
                <div>Weight per meal (KG)</div>
                <div>Total Weight (KG)</div>
                {/* <div>Waste per sales</div> */}
                <div style={{marginLeft: "2rem"}}></div>


            </div>

            <div
            className="ProductionPreparation__tableLayout"
            >

                <form style={{
                    width: "100%"
                }}>

                    {displays.map((data, id) => {
                        return (
                            <div
                                className="ProductionPreparation__inputLayout"
                            >
                                <div style={{display: "flex"}}>
                                    <input
                                        placeholder={data.productionFood}
                                        name="productionFood"
                                        onChange={event => handleChangeInput(id, event)}
                                        type="text"
                                        onKeyDown={(evt) => ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].includes(evt.key) && evt.preventDefault()}
                                    />
                                    <textarea
                                        placeholder={data.ingredients}
                                        name="ingredients"
                                        onChange={event => handleChangeInput(id, event)}
                                        type="text"
                                        // onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                    />
                                    <input
                                        placeholder={data.totalNumber}
                                        name="totalNumber"
                                        onChange={event => handleChangeInput(id, event)}
                                        type="number"
                                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                    />
                                    <input
                                        placeholder={data.weightPerMeal}
                                        name="weightPerMeal"
                                        onChange={event => handleChangeInput(id, event)}
                                        type="number"
                                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                    />
                                </div>
                                <div
                                className="ProductionPreparation__autoCalculator"

                                >
                                ( {totalWeight(data.totalNumber, data.weightPerMeal)} ) Kg
                                </div>

                                <div style={{marginLeft: "2rem", fontFamily: "CooperHewitt-Bold", cursor: "pointer"}} onClick={()=> deleteItem(data, id)}>Delete</div>
                            </div>
                        )
                    })}

                    <div
                        className="ProductionPreparation__buttonLayout"
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

    <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
            color: "rgb(140, 112, 140)"
    }}>
        Change Daily Input: (select prev/next to change the days of the week)
    </div>

    <Pagination index={index} onPageChange={changePage} pageCount={7} />

    <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
            color: "rgb(140, 112, 140)"
    }}>
        Change weekly Input:
    </div>

    <Pagination index={index} onPageChange={changePageForWeeks} pageCount={numberOfWeeks} />
    </>

  );
}