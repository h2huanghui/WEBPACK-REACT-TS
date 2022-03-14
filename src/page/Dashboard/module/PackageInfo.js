import React, { Fragment } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import Icon from '@/components/Icon';
import { QueryFreightFormRules } from './QueryFreightFormRules';
import { method } from "@/utils/rules";


const PackageInfo = ({
  form,
  packInfoList,
  pageInfo,
  removePackageInfo,
  enterFunc
}) => {

  const { getFieldDecorator } = form;

  return (
    <Fragment>
      {
        pageInfo && <Row type='flex'>
          <Col span={3}>
            <Form.Item>
              {getFieldDecorator(`length[${pageInfo.id}]`, {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请填写包裹长'
                  },
                  method.number8_2('请填写数字，小数点后最多输入2位')
                ],
                validateFirst: true,
                validateTrigger: 'onBlur',
                initialValue: pageInfo.length
              })(
                <Input maxLength={8} onPressEnter={enterFunc} />
              )}
            </Form.Item>
          </Col>
          <Col span={1}>x</Col>
          <Col span={3}>
            <Form.Item>
              {getFieldDecorator(`width[${pageInfo.id}]`, {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请填写包裹宽'
                  },
                  method.number8_2('请填写数字，小数点后最多输入2位')
                ],
                validateFirst: true,
                validateTrigger: 'onBlur',
                initialValue: pageInfo.width
              })(
                <Input maxLength={8} onPressEnter={enterFunc} />
              )}
            </Form.Item>
          </Col>
          <Col span={1}>x</Col>
          <Col span={3}>
            <Form.Item>
              {getFieldDecorator(`height[${pageInfo.id}]`, {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请填写包裹高'
                  },
                  method.number8_2('请填写数字，小数点后最多输入2位')
                ],
                validateFirst: true,
                validateTrigger: 'onBlur',
                initialValue: pageInfo.height
              })(
                <Input maxLength={8} onPressEnter={enterFunc} />
              )}
            </Form.Item>
          </Col>
          <Col span={1}>x</Col>
          <Col span={3}>
            <Form.Item>
              {getFieldDecorator(`weight[${pageInfo.id}]`, {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请填写包裹重'
                  },
                  method.number10_3('请填写数字，小数点后最多输入3位')
                ],
                validateFirst: true,
                validateTrigger: 'onBlur',
                initialValue: pageInfo.weight
              })(
                <Input maxLength={10} onPressEnter={enterFunc} />
              )}
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item>
              {getFieldDecorator(`qty[${pageInfo.id}]`, {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请填写包裹件数'
                  },
                  method.positiveInteger('请填写正整数')
                ],
                validateFirst: true,
                validateTrigger: 'onBlur',
                initialValue: pageInfo.qty
              })(
                <Input
                  maxLength={8} onPressEnter={enterFunc}
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

PackageInfo.propTypes = {
  form: PropTypes.object,
  packInfoList: PropTypes.array,
  pageInfo: PropTypes.object,
  removePackageInfo: PropTypes.func
}

export default PackageInfo;
