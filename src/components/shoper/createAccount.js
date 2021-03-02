import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { phoneNumber, required, minLengthEight } from "../validation";
import { signUp, chkUserExistence } from "../../actions";
import Header from "../header";
import "../../styles/loginPage.css";

class CreateAccount extends React.Component {
  state = { passError: "", emailError: "" };
  renderError(touched, error, warning) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <p>{error}</p>
        </div>
      );
    } else if (touched && warning) {
      return (
        <div className="ui error message">
          <p>{warning}</p>
        </div>
      );
    }
  }

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className={`field ${touched && error ? "error" : ""}`}>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        <hr color="white"></hr>
        <div>{this.renderError(touched, error, warning)}</div>
      </div>
    </div>
  );

  onSubmit = (formValue) => {
    if (formValue.password !== formValue.repassword) {
      this.setState({ passError: "error message" });
    } else {
      this.props.chkUserExistence(formValue.email);
      if (this.props.user.isUserExists) {
        this.setState({ emailError: "error message" });
      } else {
        this.props.signUp(formValue);
      }
    }
  };

  render() {
    return (
      <div className="ui container">
        <Header userName="Please Login" isSignedIn={false} />

        <div>
          <div>
            <form
              className="ui form error"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <hr color="white"></hr>
              <div className="fields">
                <div className="six wide field">
                  <Field
                    name="firstName"
                    component={this.renderField}
                    type="text"
                    label="First Name"
                    validate={[required]}
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className="fields">
                <div className="six wide field">
                  <Field
                    name="lastName"
                    component={this.renderField}
                    type="text"
                    label="Last Name"
                    validate={[required]}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className={`field ${this.state.emailError}`}>
                <div className="six wide field">
                  <Field
                    name="email"
                    component={this.renderField}
                    type="email"
                    label="Email"
                    validate={[required]}
                  />
                </div>
              </div>

              <div className={`field ${this.state.emailError}`}>
                <div className="six wide field">
                  <Field
                    name="phone"
                    component={this.renderField}
                    type="number"
                    label="Phone number"
                    validate={[required, phoneNumber]}
                  />
                </div>
              </div>

              <div className={`field ${this.state.passError}`}>
                <div className="six wide field">
                  <Field
                    name="password"
                    component={this.renderField}
                    type="password"
                    label="Password"
                    validate={[required, minLengthEight]}
                    onChange={(e) => this.setState({ passError: "" })}
                  />
                </div>
              </div>
              <div className={`field ${this.state.passError}`}>
                <div className="six wide field">
                  <Field
                    name="repassword"
                    component={this.renderField}
                    type="password"
                    validate={[required]}
                    label="Re-Password"
                    onChange={(e) => this.setState({ passError: "" })}
                  />
                </div>
              </div>

              <div className="inline fields">
                <label>Sex</label>
                <div className="field">
                  <div class="ui radio checkbox">
                    <Field
                      name="sex"
                      component="input"
                      type="radio"
                      value="male"
                    />
                    <label>Male</label>
                  </div>
                </div>
                <div className="field">
                  <div class="ui radio checkbox">
                    <Field
                      name="sex"
                      component="input"
                      type="radio"
                      value="female"
                    />
                    <label>Female</label>
                  </div>
                </div>
                <div className="field">
                  <div class="ui radio checkbox">
                    <Field
                      name="sex"
                      component="input"
                      type="radio"
                      value="other"
                    />
                    <label>Other</label>
                  </div>
                </div>
              </div>
              <div className="ui hidden divider"></div>
              <div>
                <Button animated inverted color="blue">
                  <Button.Content visible>Sign-up</Button.Content>
                  <Button.Content hidden>
                    <Icon name="thumbs up" />
                  </Button.Content>
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="ui hidden divider"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

const formWrapped = reduxForm({
  form: "createAccountForm",
})(CreateAccount);

export default connect(mapStateToProps, { signUp, chkUserExistence })(
  formWrapped
);
