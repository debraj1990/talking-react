import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { Provider } from 'react-redux';
// import store from '../store';
// import Issuelisting from "./issue-listing/IssueListing";
import App from "./app/App";
import NotFound from "./NotFound";
// import IssueDetail from "./issue-detail/IssueDetail";

const Router = () => (
  // <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />{/* exact*/}
        {/* No routes after this */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </BrowserRouter>
  // </Provider>
);

export default Router;
