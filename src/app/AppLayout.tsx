import React, { ReactNode } from "react";

import { Layout, Breadcrumb } from "antd";
import AppHeader from "./AppHeader";
import AppMenu from "./AppMenu";

const { Content } = Layout;

interface IProps {
  children?: ReactNode;
}
const AppLayout: React.FunctionComponent<IProps> = props => {
  const { children } = props;
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#eee" }}>
      <AppHeader />
      <Layout>
        <AppMenu />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: "#f0f2f5",
              padding: 24,
              margin: 0
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
