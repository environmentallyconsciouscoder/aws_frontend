
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";

import useWindowDimensions from "../../../../libs/use-window-dimensions";

export default function SlackChart(props) {
  Chart.defaults.global.defaultFontFamily = "CooperHewitt-Book";

  let graphHeight = 130;
  let graphWidth = 400;

  const { width } = useWindowDimensions();

  if (width <= 700) {
    graphWidth = 260;
    graphHeight = 279;
  }

useEffect(() => {

// eslint-disable-next-line react-hooks/exhaustive-deps
},[props.chartData]);

  return (

          <Bar
            data={{
              labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
              datasets: props.chartData
            }}
            width={graphWidth}
            height={graphHeight}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              legend: {display: true},
              scales: {

                xAxes: [
                  {
                    stacked: true,
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                      fontColor: "rgb(15, 128, 140)",
                    },
                    display: false,
                  },
                ],
                yAxes: [
                  {
                    stacked: true,
                    display: false,
                    gridLines: {
                      display: false,
                    }
                  },
                ],
              },

              plugins: {
                datalabels: {
                  display: false,
                  anchor: "top",
                  align: "middle",
                //   color: monthlyWasteTextColor,
                  font: {
                          size: 9,
                          weight: "bold",
                        }
                },
              },
            }}
          />

  );
}

