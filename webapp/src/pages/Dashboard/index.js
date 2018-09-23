import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';

class Dashborad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 'tab1',
            noTitleKey: 'app',
        };
    }

    render() {
        return (
            <div>
                <h1>HR Department</h1>
                <Card
                    style={{ width: '100%' }}
                    title="Allowance"
                    extra={<a href="#">Apply to Change</a>}
                    activeTabKey={this.state.key}
                    onTabChange={(key) => { this.onTabChange(key, 'key'); }}
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
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashborad;