import React from 'react';
// import {Spin} from 'antd';
import Lottie from 'react-lottie';
import animationData from '@/assets/animate/loading.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export default props => {
  if(props.withwrap) {
    return <div style={{width: '100%',textAlign: 'center',paddingTop: 100,paddingBottom: 100}}>
      <Lottie options={defaultOptions}
        height={30}
        width={30}
      />
    </div>;
  }else{
    return <Lottie options={defaultOptions}
      height={30}
      width={30}
    />;
  }

};