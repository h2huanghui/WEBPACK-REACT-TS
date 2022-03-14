import React, { useEffect } from "react";
import { Alert } from "antd";

const EnhanceAlert = (props) => {
  const { message, ...otherProps } = props;

  useEffect(() => {
    if (message) {
      // 页面滚动到顶部
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [message]);

  const checkHtml = (htmlStr) => {
    const reg = /<[^>]+>/g;
    return reg.test(htmlStr);
  };

  if (Array.isArray(message)) {
    return message.map((item) => {
      let result = checkHtml(item) ? (
        <span dangerouslySetInnerHTML={{ __html: item }}></span>
      ) : (
        item
      );
      return <Alert {...otherProps} message={result} />;
    });
  } else if (!message) {
    return null;
  } else {
    let result = checkHtml(message) ? (
      <span dangerouslySetInnerHTML={{ __html: message }}></span>
    ) : (
      message
    );
    return <Alert {...otherProps} message={result} />;
  }
};
export default EnhanceAlert;
