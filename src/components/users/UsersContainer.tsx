import React, { useEffect, useState } from "react";
import {
  getUsersThunk,
  clearUsersAction,
  followUserThunk,
  unFollowUserThunk,
  isSearchAction,
  searchUserAction,
} from "../../redux/user-reducer";
import {
  getUsersSelector,
  totalUsersCountSelector,
  countUsersSelector,
  loadingSelector,
  pageNumberSelector,
  authSelector,
} from "../../redux/selectors";
import { connect } from "react-redux";
import Users from "./Users";
import { UserTypes } from "../../types/types";
import { AppStateType } from "../../redux/store";

type PropsType = {
  users: Array<UserTypes> | null;
  totalUsersCount: number;
  count: number;
  pageNumber: number;
  loading: boolean;
  followUserThunk: (userId: number) => void;
  unFollowUserThunk: (userId: number) => void;
  getUsersThunk: (
    count: number,
    pageNumber: number,
    friends: boolean | null,
    term: string
  ) => void;
  clearUsersAction: () => void;
  isSearchAction: (isSearch: boolean | null) => void;
  searchUserAction: (term: string) => void;
  isAuth: boolean;
  currentUsrId: number;
  isSearch: boolean | null;
  term: string;
};

const UsersContainer: React.FC<PropsType> = ({
  users,
  totalUsersCount,
  count,
  pageNumber,
  loading,
  followUserThunk,
  unFollowUserThunk,
  getUsersThunk,
  clearUsersAction,
  isSearchAction,
  searchUserAction,
  isAuth,
  currentUsrId,
  isSearch,
  term,
}) => {
  const countPages = Math.ceil(totalUsersCount / count);

  const [numPage, setNumPage] = useState(pageNumber);
  const [userName, setUserName] = useState<string>("");

  const handlerChangeInput = (e: any) => {
    setUserName(e.target.value);
  };

  useEffect(() => {
    if (userName === "") searchUserAction(userName);
    getUsersThunk(count, numPage, isSearch, term);
  }, [
    count,
    numPage,
    isSearch,
    term,
    userName,
    getUsersThunk,
    searchUserAction,
  ]);

  //FollowUnfollow
  const followUserFunc = (userId: number) => {
    followUserThunk(userId);
  };

  const unFollowUserFunc = (userId: number) => {
    unFollowUserThunk(userId);
  };

  //Для загрузки пользователей c button
  const addUsersOnList = () => {
    getUsersThunk(count, pageNumber, null, "");
  };

  //Для загрузки пользователей pagination
  const nextUsersOnPage = (numP: number) => {
    setNumPage(numP);
  };

  return (
    <div className="users-page">
      <Users
        users={users}
        isAuth={isAuth}
        loading={loading}
        addUsersOnList={addUsersOnList}
        nextUsersOnPage={nextUsersOnPage}
        followUserFunc={followUserFunc}
        unFollowUserFunc={unFollowUserFunc}
        countPages={countPages}
        numPage={numPage}
        count={count}
        currentUsrId={currentUsrId}
        handlerChangeInput={handlerChangeInput}
        isSearchAction={isSearchAction}
        searchUserAction={searchUserAction}
        userName={userName}
      />
    </div>
  );
};

let mapStateToProps = (state: AppStateType) => ({
  isAuth: authSelector(state),
  users: getUsersSelector(state),
  totalUsersCount: totalUsersCountSelector(state),
  count: countUsersSelector(state),
  pageNumber: pageNumberSelector(state),
  loading: loadingSelector(state),
  currentUsrId: state.usersPage.currentUsrId,
  isSearch: state.usersPage.isSearch,
  term: state.usersPage.term,
});

export default connect(mapStateToProps, {
  getUsersThunk,
  clearUsersAction,
  followUserThunk,
  unFollowUserThunk,
  isSearchAction,
  searchUserAction,
})(UsersContainer);
