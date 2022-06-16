import { useEffect, useState } from "react";

// Load ant.design components
import { Steps, Button, Card } from "antd";

// Load other components
import { EstimateEmissionsStep } from "./estimate";
import { YourImpactStep } from "./impact";
//import { PaymentStep } from "./payment";

// Load packages
import axios from "axios";

// --- Setup ---
const { Step } = Steps;

const axiosConfig = {
  baseURL: "https://backend-offsett-co.onrender.com",
  headers: {"Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImNocmlzLndhbGxlbndlaW5AZ21haWwuY29tIg.wEvX0YBYnUvZt_y2HlC13uGWBf8imvh0DfBrCexW5CM"} 
};

// --- Offset window ---
export function OffsetWindow() {
  const [current, setCurrent] = useState(0);
  const [shouldSubmitForm, setShouldSubmitForm] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [estimates, setEstimates] = useState(null);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const steps = () => [
    {
      title: "Estimate Emissions",
      content: (
        <EstimateEmissionsStep
          shouldSubmitForm={shouldSubmitForm}
          functions={{
            setPublicKey: setPublicKey,
            setEstimates: setEstimates,
            setSubmitButtonDisabled: setSubmitButtonDisabled,
          }}
          btc_public_key={publicKey}
        />
      ),
      controlls: (
        <>
          {/* Disable this button as long as the public key is not empty and later until it is verified */}
          <Button
            type="primary"
            htmlType="submit"
            disabled={submitButtonDisabled}
            onClick={() => {
              // automatically triggers to submit the form
              setShouldSubmitForm(true);
            }}
          >
            Estimate Emissions
          </Button>
        </>
      ),
      disabled: [false, false, false],
    },
    {
      title: "Your Impact",
      content: <YourImpactStep estimates={estimates} />,
      controlls: (
        <>
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Go Back
          </Button>
          {/*<Button type="primary" onClick={() => this.next()}>
          Next
      </Button>*/}
        </>
      ),
      disabled: [true, false, false],
    },
    /*{
      title: "Offset Emissions",
      content: <PaymentStep />,
      controlls: (<>
        <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
          Go Back
        </Button>
        <Button type="primary" onClick={() => message.success("Processing complete!")}>
          Done
        </Button>
      </>),
      disabled: [true, true, false],
    },*/
  ];

  const next = () => {
    setCurrent((current) => current + 1);
  };

  const prev = () => {
    setCurrent((current) => current - 1);
  };

  const onChange = (current: number) => {
    setCurrent(current);
  };

  const getEstimates = async (public_key: string) => {
    var url = `/estimate-impact/wallet-id/${public_key}`;
    try {
      const response = await axios.get(url, axiosConfig);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (shouldSubmitForm === true) {
      next();
      setShouldSubmitForm(false);
    }
  }, [shouldSubmitForm]);

  useEffect(() => {
    async function updateEstimates() {
      if (publicKey !== "") {
        const estimates = await getEstimates(publicKey);
        setEstimates(estimates);
      }
    }
    setEstimates(null);
    updateEstimates();
  }, [publicKey]);

  return (
    <Card
      title="Offset your carbon emissions"
      //extra={<a href="#">More</a>}
      className="offset-window"
    >
      <Steps current={current} size="small" onChange={onChange}>
        {steps().map((item) => (
          <Step key={item.title} title={item.title} disabled={item.disabled[current]} />
        ))}
      </Steps>
      <div className="steps-content">{steps()[current].content}</div>
      <div className="steps-action">{steps()[current].controlls}</div>
    </Card>
  );
}
