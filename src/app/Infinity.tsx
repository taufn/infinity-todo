import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import "html5-boilerplate/dist/css/normalize.css";

import "./index.css";
import "./uikit/tokens/style.css";

const InfinityApp: React.FC = () => {
  return (
    <React.Fragment>
      <HelmetProvider>
        <Outlet />
      </HelmetProvider>
    </React.Fragment>
  );
};

export default InfinityApp;
