import React from 'react';
import { Redirect } from 'react-router-dom';
import { registerUser, loginUser } from '../utils/apis';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
      errorMessage: '',
      name: '',
      email: '',
      password: '',
    };
  }

  handleLoginToggle = (ev) => {
    ev.preventDefault();
    this.setState(prevState => ({
      register: !prevState.register
    }));
  }

  handleNameChanged = (ev) => {
    this.setState({ name: ev.target.value });
  }

  handleEmailChanged = (ev) => {
    this.setState({ email: ev.target.value });
  }

  handlePasswordChanged = (ev) => {
    this.setState({ password: ev.target.value });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.state.register) {
      registerUser(
        { name: this.state.name, email: this.state.email, password: this.state.password }
      ).then(() => this.setState({ redirect: true }))
        .catch(err => this.setState({ errorMessage: err.response ? err.response.data[0] : err }));
    } else { // Login
      loginUser({ email: this.state.email, password: this.state.password })
        .then(() => this.setState({ redirect: true }))
        .catch(err => this.setState({ errorMessage: err.response ? err.response.data[0] : err }));
    }
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/" />);
    }

    return (
      <section>
        <div className="LogIn">
          <div className="page-title">
            <h3>{this.state.register ? 'Register' : 'Login'}</h3>
          </div>
          <p>{this.state.register ? 'Please create an account to use the service.' : 'Please log in to use the service.' }</p>
          <form onSubmit={this.handleSubmit}>
            {this.state.register
              && (
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleNameChanged}
                placeholder="Your Name"
                className="input"
                required
              />
              )
            }
            <input
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChanged}
              placeholder="Your Email"
              className="input"
              required
            />
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChanged}
              placeholder="Your Password"
              className="input"
              autoComplete="off"
              required
            />
            {this.state.errorMessage
              && <p className="error">{this.state.errorMessage}</p>
            }
            <input
              type="submit"
              className="button"
              value={this.state.register ? 'Register' : 'Login'}
            />
          </form>
          <div>
            <p>
              {this.state.register ? 'Already have an account ?' : 'Do not have an account?'}
              {' '}
              <a className="link-button" href="#!" onClick={this.handleLoginToggle}>
                {this.state.register ? 'Login here' : 'Register here'}
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default LogIn;
