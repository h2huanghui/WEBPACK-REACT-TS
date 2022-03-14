
import React, { Component } from 'react';
import '@/styles/components/Layout/footer.less';

function Footer (){
  return <div className="dsc-footer">
  <div className="footer-bottom">
    <div className="security-record">
      <div className="footer-copy-info">
        <span className="security-record-item"><i className="icon-jsdsgs"></i><a href="https://zzlz.gsxt.gov.cn/businessCheck/verifKey.do?showType=p&amp;serial=32000020190705114322000017105695-SAIC_SHOW_10002020190711101451991&amp;signData=MEQCINTb1zaiFcbhLAONd6cxItDAPv2mo7OGORIyGfD9EslYAiDOyM1EJPF+aBFLD8PRjXePu5B5WDDTMhTYu+aZAxnQBA==" target="_blank" rel="nofollow">电子营业执照</a></span>
        <em className="gap"></em>
        <span className="security-record-item"><i className="icon-emblem"></i><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011202000087" target="_blank" rel="nofollow">苏公网安备 32011202000087号</a></span>
        <em className="gap"></em>
        <span className="security-record-item txt-only"><a href="http://www.beian.miit.gov.cn/" target="_blank" rel="nofollow">苏ICP备08107572号</a></span>
        <em className="gap"></em>
        <span className="security-record-item txt-only">
          &copy;  {new Date().getFullYear()} <a href="https://www.focuschina.com/html_en/" target="_blank"> 焦点科技股份有限公司</a>  版权所有 </span>
      </div>
    </div>
  </div>
</div>

}

export default Footer;