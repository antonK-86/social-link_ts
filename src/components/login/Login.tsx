import React, { useState } from "react";
import { connect } from "react-redux";
import { signInThunk, getCaptchaThunk } from "../../redux/auth-reducer";
import { captchaSelector, authSelector } from "../../redux/selectors";
import { AppStateType } from "../../redux/store";
import LoginFormContent from "../forms/LoginForm";
import { Redirect } from "react-router-dom";

type mapStatePropsType = {
  isAuth: boolean;
  captcha: string | null;
};

type mapDispatchPropsType = {
  signInThunk: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) => void;
  getCaptchaThunk: () => void;
};

export type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null;
};

const Login: React.FC<mapStatePropsType & mapDispatchPropsType> = (props) => {
  const [click, setClick] = useState(false);

  const onSubmit = (data: FormDataType) => {
    props.signInThunk(data.email, data.password, data.rememberMe, data.captcha);
    setClick(true);
    setTimeout(() => {
      setClick(false);
    }, 200);
  };
  const editCaptcha = () => {
    props.getCaptchaThunk();
  };

  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="login">
      <h1>Entrance to APP</h1>
      <LoginFormContent
        onSubmit={onSubmit}
        captcha={props.captcha}
        editCaptcha={editCaptcha}
        click={click}
      />
    </div>
  );
};

let mapStateToProps = (state: AppStateType): mapStatePropsType => ({
  isAuth: authSelector(state),
  captcha: captchaSelector(state),
});

export default connect(mapStateToProps, { signInThunk, getCaptchaThunk })(
  Login
);
