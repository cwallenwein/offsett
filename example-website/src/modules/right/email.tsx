import React from "react";

// Load ant.design components
import { Form, Input, Button } from "antd";

export class EmailSignup extends React.Component {
  onFinish = (values: any) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // https://github.com/react-component/field-form/blob/master/src/utils/messages.ts
  validateMessages = {
    required: "Your ${label} is required",
    types: {
      email: "Please type a valid email address",
    },
  };

  render() {
    return (
      <div>
        <Form
          name="basic"
          layout="vertical"
          wrapperCol={{ span: 12 }}
          onFinish={this.onFinish} // Trigger after submitting form and verifying data successfully
          onFinishFailed={this.onFinishFailed}
          validateMessages={this.validateMessages}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Form.Item
            label="Name"
            name="first_name"
            rules={[
              {
                //message: "Please enter your name"
              },
            ]}
          >
            <Input placeholder="Your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                //message: "Please enter your email address"
              },
            ]}
          >
            <Input placeholder="Your email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Get updates
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
