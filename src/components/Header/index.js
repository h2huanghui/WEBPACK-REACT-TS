/*global require*/
/*eslint no-undef: "error"*/
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Popover, Tag } from 'antd';

import { updateUserInfo } from '@/action';
import Icon from '@icon';
import Slider from './slider';
import menuConfig from './menuConfig';

import '@/styles/components/Header/index.less';

function Sider() {
  const dispatch = useDispatch();
  const isGlanced_fundPage = !!JSON.parse(window.localStorage.getItem('fund-page-glanced'));
  const isGlanced_pubTip = !!JSON.parse(window.localStorage.getItem('publicity-glanced'));
  const userInfo = useSelector(state => state.user.userInfo);
  const routePathname = useSelector(state => state.router.location.pathname);
  const [pathname, setPathname] = useState('');
  const [popVisi, setPopVisi] = useState(!isGlanced_pubTip);
  const [tagVisi, setTagVisi] = useState(!isGlanced_fundPage);
  const thisLocation = window.location.href;
  const isSilkSupplier = userInfo && userInfo.silkSupplier; //交易角色的供应商
  const isLogisticsSupplier = userInfo && userInfo.logisticsSupplier; //物流角色供应商
  const [menuVisible, setMenuVisible] = useState(false);

  const silkSupplierMenu = (
    <Menu className="header-user-menu" style={{ width: 160 }}>
      <Menu.Item key="k_home"><a href="//logistics.crov.com" rel="noreferrer" >查看物流服务</a></Menu.Item>
      <Menu.Item key="k_seller"><a href="//seller.crov.com" rel="noreferrer" >进入开锣交易中心</a></Menu.Item>
      <Menu.Item key="k_logout">
        <a
          href={
            userInfo.ossUser
              ? '//logistics.crov.com/logistics/api/v1/logout'
              : `//login.crov.com/logout?nextPage=${thisLocation}`
          }
          rel="noreferrer">
          退出登录</a>
      </Menu.Item>
    </Menu>
  );

  const logisticsSupplierMenu = (
    <Menu className="header-user-menu" style={{ width: 160 }}>
      <Menu.Item key="k_home">
        <a href="//logistics.crov.com" rel="noreferrer" >查看物流服务</a>
      </Menu.Item>
      <Menu.Item key="k_supplier">
        <a href="//www.crov.com/suppliers.html" rel="noreferrer" >查看开锣WS服务</a>
      </Menu.Item>
      <Menu.Item key="k_dropshipping">
        <a href="//dropshipping.crov.com/become-crov-supplier" rel="noreferrer" >查看开锣DS服务</a>
      </Menu.Item>
      <Menu.Item key="k_logout">
        <a href={
          userInfo.ossUser
            ? '//logistics.crov.com/logistics/api/v1/logout'
            : `//login.crov.com/logout?nextPage=${thisLocation}`
        }
        rel="noreferrer">退出登录</a>
      </Menu.Item>
    </Menu>
  );
  //代理需要禁用点击隐藏的元素的点击事件，阻止冒泡
  const handleStopPropagation = (e) => {
    if (e && e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
  };
  const handleClose = () => {
    let _glanced = JSON.parse(localStorage.getItem('publicity-glanced'));
    if (_glanced) return;
    setPopVisi(false);
    window.localStorage.setItem('publicity-glanced', true);
  };
  const handleSubMenuClick = (subMenu) => {
    if (subMenu.withTag && tagVisi) {
      setTagVisi(false);
      window.localStorage.setItem('fund-page-glanced', true);
    }
  };
  useEffect(() => {
    // document.addEventListener('click', handleClose);
    // return () => {
    //   document.removeEventListener('click', handleClose);
    // };
  }, []);
  useEffect(() => {
    dispatch(updateUserInfo());
    //eslint-disable-next-line
  }, []);

  let match = routePathname.match(/[\w_\s.%]+/g);
  if (routePathname === '/' && pathname !== '/') {
    setPathname('/');
  }
  if (match && (`/${match[0]}` !== pathname)) {
    setPathname(`/${match[0]}`);
  }

  const handleIconClick = (value) => {
    setMenuVisible(value);
  };

  return (
    <Fragment>
      <div className="dsc-header-wrap">
        <div className="dsc-header dsc-grid">
          <div className="dsc-header-left">
            <div className="dsc-icon-wrap" onClick={()=>handleIconClick(true)}><Icon type="category2" /></div>
            {
              menuVisible && 
              <Slider handleIconClick={handleIconClick} tagVisi={tagVisi} subMenuClick={handleSubMenuClick}/>
            }
            <div className="dsc-logo">
              <Link to="/">
                <img style={{ width: 235 }} src={require('@/assets/img/global/logo_head_2.png')} alt="" />
              </Link>
              <span>物流服务</span>
            </div>
            <div className="dsc-menu-link">
              {
                menuConfig.map((menu, i) => {
                  let hasSubMenu = menu.subMenus && menu.subMenus.length > 0;
                  if (hasSubMenu) {
                    return <div className="dsc-menu-block" key={'sub_' + i}>
                      <Dropdown trigger={['hover', 'click']} placement="bottomRight" overlay={
                        <Menu className="header-user-menu" style={{ width: 135 }}>
                          {menu.subMenus.map((subMenu, j) => {
                            return <Menu.Item key={`item_${i}_${j}`} >
                              <Link
                                onClick={() => handleSubMenuClick(subMenu)}
                                className={`dsc-menu-sub-item ${pathname === subMenu.route ? 'current' : ''}`}
                                to={subMenu.route} >
                                {subMenu.title}
                                {
                                  (subMenu.withTag && tagVisi) &&
                                    <Tag color="#e64545" className="tag-fund-new">NEW</Tag>
                                }
                              </Link>
                            </Menu.Item>;
                          })}
                        </Menu>
                      }>
                        <span className={`dsc-menu-item ${menu.route === pathname ? 'current-title' : ''}`}>
                          <Popover
                            getPopupContainer={()=>document.querySelector('.fund')}
                            content={
                              <div onClick={handleStopPropagation}>
                                物流专款服务上线<br />点击资金菜单查看详情
                                <Icon type="delete"
                                  onClick={handleClose}
                                  style={{cursor: 'pointer',position: 'relative',top: -22,marginLeft: 5}}/>
                              </div>
                            }
                            defaultVisible
                            visible={menu.withPopover && popVisi}>
                            <span className={`${Number(menu.key) === 3 ? 'fund' : ''}`}
                              style={{ marginRight: 2 }}>{menu.title}</span>
                          </Popover>
                          <Icon type="down" />
                        </span>
                      </Dropdown>
                    </div>;
                  } else {
                    return <div className="dsc-menu-block" key={i}>
                      <Link className={`dsc-menu-item ${menu.route === pathname ? 'current-title' : ''}`}
                        to={menu.route}>
                        <span>{menu.title}</span>
                      </Link>
                    </div>;
                  }
                })
              }
            </div>
          </div>
          <div className="dsc-user-info">
            <Dropdown trigger={['hover']}
              className="header-username"
              placement="bottomRight"
              overlay={isLogisticsSupplier && isSilkSupplier ? silkSupplierMenu : logisticsSupplierMenu}>
              <div>
                <Icon type="personal" />
                <span>{userInfo.userName}</span>
                <Icon type="down" />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="pad-header-mark"></div>
    </Fragment>
  );
}

export default Sider;
