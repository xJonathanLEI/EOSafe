import React, {Component} from 'react';
import {Card, Col, Row, Divider, Modal, Input} from 'antd';

import ExpenditureDisplay from "../../components/ExpenditureDisplay";

class PageWithModal extends Component {
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

    getModal() {
        return (<Modal
            title={this.props.modalTitle}
            visible={this.state.changeAllowanceModal}
            okText="Submit"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
        >
        </Modal>)
    }

    getPageContainer() {
        return (<a href="#" onClick={this.showModal}>showModal</a>)
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {this.getModal()}
                {this.getPageContainer()}
            </div>
        );
    }
}

export default PageWithModal;
