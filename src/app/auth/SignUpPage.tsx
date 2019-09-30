import React, { useState } from "react";
import { Typography, Form, Row, Input, Divider, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import SocialMediaAuth, { LoginOrSignUpEnum } from "./SocialMediaAuth";
import { withRouter, RouteComponentProps } from "react-router";
import { GetUserWelcomeMessageByCurrentTime } from "../../utils/GetUserWelcomeMessageByCurrentTime";
import { IUser } from "../../providers/auth";

type SignUpPageProps = RouteComponentProps &
  FormComponentProps<any> & {
    callback?: Function;
  };

interface SignUpPageStates {
  inProgress: boolean;
  socialMediaUser?: IUser;
}
const SignUpPage: React.FunctionComponent<SignUpPageProps> = props => {
  const [state, setState] = useState<SignUpPageStates>({ inProgress: false });
  const {
    form: { getFieldDecorator },
    callback
  } = props;
  const { inProgress, socialMediaUser } = state;

  const cbResponse = (user: IUser) => {
    setState(prev => ({
      ...prev,
      inProgress: true,
      socialMediaUser: user
    }));

    setTimeout(() => {
      callback && callback();
    }, 2000);
  };

  const registerForm = () => {
    //TODO
  };
  const registerFormRender = () => {
    return (
      <React.Fragment>
        <Typography.Title level={3}>Sign Up</Typography.Title>
        <SocialMediaAuth
          mode={LoginOrSignUpEnum.SignUp}
          cbResponse={cbResponse}
        />
        <Divider> or </Divider>
        <Form onSubmit={registerForm}>
          <Row>
            <Form.Item>
              {getFieldDecorator("name", { rules: [{ required: true }] })(
                <Input placeholder="Full Name" />
              )}
            </Form.Item>
          </Row>
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
            <Button htmlType="submit">Register</Button>
          </Row>
        </Form>
      </React.Fragment>
    );
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
          You have successfully sign up. You will redirect Home Page.
        </Typography.Paragraph>
        <Typography.Paragraph>Have good shopping</Typography.Paragraph>
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
        {inProgress ? inProgressRender() : registerFormRender()}
      </div>
    </div>
  );
};

const SignUpWithRotuer = withRouter(SignUpPage);

export default Form.create<any>()(SignUpWithRotuer);
