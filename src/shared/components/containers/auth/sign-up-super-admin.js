import React, { useState } from "react";
import {
  faAsterisk,
  // faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../navigation/footer";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

import {
  addToGroup,
} from "../../../../api";

export default function SignUpSuperAdmin(props) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessageFromAWS, setErrorMessageFromAWS] = useState("");

  const [stage, setStage] = useState(1);

  async function submit(values) {

    console.log("values.email",values)

    const username = values.email;
    const phone = values.phone;
    const password = "PassW0rd!"
    const name = values.name;
    const company = values.company;
    const companyId = props.companyID;

    const signUpInformation = {
      username,
      password,
      attributes: {
          name: name,
        "custom:company": company,
        "custom:NumberOfUsersSix": "0",
        "custom:companyId": companyId,
        "custom:smsAlerts": "true",
        "custom:emailAlerts": "true",
        "custom:mobile": phone
      },
    };

    try {

      console.log("signUpInformation",signUpInformation)

      await Auth.signUp(signUpInformation);
      await addToGroup(username, "superAdmin")

      setStage(2);
    } catch (error) {
      setErrorMessageFromAWS(error.message);
      console.log("error signing up:", error);
    }
  }

  async function confirmSignUp(values) {
    const username = values.email;
    const code = values.code;

    try {
      await Auth.confirmSignUp(username, code).then(() => {
        props.history.push("/login");
      });
    } catch (error) {
      setErrorMessageFromAWS(error.message);
    }
  }

  return (
    <>
      {stage === 1 && (
        <div className="signup">
          <form onSubmit={handleSubmit(submit)} className="signup__form">
            {/* <div className="signup__heading--style">
              Sign up up maximum of 3 users
            </div> */}

            <div className="signup__wrapper">
              <div className="signup__emailText">Email (Username)</div>{" "}
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
              ) : (
                <FontAwesomeIcon icon={faAsterisk} />
              )}
            </div>


            <div className="signup__wrapper">
              <div className="signup__passwordText">Full Name</div>{" "}
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
              ) : (
                <FontAwesomeIcon icon={faAsterisk} />
              )}{" "}
            </div>

            <div className="signup__wrapper">
              <div className="signup__passwordText">Company Name</div>{" "}
              <input
                type="company"
                name="company"
                className="signup__passwordInput"
                ref={register({
                  required: "required",
                  maxLength: 20,
                })}
              />
              {errors.company ? (
                <p>{errors.company.message} </p>
              ) : (
                <FontAwesomeIcon icon={faAsterisk} />
              )}{" "}
            </div>

            <div className="signup__wrapper">
              <div className="signup__passwordText">Mobile number</div>{" "}
              <input
                // type="number"
                name="phone"
                className="signup__passwordInput"
                ref={register({
                  required: "required",
                  maxLength: 20,
                })}
              />
              {errors.company ? (
                <p>{errors.company.message} </p>
              ) : (
                <FontAwesomeIcon icon={faAsterisk} />
              )}{" "}
            </div>

            <div className="signup__wrapper">
              <div className="signup__passwordText">company ID</div>{" "}
              <input
                name="companyID"
                className="signup__passwordInput"
                ref={register({
                  required: "required",
                  maxLength: 20,
                })}
              />
              {errors.company ? (
                <p>{errors.company.message} </p>
              ) : (
                <FontAwesomeIcon icon={faAsterisk} />
              )}{" "}
            </div>

            <button
              type="submit"
              onClick={submit}
            >
              Sign up
            </button>

            <div className="forget-password-message">
              <p>{errorMessageFromAWS}</p>
            </div>
          </form>
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

       {/* <Footer
        message={
          "Our partners estimated that we can save them 30% on total cost on food waste"
        }
      /> */}
    </>
  );
}
