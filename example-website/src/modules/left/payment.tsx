import React from "react";

// Load ant.design components
import { Result } from "antd";

// Load icons
import { ClockCircleOutlined } from "@ant-design/icons";

export class PaymentStep extends React.Component {
  render() {
    return <Result icon={<ClockCircleOutlined />} title="Work in progress" />;
  }
}
