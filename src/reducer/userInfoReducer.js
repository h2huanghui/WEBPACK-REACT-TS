import { UPDATE_USERINFO } from "@/action/actionTypes";

const initializeState = {
  userInfo:{}
};

export default function userInfoReducer(state = initializeState, action) {
  switch (action.type) {
    case UPDATE_USERINFO:
      return {
        ...state,
        userInfo: action.userInfo
      };
    default:
      return state;
  }
}
