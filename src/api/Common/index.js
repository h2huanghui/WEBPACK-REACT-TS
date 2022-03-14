import api from '@/api';

export default {
  getUserInfo: () => {
    return api.get('/account/getUserInfo');
  },
  getSiderInfo: () => {
    return api.get('/home/getSiderInfo');
  },
  //根据广告位置枚举和前台物流产品ID获取最新的霸屏广告
  latestScreenBanner(params) {
    return api.get('/ads/latestScreenBanner',{params});
  },
  //根据广告位置枚举列表获取头部banner列表
  topBannerList(params) {
    return api.get('/ads/topBannerList',{params});
  },
  //根据广告位置枚举列表获取头部通告列表
  getTopNoticeList(params) {
    return api.get('/ads/topNoticeList',{params});
  },
};
