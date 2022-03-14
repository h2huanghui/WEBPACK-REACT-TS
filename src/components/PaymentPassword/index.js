import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import '@/styles/components/PaymentPassword/index.less';

const PasswordLength = 6;
const u = navigator.userAgent;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
export default forwardRef(function PaymentPassword(props, ref) {
  //moduleType- 0 :正常输入(支付密码),1-额外限制(设置密码)
  const moduleType = props.moduleType || '0';
  const [password, setPassword] = useState({
    currentBoxIndex: 0,
    focused: false,
    value: ''
  });
  const [error, setError] = useState();
  useImperativeHandle(
    ref,
    () => ({
      getPassword: (msg) => {
        if (password.value.length !== 6) {
          setError(msg || '请输入支付密码。');
          return false;
        } else if (/([\d])\1{3}/.test(password.value) && moduleType === '1') {
          setError('太多连续相同的字符。');
          return false;
        } else {
          setError('');
          return password.value;
        }
      },
      //自定义报错文案
      setCustomError: (error) => {
        if (error) {
          setError(error);
        } else {
          setError('');
        }
      }
    })
  );
  useEffect(() => {
  }, [password.value]);

  /* 连续四个以上重复字符 */
  function isNotSimplePwd(str) {
    var ary = str.split('');
    var sameNum = 0;
    var fcode1 = ary[0].charCodeAt(0);
    var result = true;

    ary.forEach((n, i) => {
      if (i > 0 && n.charCodeAt(0) === fcode1) {
        sameNum++;
      } else {
        sameNum = 0;
        fcode1 = n.charCodeAt(0);
      }

      if (sameNum >= 3) {
        result = false;
      }
    });
    return result;

  }

  function onFocus() {
    setPassword({...password, focused: true});
    setError('');
  }

  function onBlur() {
    setPassword({...password, focused: false});
  }

  function onKeyUp(e) {
    //安卓设备拿不到keyCode，需要单独处理
    if(isAndroid){
      return;
    }
    if (e.shiftKey) {
      //mac上在提示错误后，若依次删除，最后一个数字时，shiftKey为true
      if (e.keyCode == 8) {
        if (password.currentBoxIndex > 0) {
          setPassword({...password, currentBoxIndex: password.currentBoxIndex - 1});
        }
      }
      return;
    }
    //键盘上的数字键按下才可以输入
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
      if (password.currentBoxIndex < PasswordLength) {
        setPassword({...password, currentBoxIndex: password.currentBoxIndex + 1});
      }
    } else if (e.keyCode == 8) {
      if (password.currentBoxIndex > 0) {
        setPassword({...password, currentBoxIndex: password.currentBoxIndex - 1});
      }
    }
  }

  function onChange(e) {
    // debugger;
    // //输入其他字符，直接清空
    let _val = e.target.value;
    //修改支付密码规则
    if (moduleType === '1') {
      let result = /([\d])\1{3}/.test(_val);
      if (result) {
        setError('太多连续相同的字符。');
      } else {
        setError('');
      }
    }
    //安卓设备拿不到keyCode，需要单独处理
    if(isAndroid) {
      let val = _val.replace(/\D/g, '');
      let isDelete = val.length < password.value.length;
      let isInt = /^\d+$/.test(val) || val === '';
      if(isInt){
        if(isDelete){
          if (password.currentBoxIndex > 0) {
            setPassword({...password, currentBoxIndex: password.currentBoxIndex - 1,value: val});
          }
        }else{
          if (password.currentBoxIndex < PasswordLength && val) {
            setPassword({...password, currentBoxIndex: password.currentBoxIndex + 1,value: val});
          }
        }
      }
    }else{
      setPassword({...password, value: _val.replace(/\D/g, '')});
    }
  }

  let items = [];
  for (let i = 0; i < PasswordLength; i++) {
    if (password.currentBoxIndex === PasswordLength && i === PasswordLength - 1) {
      items.push(<div key={i} className={`box-item filled ${password.focused ? 'active' : ''}`}></div>);
    } else {
      if (i < password.currentBoxIndex) {
        items.push(<div key={i} className="box-item filled"></div>);
      } else if (i === password.currentBoxIndex) {
        items.push(<div key={i} className={`box-item ${password.focused ? 'active' : ''}`}></div>);
      } else {
        items.push(<div key={i} className="box-item"></div>);
      }
    }
  }
  return (
    <div className="payment-password-wrap">
      <div className="payment-password">
        <input onPaste={(e) => {
          e.preventDefault();
        }} maxLength="6" unselectable="on" value={password.value} onChange={onChange} onFocus={onFocus} onBlur={onBlur}
               onKeyUp={onKeyUp}/>
      </div>
      <div className={error ? 'payment-password-box with-error' : 'payment-password-box'}>
        {items}
      </div>
      {error && <div className='payment-password-error'>{error}</div>}
    </div>
  );
});
