import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@icon'
import menuConfig from './menuConfig'
import '@/styles/components/Header/index.less'
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '@/action';
import {Tag} from 'antd';


function Sider({
  menuVisible,
  handleIconClick,
  tagVisi,
  subMenuClick
}) {
  const [pathname, setPathname] = useState('');

  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const routePathname = useSelector(state => state.router.location.pathname);
  const thisLocation = window.location.href;

  const isSilkSupplier = userInfo && userInfo.silkSupplier; //交易角色的供应商
  const isLogisticsSupplier = userInfo && userInfo.logisticsSupplier; //物流角色供应商

  const silkSupplierMenu = (
    <ul className='menu-item-content-ul' onClick={() => handleIconClick(false)}>
      <li key="k_home"><a href='//logistics.crov.com' rel="noreferrer" >查看物流服务</a></li>
      <li key="k_seller"><a href='//seller.crov.com' rel="noreferrer" >进入开锣交易中心</a></li>
      <li key="k_logout"><a href={userInfo.ossUser ? `//logistics.crov.com/logistics/api/v1/logout` : `//login.crov.com/logout?nextPage=${thisLocation}`} rel="noreferrer" >退出登录</a></li>
    </ul >
  );

  const logisticsSupplierMenu = (
    <ul className='menu-item-content-ul' onClick={() => handleIconClick(false)}>
      <li key="k_home"><a href='//logistics.crov.com' >查看物流服务</a></li>
      <li key="k_supplier"><a href='//www.crov.com/suppliers.html'  >查看开锣WS服务</a></li>
      <li key="k_dropshipping"><a href='//dropshipping.crov.com/become-crov-supplier'  >查看开锣DS服务</a></li>
      <li key="k_logout"><a href={userInfo.ossUser ? `//logistics.crov.com/logistics/api/v1/logout` : `//login.crov.com/logout?nextPage=${thisLocation}`}>退出登录</a></li>
    </ul>
  )

  useEffect(() => {
    dispatch(updateUserInfo());
  }, []);

  let match = routePathname.match(/[\w_\s.%]+/g)
  if (routePathname === '/' && pathname !== '/') {
    setPathname('/')
  }
  if (match && (`/${match[0]}` !== pathname)) {
    setPathname(`/${match[0]}`)
  }


  return (
    <div className="menu-in-pad">
      <div className="menu">
        <div className='pad-mark' onClick={() => handleIconClick(false)}></div>
        <div className='menu-item-info-wrap'>
          <div className='menu-title'><Icon type='delete' onClick={() => handleIconClick(false)} /></div>
          <div className='menu-item'>
            {
              menuConfig.map((menu, i) => {
                let hasSubMenu = menu.subMenus && menu.subMenus.length > 0;
                if (hasSubMenu) {
                  return <div key={'sub_' + i} className='menu-item-content-multi'>
                    <div className='menu-item-title'>
                      <span>{menu.title}</span>
                    </div>

                    <ul className='menu-item-content-ul' onClick={() => handleIconClick(false)}>
                      {menu.subMenus.map((subMenu, j) => {
                        return <li key={`item_${i}_${j}`} >
                          <Link to={subMenu.route} onClick={()=>subMenuClick(subMenu)}>
                            {subMenu.title}
                            {
                              (subMenu.withTag && tagVisi) &&
                              <Tag color="#e64545" className="tag-fund-new">NEW</Tag>
                            }
                          </Link>
                        </li>
                      })}
                    </ul>
                  </div>
                } else {
                  return <div key={i} className='menu-item-content-single' onClick={() => handleIconClick(false)}>
                    <Link to={menu.route}>
                      <span>{menu.title}</span>
                    </Link>
                  </div>
                }
              })
            }
          </div>
          <div className='menu-item-content-multi menu-info'>
            <div className='menu-item-title'>Hi, {userInfo.userName}</div>
            {isLogisticsSupplier && isSilkSupplier ? silkSupplierMenu : logisticsSupplierMenu}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sider
