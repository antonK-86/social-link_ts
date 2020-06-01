import { authThunk } from "./auth-reducer";
import { RootThunkType } from "./store";

type StateType = typeof initialState;

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action: ActionsTypes): StateType => {
  switch (action.type) {
    case "INITIALIZED":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

type InitType = {
  type: "INITIALIZED";
};

const initAction = (): InitType => ({
  type: "INITIALIZED",
});

type ActionsTypes = InitType;

type ThunkType = RootThunkType<ActionsTypes>;

export const initApp = (): ThunkType => (dispatch): any => {
  let promise = dispatch(authThunk());
  //promise2=dispatch(action2);
  //promise3=dispatch(action2);
  //Promise.all([promise, promise2, promise3]).then(()=>{})
  promise.then(() => {
    dispatch(initAction());
  });
};

export default appReducer;
