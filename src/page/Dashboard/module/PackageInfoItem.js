/* 自定义表单组件 */
import React, { forwardRef } from 'react';
import { Row, Col, Input } from 'antd';

import Icon from '@/components/Icon';

const PackageInfoItem = forwardRef((props, ref) => {
  const { value, packInfoList, packageInfoItem } = props;

  const handleChangeValue = (attr, e) => {
    triggerChange({ [attr]: e.target.value })
  }


  const triggerChange = changedValue => {
    const { onChange, value, changePack } = props;
    if (onChange) {
      onChange({
        ...value,
        ...changedValue
      })
    }
    changePack({ ...value, ...changedValue })
  }

  return (
    <Row type='flex' justify='space-between'>
      <Col>
        <Input
          maxLength={10}
          value={value.length}
          onChange={e => handleChangeValue('length', e)}
        />
      </Col>

      <Col>
        <Input
          maxLength={10}
          value={value.width}
          onChange={e => handleChangeValue('width', e)} />
      </Col>

      <Col>
        <Input
          maxLength={10}
          value={value.height}
          onChange={e => handleChangeValue('height', e)}
        />
      </Col>

      <Col>
        <Input
          maxLength={10}
          value={value.weight}
          onChange={e => handleChangeValue('weight', e)}
        />
      </Col>

      <Col>
        <Input
          maxLength={10}
          value={value.qty}
          onChange={e => handleChangeValue('qty', e)}
        />
      </Col>
      {
        packInfoList && packInfoList.length > 1 && <Col>
          <Icon type='delete' onClick={e => props.handlePackRemove(packageInfoItem, e)} />
        </Col>
      }
    </Row>
  )

})

export default PackageInfoItem