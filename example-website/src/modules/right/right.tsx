import React from "react";

import { Col } from "antd";

import { FAQ } from "./faq";

export class RightSide extends React.Component {
  render() {
    return (
      <Col span={24} lg={12} className="right-side">
        <div>
          <FAQ />
        </div>
      </Col>
    );
  }
}
