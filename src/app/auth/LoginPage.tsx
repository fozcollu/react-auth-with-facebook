import React, { useContext } from "react";
import { Typography, Divider } from "antd";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { AuthContext } from "../../providers/auth/AuthProvider";
import { ActionType } from "../../providers/auth/enum";

const LoginPage = () => {
  const { dispatch } = useContext(AuthContext);

  const responseFacebook = (userInfo: ReactFacebookLoginInfo) => {
    dispatch({ type: ActionType.LOGIN, payload: { userInfo } });
  };
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <Typography.Title level={3}>Login Facebook or Google</Typography.Title>
      <FacebookLogin
        appId="370381623863576" //APP ID NOT CREATED YET
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <Divider></Divider>
      <GoogleLogin
        clientId="" //CLIENTID NOT CREATED YET
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
};

export default LoginPage;
