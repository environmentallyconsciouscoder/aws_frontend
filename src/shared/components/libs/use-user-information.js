import React, { useState } from "react";

import {
  updateUsersLoginTime,
  getLoginTimeFromUsers
} from "../../../api";

const UsersInformation = () => {

  /// user related information
  const [userType, setUserType] = React.useState("greenkodeUser");
  const [userDetail, setUserDetail] = useState("");
  const [noOfUsers, setNoOfUsers] = useState(0);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [superAdminCreatedUsers, setSuperAdminCreatedUsers] = React.useState([]);

  const saveUserType = (data) => {
    // setUserType(data[0])
    setUserType(data)
  }

  let getUserDetails = (data) => {
    // console.log("getUserDetails",data)
    setUserDetail(data);
  };

  const getNoOfUsersCreated = (noOfUsers) => {
    //   console.log("noOfUsers",noOfUsers)
    let formatedIntoNumber = parseInt(noOfUsers)
    setNoOfUsers(formatedIntoNumber)
  }

  const saveLoginTime = (userDetails, companyID) => {
    const date = new Date();
    const time = date.toLocaleString('en-GB', { timeZone: 'Europe/London' })
    updateUsersLoginTime(userDetails, companyID, time)
  }

  const getTheLoginTimeFromUsers = (id, companyName) => {
    getLoginTimeFromUsers(id, companyName).then((data) => {
      setSuperAdminCreatedUsers(data[0].superAdminCreatedUsers)
    })
  }

  return {
    saveUserType,
    getUserDetails,
    getNoOfUsersCreated,

    userType,
    userDetail,
    noOfUsers,

    isAuthenticated,
    userHasAuthenticated,

    saveLoginTime,
    getTheLoginTimeFromUsers,
    superAdminCreatedUsers
  }

}

export default UsersInformation
