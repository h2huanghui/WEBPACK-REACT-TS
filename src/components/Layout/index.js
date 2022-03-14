import React, { Component ,Fragment } from 'react'
import '@/styles/components/Layout/index.less';
import Footer from './Footer';
export default class Layout extends Component {

  constructor(props){
    super(props)

  }

  componentDidMount(){
    let {noSider,blank,title} = this.props;
    let bodyCls = !!noSider?'dsc-no-sider':''
    let blankCls = !!blank?'dsc-blank-layout':''
    document.querySelector('html').className = !!blank? blankCls : bodyCls;
    if(title){
      document.title = title + ` | 中国制造网、开锣网与京东联合打造中美快递专线服务`
    }
  }

  render() {
    let {title} = this.props;
    return (
      <div className="dsc-main">
        <div className="dsc-grid dsc-content">
          <div className="header-title">{title}</div>
          {this.props.children}
        </div>

        <Footer />
      </div>
    )
  }
}
