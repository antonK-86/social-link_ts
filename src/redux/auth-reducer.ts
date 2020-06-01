import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./store";
import { authApi, securityApi } from "../api/Api";
import { stopSubmit } from "redux-form";

type StateType = {
  isAuth: boolean;
  id: number | null;
  email: string | null;
  login: string | null;
  captcha: string | null;
};

let initialState: StateType = {
  isAuth: false,
  id: null,
  email: null,
  login: null,
  captcha: null,
};

const authReducer = (state = initialState, action: ActionsTypes): StateType => {
  switch (action.type) {
    case "APP/AUTH":
      return {
        ...state,
        ...action.payload,
      };
    case "GET-CAPTCHA":
      return {
        ...state,
        captcha: action.payload,
      };

    case "app/SIGN-OUT":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

//Actions

type AuthType = {
  type: "APP/AUTH";
  payload: { id: number; email: string; login: string; isAuth: boolean };
};

type SignOutType = {
  type: "app/SIGN-OUT";
  payload: { id: null; email: null; login: null; isAuth: false };
};

type GetCaptchaType = {
  type: "GET-CAPTCHA";
  payload: string | null;
};

type ActionsTypes = AuthType | SignOutType | GetCaptchaType;

const authAction = (
  id: number,
  email: string,
  login: string,
  isAuth: boolean
): AuthType => ({
  type: "APP/AUTH",
  payload: { id, email, login, isAuth },
});

const signOutAction = (): SignOutType => ({
  type: "app/SIGN-OUT",
  payload: { id: null, email: null, login: null, isAuth: false },
});

const getCaptchaAction = (url: string): GetCaptchaType => ({
  type: "GET-CAPTCHA",
  payload: url,
});

//Thunks

export const authThunk = (): ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
> => async (dispatch: any) => {
  try {
    let response = await authApi.authMe();
    if (response.data.resultCode === 0) {
      let { id, email, login } = response.data.data;
      return dispatch(authAction(id, email, login, true));
    }
  } catch (error) {
    alert("Error initialized");
  }
};

export const signInThunk = (
  email: string,
  password: string,
  rememberMe: boolean = false,
  captcha: string | null = null
) => async (dispatch: any) => {
  let response = await authApi.signIn(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(authThunk());
  } else if (response.data.resultCode === 10) {
    dispatch(getCaptchaThunk());
  } else {
    dispatch(stopSubmit("signIn", { _error: response.data.messages[0] }));
  }
};

export const signOutThunk = () => async (dispatch: any) => {
  let res = await authApi.signOut();
  if (res.data.resultCode === 0) {
    dispatch(signOutAction());
  }
};

//получение captcha
export const getCaptchaThunk = () => async (dispatch: any) => {
  let response = await securityApi.getCaptcha();
  dispatch(getCaptchaAction(response.data.url));
};
