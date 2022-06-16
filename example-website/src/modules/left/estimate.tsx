import { useEffect, useState } from "react";

import { validate } from "wallet-address-validator";

// Load ant.design components
import { Form, Input } from "antd";

interface pEstimateEmissionsStep {
  shouldSubmitForm: any;
  functions: any;
  btc_public_key: any;
}

export function EstimateEmissionsStep(props: pEstimateEmissionsStep) {
  return (
    <div className="estimate-emissions-step">
      <p>
        {" "}
        Offsett enables you to easily offset the carbon emissions of your
        Bitcoin transactions. Just type in the Public Key of your Bitcoin
        wallet. Then we estimate it's emissions and help you offset them.{" "}
      </p>
      <BtcPublicKeyForm
        shouldSubmitForm={props.shouldSubmitForm}
        functions={props.functions}
        btc_public_key={props.btc_public_key}
      />
    </div>
  );
}

interface pBtcPublicKeyForm {
  shouldSubmitForm: any;
  functions: any;
  btc_public_key: any;
}

function BtcPublicKeyForm(props: pBtcPublicKeyForm) {
  const [form] = Form.useForm();
  // let validateStatus:
  // | undefined
  // | "success"
  // | "warning"
  // | "error"
  // | "validating";

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    props.functions.setPublicKey(values.public_key);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const validateMessages = {
    required: "'${name}' is required!",
    // ...
  };

  //const publicBtcAddressPattern = new RegExp('/^[13n][1-9A-Za-z][^OIl]{20,40}/');

  useEffect(() => {
    if (props.shouldSubmitForm === true) {
      form.submit();
    } else {
    }
  }, [props.shouldSubmitForm]);

  // inform submit button if field is empty
  const updateSubmitButtonState = (e: any) => {
    const hasValidLength = (value: string) => {
      return value.length >= 25 && value.length <= 34;
    };

    const value: string = e.target.value;

    if (hasValidLength(value) && validate(value, "BTC")) {
      props.functions.setSubmitButtonDisabled(false);
      // validateStatus = "validating";
    } else {
      props.functions.setSubmitButtonDisabled(true);
      // validateStatus = "error";
    }
  };

  return (
    <Form
      name="estimate_form"
      layout="vertical"
      form={form}
      wrapperCol={{
        span: 24,
        //offset: 6
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateMessages={validateMessages}
      size="large"
      initialValues={{ public_key: props.btc_public_key }}
    >
      <Form.Item
        //label="BTC Public Key"
        name="public_key"
        // hasFeedback
        // validateStatus={validateStatus}
        rules={[
          {
            required: true, //pattern: publicBtcAddressPattern
          },
        ]}
      >
        <Input
          placeholder="Your Bitcoin Public Key"
          onChange={updateSubmitButtonState}
        />
      </Form.Item>
    </Form>
  );
}
