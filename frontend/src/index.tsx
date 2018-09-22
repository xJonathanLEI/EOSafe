import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import createHashHistory from 'history/createHashHistory'
import { syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router-dom'
import { loadIcons } from './config/icon-loader';

import AppRouter from '@shared/App'
import * as store from './store'

const hashHistory = createHashHistory()
const history = syncHistoryWithStore(hashHistory, store.routerStore)

configure({ enforceActions: 'observed' })
loadIcons();
const render = Component => {
    ReactDOM.render(
        <Provider {...store}>
            <Router history={history}>
                <Component />
            </Router>
        </Provider>,
        document.getElementById('app') as HTMLElement
    )
}

render(AppRouter)
