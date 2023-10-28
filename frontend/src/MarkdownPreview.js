// src/MarkdownPreview.js
import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const Test = styled.div`
  margin: 3% 6%;
  text-align: left !important;
  width: 85%;
  padding: 2%;
  border: 2px solid gray;
  border-radius: 10px;
`;

function MarkdownPreview({ response }) {
  return (
    response && (
      <Test>
        <ReactMarkdown children={response} />
      </Test>
    )
  );
}

export default MarkdownPreview;
