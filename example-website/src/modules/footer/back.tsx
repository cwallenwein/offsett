import React from "react";

import { Button } from "antd";

import { Link } from "react-router-dom";

import { LeftOutlined } from "@ant-design/icons";

export class Back extends React.Component {
  render() {
    return (
      <>
        <div className="back">
          <Link to="/">
            <Button type="text" size="large" icon={<LeftOutlined />}>
              Back
            </Button>
          </Link>
        </div>
      </>
    );
  }
}
