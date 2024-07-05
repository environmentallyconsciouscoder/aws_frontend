import React, { useRef, useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { updateLiveFeedContent } from "../../../../api.js";
import { LiveFeedContext } from "../../../../contexts/live-feed-context";

import "./public-live-feed.css";
import { s3Upload } from "./file-uploader";
import SurveyGraph from "./live-feed-graph";

// import { Storage } from "aws-amplify";

export default function PublicLiveFeed() {
  const file = useRef(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [content, setContent] = useState("");
  const [surveyOneContent, setSurveyOneContent] = useState("");
  const [surveyTwoContent, setSurveyTwoContent] = useState("");
  const [surveyThreeContent, setSurveyThreeContent] = useState("");
  const [surveyFourContent, setSurveyFourContent] = useState("");

  const {
    siteName,
    companyName,
    companyId,

    introduction,
    surveyOne,
    surveyTwo,
    surveyThree,
    surveyFour
  } = useContext(LiveFeedContext);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  useEffect(() => {
    setContent(introduction)
    setSurveyOneContent(surveyOne)
    setSurveyTwoContent(surveyTwo)
    setSurveyThreeContent(surveyThree)
    setSurveyFourContent(surveyFour)

    // async function onLoad() {
    //   try {
    //     const attachmentLink = "1640617186006-fxpluslogo.jpeg"
    //     const imageFile = await Storage.vault.get(attachmentLink);
    //     console.log("imageFile",imageFile)

    //   } catch (e) {
    //     console.log("imageFile e",e)
    //   }
    // }

    // onLoad();

  },[introduction, surveyOne, surveyTwo, surveyThree, surveyFour])

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > 5000000) {
      alert(
        `Please pick a file smaller than ${
          5000000 / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const logoURL = file.current ? await s3Upload(file.current) : null;
      // console.log("logoURL",logoURL);
      updateLiveFeedContent({content: content, logoURL: logoURL, surveyOneContent:surveyOneContent, surveyTwoContent:surveyTwoContent,surveyThreeContent:surveyThreeContent,surveyFourContent:surveyFourContent},siteName, companyName, companyId)

      history.push("/dashboard");

    } catch (e) {
      setIsLoading(false);
    }
  }

  const handleChange = (e, type) => {
    // console.log("e",e.target.value)
    const newContent = e.target.value;
    if (type == "intro") {
      setContent(newContent);
    } else if (type == "surveyOneContent"){
      setSurveyOneContent(newContent)
    } else if (type == "surveyTwoContent"){
      setSurveyTwoContent(newContent)
    } else if (type == "surveyThreeContent"){
      setSurveyThreeContent(newContent)
    } else if (type == "surveyFourContent"){
      setSurveyFourContent(newContent)
    }
  };

  return (
    <div className="contentManagement" style={{
      width: "100%",
      height: "100%",
      // paddingTop: "15rem"
      padding: "15rem 1rem"
    }}>
      <div style={{
            display: "flex",
            height: "100%",
            width: "50%"
      }}>
        <div style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          // backgroundColor: "red"
        }}>

      <Form onSubmit={handleSubmit} className="contentManagement_form">
        <Form.Group controlId="content">
          <h2>Write your opening lines for the live feed below:</h2>
          <Form.Control
            value={content}
            // value={introduction}
            as="textarea"
            // onChange={(e) => setContent(e.target.value)}
            onChange={(e) => handleChange(e, "intro")}
          />
          <h2>Survey question 1</h2>
          <Form.Control
            value={surveyOneContent}
            as="textarea"
            // onChange={(e) => setSurveyOneContent(e.target.value)}
            onChange={(e) => handleChange(e, "surveyOneContent")}

          />
          <h2>Survey question 2</h2>
          <Form.Control
            value={surveyTwoContent}
            as="textarea"
            // onChange={(e) => setSurveyTwoContent(e.target.value)}
            onChange={(e) => handleChange(e, "surveyTwoContent")}

          />
          <h2>Survey question 3</h2>
          <Form.Control
            value={surveyThreeContent}
            as="textarea"
            // onChange={(e) => setSurveyThreeContent(e.target.value)}
            onChange={(e) => handleChange(e, "surveyThreeContent")}

          />
          <h2>Survey question 4</h2>
          <Form.Control
            value={surveyFourContent}
            as="textarea"
            // onChange={(e) => setSurveyFourContent(e.target.value)}
            onChange={(e) => handleChange(e, "surveyFourContent")}

          />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>Attachment (add company logo for live feed)</Form.Label>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <button>
            <h3>Submit</h3>
        </button>
      </Form>

        </div>
          <SurveyGraph />
      </div>
    </div>
  );
}