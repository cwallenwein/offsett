import React from "react";

// Load ant.design components
import { Col } from "antd";

// Load other components
import { OffsetWindow } from "./offset";

export class LeftSide extends React.Component {
  render() {
    return (
      <Col span={24} lg={12} className="left-side">
        <OffsetWindow />
      </Col>
    );
  }
}
