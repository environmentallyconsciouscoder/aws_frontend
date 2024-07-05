import React from "react";
import {
  MainContainer,
  Container,
  BarChartContainer,
  Number,
  BlackLine,
  MakeBar
} from "./style";

export default function BarChart(props) {


    // console.log("props",props)

  return (
    <Container>
      <MainContainer>
        {props.data.map(({ value, colors }, i) => {

          const formatNum = ( value / 1000 ) * 100;
          {/* console.log("formatNum",formatNum) */}

          return (
            <BarChartContainer key={i}>
              <Number color={colors[1]}>{props.showPounds ? "£" + (value * 2.5).toFixed(0) : value.toFixed(2) + "kg"}</Number>
              <MakeBar height={formatNum} colors={colors} />
            </BarChartContainer>
          );
        })}
      </MainContainer>
      <BlackLine />
    </Container>
  );
}