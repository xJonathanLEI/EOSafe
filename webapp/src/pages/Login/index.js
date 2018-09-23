import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button } from 'antd';
import "./index.css";

class Login extends Component {

    handleHrLogin = () => {
        this.props.history.push("/manager");
    }

    handleMktLogin = () => {
        this.props.history.push("/manager");
    }

    handleCfoLogin = () => {
        this.props.history.push("/cfo");
    }

    render() {
        return (
            <div className="loginPage">
                <div className="formHolder">
                    <div className="contentHolder">
                        <h2><strong>Login to EOSafe</strong></h2>
                        <p>Keys are hard-coded into the application for demostration purpose only. Wallet management software like Scatter should be used instead for production.</p>
                        <Button className="btn" type="primary" block onClick={this.handleHrLogin}>Login as HR Manager</Button>
                        <Button className="btn" type="primary" block onClick={this.handleMktLogin}>Login as Marketing Manager</Button>
                        <Button className="btn" type="primary" block onClick={this.handleCfoLogin}>Login as CFO</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);