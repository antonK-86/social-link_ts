import { createStore, combineReducers, applyMiddleware, Action } from "redux";
import { reducer as formReducer } from "redux-form"; //для создания form
import thunk, { ThunkAction } from "redux-thunk";
import userReducer from "./user-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
//import testReducer from "./test-red";
import profileReducer from "./profile-reducer";

//объедидение reducer`ов
let rootReducer = combineReducers({
  usersPage: userReducer,
  auth: authReducer,
  app: appReducer,
  profile: profileReducer,
  //test: testReducer!,
  form: formReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type RootThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;

const store = createStore(rootReducer, applyMiddleware(thunk)); //создаем store из reducera

export default store;

(window as any).store = store;
