import { TProfile } from "../types/types";
import { profileApi } from "../api/Api";
import { stopSubmit } from "redux-form";

type TGetProfile = {
  type: "profile/GET-PROFILE";
  profile: TProfile;
};

type TGetStatus = {
  type: "profile/GET-STATUS";
  status: string;
};

type TSetStatus = {
  type: "profile/SET-STATUS";
  status: string;
};

type TIsEditProfile = {
  type: "profile/IS-EDIT-PROFILE";
  isEditProfile: boolean;
};

type TClearProfile = {
  type: "CLEAR-PROFILE";
};

type TProfileIsFetching = {
  type: "profile/IS-FETCHING";
};

type TActions =
  | TGetProfile
  | TGetStatus
  | TSetStatus
  | TIsEditProfile
  | TClearProfile
  | TProfileIsFetching;

type TState = {
  profile: TProfile | null;
  status: string;
  isEditProfile: boolean;
  isFetching: boolean;
};

let initialState: TState = {
  profile: null,
  status: "",
  isEditProfile: false,
  isFetching: false,
};

const profileReducer = (state = initialState, action: TActions): TState => {
  switch (action.type) {
    case "profile/GET-PROFILE":
      return {
        ...state,
        profile: action.profile,
      };
    case "profile/GET-STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "profile/SET-STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "profile/IS-EDIT-PROFILE":
      return {
        ...state,
        isEditProfile: action.isEditProfile,
      };
    case "profile/IS-FETCHING":
      return {
        ...state,
        isFetching: !state.isFetching,
      };
    case "CLEAR-PROFILE":
      return {
        ...state,
        profile: null,
        status: "",
      };
    default:
      return state;
  }
};

export default profileReducer;

//Actions

const getProfileA = (profile: TProfile) => ({
  type: "profile/GET-PROFILE",
  profile,
});

const getStatusA = (status: string) => ({
  type: "profile/GET-STATUS",
  status,
});

export const editStatusA = (status: string) => ({
  type: "profile/SET-STATUS",
  status,
});

export const isEditProfileA = (isEditProfile: boolean) => ({
  type: "profile/IS-EDIT-PROFILE",
  isEditProfile,
});

export const clearProfile = () => ({
  type: "CLEAR-PROFILE",
});

const profileIsFetching = () => ({
  type: "profile/IS-FETCHING",
});

//Thunk

export const getProfileThunk = (userId: number) => async (dispatch: any) => {
  let res = await profileApi.getProfile(userId);
  dispatch(getProfileA(res.data));
};

export const getStatusThunk = (userId: number) => async (dispatch: any) => {
  let res = await profileApi.getProfileStatus(userId);
  dispatch(getStatusA(res.data));
};

export const editProfileThunk = (data: any, status: string) => async (
  dispatch: any,
  getState: any
) => {
  dispatch(profileIsFetching());
  let res = await profileApi.editProfile(data);
  let resStatus = await profileApi.editProfileStatus(status);
  if (res.data.resultCode === 0 && resStatus.data.resultCode === 0) {
    dispatch(getProfileThunk(getState().auth.id));
    dispatch(getStatusThunk(getState().auth.id));
    dispatch(profileIsFetching());
    dispatch(isEditProfileA(false));
  } else {
    dispatch(stopSubmit("editProfile", { _error: res.data.messages[0] }));
  }
};

export const uploadProfilePhotoThunk = (file: File, userId: number) => async (
  dispatch: any
) => {
  await profileApi.uploadProfilePhoto(file);
  dispatch(getProfileThunk(userId));
};
