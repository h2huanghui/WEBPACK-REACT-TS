/**
 * @description 倒计时工具函数
 * @author sun
 * @param {Function} progressFn - 进度回调函数，入参为当前值
 * @param {Function} endFn - 倒计时结束回调函数
 * @param {Object} options - 可配置参数对象，start为初始值，each为每次递减值，delay为间隔时间
 */
let timer;
const cutdown = (progressFn, endFn, options) => {
  let start = (options && options.start) || 60;
  let each = (options && options.each) || 1;
  let delay = (options && options.delay) || 1;

  let nowNum = start;

  const doPlay = () => {
    timer = setTimeout(() => {
      if (nowNum <= 0) {
        clearTimeout(timer);
        endFn && endFn();
        return;
      }
      nowNum -= each;
      progressFn && progressFn(nowNum);
      doPlay();
    }, delay * 1000);
  };

  progressFn && progressFn(nowNum);
  doPlay();
};

cutdown.clear = () => {
  clearTimeout(timer);
};

export { cutdown };
