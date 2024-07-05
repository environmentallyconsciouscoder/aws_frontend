import React from "react";
import { Switch } from "react-router-dom";

import Login from "./shared/components/containers/auth/login";
import Signup from "./shared/components/containers/auth/sign-up";
import Forgotpassword from "./shared/components/containers/auth/forgot-password";
import SignUpSuperAdmin from "./shared/components/containers/auth/sign-up-super-admin";

import Dashboard from "./shared/components/containers/dashboard";
import PublicLiveFeed from "./shared/components/containers/live-feeds/public-live-feed";

import AuthenticatedRoute from "./shared/components/containers/auth/authenticated-route";
import UnauthenticatedRoute from "./shared/components/containers/auth/unauthenticated-route";

import Settings from "./shared/components/containers/targets/targets-calculator";
import Capping from "./shared/components/containers/capping/add-capping";

import DailySalesVsWasteInputs from "./shared/components/containers/user-inputs/daily-sales-vs-waste-inputs";
import InputsList from "./shared/components/containers/user-inputs/inputs-list";
import Displays from "./shared/components/containers/display-settings";

import Inputs from "./shared/components/containers/user-inputs/inputs";
import coverInputs from "./shared/components/containers/user-inputs/cover-inputs";
import salesInputs from "./shared/components/containers/user-inputs/sales-inputs";
import ProductionPreparationInputs from "./shared/components/containers/user-inputs/production-preparation-inputs";

import CompanySelector from "./shared/components/containers/company-selector";

export default function Routes({ appProps }) {

  return (
    <Switch>

      <UnauthenticatedRoute
        path="/forgotpassword"
        exact
        component={Forgotpassword}
        appProps={appProps}
      />

      <AuthenticatedRoute
        path="/dashboard"
        exact
        component={Dashboard}
        appProps={appProps}
      />

      <UnauthenticatedRoute
        path="/"
        exact
        component={Login}
        appProps={appProps}
      />

      {appProps.userType === "greenkodeUser" ?
        <AuthenticatedRoute
          path="/signupsuperadmin"
          exact
          component={SignUpSuperAdmin}
          appProps={appProps}
        /> : null}

      {appProps.userType !== "admin" && appProps.userType !== "user" ?
        <AuthenticatedRoute
          path="/signup"
          exact
          component={Signup}
          appProps={appProps}
        /> : null}

      {appProps.userType !== "user" ?
        <AuthenticatedRoute
          path="/settings"
          exact
          component={Settings}
          appProps={appProps}
        />
        : null}

      {appProps.userType !== "user" ?
        <AuthenticatedRoute
          path="/capping"
          exact
          component={Capping}
          appProps={appProps}
        />
        : null}

      <AuthenticatedRoute
        path="/inputs"
        exact
        component={Inputs}
        appProps={appProps}
      />

      <AuthenticatedRoute
        path="/coverInputs"
        exact
        component={coverInputs}
        appProps={appProps}
      />

      <AuthenticatedRoute
        path="/salesInputs"
        exact
        component={salesInputs}
        appProps={appProps}
      />

      <AuthenticatedRoute
        path="/dailySalesVsWasteInputs"
        exact
        component={DailySalesVsWasteInputs}
        appProps={appProps}
      />

      <AuthenticatedRoute
        path="/inputsList"
        exact
        component={InputsList}
        appProps={appProps}
      />

      <AuthenticatedRoute
        path="/setDisplays"
        exact
        component={Displays}
        appProps={appProps}
      />

      <AuthenticatedRoute
        path="/CompanySelector"
        exact
        component={CompanySelector}
        appProps={appProps}
      />

      <AuthenticatedRoute
        path="/liveFeed"
        exact
        component={PublicLiveFeed}
        appProps={appProps}
      />

      <AuthenticatedRoute
        path="/ProductionPreparationInputs"
        exact
        component={ProductionPreparationInputs}
        appProps={appProps}
      />

    </Switch>
  );
}