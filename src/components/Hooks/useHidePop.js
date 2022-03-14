import { useState, useEffect } from 'react';

/**
* 点击空白处隐藏模态框钩子
* @author Jiang_Chuangshi
* @date 2020/11/20 13:31
* @param {Boolean} initVisible 初始化时的可见性
* @returns {JSX}
*/
export default function useHidePop(initVisible) {
  const [popVisible, setPopVisible] = useState(initVisible);
  const handleDocumentClick = () => {
    setPopVisible(false);
  };
  //代理需要禁用点击隐藏的元素的点击事件，阻止冒泡
  const handleStopPropagation = (e) => {
    if (e && e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return [popVisible, setPopVisible, handleStopPropagation];
}