import React, { Component } from 'react';
import { Col, Row, Progress, Divider } from 'antd';

class ExpenditureDisplay extends Component {

    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={10}>
                        <p><strong>Salary</strong></p>
                    </Col>
                    <Col span={14} style={{ textAlign: "right" }}>
                        <p>800.0000 EOS / 1000.0000 EOS</p>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Progress percent={80} />
                    </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                    <Col span={10}>
                        <p><strong>Salary</strong></p>
                    </Col>
                    <Col span={14} style={{ textAlign: "right" }}>
                        <p>800.0000 EOS / 1000.0000 EOS</p>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Progress percent={80} />
                    </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                    <Col span={10}>
                        <p><strong>Salary</strong></p>
                    </Col>
                    <Col span={14} style={{ textAlign: "right" }}>
                        <p>800.0000 EOS / 1000.0000 EOS</p>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Progress percent={80} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ExpenditureDisplay;