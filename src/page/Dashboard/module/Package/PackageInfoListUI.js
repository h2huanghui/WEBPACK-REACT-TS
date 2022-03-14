import React, { Fragment } from 'react';
import { Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import PackageInfoItem from './PackageInfoItem';

const PackageInfoListUI = ({
  form,
  packageInfoList,
  removePackageInfo,
  checkLength,
  checkWidth,
  checkHeight,
  checkWeight,
  checkQty
}) => {
  const pageInfolabelItem = (
    <Row type='flex' className='title'>
      <Col span={3}>长（cm）</Col>
      <Col span={1}></Col>
      <Col span={3}>宽（cm）</Col>
      <Col span={1}></Col>
      <Col span={3}>高（cm）</Col>
      <Col span={1}></Col>
      <Col span={3}>重（kg）</Col>
      <Col span={1}></Col>
      <Col span={8}>同规格包裹数量</Col>
    </Row>
  )
  return (
    <div className='package-info-list'>
      {pageInfolabelItem}
      {
        packageInfoList.map(el => {
          return <PackageInfoItem
            form={form}
            key={el.id}
            pageInfo={el}
            packInfoList={packageInfoList}
            removePackageInfo={removePackageInfo}
            checkLength={checkLength}
            checkWidth={checkWidth}
            checkHeight={checkHeight}
            checkWeight={checkWeight}
            checkQty={checkQty}
          />
        }
        )
      }
    </div>
  )
}

PackageInfoListUI.propTypes = {
  form: PropTypes.object,
  packInfoListVisible: PropTypes.bool,
  packageInfoList: PropTypes.array,
  handleAddPackageInfo: PropTypes.func,
  removePackageInfo: PropTypes.func,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func
}

export default PackageInfoListUI;
