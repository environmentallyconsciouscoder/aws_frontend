import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import Footer from "../../navigation/footer";

import useSpinner from "../../libs/use-spinner";

const initialFormState = {
  username: '', password: '', email: '', authCode: '', formType: 'signIn'
}

export default function Login(props) {
  const [formState, updateFormState] = useState(initialFormState)

  function onChange(e) {
    e.persist()
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }))
  }
  const { formType } = formState

  const [errorMessage, setErrorMessage] = useState(false);
  const [spinner, showSpinner, hideSpinner] = useSpinner();

  async function signIn() {

    const { username, password } = formState
    showSpinner()

    try {

      const result = await Auth.signIn(username, password)

      if (result) {
        hideSpinner()

        const usersEmail = Auth.user.attributes.email;
        const companyName = Auth.user.attributes["custom:company"];
        const companyId = Auth.user.attributes["custom:companyId"];

        const userGroups = Auth.user.signInUserSession.accessToken.payload["cognito:groups"];
        const name = Auth.user.attributes["name"];
        // const noOfUsers = Auth.user.attributes["custom:NumberOfUsersCreated"] ? Auth.user.attributes["custom:NumberOfUsersCreated"]: 6;
        const noOfUsers = Auth.user.attributes["custom:NumberOfUsersSix"] ? Auth.user.attributes["custom:NumberOfUsersSix"] : 6;


        const checkIfUserHasPermissionToAccessDashboard = userGroups.filter((data) => {
          return data === "admin" || data === "greenkodeUser" || data === "superAdmin" || data === "user"
        })

        const greenkodeUser = userGroups.find(element => element === "greenkodeUser");
        const admin = userGroups.find(element => element === "admin");
        const superAdmin = userGroups.find(element => element === "superAdmin");
        const user = userGroups.find(element => element === "user");

        const typeOfUser = greenkodeUser ? greenkodeUser : superAdmin ? superAdmin : admin ? admin : user ? user : user;

        if (typeOfUser === "superAdmin" || typeOfUser === "admin" || typeOfUser === "user") {

          if (companyName !== undefined) {

            if (checkIfUserHasPermissionToAccessDashboard.length === 0) {

              await Auth.signOut();

            } else {

              const userDetails = {
                companyname: companyName,
                email: usersEmail,
                fullName: name,
                typeOfUser: typeOfUser
              };

              props.saveUserType(typeOfUser)
              props.getUserDetails(userDetails);
              props.getNoOfUsersCreated(noOfUsers);
              props.userHasAuthenticated(true);

              props.getAllData(companyName, usersEmail, userDetails, companyId);
              // props.getAllData(companyName, userDetails);
            }

          }
        } else {
          props.userHasAuthenticated(true);
          props.saveUserType(typeOfUser)
        }

      }

    } catch (e) {
      console.log("e", e)

      let message;

      if (e.code === "UserNotConfirmedException" || e.code === "NotAuthorizedException") {
        message = e.message;
      } else {
        message = "An error occurred while logging in, please re-enter again";
      }

      setErrorMessage(message)
      hideSpinner()
    }

  }


  return (

    <>
      {spinner}
      {
        formType === 'signIn' && (
          <div className="login">

            <div className="login__form">
              <div controlid="email" bssize="large" className="login__wrapper">
                <div className="login__email--colorAndSpacing">
                  <h3>Email</h3>
                </div>{" "}
                <input name="username" onChange={onChange} placeholder="username" className="login__emailInput" />
              </div>
              <div controlid="password" bssize="large" className="login__wrapper">
                <div className="login__password--colorAndSpacing">
                  <h3>Password</h3>
                </div>{" "}
                <input name="password" type="password" onChange={onChange} placeholder="password" className="login__passwordInput" />
              </div>
              <button onClick={signIn}>
                <h3>Sign in</h3>
              </button>
              <div className="login__links">
                <Link className="login__linksForgotpassword" to="forgotpassword">Forgot Password</Link>
              </div>
              <div className="warning-message">{errorMessage}</div>
            </div>

            <div className="login__heading">
              <div className="login__heading--size">
                "The Hospitality <br />
                sector can make a <br /> profit of £7 for every <br /> £1 they
                invest in
                <br /> cutting food waste, a<br /> global report reveals"
                <p className="login__headingReference">
                  https://champions123.org/the-business-case-for-reducing-food-loss-and-waste/
                </p>
              </div>
            </div>
          </div>
        )
      }

      <Footer
        message={"Working towards a circular economy in waste management"}
      />

    </>

  );
}

