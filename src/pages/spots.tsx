import React from "react";
import { Routes, Route } from "react-router-dom";
import Map from "pages/map";
import Places from "pages/places";

const Spots = () => {
  return (
    <Routes>
      <Route index element={<Map />} />
    </Routes>
  );
};

export default Spots;
