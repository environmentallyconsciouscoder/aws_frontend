import React from 'react'

import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

import Switches from "../libs/use-switches";

export default function DisplaySettings() {

    const { handleChange, checked } = Switches()

    const useStyles = makeStyles({
        switchBase: {
          color: "grey",
          "&$checked": {
            color: "#81358A"
          },
          "&$checked + $track": {
            backgroundColor: "#81358A"
          }
        },
        checked: {},
        track: {}
    });

    const classes = useStyles();

    return (
        <div className="displaySettings">

            <div className="switchesWrapper">

                <h3 className="dashboard__reportMenu--fontSize applyPurpleColor cooperHewittBold marginBottomAndTopBy1rem">Hourly, Daily, Weekly and Monthly Graphs</h3>

                <div className="radio">
                    <label className="menuTitle--fontSize">
                    <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        size="small"
                        onChange={handleChange}
                        name="hourlyChartSwitch"
                        checked={checked.hourlyChartSwitch}
                        classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked
                        }}
                    />
                    <p className="cooperHewittBold">Hide Hourly Waste Report</p>
                    </label>
                </div>

                <div className="radio">
                    <label className="menuTitle--fontSize">
                    <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        size="small"
                        onChange={handleChange}
                        name="dailyChartSwitch"
                        checked={checked.dailyChartSwitch}
                        classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked
                        }}
                    />
                    <p className="cooperHewittBold">Hide Daily Waste Report</p>
                    </label>
                </div>

                <div className="radio">
                    <label className="menuTitle--fontSize">
                    <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        size="small"
                        onChange={handleChange}
                        name="wasteOnAdayOfTheWeekSwitch"
                        checked={checked.wasteOnAdayOfTheWeekSwitch}
                        classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked
                        }}
                    />
                    <p className="cooperHewittBold">Hide Waste On A Day Of The Week</p>
                    </label>
                </div>

                <div className="radio">
                    <label className="menuTitle--fontSize">
                    <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        size="small"
                        onChange={handleChange}
                        name="weeklyChartSwitch"
                        checked={checked.weeklyChartSwitch}
                        classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked
                        }}
                    />
                    <p className="cooperHewittBold">Hide Weekly Waste Report</p>
                    </label>
                </div>

                <div className="radio">
                    <label className="menuTitle--fontSize">
                    <div>
                    <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        size="small"
                        onChange={handleChange}
                        name="monthlyChartSwitch"
                        checked={checked.monthlyChartSwitch}
                        classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked
                        }}
                    />
                        <p className="cooperHewittBold">Hide Monthly Waste Report</p>
                    </div>
                    </label>
                </div>

                <h3 className="dashboard__reportMenu--fontSize applyPurpleColor cooperHewittBold marginBottomAndTopBy1rem">Correlated Graphs</h3>

                <div className="radio">
                    <label className="menuTitle--fontSize">
                    <div>
                    <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        size="small"
                        onChange={handleChange}
                        name="wastePerSalesSwitch"
                        checked={checked.wastePerSalesSwitch}
                        classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked
                        }}
                    />
                        <p className="cooperHewittBold">Hide Waste per Sales Report</p>
                    </div>
                    </label>
                </div>

                <div className="radio">
                    <label className="menuTitle--fontSize">
                    <div>
                    <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        size="small"
                        onChange={handleChange}
                        name="wastePerCoverSwitch"
                        checked={checked.wastePerCoverSwitch}
                        classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked
                        }}
                    />
                        <p className="cooperHewittBold">Hide Waste per Cover Report</p>
                    </div>
                    </label>
                </div>

                <div className="radio">
                    <label className="menuTitle--fontSize">
                    <div>
                    <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        size="small"
                        onChange={handleChange}
                        name="dailySalesVsWasteReportSwitch"
                        checked={checked.dailySalesVsWasteReportSwitch}
                        classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked
                        }}
                    />
                        <p className="cooperHewittBold">Hide Daily Sales Vs Waste Report</p>
                    </div>
                    </label>
                </div>

                <h3 className="dashboard__reportMenu--fontSize applyPurpleColor cooperHewittBold marginBottomAndTopBy1rem">Food Waste Forecast</h3>

                <div className="radio">
                    <label className="menuTitle--fontSize">
                    <div>
                    <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        size="small"
                        onChange={handleChange}
                        name="aiPredictionSwitch"
                        checked={checked.aiPredictionSwitch}
                        classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked
                        }}
                    />
                        <p className="cooperHewittBold">Hide Ai Prediction Report</p>
                    </div>
                    </label>
                </div>

                <h3 className="dashboard__reportMenu--fontSize applyPurpleColor cooperHewittBold marginBottomAndTopBy1rem">Food Waste Targets</h3>

                <div className="radio">
                    <label className="menuTitle--fontSize">
                    <div>
                    <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        size="small"
                        onChange={handleChange}
                        name="foodWasteTargetSwitch"
                        checked={checked.foodWasteTargetSwitch}
                        classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked
                        }}
                    />
                        <p className="cooperHewittBold">Hide Food Waste Target Report</p>
                    </div>
                    </label>
                </div>

                <h3 className="dashboard__reportMenu--fontSize applyPurpleColor cooperHewittBold marginBottomAndTopBy1rem">Total Food Waste</h3>

                <div className="radio">
                    <label className="menuTitle--fontSize">
                    <div>
                    <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        size="small"
                        onChange={handleChange}
                        name="totalSiteWasteSwitch"
                        checked={checked.totalSiteWasteSwitch}
                        classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked
                        }}
                    />
                        <p className="cooperHewittBold">Hide Total Site Waste Report</p>
                    </div>
                    </label>
                </div>

                <h3 className="dashboard__reportMenu--fontSize applyPurpleColor cooperHewittBold marginBottomAndTopBy1rem">Food Waste Trends</h3>

                <div className="radio">
                    <label className="menuTitle--fontSize">
                    <div>
                    <Switch
                        focusVisibleClassName={classes.focusVisible}
                        disableRipple
                        size="small"
                        onChange={handleChange}
                        name="weeklyWasteTrendSwitch"
                        checked={checked.weeklyWasteTrendSwitch}
                        classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked
                        }}
                    />
                        <p className="cooperHewittBold">Hide Weekly Waste Trend Report</p>
                    </div>
                    </label>
                </div>


            </div>

        </div>
    )
}
