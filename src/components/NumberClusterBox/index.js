/**
* 单个字符输入的数字框
* @author Jiang_Chuangshi
* @date 2021/01/25 18:35
* @param {Number} len 可输入的数字个数
* @param {Function} callback 输入完成之后的回调
* @returns {JSX}
*/

import React, {memo, useRef, useState,useEffect,useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import { reg } from '@/utils/rules';

import '@/styles/components/NumberClusterBox/index.less';

function NumberClusterBox(props) {
  const { len = 6, style = {},myRef } = props;
  const { callback } = props;
  const [values,setValues] = useState(Array.from({length: len}).fill(''));
  const [inputs,setInputs] = useState(Array.from({ length: len }, (v, i) => {
    return {
      index: i,
      warn: false
    };
  }));
  const inputsRef = Array.from({ length: len }, () => {
    //eslint-disable-next-line
    return useRef();
  });
  useEffect(()=>{
    let isComplete = values.every(item => item);
    if(isComplete) {
      inputsRef[len -1].current.blur();
      callback && callback(values.join(''));
    }
  },[values,callback,len,inputsRef]);
  useImperativeHandle(myRef,() => ({
    check() {
      return new Promise((resolve,reject)=>{
        let isComplete = values.every(item => item);
        if(isComplete) {
          resolve(values);
        }else{
          let newInputs = values.map((item,index)=>{
            if(!item){
              return {
                ...inputs[index],
                warn: true
              };
            }else{
              return {
                ...inputs[index]
              };
            }
          });
          setInputs(newInputs);
          reject(values);
        }
      });
    }
  }));
  //输入数字之后，自动聚焦到下一个输入框
  const handleChange = (e, index) => {
    let value = e.target.value;
    if (value) {
      let regRule = new RegExp(reg.number);
      if(!regRule.test(value)) return;
      setValues(prev=>{
        let newValues = [...prev];
        newValues[index] = value;
        return newValues;
      });
      if (index < len - 1) {
        inputsRef[index + 1].current.focus();
      }
      let newInputs = values.map((item,index)=>{
        return {
          ...inputs[index],
          warn: false
        };
      });
      setInputs(newInputs);
    }
  };

  //退格键删除，自动聚焦到上一个输入框
  //左右键进入输入框，有值时选中，方便用户修改
  const handleKeyDown = (e, index) => {
    //按下退格键时，若输入框值是被选中的，仅删除当前输入框值
    //否则，删除当前输入框之后，焦点移动到前一个输入框
    let inputElem = inputsRef[index].current.input;
    let {selectionStart,selectionEnd} = inputElem;
    if (e.keyCode === 8) {
      if(selectionStart === selectionEnd) {
        if(values[index]) {
          setValues(prev=>{
            let newValues = [...prev];
            newValues[index] = '';
            return newValues;
          });
        }else{
          index > 0 && inputsRef[index - 1].current.focus();
          setValues(prev=>{
            let newValues = [...prev];
            newValues[index - 1] = '';
            return newValues;
          });
        }
      }else if (index > 0) {
        setValues(prev=>{
          let newValues = [...prev];
          newValues[index] = '';
          return newValues;
        });
      }
    }
    if(e.keyCode === 37) {
      e.preventDefault();
      //左键
      if (index > 0) {
        inputsRef[index - 1].current.focus();
      }
    }
    if(e.keyCode === 39) {
      e.preventDefault();
      //右键
      if (index < len - 1) {
        inputsRef[index + 1].current.focus();
      }
    }
  };

  const hanldeFocus = (e) => {
    e.target.select();
  };

  return (
    <div style={style} className="focus-number-cluster">
      {
        inputs.map((item,index) => {
          return <Input key={index}
            ref={inputsRef[index]}
            value={values[index]}
            maxLength={1}
            autoCorrect="off"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            type="tel"
            id={`char${index + 1}`}
            className={`focus-number-cluster-item${item.warn?' warn':''} ${values[index]!==''?'filled':''}`}
            aria-label={`位 ${index + 1}`}
            placeholder=""
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            data-index={`${index + 1}`} onFocus={hanldeFocus}>
          </Input>;
        })
      }
    </div>
  );
}

NumberClusterBox.propTypes = {
  len: PropTypes.number,
  callback: PropTypes.func,
  style: PropTypes.object,
  myRef: PropTypes.object
};

export default memo(NumberClusterBox);
