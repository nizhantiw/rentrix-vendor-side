import React from "react";
import { Layout } from "antd";
import Login from "./Login";
import HeaderMain from "./HeaderMain";
import FooterMain from "./FooterMain";

const { Content } = Layout;

export default function LayoutMain() {
  return (
    <>
      <HeaderMain />
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Login />
      </Content>
      <FooterMain />
    </>
  );
}
