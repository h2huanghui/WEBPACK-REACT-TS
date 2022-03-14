import axios from 'axios';
import setting from '@/setting';
import qs from 'qs';
import { message, Modal } from 'antd';
import { jsonp } from '@/utils/util';

const api = axios.create({
  baseURL: setting.baseURL,
  timeout: setting.timeout,
  headers: {
    'x-requested-with': 'XMLHttpRequest',
  }
});

// axios.defaults.timeout = setting.timeout;
// axios.defaults.baseURL  = setting.baseURL;

api.interceptors.request.use(conf => {
  if (conf.method === 'post') {
    // 没有显式设置'Content-Type'
    if (!conf.headers['Content-Type']) {
      conf.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      conf.data = qs.stringify(conf.data, { arrayFormat: 'repeat' });
    }
  }
  return conf;
}, err => {
  message.error(err.toString());
  return Promise.reject(err);
});

function sendResponse(response, method) {
  let { code, msg, data } = response;
  let thisLocation = window.encodeURIComponent(window.location.href);
  if (method === 'post' && status == '140000') {
    window.location.href = '/v/pricingPlan';
  }
  switch (code) {
    case '401':
      //未登录
      window.location.href = '//login.crov.com/logistics/exclusive-for-suppliers?nextPage=' + thisLocation;
      break;
    case '403':
      //无权限
      // window.location.href = '//login.crov.com/account/active/logistics?nextPage=' + thisLocation;
      window.location.href = '//seller.crov.com';
      break;
    case '405':
      //CROV用户登录状态（有物流角色），但CROV账号“是否支持发货”=否
      Modal.info({
        content: '您暂未开通国际物流服务权限，如需要开通，请联系客服！',
        onOk() { window.location.href = '//seller.crov.com' },
      });
      break;
    case '406':
      //CROV用户登录状态（无物流角色）
      if (window.location.pathname !== '/v/403') {
        window.location.href = '/v/403';
      }
      break;
    case '500':
      // message.error(res.data.message || '500 , We\'re sorry, but something went wrong.')
      if (window.location.pathname !== '/v/500') {
        window.location.href = '/v/500';
      }
      break;
    case '404':
      window.location.href = '/v/404';
      break;
    case '10002':
      message.error(msg);
      break;
  }
  return data;
}

api.interceptors.response.use(res => {
  console.log('res', res);
  if (!res.data) return null;
  //返回文件流格式
  var method = res.config.method;
  if (res.request.responseType === 'blob') {
    return new Promise(resolve => {
      var reader = new FileReader();
      reader.onload = e => {
        try {
          var data = JSON.parse(e.target.result);
          resolve(sendResponse(data, method));
        } catch (error) {
          //正常文件流
          //下载文件
          if (res.headers['content-disposition'] && !res.data.status) {
            let blobUrl = window.URL.createObjectURL(res.data);//{type:'application/vnd.ms-excel;charset=utf-8'}
            let name = res.headers['content-disposition'].split('=')[1];
            //name以双引号开头并且双引号结尾,说明多包了一层
            //eslint-disable-next-line
            if (name.startsWith("") && name.endsWith("")) {
              name = name.slice(1, -1);
            }
            if (!window.navigator.msSaveOrOpenBlob) {
              let link = document.createElement('a');
              link.style.display = 'none';
              link.href = blobUrl;
              link.setAttribute('download', name);    // 自定义下载文件名（如exemple.txt）
              document.body.appendChild(link);
              link.click();
              window.URL.revokeObjectURL(blobUrl); // 释放 URL对象
              document.body.removeChild(link);
            } else {
              window.navigator.msSaveOrOpenBlob(res.data, name);
            }
          }
          resolve(null);
        }
      };
      reader.readAsText(res.data);
    });

  }
  else if (res.data.status === '160000') { // OSS工作人员无权限
    message.error(res.data.message);
    return Promise.reject(res.data.message);
  }
  else {
    return sendResponse(res.data, method);
  }


}, err => {
  if (axios.isCancel(err)) {
    console.log('request cancel', err);
    return Promise.reject(err);
  }
  message.error(err.toString());
  return Promise.reject(err);
});

const _jsonp = (url, params) => {
  return new Promise((resolve, reject) => {
    jsonp(url, params).then((response) => {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
      let { code, msg, token, data } = response;
      /* 手机验证码 */
      if (['0', '1', '2', '3'].includes(code)) {
        resolve(response);
        return false;
      }
      if (code !== '10001') {
        message.error(data && data.message);
        reject(data && data.message);
      }

      resolve(data);
    });
  });

};

export { api as default, sendResponse, _jsonp };
// export default api
