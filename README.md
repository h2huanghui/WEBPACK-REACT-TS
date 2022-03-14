## Webpack React Typescript

## install npm packages
`npm i`

## dev 开发环境 使用mock数据
`npm run dev`

## build 生产环境 使用接口数据
`npm run build`

## test 测试环境 使用接口数据
`npm run build_test`

## 生成文件夹为/dist

# 2. Doba Dropshipping

## install npm packages
`npm i`

## dev 开发环境 使用mock数据
`npm run dev_doba`

## build 生产环境 使用接口数据
`npm run build_doba`

## test 测试环境 使用接口数据
`npm run build_test_doba`

### 生成文件夹为/dist_doba

# 接口文档地址

## 文档：

http://mock.ued.vemic.com/usr/p/5e0966589ad8a3204c82f866/i

## 预览：

http://mock.ued.vemic.com/p/5e0966589ad8a3204c82f866/domi/index.html#/




### 接口返回值格式
```js
{
  "code":"string",
  /*
    code: 处理全局通用错误码
    1: 账号权限正常
    401: 未登录
    403: 无权限
    404: 404
    500: 500
    5: 重复提交
    ...
  */
  "msg":"string",
  /*
    msg: 全局通用错误msg
  */
  "status":"string",
  /*
    status: 接口内业务逻辑状态码
    0: 某某错误
    1: 正常
    ...
  */
  "data":"object",
  /*
    data: 接口内业务数据
  */
}
```