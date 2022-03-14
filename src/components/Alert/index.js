import React, { Fragment, useEffect } from 'react';
import { Alert } from 'antd';

import Modal from '@/components/EnhanceModal';

const content = <div>
  <p>尊敬的开锣网客户：</p>
  <p>
    受新冠肺炎疫情影响， UPS上海口岸暂时无法发货。
    为应对这一问题，当您的货物送达金华（含义乌）后，将中转到深圳口岸出运，暂时不接正式报关件。
    因中转到深圳处理，整体时效会延误约5个工作日左右，具体以UPS官网更新为准，请您在发货前做好计划！
  </p>
  <p>11月21日前已经抵达上海口岸的货物将暂时无法出运，具体恢复时间以UPS官方通知为准。</p>
  <p>给您造成的不便敬请谅解，感谢您对开锣网的信任和支持，让我们一起携手，共渡难关。也请您的全体员工及家属做好防护，安全第一！</p>
  <p style={{ marginBottom: 20 }}>顺祝商祺！</p>
  <p style={{ marginBottom: 5, fontSize: 12, color: '#888' }}>开锣网运营中心</p>
  <p style={{ marginBottom: 5, fontSize: 12, color: '#888' }}>2020年11月24日</p>
</div>;

export default function TipAlert(props) {
  const modal = () => {
    Modal.info({
      className: 'tip-content-dialog',
      content: content,
      centered: true,
      okText: '知道了'
    });
  };
  useEffect(() => {
    /* 物流下单页直接显示弹框 */
    //退出登陆
    // let pathname = window.location.href;
    // if (pathname.indexOf('/logisticsOrder') !== -1 && pathname.indexOf('nextPage') === -1) {
    //   modal();
    // }
  }, []);

  return (
    <Fragment>
      <Alert message={
        <span {...props} banner="true">
          <span onClick={() => { modal(); }}>
            【重要通知】受疫情影响，上海口岸暂时无法发货，需转运深圳口岸出，金华（含义乌）正常收货，时效有所延误。
            <span style={{ color: '#1470CC' }} >查看</span>
          </span>
        </span>
      }
      type="warning"
      showIcon
      />
    </Fragment>
  );
}