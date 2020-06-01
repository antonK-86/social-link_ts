import React from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import closeIcon from "../../images/cancel.svg";
import userIcon from "../../images/nonavatar.jpg";
import { Button, ButtonSaveProfile, ButtonLoading } from "../buttons/Button";
import { TProfile } from "../../types/types";
import { FormDataType } from "../profile/Profile";

//Validate links
const useHttp = (value: string | null) => {
  if (value?.startsWith("http") || !value) return undefined;
  return "Use http:// or https://";
};

const InputFormProfile = ({ input, meta, ...props }: any) => {
  //rest оператор, деструктуризация
  //debugger;
  const showError = meta.touched && meta.error;
  return (
    <div className={"input-profile " + (showError ? "error-profile" : "")}>
      <input {...input} {...props} />
      {showError && <span className="profile__textError">{meta.error}</span>}
    </div>
  );
};

const TextareaForm = ({ input, meta, ...props }: any) => {
  //rest оператор, деструктуризация
  //debugger;
  const showError = meta.error;
  return (
    <div className={"textarea-profile " + (showError ? "error-profile" : "")}>
      <textarea {...input} {...props} maxLength="301" />
      {showError && (
        <span className={"profile__textError textError_teaxtarea"}>
          {meta.error}
        </span>
      )}
    </div>
  );
};

type TProps = {
  profile: TProfile | null;
  status: string | null;
  isFetching: boolean;
  isEditProfileA: (arg: boolean) => void;
  editStatusA: (status: string) => void;
  uploadProfilePhotoThunk: (file: File, userId: number) => void;
};

const EditProfileForm: React.FC<
  TProps & InjectedFormProps<FormDataType, TProps>
> = ({
  profile,
  status,
  error,
  isFetching,
  isEditProfileA,
  editStatusA,
  handleSubmit,
  uploadProfilePhotoThunk,
}) => {
  const photoSelected = (event: any) => {
    uploadProfilePhotoThunk(event.target.files[0], profile!.userId);
  };

  const onChangeStatus = (e: any) => {
    editStatusA(e.target.value);
  };

  let strErr = "";

  if (error) {
    let err = error;
    let target = ">";
    let pos = -1;
    let start = 0;
    while ((pos = err.indexOf(target, pos + 1)) !== -1) {
      start = pos;
    }
    strErr = err.slice(start + 1, err.length - 1);
    strErr = strErr[0].toLowerCase() + strErr.slice(1);
  }

  const clickHandlerCancel = () => {
    setTimeout(() => {
      isEditProfileA(false);
    }, 200);
  };

  return (
    <div className="edit-profile">
      <form className="editForm" onSubmit={handleSubmit}>
        <div className="editForm__close">
          <img
            src={closeIcon}
            alt="close"
            width="20"
            height="20"
            onClick={clickHandlerCancel}
          />
        </div>
        <div className="editForm__form-container">
          <div className="editForm-item">
            <div className="editForm__field">
              <div className="editForm__field_user-img">
                <label>
                  <input
                    type="file"
                    name="load"
                    onChange={photoSelected}
                    className="editForm__field_input-file"
                  />
                  <img
                    src={profile?.photos.small || userIcon}
                    alt="avatar"
                    width="150"
                    height="150"
                  />
                </label>
              </div>
              <div className="editForm__field_file-upload">
                <label>
                  <input
                    type="file"
                    name="load"
                    onChange={photoSelected}
                    className="editForm__field_input-file"
                  />
                  <span>Загрузить аватар</span>
                </label>
              </div>
            </div>
            <div className="editForm__field">
              <div>Full name:</div>
              <Field
                name="fullName"
                component={InputFormProfile}
                type="text"
                placeholder="Enter full name"
              />
            </div>
            <div className="editForm__field">
              <div>ID:{" " + profile?.userId}</div>
            </div>
            <div className="editForm__field">
              <div>Status</div>
              <div className="input-profile">
                <input type="text" value={status!} onChange={onChangeStatus} />
              </div>
            </div>
            <div className="editForm__field">
              <div>About me:</div>
              <Field
                name="aboutMe"
                component={TextareaForm}
                type="text"
                placeholder="Enter info about youself"
              />
            </div>
            <div className="editForm__field">
              <div>
                LookingForAJob:
                <span className="editForm__field_checkbox">
                  <Field
                    name="lookingForAJob"
                    component="input"
                    type="checkbox"
                  />
                </span>
              </div>
            </div>
            <div className="editForm__field">
              <div>
                My skills:
                {" " + !profile?.lookingForAJobDescription && ""}
              </div>
              <Field
                name="lookingForAJobDescription"
                component={TextareaForm}
                type="text"
                placeholder="Enter info Job description"
              />
            </div>
          </div>
          <div className="editForm-item">
            <div className="editForm-item__contact">Contacts:</div>
            <ul className="editForm-contacts">
              {profile?.contacts &&
                Object.keys(profile.contacts).map((key, index) => {
                  return (
                    <li className="editForm__field" key={index}>
                      <div className="editForm__field_span">
                        <span>{key}</span>
                      </div>
                      {error && key === strErr ? (
                        <span className="editForm__field_error">{error}</span>
                      ) : (
                        ""
                      )}
                      <Field
                        name={"contacts." + key}
                        component={InputFormProfile}
                        type="text"
                        placeholder={"Enter " + key}
                        validate={useHttp}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="btn-block">
          {isFetching ? (
            <ButtonLoading />
          ) : (
            <ButtonSaveProfile addClass="btn_save-cancel">
              <input type="submit" name="save" value="Save profile" />
            </ButtonSaveProfile>
          )}
          <div className="edit-profile__btn" onClick={clickHandlerCancel}>
            <Button addClass="btn_save-cancel" text="Cancel" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default reduxForm<FormDataType, TProps>({
  form: "editProfile",
})(EditProfileForm);
