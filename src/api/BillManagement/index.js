import api from '../index';

export default {
  getBillList(params) {
    return api.get('/logisticsBill/billList',{params: params});
  },
  getBillDetail(params) {
    return api.get('/logisticsBill/detailInfo',{params: params});
  },
  addRefundAccount(params) {
    return api({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/logisticsBill/returnFee',
      data: params
    });
  },
};