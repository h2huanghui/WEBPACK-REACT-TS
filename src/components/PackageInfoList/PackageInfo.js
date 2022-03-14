import React, { Fragment } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

import Icon from '@/components/Icon';
import { method } from "@/utils/rules";


const PackageInfo = ({
  pageInfoIndex,
  form,
  packInfoList,
  pageInfo,
  removePackageInfo,
  calcEstimateFee
}) => {

  const { getFieldDecorator } = form;

  const isNeedCalcFee = (id) => {
    const length = form.getFieldValue(`length[${id}]`)
    const width = form.getFieldValue(`width[${id}]`);
    const height = form.getFieldValue(`height[${id}]`);
    const weight = form.getFieldValue(`weight[${id}]`);
    const qty = form.getFieldValue(`qty[${id}]`);
    if (length && width && height && weight && qty) {
      calcEstimateFee();
    }
  }


  const checkLength = (rule, value, callback, id) => {
    value = value && value.trim();
    if (value) {
      if (/^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/.test(value)) {
        callback();
      } else {
        callback('请填写数字，小数点后最多输入2位。')
      }

    } else {
      callback('请填写包裹长')
    }
  }

  const checkWidth = (rule, value, callback, id) => {
    value = value && value.trim();
    if (value) {
      if (/^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/.test(value)) {
        callback();
      } else {
        callback('请填写数字，小数点后最多输入2位。')
      }

    } else {
      callback('请填写包裹宽')
    }
  }


  const checkHeight = (rule, value, callback, id) => {
    value = value && value.trim();
    if (value) {
      if (/^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/.test(value)) {
        callback();
      } else {
        callback('请填写数字，小数点后最多输入2位。')
      }
    } else {
      callback('请填写包裹高')
    }
  }


  const checkWeight = (rule, value, callback, id) => {
    value = value && value.trim();
    if (value) {
      if (/^((0{1}\.\d{1,3})|([1-9]\d*\.{1}\d{1,3})|([1-9]+\d*))$/.test(value)) {
        callback();
      } else {
        callback('请填写数字，小数点后最多输入3位。')
      }
    } else {
      callback('请填写包裹重')
    }
  }


  const checkQty = (rule, value, callback, id) => {
    value = value && value.trim();
    if (value) {
      if (/^[1-9]\d*$/.test(value)) {
        callback();
      } else {
        callback('请填写正整数')
      }
    } else {
      callback('请填写包裹件数')
    }
  }

  return (
    <Fragment>
      {
        pageInfo && <Row gutter={20}>
          <Col span={3}>
            <Form.Item>
              {getFieldDecorator(`length[${pageInfo.id}]`, {
                rules: [{
                  validator: (rule, value, callback) => {
                    checkLength(rule, value, callback, pageInfo.id)
                  }
                }],
                validateTrigger: 'onBlur'
              })(
                <Input maxLength={8}
                  onBlur={e => isNeedCalcFee(pageInfo.id, e)}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={1} className='cheng'>x</Col>
          <Col span={3}>
            <Form.Item>
              {getFieldDecorator(`width[${pageInfo.id}]`, {
                rules: [{
                  validator: (rule, value, callback) => {
                    checkWidth(rule, value, callback, pageInfo.id)
                  }
                }],
                validateTrigger: 'onBlur'
              })(
                <Input maxLength={8} onBlur={e => isNeedCalcFee(pageInfo.id, e)} />
              )}
            </Form.Item>
          </Col>
          <Col span={1} className='cheng'>x</Col>
          <Col span={3}>
            <Form.Item>
              {getFieldDecorator(`height[${pageInfo.id}]`, {
                rules: [{
                  validator: (rule, value, callback) => {
                    checkHeight(rule, value, callback, pageInfo.id)
                  }
                }],
                validateTrigger: 'onBlur'
              })(
                <Input maxLength={8} onBlur={e => isNeedCalcFee(pageInfo.id, e)} />
              )}
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={3}>
            <Form.Item>
              {getFieldDecorator(`weight[${pageInfo.id}]`, {
                rules: [{
                  validator: (rule, value, callback) => {
                    checkWeight(rule, value, callback, pageInfo.id)
                  }
                }],
                validateTrigger: 'onBlur'
              })(
                <Input maxLength={10} onBlur={e => isNeedCalcFee(pageInfo.id, e)} />
              )}
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={3} style={{ paddingRight: 0, marginRight: -10 }}>同规则包裹数量：</Col>
          <Col span={2}>
            <Form.Item>
              {getFieldDecorator(`qty[${pageInfo.id}]`, {
                rules: [{
                  validator: (rule, value, callback) => {
                    checkQty(rule, value, callback, pageInfo.id)
                  }
                }],
                validateTrigger: 'onBlur',
                initialValue: '1'
              })(
                <Input maxLength={8} onBlur={e => isNeedCalcFee(pageInfo.id, e)} />
              )}
            </Form.Item>
          </Col>
          {
            packInfoList && packInfoList.length > 1 && <Col span={3} className='recycle-btn'>
              <Icon type='recycle' onClick={e => removePackageInfo(pageInfo.id, e)} />
            </Col>
          }
        </Row>
      }

    </Fragment>
  )
}

export default PackageInfo;
