
# 2020.02.26
## version: 1.0.1
1. 内部组件，强依赖continentList数据结构，参考接口`/account/address/country/list`；

2. 完全受控组件，就像antd中的Input组件，需要显式value和onChange来控制，示例如下：
    ```js
    <CountrySelect 
      value={encryptedCountryId} 
      continentList={continentList} 
      onChange={this.handleChange} 
    />

    handleChange = (countryId) => {
      this.setState({
        encryptedCountryId: countryId
      })
    }
    ```
3. 如果使用了antd的校验框架，则不用显式添加value属性：
   
    ```js
    <Form.Item
      label='Country/Region'
      extra={
        <span>
          Can't find your country/region? Please{' '}
          <a target='_blank' href='//www.crov.com/help/contact-us.html'>
            contact us
          </a>
          .
        </span>
      }
    >
      {getFieldDecorator('countryId', {
        initialValue: encryptedSelectedCountryId,
        rules: [{ required: true, message: 'Please select your country!' }]
      })(
        <CountrySelect continentList={continentList} onChange={this.handleChangeCountry.bind(this)}></CountrySelect>
      )}
    </Form.Item>
    ```
