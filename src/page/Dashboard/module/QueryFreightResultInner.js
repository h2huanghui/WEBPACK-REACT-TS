import React, { memo, useState, Fragment } from 'react';
import { Row, Col, Button, Popover } from 'antd';
import { useHistory, useParams, withRouter, Link } from "react-router-dom";

import Icon from '@/components/Icon';
import ProdDescDialog from './ProdDescDialog';

const QueryFreightResult = ({
  queryFreightResult,
  showResult
}) => {
  const [prodDescVisible, setProdDescVisible] = useState(false);

  const handleOk = () => {
    setProdDescVisible(false);
  }

  const handleCancel = () => {
    setProdDescVisible(false);
  }

  return (
    <Fragment>
      {
        showResult &&
        <Fragment>
          {
            !queryFreightResult || queryFreightResult.length === 0 ?
              <div className='query-freight-result'>
                <div className='query-freight-no-result'>暂无可用的物流方式。</div>
              </div>
              :
              <div className='query-freight-result'>
                {
                  queryFreightResult && queryFreightResult.map(el => {
                    const { encryptProdId, nameCn, referenceAging, freight, freightCurrency, activityFlag, desc } = el;
                    return <div key={encryptProdId} className="query-freight-inner-content">
                      <div className="query-info">
                        <p>预估运费 &nbsp;<Popover arrowPointAtCenter={true} content={<div style={{ width: 300 }}>报价包含运费和燃油附加费。不含运输中产生的偏远地区附加费、杂费、税费等费用。如有发生，实报实销。若有疑问，可在发货前咨询客服。最终运费以仓库入库实际测量的重量为准。</div>}><Icon style={{ color: '#888' }} type="info" /></Popover>： <b>{`${freightCurrency} ${freight}`}</b>{activityFlag && <span className='activity-discount-tip'>限时95折 (折后价)</span>}</p>
                        <p>时效：<b>{referenceAging}</b>{desc && <a className='desc' onClick={() => { setProdDescVisible(true) }}>查看发货说明</a>}</p>
                      </div>
                      <Button size={'large'} className="order-now" href={`/v/logisticsOrder/${encryptProdId}`} target='_blank'>现在下单 <Icon type='right' /></Button>


                      {
                        prodDescVisible && <ProdDescDialog
                          handleOk={handleOk}
                          handleCancel={handleCancel}
                          visible={prodDescVisible}
                          desc={desc}
                          nameCn={nameCn}
                        />
                      }
                    </div>
                  }
                  )
                }
              </div>
          }
        </Fragment>
      }
    </Fragment>

  )
}

export default withRouter(QueryFreightResult)