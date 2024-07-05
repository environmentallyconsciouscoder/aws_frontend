import React, { useState } from "react";
import SideDrawer from "./side-drawer";
import Backdrop from "./back-drop";
import Logo from "../../../image/green_kode.svg";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

import {
  formatSiteName,
  calculateTodaysDate,
  splitCamelCaseStringAndMakeFirstCharacterUpperCase
} from "../../../utilities.js"

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [appState, changeState] = useState({
    activeObject: { id: 2, val: "kilograms", name: "Kg" },
    objects: [
      { id: 1, val: "pounds", name: "£" },
      { id: 2, val: "Kilograms", name: "Kg" },
    ],
  });

  function toggleActive(index) {
    changeState({ ...appState, activeObject: appState.objects[index] });
  }

  function toggleActiveStyles(index) {
    if (appState.objects[index].id === appState.activeObject.id) {
      return "active";
    } else {
      return "inactive";
    }
  }

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  async function handleLogout() {
    await Auth.signOut();
    // localStorage.clear();
    // window.sessionStorage.clear();
    props.appProps.userHasAuthenticated(false);
  }

  const menu = (
    <>
      {" "}
      {props.appProps.isAuthenticated ? (
        <ul className="nav-links">

          <div className="menu">

            <div className="menu__poundsKgWrapper">
              <div className="menu__poundsKgTitle">Industry Average (£2.775/Kg) converter:</div>
              <div className="menu__poundsKgIcons">
                {appState.objects.map((data, index) => (
                  <li
                    className={toggleActiveStyles(index)}
                    id={data.id}
                    onClick={() => {
                      toggleActive(index);
                    }}
                    key={index}
                  >
                    <div className="menu__icon" className={toggleActiveStyles(index) === "active" ? "makeBold":"dontMakeBold"} id={data.val} onClick={props.appProps.kgPoundsConverter}>
                      {data.name}
                    </div>
                  </li>
                ))}
              </div>
            </div>

            {/* <div className="displayOnMobile">
              <Link to="/settings">Set Targets</Link>
            </div> */}

            <div>
              <li>
                <div className="logout-button" onClick={handleLogout}>
                  <div className="logout__menuName">
                    Logout
                  </div>
                </div>
              </li>
            </div>

          </div>

        </ul>
      ) : (
        <ul className="nav-links">
          <li>
            <a href="https://greenkode.net/">
              <div>
                Homepage
              </div>
            </a>
          </li>
        </ul>
      )}
    </>
  );

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">{menu}</nav>
      </SideDrawer>
      <header className="main-header">
        <button
          className={props.showHamburgerButton ? "main-navigation__menu-btn" : "displayNone" }
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>

        <div>

          <Link to="/dashboard">
            <img className="company-logo" src={Logo} alt="logo" />
          </Link>

          {props.appProps.isAuthenticated &&
          <div className="dashboard__overviewSites--positioning hideOnMobile">
            <div className="dashboard__date__user dashboard__userInformationWrapper cooperHewittBold">
                <div className="dashboard__userDateNameAndUserType cooperHewittBold">
                    {calculateTodaysDate()}
                  <div className="dashboard__date__user__type cooperHewittBold">
                    {props.userDetail.typeOfUser}
                  </div>
                  <div className="dashboard__date__user__name cooperHewittBold">
                    Welcome back
                    {" "}
                    {props.userDetail.fullName}
                  </div>
                </div>
              <div className="dashboard__companyName">
                {splitCamelCaseStringAndMakeFirstCharacterUpperCase(props.userDetail.companyname)}
                <div style={{
                  margin: "0 0 0 1rem"
                }}>
                  {formatSiteName(props.siteName)}
                </div>
              </div>
            </div>
          </div>
          }

        </div>

        <nav className="main-navigation__header-nav"> {menu}</nav>
      </header>
    </>
  );
};

export default MainNavigation;
