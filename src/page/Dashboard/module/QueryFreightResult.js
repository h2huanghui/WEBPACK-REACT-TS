import React, { memo, useState, Fragment } from 'react';
import { Row, Col } from 'antd';
import { useHistory, useParams, withRouter, Link } from "react-router-dom";

import Icon from '@/components/Icon';
import ProdDescDialog from './ProdDescDialog';

const QueryFreightResult = ({
  queryFreightResult,
  showResult,
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
            !queryFreightResult || queryFreightResult.length === 0 ? <div className='query-freight-wrap'><div className='query-freight-result'><div className='query-freight-no-result'>暂无可用的物流方式。</div></div></div> : <div className='query-freight-wrap'>
              <div className='query-freight-result'>
                <Row className='query-freight-title' type='flex' justify='space-between'>
                  <Col span={8}>物流线路</Col>
                  <Col span={3}>时效</Col>
                  <Col className='freight' span={7}>预估运费</Col>
                  <Col className='operate-btn' span={3}>寄件</Col>
                </Row>
                {
                  queryFreightResult && queryFreightResult.map(el => {
                    const { encryptProdId, nameCn, referenceAging, freight, freightCurrency, activityFlag, desc } = el;
                    return <Row key={encryptProdId} className='query-freight-content' type='flex' justify='space-between'>
                      <Col className='bold' span={8}>{nameCn}
                        {desc && <a className='desc' onClick={() => { setProdDescVisible(true) }}>发货说明</a>}
                      </Col>
                      <Col className='bold' span={3}>{referenceAging}</Col>
                      <Col className='bold freight' span={7}>{`${freightCurrency} ${freight}`}
                        {activityFlag && <span className='activity-discount-tip'>限时95折（折后价）</span>}
                      </Col>
                      <Col className='operate-btn' span={3}><a href={`/v/logisticsOrder/${encryptProdId}`} target='_blank'>现在下单<Icon type='right' /></a></Col>
                      {
                        prodDescVisible && <ProdDescDialog
                          handleOk={handleOk}
                          handleCancel={handleCancel}
                          visible={prodDescVisible}
                          desc={desc}
                          nameCn={nameCn}
                        />
                      }
                    </Row>
                  }
                  )
                }
              </div>
            </div>
          }
        </Fragment>
      }
    </Fragment>

  )
}

export default withRouter(QueryFreightResult)