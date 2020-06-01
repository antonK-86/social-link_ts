import { AppStateType } from "./store";

//Users
export const getUsersSelector = (state: AppStateType) => state.usersPage.users;
export const totalUsersCountSelector = (state: AppStateType) =>
  state.usersPage.totalUsersCount;
export const countUsersSelector = (state: AppStateType) =>
  state.usersPage.countUsersOnPage;
export const pageNumberSelector = (state: AppStateType) =>
  state.usersPage.pageNumber;
export const loadingSelector = (state: AppStateType) => state.usersPage.loading;

//Auth
export const captchaSelector = (state: AppStateType) => state.auth.captcha;
export const authSelector = (state: AppStateType) => state.auth.isAuth;
export const loginSelector = (state: AppStateType) => state.auth.login;
export const idAuthSelector = (state: AppStateType) => state.auth.id;

//Profile
export const profileSelector = (state: AppStateType) => state.profile.profile;
export const profileStatusSelector = (state: AppStateType) =>
  state.profile.status;
export const profileEditProfileSelector = (state: AppStateType) =>
  state.profile.isEditProfile;
