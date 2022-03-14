import React, { useState, useEffect, useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { Layout, Menu, Alert } from "antd";
import Support from "@/components/Support";

import Routes from "@/routes";
import TipAlert from "@/components/Alert";

import TopBanner from "@/components/TopBanner";
import Notice from "@/components/Notices";

export default function Main() {
  // const [userInfo,setUserInfo] = useState({});
  const { pathname } = useLocation();
  const [topNotice, setTopNotice] = useState(false);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [encryptFpId, setEncryptFpId] = useState(() => {
    let pathSplit = pathname.split("/");
    if (pathSplit[1] === "logisticsOrder") {
      return pathSplit[2];
    }
  });
  const userInfo = useSelector((state) => state.user.userInfo);
  const topThingsRef = useRef();
  const thisLocation = window.location.href;
  useEffect(() => {
    let userAgent = navigator.userAgent;
    let ie =
      userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    setTopNotice(ie);
    const scrollLsitener = (e) => {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop) {
        if (!offsetHeight) {
          setOffsetHeight(
            topThingsRef.current && topThingsRef.current.offsetHeight
          );
        }
      } else {
        setOffsetHeight(0);
      }
    };
    window.addEventListener("scroll", scrollLsitener);
    return () => {
      window.removeEventListener("scroll", scrollLsitener);
    };
  }, []);

  const menu = (
    <Menu className="header-user-menu" style={{ width: 200 }}>
      <Menu.Item key="k_logout">
        <a
          href={`//login.crov.com/logout?nextPage=${thisLocation}`}
          rel="noreferrer"
        >
          Log Out
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="dsc-wrapper">
      <div
        className="top-things"
        ref={topThingsRef}
        style={{
          position: offsetHeight ? "fixed" : "relative",
          width: "100%",
          zIndex: 999,
        }}
      >
       
        {userInfo && userInfo.userName && (
          <Fragment>
            <TopBanner adsLocationType={9} />
            <Notice adsLocationType="9" />
          </Fragment>
        )}
        <Header />
      </div>
      <Layout className="dsc-layout" style={{ marginTop: offsetHeight }}>
        <Routes />
        <Support hideWechat />
      </Layout>
    </div>
  );
}
