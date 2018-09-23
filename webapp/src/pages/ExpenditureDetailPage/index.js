import React, { Component } from 'react';
import { Card, Divider, Row, Col } from 'antd';
import Eos from "eosjs";

const eos = Eos({
    httpEndpoint: "http://127.0.0.1:8888",
    chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    keyProvider: JSON.parse(sessionStorage.getItem("privateKey"))
});

class ExpenditureDetailPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            departmentId: Number.parseInt(sessionStorage.getItem("departmentId")),
            expenditureId: 1,
            expenditureName: "-",
            expenditureRecipient: "-",
            expenditureAllowance: "-",
            expenditureUsed: "-",
            tokenName: "XXX",
            expenses: null
        };

        this.initPage();
    }

    initPage = async () => {

        const configs = (await eos.getTableRows(true, "wallet", "wallet", "configs")).rows[0];
        let expenditure;
        const expenditures = (await eos.getTableRows(true, "wallet", this.state.departmentId, "expenditures")).rows;
        for (let i = 0; i < expenditures.length; i++) {
            const currentExpenditure = expenditures[i];
            if (currentExpenditure.id == this.state.expenditureId) {
                expenditure = currentExpenditure;
            }
        }

        const token = this.parseToken(configs.token);

        const expenses = (await eos.getTableRows(true, "wallet", "wallet", "expenses")).rows;
        const displayedExpenses = new Array();
        for (let i = expenses.length - 1; i >= 0; i--) {

            const currentExpense = expenses[i];
            if (currentExpense.department_id != this.state.departmentId || currentExpense.expenditure_id != this.state.expenditureId)
                continue;

            displayedExpenses.push({
                time: currentExpense.time,
                amount: this.scaleAmount(currentExpense.amount, token.precision),
                memo: currentExpense.memo
            });
        }

        this.setState({
            expenditureName: expenditure.name,
            expenditureRecipient: expenditure.recipient,
            expenditureAllowance: this.scaleAmount(expenditure.monthly_allowance, token.precision),
            expenditureUsed: this.scaleAmount(expenditure.allowance_used, token.precision),
            tokenName: token.name,
            tokenPrecision: token.precision,
            expenses: displayedExpenses
        });
    }

    formatAmount = (amount, token) => {
        return this.scaleAmount(amount, token.precision) + " " + token.name;
    }

    scaleAmount = (amount, precision) => {
        return (amount / Math.pow(10, precision)).toFixed(precision);
    }

    parseToken = (token) => {

        let symbolName = "";

        let tokenValue = token.value;
        let tokenPrecision = tokenValue & 0xFF;
        tokenValue >>= 8;
        while (tokenValue > 0) {
            symbolName += String.fromCharCode(tokenValue & 0xFF);
            tokenValue >>= 8;
        }

        return { name: symbolName, precision: tokenPrecision };
    }

    render() {
        return (
            <div>
                <h1>{this.state.expenditureName} Expenditure</h1>
                <Card title="Allowance" extra={<div><a onClick={this.showModal} href="#">Spend</a> | <a onClick={this.showModal} href="#">Apply to Charge</a></div>}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <p style={{ textAlign: "center" }}>Recipient:</p>
                        </Col>
                        <Col span={12}>
                            <p style={{ textAlign: "center" }}><strong>{this.state.expenditureRecipient}</strong></p>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <p style={{ textAlign: "center" }}>Allowance:</p>
                        </Col>
                        <Col span={12}>
                            <p style={{ textAlign: "center" }}><strong>{this.state.expenditureAllowance} {this.state.tokenName}</strong></p>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <p style={{ textAlign: "center" }}>Used:</p>
                        </Col>
                        <Col span={12}>
                            <p style={{ textAlign: "center" }}><strong>{this.state.expenditureUsed} {this.state.tokenName}</strong></p>
                        </Col>
                    </Row>
                </Card>
                <br />

                <Card title="Expense History">
                    {
                        this.state.expenses == null ? null :
                            this.state.expenses.map((value, index) => <div>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <p style={{ margin: 0, color: "grey" }}>2018-08-20 16:00:00</p>
                                    </Col>
                                    <Col span={8}>
                                        <p style={{ margin: 0 }}>{value.memo}</p>
                                    </Col>
                                    <Col span={8}>
                                        <p style={{ margin: 0, fontWeight: "bold", textAlign: "right" }}>- {value.amount} {this.state.tokenName}</p>
                                    </Col>
                                </Row>
                                {index == this.state.expenses.length - 1 ? null : <Divider />}
                            </div>)
                    }
                </Card>
            </div>

        )
    }
}

export default ExpenditureDetailPage;
