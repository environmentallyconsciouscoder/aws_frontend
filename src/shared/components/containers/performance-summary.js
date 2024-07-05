import React, { useContext, useState, useEffect } from "react";

import { PerformanceSummaryContext } from "../../../contexts/performance-summary-context.js";

export default function PerformanceSummary() {

    const {
        // bestWasteWeeks,
        costOfFoodDisposal,
        lastMonthSpendOnFoodWaste,
        lastWeek,
        numberOfMealsLost,

        wastePerCover,
        wastePerSales,

        lastWeekDate,
        lastWeekSales,
        lastWeekCovers,

        totalCo2Contributions,

        averageWasteWeeks,
        averageWasteWeeksDate,
        averageWasteWeeksSales,
        averageWasteWeeksCovers,

        lastWastePerCover,
        lastWastePerSales
      } = useContext(PerformanceSummaryContext)

      useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <div
            className="performanceSummary"
        >
            <div
                className="performanceSummary_section"
            >
                <div
                    className="performanceSummary_item performanceSummary-border-style"
                >
                    <div className="applyBlueTuckGreen cooperHewittBold">LAST MONTH SPEND ON FOOD WASTE</div>
                    <div className="applyBlueTuckGreen fontSize12px">( lost of food + labour + utilities + municipal disposal cost )</div>
                    <div className="performanceSummary_value">£ {lastMonthSpendOnFoodWaste}</div>
                </div>
                <div
                    className="performanceSummary_item performanceSummary-border-style"
                >
                    <div className="applyBlueTuckGreen cooperHewittBold">TOTAL MUNICIPAL COST OF FOOD DISPOSAL</div>
                    <div className="performanceSummary_value">£ {costOfFoodDisposal}</div>
                </div>
                <div
                    className="performanceSummary_item performanceSummary-border-style"
                >
                    <div className="applyBlueTuckGreen cooperHewittBold">TOTAL NUMBER OF MEALS LOST</div>
                    <div className="performanceSummary_value">{numberOfMealsLost}</div>
                </div>
            </div>

            <div
                className="performanceSummary_section"
            >
                <div
                    className="performanceSummary_item performanceSummary-border-style"
                >
                    <div className="applyBlueTuckGreen cooperHewittBold">TOTAL ENVIRONMENTAL IMPACT</div>
                    <div className="performanceSummary_value">{totalCo2Contributions} Kg of CO2</div>
                </div>
                <div
                    className="performanceSummary_item"
                >
                    <div className="applyBlueTuckGreen cooperHewittBold">AVERAGE WASTE WEEK</div>
                    <div style={{
                        fontSize: "12px"
                    }}>
                        <div className="applyPurpleColor">TOTAL WASTE {averageWasteWeeks} Kg</div>
                        <div className="applyPurpleColor">w/c {averageWasteWeeksDate}</div>
                        <div className="applyPurpleColor">SALES {averageWasteWeeksSales}</div>
                        <div className="applyPurpleColor">PEOPLE {averageWasteWeeksCovers}</div>
                        <div className="applyPurpleColor">WASTE PER COVER {wastePerCover}</div>
                        <div className="applyPurpleColor">WASTE PER SALES {wastePerSales}</div>
                    </div>
                </div>
                <div
                    className="performanceSummary_item performanceSummary-border-style"
                >
                    <div className="applyBlueTuckGreen cooperHewittBold">LAST WEEK</div>
                    <div style={{
                        fontSize: "12px"
                    }}>
                        <div className="applyPurpleColor">TOTAL WASTE {lastWeek} Kg</div>
                        <div className="applyPurpleColor">w/c {lastWeekDate}</div>
                        <div className="applyPurpleColor">SALES {lastWeekSales}</div>
                        <div className="applyPurpleColor">PEOPLE {lastWeekCovers}</div>
                        <div className="applyPurpleColor">WASTE PER COVER {lastWastePerCover}</div>
                        <div className="applyPurpleColor">WASTE PER SALES {lastWastePerSales}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}