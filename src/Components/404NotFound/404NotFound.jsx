/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Error.css";

export class Error404 extends Component {
  render() {
    return (
      <div className="not-found">
        <header className="top-header"></header>
        {/*dust particel*/}
        <div>
          <div className="starsec" />
          <div className="starthird" />
          <div className="starfourth" />
          <div className="starfifth" />
        </div>
        {/*Dust particle end-*/}
        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable" />
            <div className="cover" />
            <div className="in-cover">
              <div className="bulb" />
            </div>
            <div className="light" />
          </div>
        </div>
        {/* END Lamp */}

        <section className="error">
          <div className="error__content">
            <div className="error__message message">
              <h1 className="message__title">Page Not Found</h1>
              <p className="message__text">
                We're sorry, the page you were looking for isn't found here. The
                link you followed may either be broken or no longer exists.
                Please try again, or take a look at our.
              </p>
            </div>

            <div className="error__nav e-nav">
              <Link to={"/"} className="e-nav__link" />
            </div>
          </div>
          {/* END Content */}
        </section>
      </div>
    );
  }
}

export default Error404;
