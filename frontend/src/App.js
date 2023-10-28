// src/App.js
import React, { useState } from "react";
import InputBox from "./InputBox";
import Header from "./Header";
import MarkdownPreview from "./MarkdownPreview";
import styled from "styled-components";
import axios from "axios";
import {
  Autocomplete,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";

const Container = styled.div`
  text-align: left !important;
`;

const top100Films = [
  { label: "Technical POV", year: 0.2 },
  { label: "Basic", year: 0.6 },
  { label: "Creative", year: 1 },
];

function App() {
  const [response, setResponse] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [pdfLink, setPdfLink] = useState("");
  const [text, setText] = useState("");
  const [accuray, setAccuracy] = useState({ label: "Basic", year: 0.6 });

  const handleAccuracy = (evt, value) => {
    setAccuracy(value);
  };

  const sendRequest = async (code) => {
    try {
      // Simulate a request to a Markdown API (using JSONPlaceholder as an example)
      setText("Converting into Document!!");
      setIsSubmit(true);
      setPdfLink("");
      const response = await axios.post(
        `http://showy.pro:6969/api/v1/documentation?accuracyFactor=${accuray.year}`,
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
    setText("Creating pdf!!");
    setIsSubmit(true);
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
  };
  if (pdfLink) {
    window.open(pdfLink, "_blank");
  }

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
          <div
            style={{ width: "75%", margin: "20px 13%" }}
            className="flex flex-1 flex-col items-center justify-center"
          >
            <Typography className="text-20 mb-16" color="textSecondary">
              Converting Into documentation
            </Typography>
            <LinearProgress style={{ color: "blue" }} className="w-xs" />
          </div>
        ) : (
          <MarkdownPreview response={response} pdfLink={pdfLink} />
        )}
      </div>
    </Container>
  );
}

export default App;
