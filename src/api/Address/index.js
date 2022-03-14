import api, { _jsonp } from "@/api";

export default {
  saveAddress: (params) => {
    return api.post("/address/save", params);
  },
  getAddrList: (params) => {
    return api.get("/address/getAddrList", {
      params: params,
    });
  },
  setDefault: (params) => {
    return api.post("/address/default", params);
  },
  delAddress: (params) => {
    return api.post("/address/doDel", params);
  },
};
