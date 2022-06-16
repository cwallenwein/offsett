import React from "react";

// Load ant.design components
import { Row } from "antd";

// Load other components
import LeftSide from "./left";
import RightSide from "./right";
import Footer from "./footer";

export function Home() {
  return (
    <Row>
      <LeftSide />
      <RightSide />
      <Footer />
    </Row>
  );
}
