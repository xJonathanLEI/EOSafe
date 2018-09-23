import React, { Component } from 'react';
import { Col, Row, Progress, Divider } from 'antd';

class ApplicationsDisplay extends Component {

    render() {
        return (
            <div>
                {
                    this.props.applications.map((value, index) =>
                        (<div>
                            <Row gutter={16}>
                                <Col span={10}>
                                    <p><strong>{value.name}</strong></p>
                                </Col>
                                <Col span={14} style={{ textAlign: "right" }}>
                                    <p>{value.used} / {value.total}</p>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Progress percent={value.percent} />
                                </Col>
                            </Row>
                            {index == this.props.applications.length - 1 ?
                                null
                                : <Divider />}
                        </div>)
                    )
                }
            </div>
        );
    }
}

export default ApplicationsDisplay;
