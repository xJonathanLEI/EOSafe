import React, { Component } from 'react';
import { Card, Col, Row, Divider, Modal, Input } from 'antd';

import ExpenditureDisplay from "../../components/ExpenditureDisplay";

class Dashborad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changeAllowanceModal: false
        };
    }

    showModal = () => {
        this.setState({
            changeAllowanceModal: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            changeAllowanceModal: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            changeAllowanceModal: false,
        });
    }

    render() {
        return (
            <div>
                <h1>HR Department</h1>
                <Card
                    style={{ width: '100%' }}
                    title="Allowance"
                    extra={<a href="#" onClick={this.showModal}>Apply to Change</a>}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <p style={{ textAlign: "center" }}>Monthly Allowance:</p>
                        </Col>
                        <Col span={12}>
                            <p style={{ textAlign: "center" }}><strong>1000.0000 EOS</strong></p>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <p style={{ textAlign: "center" }}>Allowance Used:</p>
                        </Col>
                        <Col span={12}>
                            <p style={{ textAlign: "center" }}><strong>800.0000 EOS</strong></p>
                        </Col>
                    </Row>
                </Card>
                <br />
                <Row gutter={16}>
                    <Col span={12}>
                        <Card
                            style={{ width: '100%' }}
                            title="Expenditures"
                            extra={<a href="#">Manage</a>}
                            activeTabKey={this.state.key}
                            onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                        >
                            <ExpenditureDisplay />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                            style={{ width: '100%' }}
                            title="Recent Expenses"
                            extra={<a href="#">See All</a>}
                            activeTabKey={this.state.key}
                            onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                        >
                            <Row gutter={16}>
                                <Col span={8}>
                                    <p style={{ margin: 0, color: "grey" }}>2018-08-20 16:00:00</p>
                                </Col>
                                <Col span={8}>
                                    <p style={{ margin: 0 }}>Recruit Ads.</p>
                                </Col>
                                <Col span={8}>
                                    <p style={{ margin: 0, fontWeight: "bold", textAlign: "right" }}>- 1000.0000 EOS</p>
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={16}>
                                <Col span={8}>
                                    <p style={{ margin: 0, color: "grey" }}>2018-08-20 16:00:00</p>
                                </Col>
                                <Col span={8}>
                                    <p style={{ margin: 0 }}>Recruit Ads.</p>
                                </Col>
                                <Col span={8}>
                                    <p style={{ margin: 0, fontWeight: "bold", textAlign: "right" }}>- 1000.0000 EOS</p>
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={16}>
                                <Col span={8}>
                                    <p style={{ margin: 0, color: "grey" }}>2018-08-20 16:00:00</p>
                                </Col>
                                <Col span={8}>
                                    <p style={{ margin: 0 }}>Recruit Ads.</p>
                                </Col>
                                <Col span={8}>
                                    <p style={{ margin: 0, fontWeight: "bold", textAlign: "right" }}>- 1000.0000 EOS</p>
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={16}>
                                <Col span={8}>
                                    <p style={{ margin: 0, color: "grey" }}>2018-08-20 16:00:00</p>
                                </Col>
                                <Col span={8}>
                                    <p style={{ margin: 0 }}>Recruit Ads.</p>
                                </Col>
                                <Col span={8}>
                                    <p style={{ margin: 0, fontWeight: "bold", textAlign: "right" }}>- 1000.0000 EOS</p>
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={16}>
                                <Col span={8}>
                                    <p style={{ margin: 0, color: "grey" }}>2018-08-20 16:00:00</p>
                                </Col>
                                <Col span={8}>
                                    <p style={{ margin: 0 }}>Recruit Ads.</p>
                                </Col>
                                <Col span={8}>
                                    <p style={{ margin: 0, fontWeight: "bold", textAlign: "right" }}>- 1000.0000 EOS</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <Modal
                    title="Change Department Allowance"
                    visible={this.state.changeAllowanceModal}
                    okText="Submit"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Row gutter={16}>
                        <Col span={10} style={{ textAlign: "center" }}>
                            <p>Current Allowance:</p>
                        </Col>
                        <Col span={10} style={{ textAlign: "right" }}>
                            <p>1000.0000</p>
                        </Col>
                        <Col span={4}>
                            <p>EOS</p>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={10} style={{ textAlign: "center" }}>
                            <p>Allocated Allowance:</p>
                        </Col>
                        <Col span={10} style={{ textAlign: "right" }}>
                            <p>800.0000</p>
                        </Col>
                        <Col span={4}>
                            <p>EOS</p>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={10} style={{ textAlign: "center" }}>
                            <p>Allowance Used:</p>
                        </Col>
                        <Col span={10} style={{ textAlign: "right" }}>
                            <p>400.0000</p>
                        </Col>
                        <Col span={4}>
                            <p>EOS</p>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ display: "flex", alignItems: "center" }}>
                        <Col span={10} style={{ textAlign: "center" }}>
                            <p style={{ margin: 0 }}>New Allowance:</p>
                        </Col>
                        <Col span={10} style={{ textAlign: "right" }}>
                            <Input placeholder="" />
                        </Col>
                        <Col span={4}>
                            <p style={{ margin: 0 }}>EOS</p>
                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }
}

export default Dashborad;