// src/InputBox.js
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin: 20px;
`;

const Textarea = styled.textarea`
  width: 90%;
  height: 100px;
  padding: 10px;
  border: 1px solid gray;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

function InputBox({ isSubmit, onSubmit, onPdfDownload }) {
  const [code, setCode] = useState("");

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(code);
  };

  return (
    <Container>
      <Textarea
        style={{ border: "1px solid gray", borderRadius: "9px" }}
        placeholder="Enter code..."
        value={code}
        onChange={handleInputChange}
      />
      <div style={{ justifyContent: "space-between", marginTop: "1%" }}>
        <Button
          disabled={isSubmit}
          style={{ marginRight: "50px", borderRadius: "9px" }}
          onClick={handleSubmit}
        >
          Make documentation
        </Button>
        <Button style={{ borderRadius: "9px" }} onClick={onPdfDownload}>
          Download PDF
        </Button>
      </div>
    </Container>
  );
}

export default InputBox;
