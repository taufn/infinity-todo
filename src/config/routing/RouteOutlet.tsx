import React from "react";
import { Outlet } from "react-router-dom";

const RouteOutlet: React.FC = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default RouteOutlet;
