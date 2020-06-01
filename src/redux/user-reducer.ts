import { usersApi } from "../api/Api";
import { UserTypes } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./store";

type StateType = {
  users: Array<UserTypes> | [];
  countUsersOnPage: number;
  pageNumber: number;
  totalUsersCount: number;
  followed: boolean;
  loading: boolean;
  isFetching: boolean;
  currentUsrId: number;
  isSearch: boolean | null;
  term: string;
};
type GetUsersActionType = {
  type: "GET-USERS";
  users: Array<UserTypes>;
  totalCount: number;
};

type LoadingActionType = {
  type: "LOADING";
};

type ClearUsersActionType = {
  type: "CLEAR-USERS";
};

type CheckSubcription = {
  type: "CHECK-SUBSCRIPTION";
  payload: boolean;
};

type FollowActionType = {
  type: "FOLLOW";
  userId: number;
};

type UnFollowActionType = {
  type: "UNFOLLOW";
  userId: number;
};

type GetUsrIdActionType = {
  type: "GET-USER-ID";
  currentUsrId: number;
};

type IsSearchActionType = {
  type: "IS-SEARCH-USERS";
  isSearch: boolean | null;
};

type SearchUserActionType = {
  type: "SEARCH-USERS";
  term: string;
};

type ActionsTypes =
  | GetUsersActionType
  | LoadingActionType
  | ClearUsersActionType
  | CheckSubcription
  | FollowActionType
  | UnFollowActionType
  | GetUsrIdActionType
  | IsSearchActionType
  | SearchUserActionType;

let initialState: StateType = {
  users: [],
  countUsersOnPage: 20,
  pageNumber: 1,
  totalUsersCount: 0,
  followed: false,
  loading: false,
  isFetching: false,
  currentUsrId: 0,
  isSearch: null,
  term: "",
};

const userReducer = (state = initialState, action: ActionsTypes): StateType => {
  switch (action.type) {
    case "GET-USERS":
      return {
        ...state,
        totalUsersCount: action.totalCount,
        //users: [...state.users, ...action.users],
        users: [...action.users],
        //pageNumber: state.pageNumber + 1,
      };
    case "LOADING": {
      return {
        ...state,
        loading: !state.loading,
      };
    }

    case "CLEAR-USERS": {
      return {
        ...state,
        users: [],
      };
    }

    case "CHECK-SUBSCRIPTION": {
      return {
        ...state,
        followed: action.payload,
      };
    }

    case "FOLLOW": {
      const userArr = state.users.concat();
      return {
        ...state,
        users: userArr.map((u: any) => {
          if (u.id === action.userId) return { ...u, followed: true };
          return u;
        }),
      };
    }

    case "UNFOLLOW": {
      const userArr = state.users.concat();
      return {
        ...state,
        users: userArr.map((u: any) => {
          if (u.id === action.userId) return { ...u, followed: false };
          return u;
        }),
      };
    }

    case "GET-USER-ID": {
      return {
        ...state,
        currentUsrId: action.currentUsrId,
      };
    }
    case "IS-SEARCH-USERS": {
      //для отображения подписавшихся userов
      return {
        ...state,
        isSearch: action.isSearch,
      };
    }
    case "SEARCH-USERS": {
      //для поиска пользователей
      return {
        ...state,
        term: action.term,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
//Actions

const getUsersAction = (
  users: Array<UserTypes>,
  totalCount: number
): GetUsersActionType => ({
  type: "GET-USERS",
  users: users,
  totalCount: totalCount,
});

const loadingAction = (): LoadingActionType => ({
  type: "LOADING",
});

export const clearUsersAction = () => ({
  type: "CLEAR-USERS",
});

const followAction = (userId: number) => ({
  type: "FOLLOW",
  userId: userId,
});

const unFollowAction = (userId: number) => ({
  type: "UNFOLLOW",
  userId: userId,
});

const checkSubcription = (payload: boolean) => ({
  type: "CHECK-SUBSCRIPTION",
  payload,
});

const getUsrIdAction = (payload: number) => ({
  type: "GET-USER-ID",
  currentUsrId: payload,
});

export const isSearchAction = (isSearch: boolean | null) => ({
  type: "IS-SEARCH-USERS",
  isSearch,
});

export const searchUserAction = (term: string) => ({
  type: "SEARCH-USERS",
  term,
});

//THUNKs

//1 вариант типизации
/*
type DispatchType = Dispatch<ActionsTypes>;
type GetStateType = ()=> AppStateType;
*/

//2 вариант типизации
//ThunkAction<void, RootState, unknown, Action<string>>
export const checkSubcriptionThunk = (userId: number) => async (
  dispatch: any
) => {
  let res = await usersApi.getSubscribe(userId);
  dispatch(checkSubcription(res.data));
};

export const getUsersThunk = (
  count: number,
  page: number,
  friends: boolean | null,
  term: string
): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (
  dispatch,
  getState
) => {
  try {
    dispatch(loadingAction());
    let response = await usersApi.getUsers(count, page, friends, term);
    dispatch(loadingAction());
    dispatch(getUsersAction(response.data.items, response.data.totalCount));
  } catch (error) {
    dispatch(loadingAction());
    alert("Error loading users");
  }
};

export const followUserThunk = (userId: number) => async (dispatch: any) => {
  dispatch(getUsrIdAction(userId));
  let res = await usersApi.follow(userId);
  if (res.data.resultCode === 0) {
    dispatch(followAction(userId));
    dispatch(getUsrIdAction(0));
  }
};

export const unFollowUserThunk = (userId: number) => async (dispatch: any) => {
  dispatch(getUsrIdAction(userId));
  let res = await usersApi.unFollow(userId);
  if (res.data.resultCode === 0) {
    dispatch(unFollowAction(userId));
    dispatch(getUsrIdAction(0));
  }
};
