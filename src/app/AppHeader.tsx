import React, { useContext } from "react";
import { Layout, Avatar, Popover } from "antd";
import UserMenu from "./UserMenu";
import { AuthContext } from "./../providers/auth/AuthProvider";
const { Header } = Layout;

const AppHeader = () => {
  const {
    state: { isAuth, user }
  } = useContext(AuthContext);
  return (
    <Header className="header" style={{ textAlign: "right" }}>
      <Popover placement="bottom" content={<UserMenu />} trigger={"focus"}>
        <a className="ant-dropdown-link" href="/#">
          {isAuth && user && user.picture ? (
            <Avatar src={user.picture} size={42} icon="user" />
          ) : (
            <Avatar size={42} icon="user" />
          )}
        </a>
      </Popover>
    </Header>
  );
};

export default AppHeader;
