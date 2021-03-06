import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { routeNames, routes } from "./routeNames";
import InfinityApp from "~/app/Infinity";
import { HomePage } from "~/app/pages";

const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routeNames._base_} element={<InfinityApp />}>
          <Route path={routeNames.home._base_} element={<HomePage />} />
          <Route path={routeNames._base_} element={<Navigate to={routes.home} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
