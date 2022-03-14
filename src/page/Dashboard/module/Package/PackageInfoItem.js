import React, { Fragment } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import Icon from '@/components/Icon';
import { method } from "@/utils/rules";

const PackageInfoItem = (props) => {
  const { form, packInfoList, pageInfo, removePackageInfo, checkLength, checkWidth, checkHeight, checkWeight, checkQty } = props;
  const { getFieldDecorator } = form;

  return (
    <Fragment>
      {
        pageInfo && <Row type='flex'>
          <Col span={3}>
            <Form.Item>
              {getFieldDecorator(`length[${pageInfo.id}]`, {
                rules: [{
                  validator: (rule, value, callback) => {
                    checkLength(rule, value, callback, pageInfo.id)
                  }
                }],
                validateTrigger: 'onBlur',
                initialValue: pageInfo.length
              })(
                <Input maxLength={8} />
              )}
            </Form.Item>
          </Col>
          <Col span={1}>x</Col>
          <Col span={3}>
            <Form.Item>
              {getFieldDecorator(`width[${pageInfo.id}]`, {
                rules: [{
                  validator: (rule, value, callback) => {
                    checkWidth(rule, value, callback, pageInfo.id)
                  }
                }],
                validateTrigger: 'onBlur',
                initialValue: pageInfo.width
              })(
                <Input maxLength={8} />
              )}
            </Form.Item>
          </Col>
          <Col span={1}>x</Col>
          <Col span={3}>
            <Form.Item>
              {getFieldDecorator(`height[${pageInfo.id}]`, {
                rules: [{
                  validator: (rule, value, callback) => {
                    checkHeight(rule, value, callback, pageInfo.id)
                  }
                }],
                validateTrigger: 'onBlur',
                initialValue: pageInfo.height
              })(
                <Input maxLength={8} />
              )}
            </Form.Item>
          </Col>
          <Col span={1}>x</Col>
          <Col span={3}>
            <Form.Item>
              {getFieldDecorator(`weight[${pageInfo.id}]`, {
                rules: [{
                  validator: (rule, value, callback) => {
                    checkWeight(rule, value, callback, pageInfo.id)
                  }
                }],
                validateTrigger: 'onBlur',
                initialValue: pageInfo.weight
              })(
                <Input maxLength={10} />
              )}
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item>
              {getFieldDecorator(`qty[${pageInfo.id}]`, {
                rules: [{
                  validator: (rule, value, callback) => {
                    checkQty(rule, value, callback, pageInfo.id)
                  }
                }],
                validateTrigger: 'onBlur',
                initialValue: pageInfo.qty
              })(
                <Input
                  maxLength={8}
                />
              )}
            </Form.Item>
          </Col>
          {
            packInfoList && packInfoList.length > 1 && <Col span={3} className='delete'>
              <Icon type='recycle' onClick={e => removePackageInfo(pageInfo.id, e)} />
            </Col>
          }
        </Row>
      }

    </Fragment>
  )
}

PackageInfoItem.propTypes = {
  form: PropTypes.object,
  packInfoList: PropTypes.array,
  pageInfo: PropTypes.object,
  removePackageInfo: PropTypes.func
}

export default PackageInfoItem;
