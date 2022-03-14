import React, { useState } from "react";
import { Input } from "antd";

import "@/styles/components/WordLimitTextArea/index.less";

function WordLimitTextArea(props) {
  const [total, setTotal] = useState(props.value ? props.value.length : 0);
  const { value, max, onChange, ...other } = props;

  const handleChange = e => {
    let value = e.target.value;
    let length = value.replace(/[\r\n]/g, "*").length;
    setTotal(length);
    onChange && onChange(value);
  };
  return (
    <div className="word-limit-wrap">
      <Input.TextArea value={value} onChange={handleChange} maxLength={max} {...other} />
      {max ? (
        <div className="word-limit-extra">
          <span className="total">{total}</span>/{max}
        </div>
      ) : null}
    </div>
  );
}

export default WordLimitTextArea;
