import React, { Component } from 'react';

function WithPackage(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
    }

    isNeedCalcFee = (id) => {
      const { form, calcEstimateFee } = this.props;
      const length = form.getFieldValue(`length[${id}]`)
      const width = form.getFieldValue(`width[${id}]`);
      const height = form.getFieldValue(`height[${id}]`);
      const weight = form.getFieldValue(`weight[${id}]`);
      const qty = form.getFieldValue(`qty[${id}]`);
      if (length && width && height && weight && qty) {
        calcEstimateFee && calcEstimateFee();
      }
    }

    checkLength = (rule, value, callback, id) => {
      value = value && value.trim();
      if (value) {
        if (/^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/.test(value)) {
          callback();
        } else {
          callback('请填写数字，小数点后最多输入2位。')
        }

      } else {
        callback('请填写包裹长！')
      }
    }

    checkWidth = (rule, value, callback, id) => {
      value = value && value.trim();
      if (value) {
        if (/^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/.test(value)) {
          callback();
        } else {
          callback('请填写数字，小数点后最多输入2位。')
        }

      } else {
        callback('请填写包裹宽！')
      }
    }

    checkHeight = (rule, value, callback, id) => {
      value = value && value.trim();
      if (value) {
        if (/^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/.test(value)) {
          callback();
        } else {
          callback('请填写数字，小数点后最多输入2位。')
        }
      } else {
        callback('请填写包裹高！')
      }
    }

    checkWeight = (rule, value, callback, id) => {
      value = value && value.trim();
      if (value) {
        if (/^((0{1}\.\d{1,3})|([1-9]\d*\.{1}\d{1,3})|([1-9]+\d*))$/.test(value)) {
          callback();
        } else {
          callback('请填写数字，小数点后最多输入3位。')
        }
      } else {
        callback('请填写包裹重！')
      }
    }

    checkQty = (rule, value, callback, id) => {
      value = value && value.trim();
      if (value) {
        if (/^[1-9]\d*$/.test(value)) {
          callback();
        } else {
          callback('请填写正整数!')
        }
      } else {
        callback('请填写包裹件数!')
      }
    }

    render() {
      console.log("this.props===", this.props);
      return <WrappedComponent {...this.props}
        isNeedCalcFee={this.isNeedCalcFee}
        checkLength={this.checkLength}
        checkWidth={this.checkWidth}
        checkHeight={this.checkHeight}
        checkWeight={this.checkWeight}
        checkQty={this.checkQty}
        removePackageInfo={this.props.removePackageInfo}
      />
    }
  }
}

export default WithPackage