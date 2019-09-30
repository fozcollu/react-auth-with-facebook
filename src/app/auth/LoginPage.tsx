import React, { useContext, useState } from "react";
import { Typography, Divider, Form, Row, Input, Button } from "antd";
import { AuthContext } from "../../providers/auth/AuthProvider";
import { ActionType } from "../../providers/auth/enum";
import SocialMediaAuth, { LoginOrSignUpEnum } from "./SocialMediaAuth";
import { FormComponentProps } from "antd/lib/form";
import { IUser } from "../../providers/auth";
import { GetUserWelcomeMessageByCurrentTime } from "../../utils/GetUserWelcomeMessageByCurrentTime";

interface LoginPageProps extends FormComponentProps<any> {
  callback: Function;
}

interface LoginPageStates {
  inProgress: boolean;
  socialMediaUser?: IUser;
}
const LoginPage: React.FunctionComponent<LoginPageProps> = props => {
  const [state, setState] = useState<LoginPageStates>({ inProgress: false });

  const { inProgress, socialMediaUser } = state;
  const { dispatch } = useContext(AuthContext);

  const {
    form: { getFieldDecorator },
    callback
  } = props;

  const cbResponse = (userInfo: IUser) => {
    setState(prev => ({
      ...prev,
      inProgress: true,
      socialMediaUser: userInfo
    }));

    dispatch({ type: ActionType.LOGIN, payload: { userInfo } });
    setTimeout(() => {
      callback && callback();
    }, 1000);
  };

  const registerForm = () => {
    //TODO
  };

  const inProgressRender = () => {
    if (!socialMediaUser) return "In progress";

    return (
      <React.Fragment>
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <img
            width="100"
            height="100"
            alt="pic"
            src={socialMediaUser.picture}
          ></img>
        </div>
        <Typography.Title level={2}>
          {GetUserWelcomeMessageByCurrentTime()}
        </Typography.Title>
        <Typography.Paragraph>{socialMediaUser.name}</Typography.Paragraph>

        <Typography.Paragraph style={{ marginTop: 100 }}>
          Welcome to e-shop
        </Typography.Paragraph>
        <Typography.Paragraph>
          You have successfully login. You will redirect Home Page.
        </Typography.Paragraph>
        <Typography.Paragraph>Have good shopping</Typography.Paragraph>
      </React.Fragment>
    );
  };

  const loginFormRender = () => {
    return (
      <React.Fragment>
        <Typography.Title level={3}>Login</Typography.Title>
        <SocialMediaAuth
          mode={LoginOrSignUpEnum.Login}
          cbResponse={cbResponse}
        />
        <Divider> or </Divider>
        <Form onSubmit={registerForm}>
          <Row>
            <Form.Item>
              {getFieldDecorator("email", { rules: [{ required: true }] })(
                <Input placeholder="E-mail adress" />
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item hasFeedback>
              {getFieldDecorator("password", { rules: [{ required: true }] })(
                <Input.Password placeholder="Password" />
              )}
            </Form.Item>
          </Row>
          <Row style={{ textAlign: "right" }}>
            <Button htmlType="submit">Login</Button>
          </Row>
        </Form>
      </React.Fragment>
    );
  };
  return (
    <div style={{ textAlign: "center", minWidth: "100%", minHeight: "100%" }}>
      <div
        style={{
          textAlign: "center",
          padding: "10px 40px",
          maxWidth: "500px",
          maxHeight: "500px",
          minHeight: "500px",
          backgroundColor: "white"
        }}
      >
        {inProgress ? inProgressRender() : loginFormRender()}
      </div>
    </div>
  );
};

export default Form.create<any>()(LoginPage);
