import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Social Stream!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <p className="lead">
          <Link
            className="btn btn-success btn-lg px-5 mr-3"
            to="/register"
            role="button"
          >
            Sign Up
          </Link>
          <Link
            className="btn btn-primary btn-lg px-5 mx-3"
            to="/login"
            role="button"
          >
            Login
          </Link>
        </p>
      </div>
    );
  }
}
