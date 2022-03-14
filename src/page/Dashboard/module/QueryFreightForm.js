import React, { Fragment, memo, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';

import Api from '@/api/QueryFreight';
import { QueryFreightFormRules } from './QueryFreightFormRules';
import { LENGTHUNIT, WEIGHTUNIT, FREIGHTCURRENCY, PLATFORMTYPE } from '@/utils/const';
import WithPackage from '@/components/Package';
import PackageInfoListUI from '../module/Package/PackageInfoListUI';
// import PackageInfoList from './PackageInfoList';
import QueryFreightResult from './QueryFreightResult';
import QueryFreightResultInner from './QueryFreightResultInner';
import Icon from '@/components/Icon';

const { Option } = Select;
let id = 0;
const NewPackageInfoList = WithPackage(PackageInfoListUI);

const QueryFreightForm = ({ form, innerType }) => {

  const { getFieldDecorator } = form;
  const [packageInfoList, setPackageInfoList] = useState([{
    id: id,
    length: '',//长
    width: '',//宽
    height: '',//高
    weight: '',//重
    lengthUnit: LENGTHUNIT.CM,
    weightUnit: WEIGHTUNIT.KG,
    qty: '1' //数量默认值为1
  }]);
  const [volume, setVolume] = useState(); //总体积
  const [totalWeight, setTotalWeight] = useState(); //总重量
  const [btnLoading, setBtnLoading] = useState(false);
  const [queryFreightResult, setQueryFreightResult] = useState([]); //运价查询结果
  const [packInfoListVisible, setPackInfoListVisible] = useState(false); //包裹信息是否显示
  const [tempPackInfoList, setTempPackInfoList] = useState([]); //未确定前，操作的包裹数据
  const [showResult, setShowResult] = useState(false); //显示运价查询结果

  //添加包裹信息
  const handleAddPackageInfo = e => {
    e.preventDefault();
    form.validateFields([`length[${id}]`, `width[${id}]`, `height[${id}]`, `weight[${id}]`, `qty[${id}]`], { force: true }, (err, values) => {
      if (err) {
        return
      }
      let tempPackageInfo = {
        id: '',
        length: '',//长
        width: '',//宽
        height: '',//高
        weight: '',//重
        lengthUnit: '1',//长宽高尺寸,1-cm,2-inch
        weightUnit: '2', //重量尺寸,1-克,2-千克，3-英镑
        qty: '1' //数量
      }
      tempPackageInfo['id'] = ++id;
      const newPackageInfoList = packageInfoList.concat(tempPackageInfo);
      const newTempPackInfoList = tempPackInfoList.concat(tempPackageInfo);
      setPackageInfoList(newPackageInfoList);
      setTempPackInfoList(newTempPackInfoList); //保存新增的包裹数据
      console.log("newPackageInfoList===", newPackageInfoList);
    });
  }

  //删除包裹信息
  const removePackageInfo = k => {
    const newPackageInfoList = packageInfoList.filter(el => el.id !== k);
    setTempPackInfoList(packageInfoList);
    setPackageInfoList(newPackageInfoList);
    console.log("newPackageInfoList===", newPackageInfoList);
  }

  //取消按钮
  const handleCancel = () => {
    console.log("packageInfoList===", packageInfoList);
    console.log("tempPackInfoList===", tempPackInfoList);
    let newPackageInfoList;
    if (packageInfoList.length > tempPackInfoList.length) {
      newPackageInfoList = packageInfoList.filter(item => !tempPackInfoList.includes(item));
    } else {
      newPackageInfoList = tempPackInfoList.filter(item => item.length && item.width && item.height && item.weight && item.qty);
    }
    console.log("newPackageInfoList==", newPackageInfoList);
    setPackageInfoList(newPackageInfoList);
    form.resetFields(['length', 'width', 'height', 'weight', 'qty']); //清空表单数据
    setTempPackInfoList([]); //清空数据
    setPackInfoListVisible(false);
  }

  //确定按钮
  const handleOk = () => {
    form.validateFields(['length', 'width', 'height', 'weight', 'qty'], { force: true }, (err, values) => {
      if (err) {
        return
      }
      setTempPackInfoList([]); //清空数据
      console.log("values===", values);
      const { length, width, height, weight, qty } = values;
      let volume = 0;
      let totalWeight = 0;
      packageInfoList.map(item => {
        let itemId = item.id;
        let len = length[itemId],
          wid = width[itemId],
          hei = height[itemId],
          wei = weight[itemId],
          quantity = qty[itemId];
        item.length = len;
        item.width = wid;
        item.height = hei;
        item.weight = wei;
        item.qty = quantity;
        volume = (volume * 1000000 + ((len * 100) * (wid * 100) * (hei * 100)) * quantity) / 1000000; //解决浮点数问题
        totalWeight = (totalWeight * 1000 + wei * 1000 * quantity) / 1000;
        return item;
      })

      console.log("packageInfoList===", packageInfoList);
      localStorage.setItem('packageInfoList', JSON.stringify(packageInfoList));
      console.log("volume===", volume);
      setVolume(volume)
      console.log("totalWeight===", totalWeight);
      setTotalWeight(totalWeight);
      form.setFieldsValue({
        packageInfo: `${volume}cm³, ${totalWeight}kg`
      })
      setPackInfoListVisible(false);
      calcFreight();
    })

  }

  //提交
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        calcFreight();
      }
    })
  }

  //查询运价
  const calcFreight = () => {
    setBtnLoading(true);
    setShowResult(false);
    let formData = {
      freightCurrency: FREIGHTCURRENCY.CNY,
      platformType: PLATFORMTYPE.LOGISTICS_CHANNAL,
      shipFromCountryCode: 'CN',
      shipToCountryCode: 'US',
      packageListInfo: packageInfoList
    }
    Api.queryFreightSubmit(formData).then(result => {
      const { status, data } = result;
      if (status) {
        setQueryFreightResult(data);
        setShowResult(true);
      }
      setBtnLoading(false);
    })
  }

  return (
    <Fragment>
      <div className='query-freight-wrap'>
        <Form layout='vertical' onSubmit={handleSubmit} className='query-freight-form'>
          <Form.Item label='发货地' extra='金华地区（含义乌）支持免费上门揽收，其他地区及网点需自行寄送至对应仓库。' className='ship-from-country'>
            {getFieldDecorator("shipFromCountryCode", {
              initialValue: '中国'
            })(
              <Input size="large"
                disabled={true}
              />
            )}
          </Form.Item>

          <Form.Item label='收货地'>
            {getFieldDecorator("shipToCountryCode", {
              initialValue: 'US'
            })(
              <Select size="large">
                <Option key='US'>美国</Option>
              </Select>
            )}
          </Form.Item>

          <div className='package-info-form-item'>
            <Form.Item label='包裹信息' >
              {getFieldDecorator("packageInfo", {
                ...QueryFreightFormRules.packageInfo
              })(
                <Input size="large"
                  onFocus={() => { setPackInfoListVisible(true) }}
                  readOnly="readOnly"
                />
              )}
            </Form.Item>
            {/*包裹信息 */}
            {
              packInfoListVisible && <div className='package-info-list-wrap'>
                <NewPackageInfoList
                  form={form}
                  packageInfoList={packageInfoList}
                  removePackageInfo={removePackageInfo}
                />
                <div className='btns-wrap'>
                  <a onClick={handleAddPackageInfo}><Icon type='add' />添加包裹</a>
                  <div>
                    <Button onClick={handleCancel}>取消</Button>
                    <Button onClick={handleOk} type='primary' className='confirm-btn'>确定</Button>
                  </div>
                </div>
              </div>
            }
            {/* <PackageInfoList
              form={form}
              packInfoListVisible={packInfoListVisible}
              packageInfoList={packageInfoList}
              handleAddPackageInfo={handleAddPackageInfo}
              removePackageInfo={removePackageInfo}
              handleOk={handleOk}
              handleCancel={handleCancel}
            /> */}
          </div>
          <Form.Item className='calc-freight'>
            <Button type="primary" htmlType="submit" loading={btnLoading} className='submit'>查询运费</Button>
          </Form.Item>
        </Form>


        {innerType &&
          <QueryFreightResultInner
            queryFreightResult={queryFreightResult}
            showResult={showResult}
          />
        }

      </div>

      {!innerType &&
        <QueryFreightResult
          queryFreightResult={queryFreightResult}
          showResult={showResult}
        />
      }
    </Fragment>
  )
}

const WrappedForm = Form.create({ name: "queryFreightForm" })(QueryFreightForm);
export default WrappedForm;
