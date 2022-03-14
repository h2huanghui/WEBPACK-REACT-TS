import api from '@/api';

export default {
  //支付页面初始化
  payNow: (params) => {
    return api({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/payment/payNow',
      data: params
    });
  },
  //获取支付二维码
  fetchQrCode: (params) => {
    return api({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/payment/qrCode',
      data: params
    });
  },
  //查询支付是否成功
  paymentResult: (params) => {
    return api.get('/payment/result', {
      params: params
    });
  },
  //页面关闭后,关闭支付
  close: (params) => {
    // return api.post('/payment/close', {params});
    return api.get('/payment/close', {params});
  },

  //物流专款接口
  //物流专款查询
  getFundInfo(params) {
    return api.get('/fund/getFundInfo', {params});
  },
  //物流专款开通
  openFund(params) {
    return api.post('/fund/openFund', params);
  },
  //物流专款明细
  listFundDetail(params) {
    return api.get('/fund/listFundDetail', {params});
  },
  //处理中的充值记录
  listPendingRechargeRecord(params) {
    return api.get('/fund/listPendingRechargeRecord', {params});
  },
  //取消充值
  cancelRecharge(params) {
    return api({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/fund/cancelRecharge',
      data: params
    });
  },
  //申请充值
  applyRecharge(params) {
    return api({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/fund/applyRecharge',
      data: params
    });
  },
  //物流专款支付
  payOrder(params) {
    return api({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/fund/payOrder',
      data: params
    });
  },
  //平台银行账号信息获取
  getBankAccInfo(params) {
    return api.get('/account/getBankAccInfo', params);
  },
};
