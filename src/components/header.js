import React from "react";
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../actions";
import history from "../history";

class Header extends React.Component {
  state = { activeClass: "ui dimmer" };
  showAction = () => {
    this.setState({ activeClass: "ui dimmer active" });
  };
  hideAction = () => {
    this.setState({ activeClass: "ui dimmer" });
  };
  onSignOut = () => {
    if (this.props.isSignedIn) {
      this.props.signOut();
    } else {
      history.push("/");
    }
  };
  render() {
    const className =
      this.props.isSignedIn === true
        ? "ui green empty circular label"
        : "ui grey empty circular label";
    const buttoname = this.props.isSignedIn === true ? "Log Out" : "Log In";
    return (
      <div>
        <hr color="white"></hr>
        <div className="ui secondary menu">
          <Link to="/shoper/shoperhome" className="item">
            <ShoppingBasketRoundedIcon
              style={{ fontSize: 50, color: "#29b6f6" }}
            ></ShoppingBasketRoundedIcon>
          </Link>
          <div className="right menu">
            <div className="ui fluid special card">
              <div
                onMouseEnter={this.showAction}
                onMouseLeave={this.hideAction}
                className="card"
              >
                <div className="blurring dimmable image">
                  <div className={this.state.activeClass}>
                    <div className="content">
                      <div className="center">
                        <button
                          onClick={this.onSignOut}
                          className="ui inverted blue button"
                        >
                          {buttoname}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="item">
                    <div className="content">
                      <Link to="/" className="item">
                        <i className="user big blue icon"></i>
                        <div className={className}></div>
                      </Link>
                    </div>
                    <div className="content">
                      <div className="header">
                        <h3>{this.props.userName}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, { signOut })(Header);
