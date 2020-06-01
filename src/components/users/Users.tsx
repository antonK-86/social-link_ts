import React from "react";
import { UserTypes } from "../../types/types";
import Preloader from "../preloader/Preloader";
import { ButtonFollow, ButtonLoading, Button } from "../buttons/Button";
import userIcon from "../../images/nonavatar.jpg";
import Pagination from "../pagination/Pagination";
import { NavLink } from "react-router-dom";

type PropsType = {
  users: Array<UserTypes> | null;
  isAuth: boolean;
  loading: boolean;
  countPages: number;
  numPage: number;
  currentUsrId: number;
  count: number;
  userName: string;
  unFollowUserFunc: (userId: number) => void;
  followUserFunc: (userId: number) => void;
  addUsersOnList: () => void;
  isSearchAction: (isSearch: boolean | null) => void;
  nextUsersOnPage: (numPage: number) => void;
  handlerChangeInput: (e: any) => void;
  searchUserAction: (term: string) => void;
};

const Users = (props: PropsType) => {
  const handleClickFollow = (event: any, userId: number) => {
    setTimeout(() => props.followUserFunc(userId), 200);
    event.preventDefault();
  };

  const handleClickUnFollow = (event: any, userId: number) => {
    setTimeout(() => props.unFollowUserFunc(userId), 200);
    event.preventDefault();
  };

  const search = (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="search"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
    </svg>
  );

  let USRS = props.users!.map((u: UserTypes) => (
    <NavLink
      to={"/profile/" + u.id}
      key={u.id}
      target="blanc"
      className="users-page__user-item"
    >
      <span className="users-page__user-item_mod">{u.name}</span>
      <div className="users-page__user-item_photo">
        <img
          src={u.photos?.small || userIcon}
          alt=""
          width="100"
          height="100"
        />
      </div>
      <span>
        ID: <span className="users-page__user-item_mod">{u.id}</span>
      </span>
      <span>
        Status: <span className="users-page__user-item_mod">{u.status}</span>
      </span>
      {props.isAuth &&
        (u.followed ? (
          props.currentUsrId === u.id ? (
            <ButtonLoading />
          ) : (
            <div
              className="btn-subscride"
              onClick={(e) => {
                handleClickUnFollow(e, u.id);
              }}
            >
              <ButtonFollow follow={"Unfollow"} />
            </div>
          )
        ) : props.currentUsrId === u.id ? (
          <ButtonLoading />
        ) : (
          <div
            className="btn-subscride"
            onClick={(e) => {
              handleClickFollow(e, u.id);
            }}
          >
            <ButtonFollow follow={"Follow"} />
          </div>
        ))}
    </NavLink>
  ));
  return (
    <div>
      <h1>network users</h1>
      <div className="side-form">
        <div className="side-form__search-users">
          <input
            type="text"
            value={props.userName!}
            placeholder="Enter user name for searching"
            onChange={props.handlerChangeInput}
          />
          <span
            onClick={() => {
              props.nextUsersOnPage(1);
              props.searchUserAction(props.userName);
            }}
          >
            <Button addClass="btn-search" text={search} />
          </span>
        </div>
        <div className="side-form__show-friends">
          <span
            className="side-form__show-friends_item"
            onClick={() => {
              props.nextUsersOnPage(1);
              props.isSearchAction(true);
              props.searchUserAction(props.userName);
            }}
          >
            Show friends
          </span>
          <span
            className="side-form__show-friends_item"
            onClick={() => {
              props.nextUsersOnPage(1);
              props.isSearchAction(null);
              props.searchUserAction(props.userName);
            }}
          >
            Show all
          </span>
          <span
            className="side-form__show-friends_item"
            onClick={() => {
              props.nextUsersOnPage(1);
              props.isSearchAction(false);
              props.searchUserAction(props.userName);
            }}
          >
            Show non friends
          </span>
        </div>
      </div>
      <div className="users-container">{USRS}</div>
      {props.loading && <Preloader />}
      {props.users?.length ? (
        <Pagination
          nextUsersOnPage={props.nextUsersOnPage}
          countPages={props.countPages}
          numPage={props.numPage}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default Users;
