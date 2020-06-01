import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/store";
import {
  authSelector,
  idAuthSelector,
  profileSelector,
  profileStatusSelector,
  profileEditProfileSelector,
} from "../../redux/selectors";
import Profile from "./Profile";
import {
  getProfileThunk,
  getStatusThunk,
  editStatusA,
  isEditProfileA,
  editProfileThunk,
  uploadProfilePhotoThunk,
  clearProfile,
} from "../../redux/profile-reducer";
import { TProfile } from "../../types/types";
import { withRouter, RouteComponentProps } from "react-router-dom";

type PathParamsType = {};

type PropsType = RouteComponentProps<any> & {
  isAuth: boolean;
  profile: TProfile | null;
  status: string | null;
  userId: number | null;
  isEditProfile: boolean;
  match: any;
  isFetching: boolean;
  clearProfile: () => void;
  getProfileThunk: (userId: number) => void;
  getStatusThunk: (userId: number) => void;
  editStatusA: (status: string) => void;
  isEditProfileA: (arg: boolean) => void;
  editProfileThunk: (data: any, status: string) => void;
  uploadProfilePhotoThunk: (file: File, userId: number) => void;
};

const ProfileContainer: React.FC<PropsType> = ({
  isAuth,
  status,
  profile,
  userId,
  isEditProfile,
  match,
  isFetching,
  getProfileThunk,
  getStatusThunk,
  editStatusA,
  isEditProfileA,
  editProfileThunk,
  uploadProfilePhotoThunk,
  clearProfile,
}) => {
  let idUser = match.params.userId;
  if (!idUser) {
    idUser = userId;
    //if (!idUser) idUser = 0;
  }

  useEffect(() => {
    clearProfile();
    getProfileThunk(idUser);
    getStatusThunk(idUser);
  }, [idUser, getProfileThunk, getStatusThunk, clearProfile]);

  return (
    <Profile
      status={status}
      isAuth={isAuth}
      userId={userId}
      profile={profile}
      isFetching={isFetching}
      isEditProfileA={isEditProfileA}
      isEditProfile={isEditProfile}
      editProfileThunk={editProfileThunk}
      editStatusA={editStatusA}
      uploadProfilePhotoThunk={uploadProfilePhotoThunk}
    />
  );
};

let mapStateToProps = (state: AppStateType) => ({
  isAuth: authSelector(state),
  userId: idAuthSelector(state),
  profile: profileSelector(state),
  isEditProfile: profileEditProfileSelector(state),
  status: profileStatusSelector(state),
  isFetching: state.profile.isFetching,
});

let ProfileContainerHoc = connect(mapStateToProps, {
  getProfileThunk,
  getStatusThunk,
  editStatusA,
  clearProfile,
  editProfileThunk,
  uploadProfilePhotoThunk,
  isEditProfileA,
})(ProfileContainer);

export default withRouter(ProfileContainerHoc);
