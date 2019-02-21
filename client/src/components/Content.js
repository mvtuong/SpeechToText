import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Account from './Account';
import LogIn from './LogIn';
import { isDeviceActivated } from '../utils/apis';

const withAuth = Component => class extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      ready: false,
      isUserLoggedIn: false,
    };
  }

  componentDidMount() {
    const isActivated = isDeviceActivated();
    this.setState({
      isUserLoggedIn: isActivated,
      ready: true,
    });
  }

  render() {
    if (!this.state.ready) {
      return null;
    }

    return this.state.isUserLoggedIn ? <Component /> : <Redirect to="/login" />;
  }
};

// Handle random urls
const Empty = () => (<Redirect to="/" />);

const Content = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={withAuth(Account)} />
      <Route exact path="/login" component={LogIn} />
      <Route component={Empty} />
    </Switch>
  </HashRouter>
);

export default Content;
