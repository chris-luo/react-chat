import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

export default App;
