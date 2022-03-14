import api from '@/api';

export default{
  //物流订单列表
  getOrderList: (params)=>{
    return api.get('/logisticsOrder/orderList',{
      params: params
    });
  },
  //物流订单详情页--基本信息
  getDetailBasicInfo: (params)=>{
    return api.get('/logisticsOrder/detail/basicInfo',{
      params: params
    });
  },
  //物流订单详情页--物流信息
  getDetailWayBillInfo: (params)=>{
    return api.get('/logisticsOrder/detail/wayBillInfo',{
      params: params
    });
  },
  //物流订单详情页--包裹与商品
  getDetailWayBillPackageGoods: (params)=>{
    return api.get('/logisticsOrder/detail/wayBillPackageGoods',{
      params: params
    });
  },
  //物流订单详情页--物流费用
  getDetailWayBillFee: (params)=>{
    return api.get('/logisticsOrder/detail/wayBillFee',{
      params: params
    });
  },
  //物流订单--取消
  cancelOrder: (params)=>{
    // return api.post('/logisticsOrder/cancel',params);
    return api({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `/logisticsOrder/cancel/${params.orderNo}`,
      data: null
    });
  },
  //物流订单详情页--获取物流轨迹
  tracks: (params) => {
    return api.get('/logisticsOrder/tracks',{
      params: params
    });
  },
  //物流订单详情页--下载物流面单
  downloadWaybill: (params,config) => {
    return api.post('/logisticsOrder/download',params,config);
  },
  getOrderListCount: () => {
    return api.get('/logisticsOrder/orderListCount');
  },
};
