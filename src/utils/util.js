import { COUNTRYREGION } from "./const";
/*
    指定长度和基数

*/
function uuid(len, radix) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}
// 定时器实现防抖
function debounce(fn, wait) {
  var timer;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  };
}

function encryptAccount(account) {
  if (account.indexOf("@") != -1) {
    return (
      account.substr(0, 2) + "****" + account.substr(account.indexOf("@"))
    );
  } else {
    if (account.indexOf(" ") !== -1) {
      return (
        account.substring(0, account.indexOf(" ") + 1) +
        "****" +
        account.substring(account.length - 4)
      );
    } else {
      return (
        account.substring(0, 3) +
        "****" +
        account.substring(account.length - 4)
      );
    }

  }
}

const jsonp = (url, params) => {
  return new Promise((resolve, reject) => {
    // 初始化url
    let dataString = url.indexOf("?") === -1 ? "?" : "&";
    let callback = `jsonpCB_${Math.random().toString().substr(2)}`;
    url += `${dataString}jsoncallback=${callback}`;
    if (params) {
      // 有请求参数，依次添加到url
      if (typeof params === "string") url += "&" + params;
      else if (typeof params === "object") {
        for (let key in params) {
          url += "&" + key + "=" + encodeURIComponent(params[key]);
        }
      }
    }

    const jsNode = document.createElement("script");
    jsNode.setAttribute("type", "text/javascript");
    jsNode.src = url;

    const headEle = document.getElementsByTagName("head")[0];

    window[callback] = (response) => {
      if (typeof response === "string") {
        try {
          response = JSON.parse(response);
        } catch (error) {
          reject(error);
        }
      }
      headEle.removeChild(jsNode);
      delete window[callback];

      if (response) {
        resolve(response);
      } else {
        reject("No Data");
      }
    };

    // js加载异常的情况
    jsNode.addEventListener(
      "error",
      () => {
        delete window[callback];
        headEle.removeChild(jsNode);

        reject("Load Error");
      },
      false
    );

    headEle.appendChild(jsNode);
  });
};

export { uuid, debounce, jsonp, encryptAccount };
