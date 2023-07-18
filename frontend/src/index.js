import React from 'react';
import { createRoot, render } from 'react-dom'; // Import the `render` function
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/argon-dashboard-react.scss';

import AdminLayout from 'layouts/Admin.js';
import Login from 'login/Login.js';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
    </Switch>
  </BrowserRouter>
);
