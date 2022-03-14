import axios from "axios";
import setting from "@/setting";
const api = axios.create({
  baseURL: setting.baseURL,
  timeout: setting.timeout,
  headers: {
    "x-requested-with": "XMLHttpRequest",
  },
});

export default {
  getUserInfo: () => {
    return api.get("/account/getUserInfo");
  },
  getHomeInitialData: () => {
    return api.get("/account/getHomeInitialData");
  },
  getTopNoticeList: (params) => {
    return api.get("/ads/topNoticeList", { params });
  },
};
