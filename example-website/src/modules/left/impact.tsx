import React from "react";

// Load ant.design components
import { Col, Row, Divider, Card, Spin } from "antd";

// Load icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faWeightHanging } from "@fortawesome/free-solid-svg-icons";

import { LoadingOutlined } from "@ant-design/icons";

export class YourImpactStep extends React.Component<any, any> {
  getEstimates = () => {
    return this.props.estimates;
  };

  isEstimatesLoading = () => {
    return this.getEstimates() === null;
  };

  getNumberOfTransactionsOfWallet = () => {
    const estimates = this.getEstimates()?.numberOfTransactions;
    if (estimates === null) {
      return "";
    } else {
      return estimates;
    }
  };

  getWalletEmissionsInGramsCo2 = () => {
    const emissionsInGramsCo2 = this.getEstimates()?.emissionsInGramsCo2;
    if (emissionsInGramsCo2 === null) {
      return "";
    } else {
      return Math.round(emissionsInGramsCo2 / 1000);
    }
  };

  getUsedEnergyOfWalletInWattHours = () => {
    const usedEnergyInWattHours = this.getEstimates()?.usedEnergyInWattHours;
    if (usedEnergyInWattHours === null) {
      return "";
    } else {
      return Math.round(usedEnergyInWattHours / 1000);
    }
  };

  //isEstimatesLoaded

  antIcon = (<LoadingOutlined style={{ fontSize: 24 }} spin />);

  render() {
    return (
      <Col>
        <Row>
          <Col span={24}>
            <div>
              <p> No. of transactions</p>
              <Spin spinning={this.isEstimatesLoading()} indicator={this.antIcon}>
                {this.getNumberOfTransactionsOfWallet()}
              </Spin>
            </div>
          </Col>
        </Row>
        <Divider />
        <p style={{ marginBottom: "24px" }}>This is equivalent to</p>
        <Row gutter={[24, 24]} style={{ margin: "12px 12px" }}>
          <Col span={24} lg={12}>
            <Card title="" size="small" loading={this.isEstimatesLoading()}>
              <FontAwesomeIcon icon={faWeightHanging} />
              <p>
                <b>{this.getWalletEmissionsInGramsCo2()} kg</b> of co2
              </p>
            </Card>
          </Col>
          <Col span={24} lg={12}>
            <Card title="" size="small" loading={this.isEstimatesLoading()}>
              <FontAwesomeIcon icon={faBolt} />
              <p>
                <b>{this.getUsedEnergyOfWalletInWattHours()} kwh</b> of electricity
              </p>
            </Card>
          </Col>
        </Row>
      </Col>
    );
  }
}
