import React, { useState, useEffect } from "react";
import Captcha from "./Captcha";

const CaptchaContainer = React.forwardRef((props, ref) => {
  //图形验证码显示路径
  const [imgSrc, setImgSrc] = useState();

  const {
    // 图形验证码生成器编号
    publicKey = "6LfzAc0SAADE5CteqEn5zUBDtNHIGZ6NGtaHh0g9",
    // 获取图形验证码请求地址
    url = "//login.crov.com/captcha",
    // 生成秘钥的附加值，随便写
    salt = "crov",
    onReloadOk,
    ...otherProps
  } = props;

  useEffect(() => {
    handleReload();
  }, []);

  const handleReload = () => {
    let src = `${url}?action=reload&k=${publicKey}&c=${salt}`;
    jsonp(src).then((response) => {
      if (response) {
        setImgSrc(`${url}?action=image&k=${publicKey}&c=${response}`);

        onReloadOk && onReloadOk(response, publicKey);
      }
    });
  };

  // Helper+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const jsonp = (url) => {
    return new Promise((resolve, reject) => {
      // 因为接口硬编码callback值为'Faptcha.finish_reload'，所以就这样了
      const jsNode = document.createElement("script");
      jsNode.setAttribute("type", "text/javascript");
      jsNode.src = url;

      const headEle = document.getElementsByTagName("head")[0];
      window.Faptcha = {};
      Faptcha.finish_reload = (response) => {
        headEle.removeChild(jsNode);
        delete window.Faptcha;

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
          delete window.Faptcha;
          headEle.removeChild(jsNode);

          reject("Load Error");
        },
        false
      );

      headEle.appendChild(jsNode);
    });
  };

  // 暴露reload方法
  CaptchaContainer.reload = Captcha.reload;

  return (
    <Captcha
      {...otherProps}
      ref={ref}
      imgSrc={imgSrc}
      onReload={handleReload}
    />
  );
});

export default CaptchaContainer;
