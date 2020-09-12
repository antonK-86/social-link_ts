import React from "react";
import Navbar from "../navbar/Navbar";
import { NavLink } from "react-router-dom";
import {
  authSelector,
  loginSelector,
  idAuthSelector,
} from "../../redux/selectors";
import { AppStateType } from "../../redux/store";
import { connect } from "react-redux";
import { signOutThunk } from "../../redux/auth-reducer";
import { clearProfile } from "../../redux/profile-reducer";

const Header = (props: any) => {
  const signOut = () => {
    props.clearProfile();
    props.signOutThunk();
  };
  return (
    <header className="header">
      <Navbar />
      <div className="header__sign">
        {props.isAuth ? (
          <div className="header__signOut">
            <NavLink
              to={"/profile/" + props.userId}
              className="header__signOut_login"
            >
              {props.login}
            </NavLink>
            <NavLink to="/signIn">
              <div className="sign-out" onClick={signOut}>
                <svg
                  height="20pt"
                  viewBox="0 0 512.00533 512"
                  width="20pt"
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-out"
                >
                  <path
                    className="svg-out_2196f3"
                    d="m298.667969 277.335938c-35.285157 0-64-28.714844-64-64 0-35.285157 28.714843-64 64-64h42.664062v-85.332032c0-35.285156-28.714843-63.99999975-64-63.99999975h-229.332031c-7.019531 0-13.589844 3.45312475-17.578125 9.23437475-3.96875 5.78125-4.863281 13.144531-2.347656 19.691407l154.667969 405.335937c3.136718 8.277344 11.070312 13.738281 19.925781 13.738281h74.664062c35.285157 0 64-28.714844 64-64v-106.667968zm0 0"
                    fill="#143f63"
                  />
                  <path
                    d="m397.164062 318.382812c-7.957031-3.308593-13.164062-11.09375-13.164062-19.714843v-64h-85.332031c-11.777344 0-21.335938-9.554688-21.335938-21.332031 0-11.777344 9.558594-21.332032 21.335938-21.332032h85.332031v-64c0-8.621094 5.207031-16.40625 13.164062-19.714844 7.976563-3.304687 17.152344-1.46875 23.25 4.632813l85.335938 85.332031c8.339844 8.339844 8.339844 21.824219 0 30.164063l-85.335938 85.335937c-6.097656 6.097656-15.273437 7.933594-23.25 4.628906zm0 0"
                    fill="#333333"
                  />
                  <path
                    className="svg-out_e3ecf3"
                    d="m184.449219 44.84375-128.191407-42.730469c-28.929687-8.894531-56.257812 12.460938-56.257812 40.554688v384c0 18.242187 11.605469 34.519531 28.886719 40.492187l128.167969 42.730469c4.714843 1.449219 9.046874 2.113281 13.613281 2.113281 23.53125 0 42.664062-19.136718 42.664062-42.667968v-384c0-18.238282-11.605469-34.515626-28.882812-40.492188zm0 0"
                    fill="#aecfe9"
                  />
                </svg>
              </div>
            </NavLink>
          </div>
        ) : (
          <NavLink
            to="/signIn"
            className="navbar__nav-link"
            activeClassName="navbar__nav-link_active"
          >
            Sign In
          </NavLink>
        )}
      </div>
    </header>
  );
};

type mapStatePropsType = {
  isAuth: boolean;
  login: string | null;
  userId: number | null;
};

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
  isAuth: authSelector(state),
  login: loginSelector(state),
  userId: idAuthSelector(state),
});

export default connect(mapStateToProps, { signOutThunk, clearProfile })(Header);