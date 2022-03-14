import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
// import Marquee from 'react-fast-marquee';

// import Marquee from 'reac-marquee';
//import Marquee from 'react-double-marquee';
import homeApi from "@/api/Home";
import CommonApi from "@/api/Common";
import Icon from '@icon';
import '@/styles/components/Notices/index.less';

export default function Notices({ adsLocationType }) {
  const [noticeList, setNoticeList] = useState([]);
  const [isAllClosed, setIsAllClosed] = useState(true);

  useEffect(() => {
    getNoticeList();
  }, []);
  //监听noticeList来判断通知是否全部关闭
  useEffect(() => {
    let allClosed = !(noticeList.some(item => item.isShow));
    setIsAllClosed(allClosed);
  }, [noticeList]);

  /**
  * 获取notice数据
  * @author huanghui
  * @date 2021/02/02 13:38
  * @returns {Void}
  */
  const getNoticeList = () => {
    if (!adsLocationType) {
      return
    }
    CommonApi.getTopNoticeList({ adsLocationType }).then(res => {
      let data;
      //频道外：8，频道内：9
      if (adsLocationType === '8') {
        data = res.data && (res.data.length > 1 ? res.data.slice(0, 1) : res.data);
      } else {
        data = res.data && (res.data.length > 3 ? res.data.slice(0, 3) : res.data);
      }
      let list = data && data.map(item => {
        return {
          ...item,
          isShow: !Cookies.get(item.id)
        }
      });
      setNoticeList(list || []);
    }).catch(err => {
      setNoticeList([]);
    });
  };

  /**
  * 关闭对应公告
  * @author huanghui
  * @date 2021/02/02 13:45
  * @param {String} id 关闭的公告对应的id
  * @returns {Void}
  */
  const handleCloseTip = (id) => {
    let newList = noticeList.map((item, index) => {
      if (item.id === id) {
        Cookies.set(item.id, '1', { expires: 1 });
        return {
          ...item,
          isShow: false
        }
      }
      return item;
    });
    setNoticeList(newList);
  };

  let renderDom = <div className="notice-container">
    {
      noticeList.length > 0 && noticeList.map((item) => {
        return (
          item.isShow ?
            <div className="notice-item-wrap" key={item.id}>
              <div className="notice-item" style={{ maxWidth: adsLocationType === '8' ? 1440 : 1320 }}>
                <Icon type="volume-up" />
                <div className="content" dangerouslySetInnerHTML={{ __html: item.content }}>

                  {/* <Marquee text={item.content} loop={true} hoverToStop={true} /> */}
                  {/* <Marquee pauseOnHover={true} speed={5} gradient={false} gradientWidth={100} className='test-hh' direction='right' >{item.content} </Marquee> */}
                </div>
                {
                  item.closeable &&
                  <Icon type="delete" onClick={() => { handleCloseTip(item.id) }} />
                }
              </div>
            </div>
            : null
        )
      })
    }
  </div>;

  return isAllClosed ? null : renderDom;
}

Notices.propTypes = {
  adsLocationType: PropTypes.string,//公告出现的位置 '8'=物流频道Center外,'9'=物流频道Center内
};