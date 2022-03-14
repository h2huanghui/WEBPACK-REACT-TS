import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { cutdown } from "./util";

/**
 * @description 倒计时按钮组件
 * @param {Object} props 入参，具体说明如下：
 * @param {Number} start 倒计时时间，刻度为秒
 * @param {String} suffix 倒计时时显示的文案
 * @param {Boolean} autoPlay 初始状态是否开始倒计时
 */
const CutdownButton = (props) => {
  const {
    start = 60,
    suffix = "seconds later, send again",
    play = false,
    onEnd,
    disabled,
    ...otherProps
  } = props;

  const [showNum, setShowNum] = useState();

  useEffect(() => {
    if (play) {
      doPlay();
    } else {
      cutdown.clear();
    }
    return () => {
      cutdown.clear();
    };
  }, [play]);

  const doPlay = () => {
    cutdown(
      (progress) => {
        setShowNum(progress);
      },
      () => {
        onEnd && onEnd();
      }
    );
  };

  return (
    <Button {...otherProps} disabled={disabled || showNum > 0}>
      {showNum > 0 ? `${showNum} ${suffix}` : props.children}
    </Button>
  );
};

export default CutdownButton;
