import React from "react";
import { Row, Col, Icon, Button } from "antd";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { IUser } from "../../providers/auth";

export enum LoginOrSignUpEnum {
  Login,
  SignUp
}

interface SocialMediaAuth {
  mode: LoginOrSignUpEnum;
  cbResponse: (userInfo: IUser) => void;
}

type FacebookUserInfo = ReactFacebookLoginInfo & {
  picture: { data: { url: string } };
};

const SocialMediaAuth: React.FunctionComponent<SocialMediaAuth> = props => {
  const { mode, cbResponse } = props;

  const responseFacebook = (userInfo: FacebookUserInfo) => {
    const user: IUser = {
      name: userInfo.name!,
      email: userInfo.email!,
      picture: userInfo.picture.data.url,
      userId: userInfo.id
    };

    cbResponse(user);
  };
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    //TODO
  };

  return (
    <Row style={{ paddingTop: 10 }}>
      <Col span={11}>
        <FacebookLogin
          appId="370381623863576" //APP ID NOT CREATED YET
          fields="name,email,picture"
          callback={responseFacebook}
          textButton={
            (mode === LoginOrSignUpEnum.Login ? "LOGIN" : "JOIN") +
            " WITH FACEBOOK"
          }
          icon={
            <Icon
              style={{ fontSize: "18px", marginRight: "5px" }}
              type={"facebook"}
            ></Icon>
          }
          buttonStyle={{ padding: 5, fontSize: "11px" }}
        />
      </Col>
      <Col span={11} offset={1}>
        <GoogleLogin
          clientId="" //CLIENTID NOT CREATED YET
          //   buttonText={
          //     (mode === LoginOrSignUpEnum.Login ? "LOGIN" : "JOIN") +
          //     " WITH GOOGLE"
          //   }
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          style={{ padding: 0, fontSize: "11px" }}
          render={renderProps => (
            <Button icon="google" onClick={renderProps.onClick}>
              {mode === LoginOrSignUpEnum.Login ? "LOGIN" : "JOIN"} WITH GOOGLE
            </Button>
          )}
        />
      </Col>
    </Row>
  );
};

export default SocialMediaAuth;
