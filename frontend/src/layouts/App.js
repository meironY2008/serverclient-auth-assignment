import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Login from "layouts/Login";
import Register from "layouts/Register";
import axios from "axios";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();


function App() {
  const isLogged = useSelector((state) => state.isLogged);
  const token = useSelector((state) => state.tokenProducer);
  const dispach = useDispatch();
  return (
    <Router history={hist}>
      <Switch>
        {isLogged ? (
          <>
            <Route path="/admin" component={Admin} />
            <Route path="/rtl" component={RTL} />
            <Redirect from="/" to="/admin/dashboard" />
          </>
        ) : (
          <>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect from="/" to="/login" />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
