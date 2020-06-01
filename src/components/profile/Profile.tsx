import React from "react";
import { Redirect } from "react-router-dom";
import { TProfile } from "../../types/types";
import userIcon from "../../images/nonavatar.jpg";
import { Button } from "../buttons/Button";
import Preloader from "../preloader/Preloader";
import EditProfileForm from "../forms/EditProfileForm";

type PropsType = {
  isAuth: boolean;
  profile: TProfile | null;
  status: string | null;
  isEditProfile: boolean;
  isFetching: boolean;
  userId: number | null;
  isEditProfileA: (arg: boolean) => void;
  editProfileThunk: (data: any, status: string) => void;
  editStatusA: (status: string) => void;
  uploadProfilePhotoThunk: (file: File, userId: number) => void;
};

export type FormDataType = any;

const Profile: React.FC<PropsType> = ({
  isAuth,
  status,
  profile,
  isEditProfile,
  userId,
  isFetching,
  isEditProfileA,
  editProfileThunk,
  editStatusA,
  uploadProfilePhotoThunk,
}) => {
  if (!isAuth) return <Redirect to="/signIn" />;
  if (!profile) return <Preloader />;

  const contacts = profile?.contacts;

  const clickHandler = () => {
    setTimeout(() => {
      isEditProfileA(true);
    }, 180);
  };

  const onHandleSubmit = (data: any) => {
    setTimeout(() => {
      editProfileThunk(data, status!);
    }, 180);
  };

  if (isEditProfile) {
    return (
      <EditProfileForm
        initialValues={profile} //для передачи нач. значений в форму, name в форме должен соотв полям profile
        profile={profile}
        editStatusA={editStatusA}
        isFetching={isFetching}
        isEditProfileA={isEditProfileA}
        onSubmit={onHandleSubmit}
        status={status}
        uploadProfilePhotoThunk={uploadProfilePhotoThunk}
      />
    );
  }

  return (
    <div className="profile">
      <div>
        <div className="profile__avatar">
          <img src={profile?.photos.large || userIcon} alt="avatar" />
        </div>
        {userId === profile.userId && (
          <div className="profile__btn" onClick={clickHandler}>
            <Button addClass="btn_edit-profile" text="edit profile" />
          </div>
        )}
      </div>
      <div className="profile__info">
        <p>
          <span className="profile__info_name">
            {profile?.fullName}&nbsp;id:{profile?.userId}
          </span>
        </p>
        <p>
          <span className="profile__info_status">{status}</span>
        </p>
        <hr />
        <div className="profile__info_about-me">
          <h4>About me</h4>
          <p>
            <span>{profile?.aboutMe}</span>
          </p>
          <p>
            LookingForAJob:
            <span>{profile?.lookingForAJob ? " YES" : " NO"}</span>
          </p>
          <p>
            My professional skills:&nbsp;
            <span>{profile?.lookingForAJobDescription || ""}</span>
          </p>
        </div>
        <hr />
        <div className="profile__info_contacts">
          <h4>Contacts:</h4>
          <ul className="contacts">
            {contacts &&
              Object.entries(contacts).map((item, index) => (
                <li
                  key={index}
                  className={item[1] ? " " : "li-none"} //нет адреса-нет ссылки
                >
                  <a
                    href={
                      item[1]?.startsWith("http")
                        ? item[1]
                        : "http://" + item[1]
                    }
                    target="blanc"
                    className={item[1] ? " " : "link-disabled"} //ссылка не активна
                  >
                    <i className={"icon icon-" + item[0]}></i>
                  </a>
                  <span className="prompt-link">{item[0]}</span>
                  {/* <span>{item[0] + ": "}</span>
                  <a href={item[1]} target="blanc">
                    {item[1]}
                  </a> */}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
