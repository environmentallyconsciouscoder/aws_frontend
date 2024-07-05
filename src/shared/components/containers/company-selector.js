import React, { useEffect, useState, useContext } from "react";
import { getAllCompaniesBack } from "../../../api"

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Link } from "react-router-dom";

// import { WasteLabelsContext } from "../../../contexts/waste-labels-context.js";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export default function CompanySelector(props) {

    // const {
    //     getWasteLabelFunc
    // } = useContext(WasteLabelsContext)

    const classes = useStyles();
    let [companiesNamesAndIDs, setCompaniesNamesAndIDs] = useState([]);
    let [allData, setAllData] = useState([]);

    useEffect(() => {
        getAllCompaniesBack().then((data) => {
            let filteredData = [];
            data.Items.map((company) => {
                // console.log("company", company.company);
                // console.log("company id", company.id);
                filteredData.push({
                    companyName: company.company,
                    companyID: company.id
                })
                return ""
            })

            setAllData(data);
            setCompaniesNamesAndIDs(filteredData)
        })
    }, [])

    const handleChange = (event) => {
        const input = event.target.value;
        const fields = input.split('_');
        const name = fields[0];
        const id = fields[1];

        // const selectedCompany = allData.Items.filter((data) => {
        //     return data.company == name;
        // });
        // const siteId = selectedCompany[0].deviceID[0].siteId;

        // setCompanyName(name)
        // setCompanyID(id)
        // console.log("input id", id)
        // console.log("input name", name)
        // console.log("input siteId", siteId)
        // getWasteLabelFunc(name, id, siteId)
        load(name, id)
    };

    // console.log("companyName", companyName)
    // console.log("companyID", companyID)

    const load = (companyName, companyId) => {

        let usersEmail = ""
        let name = ""
        let typeOfUser = "superAdmin"

        const userDetails = {
            companyname: companyName,
            email: usersEmail,
            fullName: name,
            typeOfUser: typeOfUser
        };

        // console.log("userDetails", userDetails)
        // console.log("usersEmail", usersEmail)
        // console.log("name", name)
        // console.log("typeOfUser", typeOfUser)
        // console.log("props", props)

        props.saveUserType(typeOfUser)
        props.getUserDetails(userDetails);
        // props.getNoOfUsersCreated(noOfUsers);
        props.userHasAuthenticated(true);
        props.getAllData(companyName, usersEmail, userDetails, companyId);
    }


    return (
        <div
            style={{
                paddingTop: "15rem",
                margin: "0 20rem",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column"
            }}
        >
            <h2>Select a company you want to load on the dashboard & click submit:</h2>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Companies</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {companiesNamesAndIDs.map((value) => {
                        return (
                            <MenuItem value={value.companyName + "_" + value.companyID}>{value.companyName}</MenuItem>
                        )
                    })}

                </Select>


            </FormControl>

            <button>
                <Link to="/">
                    <h3>submit</h3>
                </Link>
            </button>

        </div >
    )
}

