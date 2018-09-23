import * as React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { Button } from 'antd'

import * as styles from './index.scss'
import ApplyToChangeModal from '../ApplyToChangeModal'

@observer
class Header extends React.Component {
    @observable
    private applyToChangeModalVisible: boolean = false

    @action
    toggleApplyToChangeModalVisible = () => {
        this.applyToChangeModalVisible = !this.applyToChangeModalVisible
    }

    render() {
        return (
            <div className={styles.header}>
                <Button type="primary" onClick={this.toggleApplyToChangeModalVisible}>
                    add user
                </Button>
                <ApplyToChangeModal visible={this.applyToChangeModalVisible} onCancel={this.toggleApplyToChangeModalVisible} />
            </div>
        )
    }
}

export default Header
