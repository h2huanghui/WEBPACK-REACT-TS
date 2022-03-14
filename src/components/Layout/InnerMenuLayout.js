import React, { Component } from 'react';
import {Menu,Affix} from 'antd';
import {push} from 'connected-react-router'
import {connect} from 'react-redux';
import '@/styles/components/Layout/index.less';
class InnerMenuLayout extends Component {
  constructor(props){
    super(props)
  }
  menuSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    this.props.push(key)
  }
  render() {
    const {config,current} = this.props
    return (
      
      <div className="dsc-inner-menu-layout">
        <div className="dsc-inner-menu-layout-menu">
          <Affix offset={80}>
            <Menu
              onClick={this.handleClick}
              defaultSelectedKeys={[current]}
              mode="inline"
              onSelect={this.menuSelect}
            >
              {config.map(menu => {
                return <Menu.Item key={menu.route} >{menu.title}</Menu.Item>
              })}
            </Menu>
          </Affix>
        </div>
        <div className="dsc-inner-menu-layout-inner">
          {this.props.children}
        </div>
        
      </div>
    )
  }
}

export default InnerMenuLayout