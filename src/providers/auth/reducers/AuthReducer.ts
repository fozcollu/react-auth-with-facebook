import { IAuthState, IAuthAction, IUser } from "../index.d";
import { signOut } from "../actions/signout";
import { ActionType } from "../enum";

export default function authReducer(
  state: IAuthState,
  { type, payload }: IAuthAction
): IAuthState {
  switch (type) {
    case ActionType.LOGIN:
      if (!payload || !payload.userInfo) return state;
      const user = payload.userInfo as IUser;
      return {
        ...state,
        isAuth: true,
        user: {
          name: user.name!,
          picture: user.picture,
          email: user.email!,
          userId: user.userId!
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
