import React from "react";
import { Modal } from "antd";

import Icon from "@/components/Icon";

import "./index.less";

const iconMap = {
  info: <Icon type="info" className="enhance-modal-icon" />,
  success: <Icon type="yes" className="enhance-modal-icon" />,
  error: <Icon type="error" className="enhance-modal-icon" />,
  warning: <Icon type="caution" className="enhance-modal-icon" />,
  confirm: <Icon type="caution" className="enhance-modal-icon" />,
};

const EnhanceModal = (props) => {
  return <Modal {...props}><div className="enhance-modal-content">{props.children}</div></Modal>;
};

Object.keys(Modal).forEach((key) => {
  if (iconMap[key]) {
    EnhanceModal[key] = (props) => {
      const { content, ...otherProps } = props;
      let _content = content ? <div className="enhance-modal-content">{content}</div> : content;
      return Modal[key]({
        icon: iconMap[key],
        content: _content,
        ...otherProps,
      });
    };
  } else {
    EnhanceModal[key] = (props) => {
      const { content, ...otherProps } = props;
      let _content = content ? <div className="enhance-modal-content">{content}</div> : content;
      return Modal[key]({
        content: _content,
        ...otherProps,
      });
    };;
  }
});

export default EnhanceModal;
