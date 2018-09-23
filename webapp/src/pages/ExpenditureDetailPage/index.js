import React, {Component} from 'react';
import {Card, Form, Table} from 'antd';


const FormItem = Form.Item
const Column = Table.Column

class ExpenditureDetailPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Expenditure Detail",
            modalTitle: "Apply to Charge",
            expense_history: [{
                key: 1,
                time: '1999 1 1 1:11:11',
                txid: '0xdsklfdjsklafdfsklfdsjklfkldsfklds',
                salary: "spend for jxxx",
                recruit: "100.0000 EOS",
            }]
        }

    }

    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        return (
            <div><Card key='allowance'
                       title="Allowance" extra={<a onClick={this.showModal} href="">Apply to Charge</a>}>

                <Form>
                    <FormItem label="Name:"  {...formItemLayout}>
                        <span className="ant-form-text">someone</span>
                    </FormItem>
                    <FormItem label="Department:"  {...formItemLayout}>
                        <span className="ant-form-text">HR</span>
                    </FormItem>
                    <FormItem label="Monthly Allowance:"  {...formItemLayout}>
                        <span className="ant-form-text">1000.0000 EOS</span>
                    </FormItem>
                    <FormItem label="Allowance Used:"  {...formItemLayout}>
                        <span className="ant-form-text">800.0000 EOS</span>
                    </FormItem>
                </Form>
            </Card>
                <br/>

                <Card key='expense_history'
                        title="Expense History">
                    <Table dataSource={this.state.expense_history}>

                        <Column
                            title="Time:"
                            dataIndex="time"
                            key="time"
                        />
                        <Column
                            title="Txid:"
                            dataIndex="txid"
                            key="txid"
                        />

                        <Column
                            title="Salary"
                            dataIndex="salary"
                            key="salary"
                        />
                        <Column
                            title="Recruit"
                            dataIndex="recruit"
                            key="recruit"
                        />
                    </Table>
                </Card>
            </div>

        )
    }
}

export default ExpenditureDetailPage;
