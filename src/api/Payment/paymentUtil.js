/**
* 支付工具
* @author Jiang_Chuangshi
* @date 2020/10/12 15:00
*/

import Api from '@/api/Payment/index';

//时间转换
export const calcaValidTime = function(vadility) {
  let mins = parseInt(vadility / 60);
  let secs = vadility % 60;
  secs = secs < 10 ? `0${secs}` : secs;
  return `${mins}分${secs}秒`;
};

/**
* 支付前校验
* @author Jiang_Chuangshi
* @date 2021/01/08 10:50
* @param {Function} cb 支付数据错误无法跳转支付页面的回调函数
* @returns {Object}
*/
export const payNow = (payType, busiType, voList) => {
  return new Promise((resolve, reject) => {
    Api.payNow({
      payType: payType,
      busiType: busiType,
      paymentDetailRequestVOList: voList
    }).then(res => {
      let data = res.data;
      let { status } = res;
      if (data) {
        if (status === '999999') {
          //status 999999,已存在支付数据
          reject(res);
          return;
        } else {
          resolve(res.data);
        }
      } else {
        //支付数据请求失败
        reject(res);
      }
    });
  });
};

export const payTypes = {
  ali: '1',//支付宝支付
  wechat: '2',//微信支付
  fund: '3',//专款支付
};