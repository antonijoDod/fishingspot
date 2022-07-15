import React from "react";
import { Grid } from "@mui/material";
import { PlaceCard } from "components";

const Places = () => {
  return (
    <Grid container>
      <Grid item xs={6} md={3}>
        <PlaceCard />
      </Grid>
      <Grid item xs={6} md={3}>
        1
      </Grid>{" "}
      <Grid item xs={6} md={3}>
        1
      </Grid>{" "}
      <Grid item xs={6} md={3}>
        1
      </Grid>{" "}
      <Grid item xs={6} md={3}>
        1
      </Grid>{" "}
      <Grid item xs={6} md={3}>
        1
      </Grid>{" "}
      <Grid item xs={6} md={3}>
        1
      </Grid>{" "}
      <Grid item xs={6} md={3}>
        1
      </Grid>
    </Grid>
  );
};

export default Places;
