// src/App.js
import React from "react";
import { LinearProgress, Typography } from "@mui/material";

function Loader(text) {
  return (
    <div
      style={{ width: "75%", margin: "20px 13%" }}
      className="flex flex-1 flex-col items-center justify-center"
    >
      <Typography className="text-20 mb-16" color="textSecondary">
        {text}
      </Typography>
      <LinearProgress style={{ color: "blue" }} className="w-xs" />
    </div>
  );
}

export default Loader;
