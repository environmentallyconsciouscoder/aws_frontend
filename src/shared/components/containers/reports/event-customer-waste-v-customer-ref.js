import React, { useContext } from "react";
import { AccordionHeading, AccordionBody } from "../accordion";
import { formatSiteName } from "../../../../utilities.js";

import { Bar } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

import Subheadings from "../reuseable-components/labels/subheadings"

import { DashboardContext } from "../../../../contexts/dashboard-context.js";
import { IdCustomerWasteContext } from "../../../../contexts/id-customer-waste-context.js";

import Pagination from "./../reuseable-components/pagination/pagination.js"

import Switches from "../../libs/use-switches";

export default function EventCustomerWasteVcustomerRefReport(props) {

  const {
    showEventCustomerWasteVcustomerRef,
    setShowEventCustomerWasteVcustomerRef,
  } = Switches()

  const {
    siteName,
    companyName,
    // sitesID,
    companyID
  } = useContext(DashboardContext)

  const {
    xaxis,
    yaxis,
    eventName,
    date,
    sum,
    index,
    callIdCustomerWasteAPI
  } = useContext(IdCustomerWasteContext)

  const changePage = ({ selected }) => {
    // console.log("selected",selected)
    callIdCustomerWasteAPI(companyID, companyName, siteName, selected)
  };

  return (
    <div
    >
      <AccordionHeading color={"primPurpleBackgroundColor"}>
        <div className="section-title">EVENT CUSTOMER WASTE V CUSTOMER REF</div>
        <div className="container">
          <span
            onClick={() => {
              setShowEventCustomerWasteVcustomerRef(
                !showEventCustomerWasteVcustomerRef
              );
            }}
          >
            {showEventCustomerWasteVcustomerRef ? "X " : "| | | "}
          </span>
        </div>
      </AccordionHeading>

      <AccordionBody open={showEventCustomerWasteVcustomerRef}>
        <div className="originalTheme__reportBackgroundColor addPaddingOfHalveRem">

            <Subheadings
              site={formatSiteName(siteName)}
              title="Event Customer Waste v Customer Ref"
            />

            <div className="applyBlueTuckGreen cooperHewittBold"
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
                marginTop: "1rem"
              }}
            >
              <div>{date}</div>
              <div>{eventName}</div>
              <div>{sum} Kg</div>
            </div>

            <div className="applyBlueTuckGreen cooperHewittBold"
              style={{
                marginTop: "1rem",
                fontSize: "13px",
                marginLeft: "3rem"
              }}
            >
              Customer Waste Kg
            </div>

            <div className="dashboard__wrapperForGraph">
              <div
                style={{
                  width: "100%",
                  overflow: "auto"
                }}
              >

              <Bar
                    data={{
                        // labels: ["1","2","3","4","5","6","7","8","9","1","2","3","4","5","6","7","8","9","1","2","3","4","5","6","7","8","9"],
                      labels: xaxis,
                      datasets: [

                        {
                          // label: ["1","2","3","4","5","6","7","8","9"],
                          // data: [1,2,3,4,5,6,7,8,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                          data: yaxis,
                          backgroundColor: "rgb(133, 165, 101)",
                          minBarLength: 0.3,
                          categoryPercentage: 1.0,
                          barPercentage: 0.5
                        },

                      ],
                    }}
                    // width={graphWidth}
                    // height={graphHeight}
                    options={{

                      responsive: true,
                      maintainAspectRatio: true,
                      layout: {
                        padding: {
                            left: 25,
                            right: 25,
                            top: 10,
                            bottom: 10
                        }
                      },
                      scales: {
                        xAxes: [
                          {
                            display: true,
                            gridLines: {
                              display: false,
                            },
                            ticks: {
                              autoSkip: false,
                              fontSize: 7
                            },
                          },
                        ],
                        yAxes: [
                          {
                            gridLines: {
                              display: false,
                            },
                            ticks: {
                              maxTicksLimit: 4,
                              display: false,
                              beginAtZero: true,
                              // max: Math.max(yaxis)
                            },
                          },
                        ],
                      },

                      plugins: {
                        datalabels: {
                          display: true,
                          color: "rgb(47, 64, 30)",
                          anchor: "end",
                          align: "end",
                          clamp: true,
                          font: {
                            size: 5,
                            weight: 900,
                          },
                          offset: 4,
                        },

                      },

                      tooltips: {
                      enabled: true,
                      callbacks: {
                        label: function(tooltipItem, data) {
                          return tooltipItem.value;
                        }
                      }
                      }
                    }}
                />

               </div>
            </div>

            <div className="applyBlueTuckGreen cooperHewittBold"
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              Customer Code
            </div>

            <div className="applyBlueTuckGreen cooperHewittBold" style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem"
            }}>
              Scroll left to right to see all customers
            </div>

            <div style={{
              display: "flex",
              padding: "2rem",
              fontSize: "10px"
            }}>
              <Pagination index={0} onPageChange={changePage} pageCount={index} />
            </div>

        </div>
      </AccordionBody>
    </div>
  );
}