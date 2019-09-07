import { IAuthState, IAuthAction } from "../index.d";
import { signOut } from "../actions/signout";
import { ActionType } from "../enum";
import { ReactFacebookLoginInfo } from "react-facebook-login";

export default function authReducer(
  state: IAuthState,
  { type, payload }: IAuthAction
): IAuthState {
  switch (type) {
    case ActionType.LOGIN:
      if (!payload || !payload.userInfo) return state;
      debugger;
      const user = payload.userInfo as ReactFacebookLoginInfo;
      return {
        ...state,
        isAuth: true,
        user: {
          name: user.name!,
          surname: "",
          email: user.email!,
          avatar: ""
        }
      };
    case ActionType.SIGNUP:
      return state;
    case ActionType.SIGNOUT:
      signOut();
      return { ...state, isAuth: false, user: undefined };
    default:
      return state;
  }
}
