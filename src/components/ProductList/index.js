import React, { useState, useEffect, forwardRef, useImperativeHandle, Fragment } from 'react';
import { Row, Col, Modal, message, Checkbox, Popconfirm } from 'antd';

import SettingApi from '@/api/Setting';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';
import Icon from '@/components/Icon';
import '@/styles/components/ProductList/index.less';

/**
 * 公共产品列表组件
 */
function ProductList({
  type = '1', //type 1-管理列表，显示操作；2-可选列表，显示选择框
  setAddEditProduct, //编辑商品
  changeSelectedProducts,
  checkedGoodsIds
}, ref) {
  let gutter = 20;
  let spanList = [];
  if (type === '1') {
    spanList = [0, 5, 5, 2, 2, 4, 2, 2, 2];
  } else if (type === '2') {
    spanList = [1, 7, 7, 0, 0, 0, 4, 5, 0];
  }

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [filter, setFilter] = useState({
    // pageNumber: '1'
  });
  useEffect(() => {
    setLoading(true);
    SettingApi.getGoodsList(filter).then(result => {
      if (result.status === '000000') {
        setData(result.data);
      } else {
        message.error(result.message || 'Unknown Error');
      }
      setLoading(false);
    });
  }, [filter]);

  useImperativeHandle(
    ref,
    () => ({
      refresh: () => { setFilter({ ...filter }); }
    })
  );

  function deleteProduct(prod) {
    setLoading(true);
    SettingApi.deleteProduct({ goodsId: prod.goodsId }).then(result => {
      if (result.status === '000000') {
        setFilter({ ...filter });
      } else {
        message.error(result.message || 'Unknown Error');
      }
      setLoading(false);
    });
  }
  let listView = null;
  if (loading) {
    listView = <Loading />;
  } else if (data && data.datas && data.datas.length > 0) {
    listView = <Checkbox.Group
      style={{ width: '100%' }}
      onChange={e => changeSelectedProducts(data.datas, e)}
      defaultValue={checkedGoodsIds}
    >
      {
        data.datas.map(prod => {
          return <Row key={prod.goodsId} gutter={gutter} className="product-item">
            <Col span={spanList[0]}><Checkbox value={prod.goodsId}></Checkbox></Col>
            <Col title={prod.declaredNameCn} className="cutxt3" span={spanList[1]}>{prod.declaredNameCn}</Col>
            <Col title={prod.declaredNameEn} className="cutxt3" span={spanList[2]}>{prod.declaredNameEn}</Col>
            {
              type !== '2' &&
              <Fragment>
                <Col title={prod.material} className="cutxt3" span={spanList[3]}>{prod.material}</Col>
                <Col title={prod.purpose} className="cutxt3" span={spanList[4]}>{prod.purpose}</Col>
                <Col className="cutxt3" span={spanList[5]}>{prod.skuCode}</Col>
              </Fragment>
            }
            <Col className="cutxt3" span={spanList[6]}>{prod.customsCode}</Col>
            <Col className="cutxt3" span={spanList[7]}>{prod.declaredValue.toFixed(2)}</Col>
            <Col span={spanList[8]}>
              <a onClick={() => {
                setAddEditProduct({
                  show: true,
                  type: '1',
                  product: prod
                });
              }}>修改</a>
              <Popconfirm
                title="确定删除当前商品吗？"
                onConfirm={() => deleteProduct(prod)}
                okText="是"
                cancelText="否"
              // placement="topRight"
              >
                <a className="delete">
                  <Icon type="recycle"></Icon>
                </a>
              </Popconfirm>
            </Col>
          </Row>;
        })
      }
    </Checkbox.Group>;
  } else {
    listView = <Empty description={'您还没有添加商品。'} showLayout={false}></Empty>;
  }

  return (
    <div className="product-list-wrap">
      <Row gutter={gutter} className="header">
        <Col span={spanList[0]}></Col>
        <Col span={spanList[1]}>商品中文名称</Col>
        <Col span={spanList[2]}>商品英文名称</Col>

        {
          type !== '2' && <Fragment>
            <Col span={spanList[3]}>材质</Col>
            <Col span={spanList[4]}>用途</Col>
            <Col span={spanList[5]}>商品SKU码</Col>
          </Fragment>
        }
        <Col span={spanList[6]}>海关编码</Col>
        <Col span={spanList[7]}>申报单价（USD/件）</Col>
        <Col span={spanList[8]}>操作</Col>
      </Row>
      {
        listView
      }
    </div>
  );
}

export default forwardRef(ProductList);