import { useEffect } from 'react';

/**
 * 目前项目只有下单主流程相关页面适配了触屏，
 * 其他页面在触屏端暂时保持PC排版
 * @author Jiang_Chuangshi
 * @date 2021/02/23 10:32
 * @returns {JSX}
 */
export default function usePCViewport() {
  useEffect(() => {
    let metaTag = document.getElementsByTagName('meta')['viewport'];
    metaTag.setAttribute('content', '')
    return () => {
      metaTag.setAttribute('content', 'initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width');
    };
  }, []);
}
