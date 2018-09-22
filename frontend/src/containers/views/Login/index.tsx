import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { observable, runInAction } from 'mobx'
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import {Alert} from "reactstrap"

import * as styles from './index.scss'
// import ScatterJS from 'scatter-js/dist/scatter.esm'

const FormItem = Form.Item

interface IStoreProps {
    routerStore?: RouterStore
    login?: (data: IAuthStore.LoginParams) => Promise<any>
}

@inject(
    (store: IStore): IStoreProps => {
        const { routerStore, authStore } = store
        const { login } = authStore
        return {
            routerStore,
            login
        }
    }
)
@observer
class Login extends React.Component<IStoreProps & FormComponentProps> {
    @observable
    private loading: boolean = false

    submit = (e: React.FormEvent<any>): void => {
        e.preventDefault()
        this.props.form.validateFields(
            async (err, values): Promise<any> => {
                if (!err) {
                    runInAction('SHOW_LOGIN_LOADING', () => {
                        this.loading = true
                    })
                    await this.props.login(values)
                    runInAction('HIDE_LOGIN_LOADING', () => {
                        this.loading = false
                    })
                }
            }
        )
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className={styles.login}>
                <Form onSubmit={this.submit} className={styles.form}>
                    <div className={styles.logoBox}>
                        <Icon type="ant-design" />
                    </div>
                    <div>
                        <Alert color="success">
                            <p>EOS Enterprise</p>
                            <p>Wallet</p>
                        </Alert>
                        <Button type="primary" size="large" onClick={this.authorizeScatter()}>Login With Scatter</Button>
                    </div>

                    <FormItem hasFeedback>
                        {getFieldDecorator('account', {
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="account"
                            />
                        )}
                    </FormItem>
                    <FormItem hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="password"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <div className={styles.tips}>
                            <span>username: admin</span>
                            <span>password: admin</span>
                        </div>
                        <Button type="primary" htmlType="submit" block loading={this.loading}>
                            login
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }

    private authorizeScatter() {
        // const network = {
        //     blockchain: 'eos',
        //     protocol: 'https',
        //     host: 'nodes.get-scatter.com',
        //     port: 443,
        //     chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
        // }
        //
        // ScatterJS.scatter.connect('xxx').then(connected => {
        //
        //     if (!connected) return false;
        //
        //     const scatter = ScatterJS.scatter;
        //
        //     const requiredFields = {accounts: [network]};
        //     scatter.getIdentity(requiredFields).then(() => {
        //
        //     }).catch(error => {
        //         console.error(error);
        //     });
        // });
        return undefined;
    }
}

export default Form.create<{}>()(Login)
