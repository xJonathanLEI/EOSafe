import * as React from 'react'
import { observer } from 'mobx-react'
// import { observable, action } from 'mobx'

import * as styles from './index.scss'
import {Form, Input} from "antd";
import {ComponentExt} from "@utils/reactExt";
import {FormComponentProps} from "antd/lib/form";
import {IStoreProps} from "@shared/PrivateRoute";
import ExpenseHistory from "@views/ExpenseDetailPage/ExpenseHistory";
const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
    }
}

interface IProps extends IStoreProps {

}

@observer
class ExpenseDetailPage extends ComponentExt<IProps & FormComponentProps> {
    // @observable
    // private tableScrollY: number = 0

    private containerRef: HTMLDivElement = null

    // @action
    setTableScrollY = () => {
        if (this.containerRef) {
            // this.tableScrollY = this.containerRef.clientHeight - 60
        }
    }

    setContainerRef = (ref: HTMLDivElement) => {
        this.containerRef = ref
        this.setTableScrollY()
    }

    bindOrUnbindResize = (type: 'bind' | 'unbind') => {
        const listener = type === 'bind' ? window.addEventListener : window.removeEventListener
        listener('resize', this.setTableScrollY, false)
    }

    componentDidMount() {
        this.bindOrUnbindResize('bind')
    }

    componentWillUnmount() {
        this.bindOrUnbindResize('unbind')
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className={styles.container}>
                <div>
                    <h1>Expense Detail Page</h1>
                </div>

                <div>
                    <h3>Overview</h3>
                    <Form>
                        <FormItem {...formItemLayout} label="Name:">
                            {getFieldDecorator('name', {
                                initialValue: "Saby",
                                rules: [
                                    {
                                        required: true
                                    }
                                ]
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Department:">
                            {getFieldDecorator('depart', {
                                initialValue: "HR",
                                rules: [
                                    {
                                        required: true
                                    }
                                ]
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Allowance:">
                            {getFieldDecorator('allowance', {
                                initialValue: "1000.00 EOS",
                                rules: [
                                    {
                                        required: true
                                    }
                                ]
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Used:">
                            {getFieldDecorator('used', {
                                initialValue: "800.00 EOS",
                                rules: [
                                    {
                                        required: true
                                    }
                                ]
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </div>

                <div>
                    <h3>Expense History</h3>
                    <ExpenseHistory/>
                </div>

                <img src={require('./WechatIMG159.jpeg') } />
            </div>
        )
    }
}

export default Form.create<IProps>()(ExpenseDetailPage)
// export default Form.create<IProps>()(ApplyToChangeModal)
// export default Form.create<{}>()(Login)
