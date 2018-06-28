import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="registerComponent container">
        <div className="row">
          <div className="col-sm-12">
            <div className="text-center">
              <h1 className="mt-5 mb-3 header">Sign Up</h1>
              <form
                noValidate
                className="form-signin"
                onSubmit={this.handleSubmit}
              >
                <input
                  type="name"
                  name="name"
                  className={classnames("form-control", {
                    "is-invalid": errors.name
                  })}
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                {errors.name && (
                  <div className="invalid-feedback text-left">
                    {errors.name}
                  </div>
                )}
                <input
                  type="email"
                  name="email"
                  className={classnames("form-control", {
                    "is-invalid": errors.email
                  })}
                  placeholder="Email address"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback text-left">
                    {errors.email}
                  </div>
                )}
                <input
                  type="password"
                  name="password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password
                  })}
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback text-left">
                    {errors.password}
                  </div>
                )}
                <input
                  type="password"
                  name="password2"
                  className={classnames("form-control", {
                    "is-invalid": errors.password2
                  })}
                  placeholder="Confirm Password"
                  value={this.state.password2}
                  onChange={this.handleChange}
                />
                {errors.password2 && (
                  <div className="invalid-feedback text-left">
                    {errors.password2}
                  </div>
                )}
                <button
                  className="btn btn-lg btn-outline-primary btn-block mt-3"
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
