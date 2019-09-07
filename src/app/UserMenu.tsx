import React, { useContext, useState } from "react";
import { Menu, Typography, Icon, Modal } from "antd";

import LoginPage from "./auth/LoginPage";
import SignUpPage from "./auth/SignUpPage";

import { AuthContext } from "../providers/auth/AuthProvider";
import { ActionType } from "../providers/auth/enum";

interface IUserMenuState {
  visibleLoginModal: boolean;
  visibleSignUpModal: boolean;
}

const UserMenu: React.FunctionComponent = props => {
  const authContext = useContext(AuthContext);
  const { isAuth, user } = authContext.state;
  const { dispatch } = authContext;

  const [state, setState] = useState<IUserMenuState>({
    visibleLoginModal: false,
    visibleSignUpModal: false
  });

  const { visibleLoginModal, visibleSignUpModal } = state;

  const toggleLoginModal = () => {
    setState(prev => ({ ...prev, visibleLoginModal: !prev.visibleLoginModal }));
  };
  const toggleSignUpModal = () => {
    setState(prev => ({
      ...prev,
      visibleSignUpModal: !prev.visibleSignUpModal
    }));
  };

  const renderMenu = () => {
    if (isAuth && user) {
      return (
        <React.Fragment>
          <Typography.Paragraph>
            {user.name} {user.surname}
          </Typography.Paragraph>
          <Menu style={{ border: "none" }}>
            <Menu.Item key="0">
              <Icon type="shopping-cart" />
              Orders
            </Menu.Item>
            <Menu.Item key="1">
              <Icon type="user" />
              User Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              key="3"
              onClick={() => dispatch({ type: ActionType.SIGNOUT })}
            >
              <Icon type="logout" />
              Sign Out
            </Menu.Item>
          </Menu>
        </React.Fragment>
      );
    } else {
      return (
        <Menu style={{ border: "none" }}>
          <Menu.Item key="0" onClick={toggleLoginModal}>
            <Icon type="login" />
            Login
          </Menu.Item>
          <Menu.Item key="1" onClick={toggleSignUpModal}>
            Sign Up
          </Menu.Item>
          <Menu.Item key="2">Language</Menu.Item>
          <Menu.Item key="3">Help</Menu.Item>
        </Menu>
      );
    }
  };
  const loginModal = () => {
    return (
      <Modal
        visible={visibleLoginModal}
        onCancel={toggleLoginModal}
        footer={null}
      >
        <LoginPage />
      </Modal>
    );
  };
  const signUpModal = () => {
    return (
      <Modal
        visible={visibleLoginModal}
        onCancel={toggleLoginModal}
        footer={null}
      >
        <SignUpPage />
      </Modal>
    );
  };

  return (
    <React.Fragment>
      {visibleLoginModal && loginModal()}
      {visibleSignUpModal && signUpModal()}
      {renderMenu()}
    </React.Fragment>
  );
};

export default UserMenu;
