import React, { createRef } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Popup } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signIn } from "../actions";
import "../styles/loginPage.css";

class LoginPage extends React.Component {
  state = { errClassName: false };
  constructor(props) {
    super(props);
    this.contextRef = createRef();
  }

  renderError({ touched, error }) {
    if (touched && error) {
      return <div className="ui error message display">{error}</div>;
    }
  }

  renderInput = ({ input, label, type, meta }) => {
    const className = `field ${meta.touched && meta.error ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input autoComplete="off" {...input} type={type}></input>
        <hr color="white"></hr>
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  onSubmit = ({ username, password }) => {
    this.props.signIn(username, password);
  };



  render() {
    const { errClassName, errMessage } = this.props.user;

    return (
      <div className="centered">
        <div className="ui placeholder segment">
          <div className="ui two column very relaxed stackable grid">
            <div className="column">
              <form
                className="ui mini form error"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <div>
                  <Field
                    name="username"
                    component={this.renderInput}
                    label="USERNAME"
                    type="text"
                  ></Field>
                  <Field
                    name="password"
                    component={this.renderInput}
                    label="PASSWORD"
                    type="password"
                  />
                  <Popup
                    context={this.contextRef}
                    content={errMessage}
                    position="bottom center"
                    size="mini"
                    open={errClassName}
                  />
                </div>
                <div className="ui hidden divider"></div>
                <Button animated inverted color="blue">
                  <Button.Content visible>Sign-in</Button.Content>
                  <Button.Content hidden>
                    <Icon name="sign-in" />
                  </Button.Content>
                </Button>
                <div ref={this.contextRef}></div>
              </form>
              <div className="ui hidden divider"></div>
              <div className="ui mini inline bottom attached warning message">
                Continue to <Link to="/shoper/shoperHome">SHOPER</Link> without
                Sign-in.
              </div>
            </div>
            <div className="middle aligned column">
              <Link
                to="/shoper/createaccount"
                className="ui big blue inverted button"
              >
                <i className="signup icon"></i>
                Sign-up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.username) {
    errors.username = "Please enter Username";
  }
  if (!formValues.password) {
    errors.password = "Please enter Password";
  }
  return errors;
};
const mapStateToProps = (state) => {
  return { user: state.auth };
};

const formWrapped = reduxForm({
  form: "LoginForm",
  validate,
})(LoginPage);

export default connect(mapStateToProps, { signIn })(formWrapped);
