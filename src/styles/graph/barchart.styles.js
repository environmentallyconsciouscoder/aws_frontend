import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 0px auto;
  max-width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 220px;
  overflow-x: scroll;
`;

export const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  ${({ isGap }) => isGap && `
    margin-right: 1rem;
  `}
`;

export const Chart = css`
  margin-top: 10px;
  /* width: 0.3rem; */
  width: 0.5rem;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 992px) {
    width: 0.7rem;
  }
  @media (max-width: 768px) {
    width: 0.3rem;
  }
`;

export const Number = styled.span`
  /* width: 23px; */
  width: 30px;
  font-size: 0.7rem;
  text-align: center;
  color: ${(props) => props.color};
`;

export const MakeBar = styled.div`
  height: ${(props) => props.height}%;
  background-color: ${(props) => props.color};
  ${Chart};
`;

export const BlackLine = styled.div`
  width: 100%;
  height: 5px;
  background-color: grey;
`;
