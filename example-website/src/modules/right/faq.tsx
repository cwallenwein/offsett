import React from "react";

// Load ant.design components
import { Col, Collapse } from "antd";

// Load other components
//import { EmailSignup } from "./email";

// --- Setup ---
const { Panel } = Collapse;

export class FAQ extends React.Component {
  callback(key: any) {
    // Log which question is opened
    console.log(key);
  }

  render() {
    return (
      <div>
        <h1> Frequently Asked Questions </h1>
        <Col span={24}>
          <Collapse
            accordion
            bordered={false}
            defaultActiveKey={["6"]}
            onChange={this.callback}
          >
            <Panel header="What does Offsett do?" key="1">
              <p>
                Our mission is to help
                <b> reduce the environmental impact of cryptocurrencies.</b>
                &nbsp;One Bitcoin transaction produces more than 800 kg of CO₂.
                A typical German citizen produces the same amount of CO₂ in an
                entire month. Offsett enables you to easily offset your carbon
                footprint. So far we only support Bitcoin, but other
                cryptocurrencies also have a big environmental impact. We will
                soon expand to other cryptocurrencies.
              </p>
            </Panel>
            <Panel
              header="How big is the environmental impact of Bitcoin?"
              key="2"
            >
              <p>
                It is not trivial to calculate the net environmental impact of
                Bitcoin. We can make an educated guess on how much energy
                Bitcoin uses but it is hard to determine how much of this total
                energy is actually from renewable energies. This is because
                miners don't give details of their energy supply so we have to
                estimate it using the mining location and the energy-mix of that
                country. As a Reference: It is estimated that a single Bitcoin
                transaction uses about 2200 kWh. This is more electricity than a
                German household consumes in half a year!
              </p>
            </Panel>
            <Panel
              header="How do you calculate the carbon footprint of a Bitcoin wallet?"
              key="3"
            >
              <p>
                It's hard to track which type of energy was used for the mining
                transaction. We use the framework from&nbsp;
                <a href="https://digiconomist.net/bitcoin-energy-consumption">
                  this research
                </a>
                &nbsp;that uses the energy-mix of each country and tries to give
                an estimate based on the location of the miners. This give us a
                estimation of 0.843 kg of CO2 per transaction. With a daily
                average minimum of 200,000 Bitcoin transactions, it results on a
                tragic 167,6 tons of CO2 per day.
              </p>
            </Panel>

            <Panel
              header="How will the money I give to Offsett help the environment?"
              key="4"
            >
              <p>
                Our certificate provider has a wide range of projects all around
                the world that help remove CO2 from the environment. The
                selection goes from removing it using the ocean (Project
                RunningTide) , forests (Project BlueSource) and many more.
              </p>
            </Panel>

            <Panel header="I have more questions. How can I reach you?" key="5">
              <p>
                You can send us an email to&nbsp;
                <a href="mailto:hello@offsett.co">hello@offsett.co</a>.
              </p>
            </Panel>

            {/* <Panel header="Do you have a mailing list?" key="6"> 
                <p>
                  Yes we do! Sign up to receive the latest updates from offsett.
                </p>
                <EmailSignup />
              </Panel>*/}
          </Collapse>
        </Col>
      </div>
    );
  }
}
