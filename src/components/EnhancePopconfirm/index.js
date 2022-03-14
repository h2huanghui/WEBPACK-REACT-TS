import React from "react";
import { Popconfirm } from "antd";

import Icon from "@/components/Icon";

import "./index.less";

const EnhancePopconfirm = (props) => {
  return (
    <Popconfirm
      icon={<Icon type="caution" className="popconfirm-icon" />}
      okText="Yes"
      cancelText="No"
      {...props}
    >
      {props.children}
    </Popconfirm>
  );
};

export default EnhancePopconfirm;
