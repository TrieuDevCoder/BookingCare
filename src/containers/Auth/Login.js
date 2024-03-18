import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import axios from "axios";
import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import userIcon from "../../../src/assets/images/user.svg";
import passIcon from "../../../src/assets/images/pass.svg";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

import adminService from "../../services/adminService";
import { handleLoginAPI } from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnchangeInputUser = (event) => {
    this.setState({ username: event.target.value });
  };
  handleOnchangeInputPassword = (event) => {
    this.setState({ password: event.target.value });
  };
  handleLogin = async () => {
    this.setState({ errMessage: "" });
    try {
      let data = await handleLoginAPI(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("Login successful");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({ errMessage: error.response.data.message });
        }
      }
      console.log("error", error.response);
    }
  };
  handelShowHidePassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container ">
          <div className="login-content row">
            <div className="col-12  login-text">Login</div>
            <div className="col-12 form-group">
              <label>Username :</label>
              <input
                placeholder="Enter your username"
                type="text"
                className="form-control login-input"
                value={this.state.username}
                onChange={(event) => this.handleOnchangeInputUser(event)}
              />
            </div>
            <div className="col-12 form-group">
              <label>Password :</label>
              <div className="custom-inputPass">
                <input
                  className="form-control login-input"
                  placeholder="Enter your password"
                  type={this.state.isShowPassword ? "text" : "password"}
                  value={this.state.password}
                  onChange={(event) => this.handleOnchangeInputPassword(event)}
                />
                <span onClick={() => this.handelShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button onClick={() => this.handleLogin()} className="btn-login">
                Login
              </button>
            </div>
            <div className="col-12 forgot-password">
              <span>Forgot your password ?</span>
            </div>
            <div className="col-12"></div>
            <div className="col-12 text-center mt-3">
              <span>Or Login With</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
