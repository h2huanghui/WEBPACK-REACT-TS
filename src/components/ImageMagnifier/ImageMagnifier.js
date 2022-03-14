import React, {Component} from "react";
import "./index.less";
import Loading from "@/components/Loading";

class ImageMagnifier extends Component {
  imgContainerRef;
  minImgRef;
  maxImgRef;

  constructor(props) {
    super(props);
    this.imgContainerRef = React.createRef();
    this.minImgRef = React.createRef();
    this.maxImgRef = React.createRef();
    this.state = {
      showMaxImg: true,
      scale: 1,
      minImg: props.minImg,
      maxImg: props.maxImg,
      magnifierOff: false,
      imgLoad: false,
      cssStyle: {
        mouseBlock: {
          top: "0",
          left: "0",
          width: "0",
          height: "0",
        },
        magnifierContainer: {
          right: "0",
          width: "",
          height: "",
        },
        magnifierImgStyle: {
          top: 0,
          left: 0
        }
      }
    }
  }

  componentDidMount(){
    
    let cssStyle = JSON.parse(JSON.stringify(this.state.cssStyle));
    const {clientWidth: width, clientHeight: height} = this.imgContainerRef.current;
    cssStyle.magnifierContainer.width = width + "px";
    cssStyle.magnifierContainer.height = height + "px";
    cssStyle.magnifierContainer.right = -(width + 10) + "px";
    this.setState({cssStyle})
  }

  mouseEnter = () => {
    this.setState({
      magnifierOff: true
    });
  };
  mouseLeave = () => {
    this.setState({
      magnifierOff: false
    });
  };
  mouseMove = event => {
    let e = event.nativeEvent;
    this.calculationBlock(e.offsetX, e.offsetY);
  };

  calculationBlock(offsetX, offsetY) {
    let cssStyle = JSON.parse(JSON.stringify(this.state.cssStyle));
    let scale = this.state.scale;
    const {clientWidth: width, clientHeight: height} = this.imgContainerRef.current;
    const {offsetTop: top, offsetLeft: left} = this.minImgRef.current;
    const offsetLength = width * scale / 2; //mouseBlock宽度除2
    if (offsetX < (left + offsetLength)) {
      offsetX = (left + offsetLength);
    }
    if (offsetX > (width - left - offsetLength)) {
      offsetX = (width - left - offsetLength);
    }
    if (offsetY < (top + offsetLength)) {
      offsetY = (top + offsetLength);
    }
    if (offsetY > (height - top - offsetLength)) {
      offsetY = (height - top - offsetLength);
    }
    cssStyle.mouseBlock.left = parseFloat(offsetX - offsetLength) + "px";
    cssStyle.mouseBlock.top = parseFloat(offsetY - offsetLength) + "px";

    /* 计算图片放大位置 */
    cssStyle.magnifierImgStyle.left = parseFloat(-(offsetX - left - offsetLength) / scale) + "px";
    cssStyle.magnifierImgStyle.top = parseFloat(-(offsetY - top - offsetLength) / scale) + "px";

    this.setState({
      cssStyle: cssStyle
    });
  }

  initParam() {
    let cssStyle = JSON.parse(JSON.stringify(this.state.cssStyle));
    const {clientWidth: width, clientHeight: height} = this.imgContainerRef.current;

    const {naturalWidth: minImgWidth,naturalHeight: minImgHeight} = this.minImgRef.current || {naturalWidth: 1,naturalHeight:1};
    const {naturalWidth: maxImgWidth,naturalHeight: maxImgHeight} = this.maxImgRef.current || {naturalWidth: 1,naturalHeight:1};
    // if(minImgWidth > 524){
    //   minImgWidth = 524
    // }
    
    let scale = 1;
    if(minImgWidth >= minImgHeight){
      scale = (Math.min(minImgWidth,width) / maxImgWidth) || 1
    }else{
      scale = (Math.min(minImgHeight,height) / maxImgHeight) || 1
    }
    if(minImgWidth < width && minImgHeight < height){
      scale = 1
    }
    
    cssStyle.mouseBlock.width = width * scale + "px";
    cssStyle.mouseBlock.height = width * scale + "px";


    this.setState({
      showMaxImg: scale < 1,
      cssStyle: cssStyle,
      scale,
      imgLoad: true
    });
  }

  handleImageLoaded = () => {
    this.initParam();
    // this.setState({imgLoad: true});
  }

  handleImageErrored = () => {
    this.setState({imgLoad: false});
  }

  render() {
    const {cssStyle, magnifierOff, minImg, maxImg, imgLoad, showMaxImg} = this.state;
    return (
      <div className="img-magnifier">
        <div className="hv-align">
          <div className="hv-align-inner" ref={this.imgContainerRef}>
            <img src={minImg} alt="" ref={this.minImgRef}/>
          </div>
          <div
            className="mask-block"
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
            onMouseMove={this.mouseMove}
          />
          {showMaxImg && magnifierOff && <div className="mouse-block" style={cssStyle.mouseBlock}/>}
        </div>
        {
          showMaxImg &&
          <div className={`magnifier-container ${!magnifierOff && 'hide'}`} style={cssStyle.magnifierContainer}>
            <img
              ref={this.maxImgRef}
              className="magnifier-img"
              style={cssStyle.magnifierImgStyle}
              src={maxImg}
              onLoad={this.handleImageLoaded}
              onError={this.handleImageErrored}
              alt=""
            />
            {!imgLoad && <div className="magnifier-img-none"><Loading/></div>}
          </div>
        }
      </div>
    );
  }
}


export default ImageMagnifier;
