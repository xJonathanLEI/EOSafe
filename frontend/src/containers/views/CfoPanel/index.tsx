import * as React from 'react'
import {observer} from 'mobx-react'
// import { observable, action } from 'mobx'

import * as styles from './index.scss'
import {Button, Progress} from "antd";

@observer
class CfoPanel extends React.Component {
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
        return (
            <div className={styles.container}>
                <h1>CFO DashBoard</h1>
                <div>
                    <h2>Overview</h2>
                    <h3>Wallet Balance: 10000 EOS</h3>
                    <h3>Monthly Allowance: 10000 EOS</h3>
                </div>
                <div>
                    <h2>Departments</h2>
                    <h3>HR</h3>
                    <Button>Suspend</Button>
                    <Button type="danger">Remove</Button>
                    <Progress percent={50} status="active"/>
                    <h4>800/1000</h4>
                </div>


                <div>
                    <h2>Applications</h2>
                    <h3>HR</h3>
                    <Button type="primary">Approve</Button>
                    <Button type="danger">Deny</Button>
                    <h4>Allowance: 1000->2000</h4>
                </div>

                <img src={require('./WechatIMG164.jpeg') } />

            </div>
        )
    }
}

export default CfoPanel
