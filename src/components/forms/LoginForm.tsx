import React from "react";
import { InjectedFormProps, Field, reduxForm } from "redux-form";
import { FormDataType } from "../login/Login";

//validators
const required = (value: string | null) => {
  if (value) return undefined;
  return "Field is required";
};
/*
const maxLength = (max: number) => (value: string | null) => {
  if (value && value.length > max) return `Must be ${max} simbols or less`;
  return undefined;
};*/

const minLength = (min: number) => (value: string | null) =>
  value && value.length < min ? `Must be ${min} simbols or more` : undefined;

const minLength4 = minLength(4);

const InputForm = ({ input, meta, ...props }: any) => {
  //rest
  const showError = meta.touched && meta.error;
  return (
    <div className={"input " + (showError || props.err ? "error" : "")}>
      <input {...input} {...props} />
      {showError && (
        <div className="error-block">
          <span className="login-error">{meta.error}</span>
        </div>
      )}
    </div>
  );
};

type PropsType = {
  editCaptcha: () => void;
  captcha: string | null;
  click: boolean;
};

let LoginForm: React.FC<
  PropsType & InjectedFormProps<FormDataType, PropsType>
> = ({ handleSubmit, editCaptcha, captcha, error, click }) => {
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__field">
        {/* //<label htmlFor="email">Email</label> */}
        <Field
          name="email"
          component={InputForm}
          type="email"
          placeholder="Enter email"
          validate={[required]}
          err={error}
        />
      </div>
      <div className="login-form__field">
        <Field
          name="password"
          component={InputForm}
          type="password"
          placeholder="Enter password"
          validate={[required, minLength4]}
          err={error}
        />
      </div>
      <div className="login-form__field_checkbox">
        <Field name="rememberMe" component="input" type="checkbox" />
        <label htmlFor="rememberMe">remember me</label>
      </div>
      {captcha && (
        <div className="login-form__field">
          <div onClick={editCaptcha}>
            <img src={captcha} alt="" />
          </div>
          <Field
            name="captcha"
            component={InputForm}
            type="text"
            placeholder="Enter simbols from pict"
            validate={[required]}
          />
        </div>
      )}
      {error && <div className="form-error">{error}</div>}
      <input
        name="SignIn"
        type="submit"
        value="Sign In"
        className={click ? "btn-click btnSign" : "btnSign"}
      />
    </form>
  );
};

let LoginFormContent = reduxForm<FormDataType, PropsType>({
  form: "signIn",
})(LoginForm);

export default LoginFormContent;
