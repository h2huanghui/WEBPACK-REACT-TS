import React, {  memo,useState,useEffect  } from 'react'
import {  Button,Affix, Popover, } from 'antd';

import '@/styles/components/Support/index.less';

export default function Support(props) {

  const [showGotop, setShowGotop] = useState(false);

  useEffect(()=>{
    let last_known_scroll_position = 0;
    let ticking = false;
    let wHeight = window.innerHeight;
    let scrollHandle = e=>{
      last_known_scroll_position = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if(last_known_scroll_position > wHeight){
            setShowGotop(true)
          }else{
            setShowGotop(false)
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', scrollHandle)
    return ()=>{
      window.removeEventListener('scroll',scrollHandle)
    }
  },[]);

  let {hideWechat} = props;

  const openKefu = () =>{
    var kefuUrl = 'http://kefu.trademessenger.com/chat?domain=micen&businessType=d3GHOpGgKK8&referrer='+ encodeURIComponent(window.location.href);
    window.open(kefuUrl, 'kefu','toolbar=no,location=no,directories=no,resizable=yes,status=yes,menubar=no,scrollbars=yes,width=800,height=600,left=0,top=0');
  }

  const goTop = ()=>{
    window.scrollTo({left: 0,top: 0,behavior: 'smooth'})
  }

  const wechatInner = <div>
    <img width="130" src={require('@/assets/img/home/ecode.png')} alt=""/>
    <p style={{textAlign:'center'}}>扫码立即咨询</p>
  </div>

  return (
    <div className="crov-support-wrap">
      <div className="crov-support" >
        {!hideWechat && (
          <div data-aliases="wechat" className="wechat">
            <Popover trigger="hover" content={wechatInner} placement="left">
              <a className="f-wechat" rel="nofollow" target="_blank"></a>
            </Popover>
          </div>
        )}
        <div data-aliases="liveChat" className="liveChat">
          <Popover trigger="hover" content="在线咨询" placement="left">
            <a onClick={openKefu} className="f-live-chat" rel="nofollow" target="_blank"></a>
          </Popover>
        </div>
        <div data-aliases="goTop" className="goTop" style={{visibility:showGotop?'visible':'hidden'}}>
          <Popover trigger="hover" content="Back to Top" placement="left">
            <a onClick={goTop} className="f-go-top" rel="nofollow" target="_blank"></a>
          </Popover>
        </div>
      </div>
    </div>
  )
}
