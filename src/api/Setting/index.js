import api, {_jsonp} from '@/api';

export default {
  getAccountInfo: (params) => {
    return api.get('/account/getAccountInfo', {
      params: params,
    });
  },
  getGoodsList: (params) => {
    return api.get('/goods/getGoodsList', {
      params: params,
    });
  },
  deleteProduct: data => {
    return api.post('/goods/delete', data);
  },
  saveProduct: data => {
    return api.post('/goods/save', data);
  },
  getInitialLoginData: () => {
    return api.get('/account/getInitialLoginData');
  },
  /*手机校验是否显示图形验证码 */
  mobilelVerifNeedShowCaptcha: (params) => {
    return _jsonp('//login.crov.com/account/mobile/verify/isNeedCaptcha', params);
  },
  /*手机校验是否显示图形验证码 */
  mobilelNeedShowCaptcha: (params) => {
    return _jsonp('//login.crov.com/account/mobile/verify/isNeedCaptcha', params);
  },
  /* 获取手机验证码 */
  sendMobileVerificationMsg: (params) => {
    return _jsonp('//login.crov.com/safetyMobile/getVerificationCode', params);
  },
  /* 通过手机校验验证码是否正确 */
  checkVerifyCodeByPhone: (params) => {
    return _jsonp('//login.crov.com/safetyMobile/verifyVerificationCode', {
      ...params,
      domainId: 2
    });
  },
  /* 修改登录密码提交 */
  modifyLoginPwd: (data) => {
    return api.post('/account/password/modify', data);
  },

  /* 验证邮箱校验验证码是否正确 */
  checkVerifyCodeByEmail: (params) => {
    return _jsonp('//login.crov.com/userEmail/verifyVerificationCode', {
      ...params,
    });
  },
  /* 邮箱校验是否显示图形验证码 */
  emailNeedShowCaptcha: (params) => {
    return _jsonp(
      '//login.crov.com/account/email/verify/isNeedCaptcha',
      {...params}
    );
  },
  /* 获取邮件验证码 */
  sendEmailVerificationMsg: (params) => {
    return _jsonp('//login.crov.com/userEmail/getVerificationCode', { ...params });
  },
  //设置支付密码
  setPayPassword(params) {
    return api({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/account/setPayPassword',
      data: params
    });
  },
};
