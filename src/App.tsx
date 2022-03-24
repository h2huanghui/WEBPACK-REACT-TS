import React from 'react';
import { Route, Link } from 'react-router-dom';
import { ConfigProvider, Layout, Menu } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import Employee from './components/employee';
import Setting from './components/setting';

import './App.css';

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" className="menu">
            <Menu.Item key="employee">
              <Link to="/employe">员工管理</Link>
            </Menu.Item>
            <Menu.Item key="setting">
              <Link to="/setting">系统设置</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="contentWrap">
          <div className="content">
            <Route path="/" exact component={Employee} />
            <Route path="/employee" component={Employee} />
            <Route path="/setting" component={Setting} />
          </div>
        </Content>
        <Footer> TypeScript in Action</Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
