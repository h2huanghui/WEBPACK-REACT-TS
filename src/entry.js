import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill';
import "core-js/fn/array/includes";
import "core-js/fn/string/includes";

import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import { ConfigProvider } from 'antd';

import configureStore,{history} from '@/redux/configureStore'
import Main from '@/main'

import Cookies from 'js-cookie'
import intl from 'react-intl-universal';

import '@/styles/global.less'

import en_US from 'antd/es/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';

require('intl/locale-data/jsonp/en');
require('intl/locale-data/jsonp/zh');

const store = configureStore();

const locales = {
  "en_US": require('./locales/en_US.json'),
  "zh_CN": require('./locales/zh_CN.json'),
};

class App extends Component {
  
  state = {
    initDone: false
  }
  componentDidMount(){
    this.loadLocales();
  }

  loadLocales(){
    let antdLocals = {
      en_US,
      zh_CN
    }
    
    // let currentLocale = !!Cookies.get('lang')? intl.determineLocale({
    //   cookieLocaleKey:'lang'
    // }):'en_US'
    let currentLocale = 'zh_CN';
    intl.init({
      currentLocale,
      locales
    }).then(()=>{
      this.setState({
        initDone:true,
        antdLocals: antdLocals[currentLocale]
      })
    })
  }


  componentDidCatch (err, info) {
    //如果找不到chunk，说明未登录，返回首页
    console.error('DS_CENTER_ERROR:',err, info);
    if(err.toString().indexOf('ChunkLoadError') > -1){
      window.location = '/v'
    }
    
  }
  
  render(){
    return (
      this.state.initDone &&
      <Provider store={store}>
        <ConfigProvider locale={this.state.antdLocals} >
          <ConnectedRouter history={history}>
            <Main />
          </ConnectedRouter>
        </ConfigProvider>
      </Provider>
    )
  }
}


ReactDOM.render(<App />,document.getElementById('root'))