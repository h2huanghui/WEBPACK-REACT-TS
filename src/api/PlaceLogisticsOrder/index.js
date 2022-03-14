import api from '@/api';

export default {
  /* 获取下单页初始化数据 */
  getInitialData: (params) => {
    return api.get("/logisticsOrder/getInitialData", {
      params: params,
    });
  },

  /* 查询物流产品运费 */
  prodCalculate: (data) => {
    return api({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/freight/prodCalculate',
      data: data
    })
  },

  /* 下单提交 */
  placeOrderSubmit: data => {
    return api({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/logisticsOrder/submit',
      data: data
    })
  },

  /* 保存商品 */
  saveProduct: data => {
    return api.post('/goods/save', data);
  }
}