import { Typography } from "@mui/material";
import React, { useEffect } from "react";


function Home() {

  return (
    <div className="page__content">
      <Typography variant="h3" gutterBottom component="div">
        Welcome!
      </Typography>
      <Typography variant="h6" gutterBottom component="div">
        Please select the action you want to do from the menu.
      </Typography>
    </div>
  );
}

export default Home;
