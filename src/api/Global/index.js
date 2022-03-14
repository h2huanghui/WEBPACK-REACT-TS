import { _jsonp } from "@/api";

export default {
  // 获取国家信息
  getCountryData: (params) => {
    return _jsonp("//login.crov.com/country/list", params);
  },
  // 获取州省信息，传参加密id
  getProvinceData: (countryId) => {
    return _jsonp("//login.crov.com/city/list", {
      regionId: countryId,
      excludeFlag: 0,
    });
  },
  // 获取城市，传参加密id
  getCityData: (provinceId) => {
    return _jsonp("//login.crov.com/city/list", {
      regionId: provinceId,
      excludeFlag: 0,
    });
  },
};
