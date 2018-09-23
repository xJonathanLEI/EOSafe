import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import './App.css';

import dashboard from "./pages/Dashboard";
import placeholderBoard from "./pages/PlaceholderBoard"
const { Header, Content, Footer } = Layout;

class App extends Component {

    state = {
        current: 'Dashborad',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Router>
                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px' }}>
                            <Menu.Item key="1" onClick={()=>window.location="/"}>Dashboard</Menu.Item>
                            <Menu.Item key="2" onClick={()=>window.location="/placeholder"}>Placeholder</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <div style={{ background: '#fff', marginTop: 24, padding: 24, minHeight: 280 }}>
                            <Switch>
                                <Route exact path="/" component={dashboard} />
                                <Route exact path="/placeholder" component={placeholderBoard} />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Created by EOSafe
                    </Footer>
                </Layout>
            </Router>
        );
    }
}



export default App;
