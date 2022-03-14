import { COUNTRYREGION } from '@/utils/const';
export const reg = {
  enOnlyExt: /[^\x00-\x9f\xa1-\xff\u0000-\u009f\u00a1-\u00ff\u0021-\u002c\u002e\u002f\u003a-\u0040\u0043\u0046\u005b-\u0060\u007b-\u007d\u00a1-\u00ac\u00ae-\u0113\u0116-\u0122\u0124-\u012b\u012e-\u014d\u0150-\u017e\u0192\u01b5\u01f5\u0237\u02c6\u02c7\u02d8-\u02dd\u0311\u0391-\u03a1\u03a3-\u03a9\u03b1-\u03c9\u03d1\u03d2\u03d5\u03d6\u03dc\u03dd\u03f0\u03f1\u03f5\u03f6\u0401-\u040c\u040e-\u044f\u0451-\u045c\u045e\u045f\u2010\u2013\u2015\u2016\u2018-\u201a\u201c-\u201e\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203a\u203e\u2041\u2043\u2044\u20ac\u20db\u20dc\u2102\u2105\u210a-\u2113\u2115-\u211e\u2122\u2124\u2127-\u2129\u212c\u212d\u212f-\u2131\u2133-\u2138\u2153-\u215e\u2190-\u219b\u219d-\u21a7\u21a9-\u21ae\u21b0-\u21b3\u21b5-\u21b7\u21ba-\u21db\u21dd\u21e4\u21e5\u2200-\u2205\u2207-\u2209\u220b\u220c\u220f-\u2214\u2216-\u2218\u221a\u221d-\u2238\u223a-\u2257\u2259\u225a\u225c\u225f-\u2262\u2264-\u228b\u228d-\u229b\u229d-\u22a5\u22a7-\u22b0\u22b2-\u22bb\u22bd-\u22db\u22de-\u22e3\u22e6-\u22f1\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231c-\u231f\u2322\u2323\u232d\u232e\u2336\u233d\u233f\u2423\u24c8\u2500\u2502\u250c\u2510\u2514\u2518\u251c\u2524\u252c\u2534\u253c\u2550-\u256c\u2580\u2584\u2588\u2591-\u2593\u25aa\u25ab\u25ad\u25ae\u25b1\u25b3-\u25b5\u25b8\u25b9\u25bd-\u25bf\u25c2\u25c3\u25ca\u25cb\u25ec\u25ef\u2605\u2606\u260e\u2640\u2642\u2660\u2663\u2665\u2666\u266a\u266d-\u266f\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u2935\u2985\u2986\u29bf\u2a00-\u2a02\u2a04\u2a06\u2a0c\u2a0d\u2a10-\u2a17\u2a22-\u2a27\u2a29\u2a2a\u2a2d-\u2a31\u2a33-\u2a3c\u2a3f\u2a40\u2a42-\u2a4d\u2a50\u2a53-\u2a58\u2a5a-\u2a5d\u2a5f\u2a66\u2a6a\u2a6d-\u2a75\u2a77-\u2a9a\u2a9d-\u2aa2\u2aa4-\u2ab0\u2ab3-\u2ac8\u2acb\u2acc\u2acf-\u2adb\u2ae4\u2ae6-\u2ae9\u2aeb-\u2af3\u2afd\ufb00-\ufb04]/,
  enOnly: /[^\x00-\xff]/,
  number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
  digits: /^\d+$/,
  margin: /^[1-9][0-9]?$/,
  url: /^((?:https?):\/\/)(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
  price: /^(\d+)(.\d{0,2})?$/
};

//注意：callback参数必须调用！！！
export const method = {
  enOnly: msg => {
    return (rule, value, callback) => {
      callback(reg.enOnly.test(value) ? msg : undefined);
    };
  },
  enOnlyExt: msg => {
    return (rule, value, callback) => {
      callback(reg.enOnlyExt.test(value) ? msg : undefined);
    };
  },
  digits: msg => {
    return (rule, value, callback) => {
      callback(!reg.digits.test(value) ? msg : undefined);
    };
  },
  number: msg => {
    return (rule, value, callback) => {
      callback(!reg.number.test(value) ? msg : undefined);
    };
  },
  zero: msg => {
    return (rule, value, callback) => {
      if (value > 0) {
        callback();
      } else {
        callback(msg);
      }
    };
  },
  margin: msg => {
    return (rule, value, callback) => {
      callback(!reg.margin.test(value) ? msg : undefined);
    }
  },
  url: msg => {
    return (rule, value, callback) => {
      callback(!reg.url.test(value) ? msg : undefined);
    }
  },
  price: msg => {
    return (rule, value, callback) => {
      callback(!reg.price.test(value) ? msg : undefined);
    }
  },
  ein: msg => {
    return (rule, value, callback) => {
      if (
        /^\d{9}$/.test(value) ||
        (/^[\d-]{10}$/.test(value) && value.match(/\d/g).length === 9)
      ) {
        callback();
      } else {
        callback(msg);
      }
    };
  },
  ssn: msg => {
    return (rule, value, callback) => {
      if (
        /^\d{9}$/.test(value) ||
        (/^[\d-]{10}$/.test(value) && value.match(/\d/g).length === 9) ||
        (/^[\d-]{11}$/.test(value) && value.match(/\d/g).length === 9)
      ) {
        callback();
      } else {
        callback(msg);
      }
    };
  },
  phone: (msg, regionId) => {
    return (rule, value, callback) => {
      let phoneReg;
      if (regionId === COUNTRYREGION.US.regionId) {
        phoneReg = /^[\(\)\-\/\.\*\~\x20]*(\d[\(\)\-\/\.\*\~\x20]*){10}[\(\)\-\/\.\*\~\x20]*$/;
      } else if (
        regionId === COUNTRYREGION.China.regionId ||
        regionId === COUNTRYREGION.Taiwan.regionId ||
        regionId === COUNTRYREGION.Macau.regionId ||
        regionId === COUNTRYREGION.HK.regionId
      ) {
        phoneReg = /^[\(\)\-\/\.\*\~\x20]*(\d[\(\)\-\/\.\*\~\x20]*){7,20}[\(\)\-\/\.\*\~\x20]*$/;
      } else {
        phoneReg = /^[\(\)\-\/\.\*\~\x20]*(\d[\(\)\-\/\.\*\~\x20]*){1,20}[\(\)\-\/\.\*\~\x20]*$/;
      }
      callback(phoneReg.test(value) ? undefined : msg);
    };
  },
  /* 新增安全手机校验 */
  mobilePhone: (msg, regionId) => {
    return (rule, value, callback) => {
      let phoneReg;
      if (regionId === COUNTRYREGION.US.regionId) {
        phoneReg = /[0-9]{10}$/;
      } else {
        phoneReg = /[0-9]$/;
      }
      callback(phoneReg.test(value) ? undefined : msg)
    }
  },
  zipCode: msg => {
    return (rule, value, callback) => {
      if (
        value &&
        rule.isUS &&
        !/^(\d{5}(?:\-?\d{4})?)$/.test(value)
      ) {
        callback(
          msg ||
          'Must be a 5 or 9 digit number, e.g.00000、000000000、00000-0000.'
        );
      } else {
        callback();
      }
    };
  },
  zipCodeOther: msg => {
    return (rule, value, callback) => {
      if (
        (value &&
          rule.isMalaysia &&
          !/^(\d{5}(?:\-?\d{4})?)$/.test(value)) ||
        (!rule.isUS &&
          !/^^[a-zA-Z0-9-][a-zA-Z0-9- ]{0,19}$$/.test(value))
      ) {
        callback(msg || 'Please enter a valid zip code.');
      } else {
        callback();
      }
    };
  },
  zipCodeRequired: msg => {
    return (rule, value, callback) => {
      let isOk = true;
      value = value ? value.toString().trim() : '';
      if (
        !rule.isPanama &&
        !rule.isMacau &&
        !rule.isIreland &&
        !rule.isHK &&
        !rule.isJamaica
      ) {
        isOk = value !== '';
      }
      if (!isOk) {
        callback(msg || 'Please enter zip code.');
      } else {
        callback();
      }
    };
  },
  phoneCustom: msg => {
    return (rule, value, callback) => {
      let isOk = true;
      value = value ? value.trim() : '';
      if (value !== '') {
        if (rule.isUS) {
          isOk = /^[\(\)\-\/\.\*\~\x20]*(\d[\(\)\-\/\.\*\~\x20]*){10}[\(\)\-\/\.\*\~\x20]*$/.test(
            value
          );
        } else if (
          rule.isChina ||
          rule.isHK ||
          rule.isMacau ||
          rule.isTaiwan
        ) {
          isOk = /^[\(\)\-\/\.\*\~\x20]*(\d[\(\)\-\/\.\*\~\x20]*){7,20}[\(\)\-\/\.\*\~\x20]*$/.test(
            value
          );
        } else if (rule.isMalaysia) {
          isOk = /^1\d{8,9}$/.test(value);
        } else {
          isOk = /^[\(\)\-\/\.\*\~\x20]*(\d[\(\)\-\/\.\*\~\x20]*){1,20}[\(\)\-\/\.\*\~\x20]*$/.test(
            value
          );
        }
      }
      if (!isOk) {
        callback(msg || 'Please enter a valid phone number.');
      } else {
        callback();
      }
    };
  },


  // 密码相关规则++++++++++++++++++++++++++++++++++++++
  isNotSimplePwd: (str) => {
    var ary = str.split("");
    var sameNum = 0;
    var fcode1 = ary[0].charCodeAt(0);
    var result = true;

    ary.forEach((n, i) => {
      if (i > 0 && n.charCodeAt(0) === fcode1) {
        sameNum++;
      } else {
        sameNum = 0;
        fcode1 = n.charCodeAt(0);
      }

      if (sameNum >= 3) {
        result = false;
      }
    });
    return result;
  },
  // 不允许输入连续四个以上重复字符
  easyPassword: (msg) => {
    return (rule, value, callback) => {
      if (method.isNotSimplePwd(value)) {
        callback();
      } else {
        callback(msg);
      }
    };
  },

  // 包含一个字母
  oneLetter: (msg) => {
    return (rule, value, callback) => {
      if (/[a-zA-Z]/.test(value)) {
        callback();
      } else {
        callback(msg);
      }
    };
  },
  // 包含一个数字
  oneNum: (msg) => {
    return (rule, value, callback) => {
      if (/\d/.test(value)) {
        callback();
      } else {
        callback(msg);
      }
    };
  },

  //长度8,仅支持两位小数
  number8_2: (msg) => {
    return (rule, value, callback) => {
      value = value.trim();
      if (
        !value ||
        (/^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/.test(value) &&
          !isNaN(value))
      ) {
        callback(); //校验通过
      } else {
        callback(msg); //校验失败
      }
    };
  },
  //长度10,仅支持三位小数
  number10_3: (msg) => {
    return (rule, value, callback) => {
      value = value.trim();
      if (
        !value ||
        (/^((0{1}\.\d{1,3})|([1-9]\d*\.{1}\d{1,3})|([1-9]+\d*))$/.test(value) &&
          !isNaN(value))
      ) {
        callback(); //校验通过
      } else {
        callback(msg); //校验失败
      }
    };
  },

  //正整数
  positiveInteger: (msg) => {
    return (rule, value, callback) => {
      value = value.trim();
      if (/^[1-9]\d*$/.test(value)) {
        callback(); //校验通过
      } else {
        callback(msg); //校验失败
      }
    };
  },
};
