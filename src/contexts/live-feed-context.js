import React, { createContext, useEffect, useState} from 'react'
import { getLiveFeedContent, filterLiveFeedContent } from "../api";

import { getCurrentWeekNumberInTheYear } from "./../helper.js"

export const LiveFeedContext = createContext()

const LiveFeedContextProvider = props => {

  const [siteName, setSiteName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [companyId, setCompanyId] = useState("")

  const [introduction, setIntroduction] = useState("")
  const [surveyOne, setSurveyOne] = useState("")
  const [surveyTwo, setSurveyTwo] = useState("")
  const [surveyThree, setSurveyThree] = useState("")
  const [surveyFour, setSurveyFour] = useState("")

  const [dataForGraph, setDataForGraph] = useState("")
  const [maxValue, setMaxValue] = useState("")
  const [numberOfWeeks, setNumberOfWeeks] = useState("")
  const [questions, setQuestions] = useState([])
  const [sampleTotal, setSampleTotal] = useState("")
  const [weekCommence, setWeekCommence] = useState("")
  const [allWeeksOfTheYear, setAllWeeksOfTheYear] = useState("")
  const [index, setIndex] = useState("")

  useEffect(() => {

    // console.log("props",props);
    setSiteName(props.siteName);
    setCompanyName(props.companyName);
    setCompanyId(props.companyId);

    const date = new Date();
    const currentWeekNumberInTheYear = getCurrentWeekNumberInTheYear(date) - 1;

    if (props.siteName, props.companyName, props.companyId) {

      callLiveFeedContent(props.companyId, props.companyName, props.siteName, currentWeekNumberInTheYear);
      // console.log("currentWeekNumberInTheYear",date);
      // console.log("currentWeekNumberInTheYear",currentWeekNumberInTheYear);
      // filterLiveFeedContent(props.companyId, props.companyName, props.siteName, currentWeekNumberInTheYear).then((data) => {
      //   if (data.dataForGraph) {
      //     setDataForGraph(data.dataForGraph);
      //     setMaxValue(data.maxValue);
      //     setNumberOfWeeks(data.numberOfWeeks);
      //     setQuestions(data.questions);
      //     setSampleTotal(data.sampleTotal);
      //     setWeekCommence(data.weekCommence);
      //     setAllWeeksOfTheYear(data.allWeeksOfTheYear);
      //   }
      // });
    };

    if (props.siteName, props.companyName, props.companyId) {
      getLiveFeedContent(props.companyId, props.companyName, props.siteName).then((data) => {
        if (data[0] !== undefined) {
          const content = data[0][0];
          setIntroduction(content.openingContent)
          setSurveyOne(content.surveyQuestionOne)
          setSurveyTwo(content.surveyQuestionTwo)
          setSurveyThree(content.surveyQuestionThree)
          setSurveyFour(content.surveyQuestionFour)
        }
      });

    };

  }, [ props.siteName, props.companyName, props.companyId]);

  const callLiveFeedContent = (companyId, companyName, siteName, currentWeekNumberInTheYear) => {

    filterLiveFeedContent(companyId, companyName, siteName, currentWeekNumberInTheYear).then((data) => {

      if (data.dataForGraph) {
        setDataForGraph(data.dataForGraph);
        setMaxValue(data.maxValue);
        setNumberOfWeeks(data.numberOfWeeks);
        setQuestions(data.questions);
        setSampleTotal(data.sampleTotal);
        setWeekCommence(data.weekCommence);
        setAllWeeksOfTheYear(data.allWeeksOfTheYear);
        setIndex(data.index)
      }
    });
  };

  return (
    <LiveFeedContext.Provider
      value={{
        siteName,
        companyName,
        companyId,

        introduction,
        surveyOne,
        surveyTwo,
        surveyThree,
        surveyFour,

        dataForGraph,
        maxValue,
        numberOfWeeks,
        questions,
        sampleTotal,
        weekCommence,
        allWeeksOfTheYear,

        siteName,
        companyName,
        companyId,

        callLiveFeedContent,
        index
      }}
    >
      {props.children}
    </LiveFeedContext.Provider>
  )
}

export default LiveFeedContextProvider