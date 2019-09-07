import React from "react";
import { Layout, Avatar, Popover } from "antd";
import UserMenu from "./UserMenu";
const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="header" style={{ textAlign: "right" }}>
      <Popover content={<UserMenu />} trigger={"click"}>
        <a className="ant-dropdown-link" href="/#">
          <Avatar size={42} icon="user" />
        </a>
      </Popover>
    </Header>
  );
};

export default AppHeader;
