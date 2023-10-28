// src/App.js
import React, { useState } from "react";
import InputBox from "./InputBox";
import Header from "./Header";
import MarkdownPreview from "./MarkdownPreview";
import styled from "styled-components";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import Loader from "./Loader";

const Container = styled.div`
  text-align: left !important;
`;

const top100Films = [
  { label: "Technical POV", factor: 0.2 },
  { label: "Basic", factor: 0.6 },
  { label: "Creative", factor: 1.0 },
];

function App() {
  const [response, setResponse] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [pdfLink, setPdfLink] = useState("");
  const [text, setText] = useState("");
  const [accuray, setAccuracy] = useState({ label: "Basic", factor: 0.6 });

  const handleAccuracy = (evt, value) => {
    setAccuracy(value);
  };

  const sendRequest = async (code) => {
    try {
      // Simulate a request to a Markdown API (using JSONPlaceholder as an example)
      setText("Creating Document!!");
      setIsSubmit(true);
      setPdfLink("");
      const response = await axios.post(
        `http://showy.pro:6969/api/v1/documentation?accuracyFactor=${accuray.factor}`,
        code,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain",
          },
        }
      );
      setIsSubmit(false);
      setResponse(response?.data); // Assuming the API response contains Markdown data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const downloadPDF = async () => {
    if (!isSubmit) {
      // Add a condition to prevent multiple calls
      setText("Creating pdf!!");
      setIsSubmit(true);

      try {
        const pdflink = await axios.post(
          "http://showy.pro:6969/api/v1/to-pdf",
          response,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "text/plain",
            },
          }
        );

        setIsSubmit(false);
        setPdfLink(`http://${pdflink.data}`);

        // Open the PDF link in a new window
        window.open(`http://${pdflink.data}`, "_blank");
      } catch (error) {
        // Handle any errors that may occur during the request
        console.error("Error creating PDF:", error);
        setIsSubmit(false);
      }
    }
  };

  return (
    <Container>
      <Header />
      <div style={{ textAlign: "left !important", margin: "50px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "0px 5%",
            justifyContent: "space-between",
          }}
        >
          <h1>Kap-CodeSense</h1>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            style={{ marginLeft: "5%", marginTop: "2%" }}
            options={top100Films}
            value={accuray}
            size="small"
            onChange={handleAccuracy}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Accuracy" />
            )}
          />
        </div>
        <InputBox
          isSubmit={isSubmit}
          onSubmit={sendRequest}
          onPdfDownload={downloadPDF}
        />
        {isSubmit ? (
          <Loader text={text} />
        ) : (
          <MarkdownPreview response={response} pdfLink={pdfLink} />
        )}
      </div>
    </Container>
  );
}

export default App;
