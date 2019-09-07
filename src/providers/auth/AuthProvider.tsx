import React, { createContext, ReactNode, useReducer } from "react";
import authReducer from "./reducers/AuthReducer";
import { IAuthContext } from ".";

interface IAuthProps {
  children?: ReactNode;
}

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider: React.FunctionComponent<IAuthProps> = props => {
  const [contextState, dispatch] = useReducer(authReducer, {
    isAuth: false
  });
  const value = { state: contextState, dispatch };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
