import React, { Component } from "react";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="registerComponent container">
        <div className="row">
          <div className="col-sm-12">
            <div className="text-center">
              <h1 className="mt-5 mb-3 display-4">Register Below</h1>
              <form className="form-signin" onSubmit={this.onSubmit}>
                <input
                  type="name"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <input
                  type="password"
                  name="password2"
                  id="inputPasswordConfirm"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
