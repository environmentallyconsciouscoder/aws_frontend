import React, { useState, useEffect } from "react";
import {
  faAsterisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import {
  addToGroup,
  updateUsersAttribute,
  createUserLoginTime,
  verifyEmail
} from "../../../../api";

import useSpinner from "../../libs/use-spinner";

import {
  TableRow,
  Paper,
  TableHead,
  Table,
  TableContainer,
  TableCell,
  TableBody,
} from "@material-ui/core";

export default function Signup(props) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessageFromAWS, setErrorMessageFromAWS] = useState("");

  const [stage, setStage] = useState(1);
  const [loginEmailAddress, setLoginEmailAddress] = useState("");

  const [ spinner, showSpinner, hideSpinner ] = useSpinner();

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  const classes = useStyles();
  const [userType, setUserType] = React.useState("user");

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  useEffect(() => {
    setLoginEmailAddress(props.userDetail.email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ props.userDetail])

  async function submit(values) {

    showSpinner()

    const username = values.email;
    const password = values.password;
    const name = values.name;
    const phone = values.phone;

    const company = props.companyName;
    const noOfUsers = props.noOfUsers + 1
    const companyID = props.companyID;

    const signUpInformation = {
      username,
      password,
      attributes: {
          name: name,
        "custom:company": company,
        "custom:NumberOfUsersSix": "0",
        "custom:companyId": companyID,
        "custom:smsAlerts": "true",
        "custom:emailAlerts": "true",
        "custom:mobile": phone,
        "custom:companyStartDate": props.startDate
      },
    };

    console.log("signUpInformation",signUpInformation);

    //prevent adding user already been added
    let error = false;

    try {
      await Auth.signUp(signUpInformation)
      error = true;
      hideSpinner()
      setErrorMessageFromAWS("")
      setStage(2);
    } catch (error) {
      hideSpinner()
      setErrorMessageFromAWS(error.message);
      // error = false
      console.log("error signing up:", error);
    }

    if (error) {

      if (userType === "admin") {
        try {
          await verifyEmail(username)
        } catch (error) {
          setErrorMessageFromAWS(error.message);
          console.log("error verifyEmail:", error);
        }
      }

      try {
        await addToGroup(username, userType)
      } catch (error) {
        setErrorMessageFromAWS(error.message);
        console.log("error addToGroup:", error);
      }

      try {
        const numberOfUsers = noOfUsers.toString()
        await updateUsersAttribute(loginEmailAddress, numberOfUsers)
      } catch (error) {
        setErrorMessageFromAWS(error.message);
        console.log("error updateUsersAttribute:", error);
      }

      try {
        await createUserLoginTime(name, username, company, companyID);
      } catch (error) {
        setErrorMessageFromAWS(error.message);
        console.log("error createUserLoginTime:", error);
      }
    }

  }


  async function confirmSignUp(values) {
    const username = values.email;
    const code = values.code;

    try {
      await Auth.confirmSignUp(username, code).then(() => {
        props.history.push("/dashboard");
      });
    } catch (error) {
      setErrorMessageFromAWS(error.message);
    }
  }

  return (
    <>
      {spinner}
      {stage === 1 && (
        <div className="signup">
          <div className="signup__columns">
            <form onSubmit={handleSubmit(submit)} className="signup__form signup__column">
            <div className="signup__heading--style">
              Sign up maximum of {props.noOfUsers === 0 ? 6: 6 - props.noOfUsers} users
            </div>

            <div className="signup__wrapper">
              <div className="signup__textWrapper">
                <FontAwesomeIcon icon={faAsterisk} />
                <div className="signup__inputText">Email (Username)</div>{" "}
              </div>
              <input
                autoFocus
                type="email"
                name="email"
                className="signup__emailInput"
                ref={register({
                  required: "required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              {errors.email ? (
                <p>{errors.email.message} </p>
              ): ""}
            </div>

            <div className="signup__wrapper">
              <div className="signup__textWrapper">
                <FontAwesomeIcon icon={faAsterisk} />
                <div className="signup__inputText">New Password</div>{" "}
              </div>
              <input
                type="password"
                name="password"
                className="signup__passwordInput"
                ref={register({
                  required: "required",
                  minLength: {
                    value: 8,
                    message: "min length is 8",
                  },
                })}
              />
              {errors.password ? (
                <p>{errors.password.message} </p>
              ):""}
            </div>

            <div className="signup__wrapper">
              <div className="signup__textWrapper">
                <FontAwesomeIcon icon={faAsterisk} />
                <div className="signup__inputText">Full Name</div>{" "}
              </div>
              <input
                type="name"
                name="name"
                className="signup__passwordInput"
                ref={register({
                  required: "required",
                })}
              />
              {errors.name ? (
                <p>{errors.name.message} </p>
              ):""}
            </div>

            <div className="signup__wrapper">
              <div className="signup__textWrapper">
                <FontAwesomeIcon icon={faAsterisk} />
                <div className="signup__inputText">Mobile Number</div>{" "}
              </div>
              <input
                type="number"
                name="phone"
                className="signup__passwordInput"
                ref={register({
                  required: "required",
                  minLength: {
                    value: 11,
                    message: "invalid number",
                  },
                  maxLength: {
                    value: 11,
                    message: "invalid number",
                  },
                })}
                onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
              />
              {errors.phone ? (
                <p>{errors.phone.message} </p>
              ):""}
            </div>

            <div className="signup__userType__formWrapper">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                User Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={userType}
                onChange={handleChange}
                label="users"
              >
                <MenuItem value={"user"}>Staff</MenuItem>
                <MenuItem value={"admin"}>Head chef</MenuItem>
              </Select>
            </FormControl>
            </div>

            {props.noOfUsers === 6 ? <div style={{
              display: "flex",
              justifyContent: "center",
              color: "red"
            }}>"You have reached the maximum amount of users"</div> :
            <button
              type="submit"
            >
              Sign up
            </button>
            }

            <div className="signUp__errorMessage">
              <p>{errorMessageFromAWS}</p>
            </div>
          </form>
            <div className="signup__column">


                <TableContainer component={Paper}>
                  <Table className="superAdminCreatedUsers__table" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell align="left">Most Recent Logins</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.superAdminCreatedUsers.map((row, id) => (
                        <TableRow key={id}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="left">
                            {
                              row.loginTime.map((data) => {
                                return (
                                <div>
                                  {data.time}
                                </div>
                                )
                              })
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>


            </div>
          </div>
        </div>
      )}

      {stage === 2 && (
        <div className="signup">
          <form onSubmit={handleSubmit(confirmSignUp)} className="signup__form">
            <div className="signup__heading--style">Confirm Sign Up</div>

            <div className="signup__wrapper">
              <div className="signup__emailText">Username (Email)</div>{" "}
              <input
                autoFocus
                type="email"
                name="email"
                className="signup__emailInput"
                ref={register({
                  required: "required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
            </div>
            <div className="signup__wrapper">
              <div className="signup__passwordText">Verification code</div>{" "}
              <input
                type="code"
                name="code"
                className="signup__passwordInput"
                ref={register({
                  required: "required",
                })}
              />
            </div>

            <button
              type="submit"
              bssize="large"
            >
              confirm
            </button>

            <div className="forget-password-message">
              <p>{errorMessageFromAWS}</p>
            </div>
          </form>
        </div>
      )}

    </>
  );
}
