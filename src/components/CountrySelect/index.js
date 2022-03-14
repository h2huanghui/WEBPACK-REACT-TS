import React from 'react';
// import PropTypes from 'prop-types';
import { Select } from 'antd';
import CountryTabs from './CountryTabs';
import '@/styles/components/CountrySelect/index.less';
const { Option } = Select;

class CountrySelect extends React.Component {
  // static propTypes = {
  //   continentList: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       continentNameEn: PropTypes.string,
  //       baseRegionVOs: PropTypes.array
  //     })
  //   ).isRequired,
  //   defaultCountryId: PropTypes.string,
  //   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //   adjustTop: PropTypes.number
  // };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      width: props.width || 260,
      adjustTop: props.adjustTop || 28.9844,
      placeholderText: props.placeholderText || "Please Select"
    };
  }

  handleSelect(region) {
    let regionId = region.encryptRegionId;
    this.setState({
      open: false
    });

    const { onChange, onSelect } = this.props;
    if (onChange) {
      onChange(regionId);
    }
    if (onSelect) {
      onSelect(region);
    }
  }
  handleShowDropdown(open) {
    // hack方法：antd的Select，底部高度小于下拉内容时组件会自动上浮，对于自定义下拉内容上浮位置有问题
    this.setState({
      open: open
    });
    setTimeout(() => {
      let selectDropdownElement = document.querySelector(
        '.ant-select-dropdown'
      );

      const adjustTop = this.state.adjustTop;
      if (parseFloat(selectDropdownElement.style.top) < adjustTop) {
        selectDropdownElement.style.top = `${adjustTop}px`;
      }
    }, 0);
  }

  render() {
    const { continentList, value } = this.props;
    // console.log('continentList',continentList)
    let { open, width, placeholderText } = this.state;
    if (continentList.length > 0) {

      // 获取选定的国家（港澳台特区）数据
      let selectedCountry;
      let activeTabIndex = 0;

      for (let i = 0; i < continentList.length; i++) {
        const element = continentList[i];
        selectedCountry = element.baseRegionVOs.find(
          item => item.encryptRegionId === value
        );
        if (typeof selectedCountry !== 'undefined') {
          activeTabIndex = i;
          break;
        }
      }

      return (
        <Select
          {...this.props}
          style={{ width: width }}
          value={value || ''}
          dropdownMatchSelectWidth={false}
          getPopupContainer={triggerNode => triggerNode.parentNode}
          open={open}
          placeholder={placeholderText}
          onDropdownVisibleChange={this.handleShowDropdown.bind(this)}
          dropdownRender={menu => (
            <div>
              {menu}
              <CountryTabs
                selectedCountryId={value}
                activeTabIndex={activeTabIndex}
                continentList={continentList}
                onChange={this.handleSelect.bind(this)}
              />
            </div>
          )}
        >
          <Option
            key={
              typeof selectedCountry !== 'undefined'
                ? selectedCountry.encryptRegionId
                : 'noselected'
            }
            value={
              typeof selectedCountry !== 'undefined'
                ? selectedCountry.encryptRegionId
                : ''
            }
            style={{ display: 'none' }}
          >
            {typeof selectedCountry !== 'undefined' ? (
              <span className={'flag flag-' + selectedCountry.regionCode}>
                {selectedCountry.regionNameEn}
              </span>
            ) : (
              placeholderText
            )}
          </Option>
        </Select>
      );
    } else {
      return (
        <Select value=''>
          <Option key='noselected' value=''>
            {placeholderText}
          </Option>
        </Select>
      );
    }
  }
}

export default CountrySelect;
