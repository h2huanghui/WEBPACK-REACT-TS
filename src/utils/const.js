export default {
  US_COUNTRY_CODE: '88461', //美国
  MALAYSIA_COUNTRY_CODE: '133061', //马来西亚
  CHINA_COUNTRY_CODE: '89251', //中国
  HK_COUNTRY_CODE: '121991', //香港
  MACAO_COUNTRY_CODE: '132941', //澳门
  TAIWAN_COUNTRY_CODE: '122201', //台湾
  PANAMA_COUNTRY_CODE: '133221', //马拿马
  IRELAND_COUNTRY_CODE: '131541', //爱尔兰
  JAMAICA_COUNTRY_CODE: '131641', //牙买加地区
  DEFAULT_ZIP_CODE: '91761'
}
const SOURCETYPE = {
  STORE: 0,
  CROV: 1,
  EXCEL: 2
};
// 删除最后一个商品后跳转到对应的来源页地址
const SOURCEURL = {
  0: '/storeOrders',
  1: '/search',
  2: '/purchaseOrders/placeMultipleOrders'
};
// 特殊的国家或者地区
const COUNTRYREGION = {
  "HK": {
    "regionId": 121991, "regionNameCn": "香港", "regionNameEn": "Hong Kong S.A.R.", "regionCode": "hk", "telCode": "852"
  },
  "Macau": {
    "regionId": 132941, "regionNameCn": "澳门", "regionNameEn": "Macau S.A.R.", "regionCode": "mo", "telCode": "853"
  },
  "Taiwan": {
    "regionId": 122201, "regionNameCn": "台湾", "regionNameEn": "Taiwan, China", "regionCode": "tw", "telCode": "886"
  },
  "US": {
    "regionId": 88461, "regionNameCn": "美国", "regionNameEn": "United States", "regionCode": "us", "telCode": "1"
  },
  "Malaysia": {
    "regionId": 133061, "regionNameCn": "马来西亚", "regionNameEn": "Malaysia", "regionCode": "my", "telCode": "60"
  },
  "China": {
    "regionId": 89251, "regionNameCn": "中国", "regionNameEn": "China", "regionCode": "cn", "telCode": "86"
  },
  "Panama": {
    "regionId": 133221, "regionNameCn": "巴拿马", "regionNameEn": "Panama", "regionCode": "pa", "telCode": "507"
  },
  "Ireland": {
    "regionId": 131541, "regionNameCn": "爱尔兰", "regionNameEn": "Ireland", "regionCode": "ie", "telCode": "353"
  },
  "Jamaica": {
    "regionId": 131641, "regionNameCn": "牙买加", "regionNameEn": "Jamaica", "regionCode": "jm", "telCode": "1"
  }
}

// Error
const ERROR = {
  ASYNC_ERROR: 'Oops! An Error Occurred.'
}

const PLATFORM_ENUM = [
  {
    code: "1",
    name: "Amazon"
  },
  {
    code: "2",
    name: "eBay"
  },
  {
    code: "3",
    name: "Shopify"
  },
  // {
  //   code: "4",
  //   name: "Wish"
  // },
  // {
  //   code: "5",
  //   name: "Lazada"
  // },
  // {
  //   code: "6",
  //   name: "Shopee"
  // },
  {
    code: "7",
    name: "Bigcommerce"
  },
  {
    code: "8",
    name: "Woocommerce"
  },
  {
    code: "99",
    name: "Others"
  }
];

const SHIPPING_SERVICE_PROVIDE = [
  {
    value: "UPS",
    label: "UPS"
  },
  {
    value: "USPS",
    label: "USPS"
  },
  {
    value: "FedEx",
    label: "FedEx"
  },
  {
    value: "Truck",
    label: "Truck"
  }
];
const ADDRESS_TYPE = {
  BILLING: "1",
  SHIPPING: "2"
}

/*批量上传报错*/
const UPLOAD_ERR_TIPS = [
  { value: '1', label: 'No matched orders found. Please check the file name.', },//文件名不对
  { value: '2', label: 'Matched to multiple orders. Please check the file name.' },//店铺订单id重复
  { value: '3', label: 'No more upload allowed.' }//上传文件超限
];

const CHAHHEL_HOST = '//dropshipping.crov.com/'
const CONTACT_US_URL = CHAHHEL_HOST + 'contact-us'

const COOKIE_FROM_TO_ZIPCODE = 'sm_from_to_zipcode_v1';

const FREIGHTCURRENCY = {
  CNY: "1",
  USD: "2"
};

const PLATFORMTYPE = {
  CROV: '0',
  MIC: '1',
  DOBA: '2',
  LOGISTICS_CHANNAL: '3'
};

const LENGTHUNIT = {
  CM: '1',
  INCH: '2'
};

const WEIGHTUNIT = {
  G: '1',
  KG: '2',
  LBS: '3'
}

// 地址卡片显示类型：0展示；1可编辑（有操作按钮：编辑、删除、设为默认地址）
const CARDTYPE = {
  READ: 0,
  WRITE: 1,
};
const ADDRESSTYPE = {
  RECEIVER: '2',  // 收货地址
  SHIPPER: '1'  // 发货人地址
};
// 业务场景类型
const BIZ_TYPE = {
  JD: '1'  // 京东物流
};
// 京东物流开放的国家/地区
const REGIONIDS_JD = [88461];

export {
  SOURCETYPE,
  COUNTRYREGION,
  ERROR,
  PLATFORM_ENUM,
  SOURCEURL,
  ADDRESS_TYPE,
  COOKIE_FROM_TO_ZIPCODE,
  CHAHHEL_HOST,
  CONTACT_US_URL,
  SHIPPING_SERVICE_PROVIDE,
  UPLOAD_ERR_TIPS,
  FREIGHTCURRENCY,
  PLATFORMTYPE,
  LENGTHUNIT,
  WEIGHTUNIT,
  CARDTYPE,
  ADDRESSTYPE,
  BIZ_TYPE,
  REGIONIDS_JD
}
