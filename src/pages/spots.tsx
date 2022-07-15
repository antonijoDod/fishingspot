import React from "react";
import { Routes, Route } from "react-router-dom";
import Map from "pages/map";

const Spots = () => {
  return (
    <Routes>
      <Route index element={<Map />} />
    </Routes>
  );
};

export default Spots;
