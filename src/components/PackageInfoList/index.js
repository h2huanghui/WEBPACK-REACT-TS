import React, { Fragment } from 'react';
import { Input, Button, Row, Col } from 'antd';

import PackageInfo from './PackageInfo';
import Icon from '@icon';

const PackageInfoList = ({
  form,
  packageInfoList,
  removePackageInfo,
  calcEstimateFee
}) => {
  const pageInfolabelItem = (
    <Row gutter={20}>
      <Col span={3}>长（cm）：</Col>
      <Col span={1} className='cheng'></Col>
      <Col span={3}>宽（cm）：</Col>
      <Col span={1} className='cheng'></Col>
      <Col span={3}>高（cm）:</Col>
      <Col span={1}></Col>
      <Col span={3}>重（kg）:</Col>
      <Col span={1}></Col>
      <Col span={3}></Col>
      <Col span={2}></Col>
      {
        packageInfoList && packageInfoList.length > 1 && <Col span={3}></Col>
      }
    </Row>
  )
  return (
    <div className='info-list-wrap'>
      {pageInfolabelItem}
      {
        packageInfoList.map((el, index) => (
          <div className='info-list' key={el.id}>
            <PackageInfo
              pageInfoIndex={index}
              form={form}
              pageInfo={el}
              packInfoList={packageInfoList}
              removePackageInfo={removePackageInfo}
              calcEstimateFee={calcEstimateFee}
            />
          </div>
        ))
      }

    </div>
  )
}

export default PackageInfoList;
