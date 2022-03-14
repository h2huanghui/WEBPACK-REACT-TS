import React, { Fragment } from 'react';
import { Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import PackageInfo from './PackageInfo';
import Icon from '@/components/Icon';

const PackageInfoList = ({
  form,
  packInfoListVisible,
  packageInfoList,
  handleAddPackageInfo,
  removePackageInfo,
  handleOk,
  handleCancel
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
      <Col span={5}>同规格包裹数量</Col>
    </Row>
  )
  return (
    <div className='package-info-list-wrap' style={{ display: packInfoListVisible ? 'block' : 'none' }}>

      <div className='package-info-list'>
        {pageInfolabelItem}
        {
          packageInfoList.map((el, index) => {
            return <PackageInfo
              form={form}
              key={el.id}
              pageInfo={el}
              packInfoList={packageInfoList}
              removePackageInfo={removePackageInfo}
              enterFunc={handleOk}
            />
          }
          )
        }
      </div>
      <div className='btns-wrap'>
        <a onClick={handleAddPackageInfo}><Icon type='add' />添加包裹</a>
        <div>
          <Button onClick={handleCancel}>取消</Button>
          <Button onClick={handleOk} type='primary' className='confirm-btn'>确定</Button>
        </div>
      </div>
    </div>
  )
}

PackageInfoList.propTypes = {
  form: PropTypes.object,
  packInfoListVisible: PropTypes.bool,
  packageInfoList: PropTypes.array,
  handleAddPackageInfo: PropTypes.func,
  removePackageInfo: PropTypes.func,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func
}

export default PackageInfoList;
