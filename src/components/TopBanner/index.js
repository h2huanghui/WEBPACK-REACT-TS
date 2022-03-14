/**
* 顶部Banner
* @author Jiang_Chuangshi
* @date 2021/02/01 11:03
* @param {JSX} param_name param_description
* @returns {JSX}
*/
import React, { Fragment, memo, useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import AdsApi from '@/api/Common';
import Icon from '@icon';

import '@/styles/components/TopBanner/index.less';

const TopBanner = forwardRef((props, ref) => {
  const { adsLocationType } = props;
  const [bannerInfo, setBannerInfo] = useState({});
  useEffect(() => {
    AdsApi.topBannerList({
      adsLocationType
    }).then(res => {
      setBannerInfo({
        ...(res && res.data && res.data.length && res.data[0]),
        show: res && res.data && res.data.length && !Cookies.get(res.data[0].id)
      });
    }).catch(err => {
      setBannerInfo({
        show: false
      });
    }).finally(() => {

    });
  }, []);

  const handleCloseBanner = () => {
    Cookies.set(bannerInfo.id, '1', { expires: 1 });
    setBannerInfo(false);
  };
  const styleCommon = {
    backgroundSize: 'auto 60px',
    backgroundColor: bannerInfo.backColor,
    pointerEvents: bannerInfo.adsLink?'cursor':'none'
  };
  const picL = {
    ...styleCommon,
    backgroundImage: `url('${bannerInfo.picL}')`,
  };
  const picM = {
    ...styleCommon,
    backgroundImage: `url('${bannerInfo.picM}')`,
  };
  const picS = {
    ...styleCommon,
    backgroundImage: `url('${bannerInfo.picS}')`,
  };

  return (
    <Fragment>
      {
        !!bannerInfo.show &&
        <div className="header-top-notice" ref={ref}>
          <a className="header-top-img header-top-img-1024"
            target="_blank"
            href={bannerInfo.adsLink}
            style={picL}
          >
          </a>
          <a className="header-top-img header-top-img-768"
            target="_blank"
            href={bannerInfo.adsLink}
            style={picM}
          >
          </a>
          <a className="header-top-img header-top-img-480"
            target="_blank"
            href={bannerInfo.adsLink}
            style={picS}
          >
          </a>
          {
            bannerInfo.adsFreq === 'CloseByCookie' &&
            <span
              onClick={handleCloseBanner}
              className="header-top-close">
              <Icon type="delete"></Icon>
            </span>
          }
        </div>
      }
    </Fragment>
  );
});

TopBanner.propTypes = {
  adsLocationType: PropTypes.number,//广告出现的位置 8=物流频道Center外,9=物流频道Center内,10=派单页
};

export default memo(TopBanner);