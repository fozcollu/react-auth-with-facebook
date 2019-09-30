export interface IUser {
  name: string;
  email: string;
  picture?: string;
  userId: string;
}
export interface IAuthState {
  isAuth: boolean;
  user?: IUser;
}

export interface ActionPayload {
  userInfo: IUser;
}

export interface IAuthAction {
  type: ActionType;
  payload?: ActionPayload;
}

export type IAuthReducer<IAuthState, IAuthAction> = (
  prevState: IAuthState,
  action: IAuthAction
) => IAuthState;

export interface IAuthContext {
  state: IAuthState;
  dispatch: React.Dispatch<IAuthAction>;
}
