import React from 'react';
import ReactDOM from 'react-dom';
// import Hello from './components/demo/Hello';
// import HelloClass from './components/demo/HelloClass';
// import HelloHOC from './components/demo/HelloHOC';
// import HelloHooks from './components/demo/HelloHooks';
// import App from './App';
import { Provider } from 'react-redux';
import Root from './routes';
import store from './redux/store';
import '@/styles/global.less';

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
