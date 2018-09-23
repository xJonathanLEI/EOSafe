import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { observable, action, computed } from 'mobx'
import { Modal, Form, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

import { ComponentExt } from '@utils/reactExt'

const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 9 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
    }
}

interface IStoreProps {
    createUser?: (user: IUserStore.IUser) => Promise<any>
    modifyUser?: (user: IUserStore.IUser) => Promise<any>
    getUsers?: () => Promise<any>
    changePageIndex?: (pageIndex: number) => void
}

interface IProps extends IStoreProps {
    visible: boolean
    onCancel: () => void
    user?: IUserStore.IUser
}

@inject(
    (store: IStore): IStoreProps => {
        const { createUser, modifyUser, getUsers, changePageIndex } = store.userStore
        return { createUser, modifyUser, getUsers, changePageIndex }
    }
)
@observer
class ApplyToChangeModal extends ComponentExt<IProps & FormComponentProps> {
    @observable
    private loading: boolean = false

    @computed
    get typeIsAdd() {
        return this.props.user === undefined
    }

    @computed
    get title() {
        return "Apply to Change"
    }

    @action
    toggleLoading = () => {
        this.loading = !this.loading
    }

    submit = (e?: React.FormEvent<any>): void => {
        if (e) {
            e.preventDefault()
        }
        const { user, createUser, modifyUser, getUsers, changePageIndex, onCancel, form } = this.props
        form.validateFields(
            async (err, values): Promise<any> => {
                if (!err) {
                    this.toggleLoading()
                    try {
                        if (this.typeIsAdd) {
                            await createUser(values)
                            changePageIndex(1)
                        } else {
                            await modifyUser({ ...values, _id: user._id })
                        }
                        getUsers()
                        onCancel()
                    } catch (err) {}
                    this.toggleLoading()
                }
            }
        )
    }

    render() {
        const { visible, onCancel, form } = this.props
        const { getFieldDecorator } = form
        // const initialAccount = user ? user.account : ''
        // const initialCategory = user ? user.category : userCategory[0]
        return (
            <Modal title={this.title} visible={visible} onOk={this.submit} onCancel={onCancel}>
                <Form onSubmit={this.submit}>
                    <FormItem {...formItemLayout} label="Current Allowance:">
                        <span className="ant-form-text">1000.0000 EOS</span>
                    </FormItem>
                    <FormItem {...formItemLayout} label="Allocated Allowance:">
                        <span className="ant-form-text">500.0000 EOS</span>
                    </FormItem>
                    <FormItem {...formItemLayout} label="Allocated Used:">
                        <span className="ant-form-text">400.0000 EOS</span>
                    </FormItem>
                    <FormItem {...formItemLayout} label="New Allowance:">
                        {getFieldDecorator('new_allowance', {
                            initialValue: "1000.0000 EOS",
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        })(<Input />)}
                    </FormItem>

                </Form>
            </Modal>
        )
    }
}

export default Form.create<IProps>()(ApplyToChangeModal)
