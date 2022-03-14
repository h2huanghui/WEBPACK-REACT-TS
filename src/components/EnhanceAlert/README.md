# 增强点
1. 支持传入错误信息数组;
2. 有提示时页面自动滚动到顶部;
3. message为空则不显示;

# 使用
```js
<EnhanceAlert message={errorMsg} type="error" showIcon />
```
# 2020.07.21
增加对含有html的字符串支持，例如message为"This email address is already registered as a supplier. <a href='//login.crov.com/doba-supplier'>Log in</a> now."，则显示为reactNode。