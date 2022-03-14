import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill';
import "core-js/fn/array/includes";
import "core-js/fn/string/includes";

import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import { ConfigProvider } from 'antd';

import configureStore,{history} from '@/redux/configureStore'

import '@/styles/global.less'

const store = configureStore();

class App extends Component {
  
  componentDidCatch (err, info) {
    //如果找不到chunk，说明未登录，返回首页
    console.error('DS_CENTER_ERROR:',err, info);
    if(err.toString().indexOf('ChunkLoadError') > -1){
      window.location = '/v'
    }

  }
  
  render(){
    return (<Provider store={store}>
      <ConfigProvider>
        <ConnectedRouter history={history}>
        
        </ConnectedRouter>
      </ConfigProvider>
    </Provider>
    )
  }
}


ReactDOM.render(<App />,document.getElementById('root'))