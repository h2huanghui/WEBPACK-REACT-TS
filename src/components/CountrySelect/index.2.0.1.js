import React, { Fragment, useState, useEffect } from "react";
import { Select } from "antd";
import { SHOWTYPE } from "./constants";
import "@/styles/components/CountrySelect/index.less";

const { Option } = Select;

const CountrySelect = React.forwardRef((props, ref) => {
  const {
    continentList = [],
    onChange,
    value,
    defaultValue,
    showType,
    // 显示文案中文/英文，目前支持zh与en
    lang,
    ...otherProps
  } = props;

  const [open, setOpen] = useState(false);
  // 完全受控
  const [controlled, setControlled] = useState(false);
  const [activeCountryId, setActiveCountryId] = useState(value || defaultValue);

  const [activeCountry, setActiveCountry] = useState();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const width = props.width || 260;
  const adjustTop = props.adjustTop || 29;
  const placeholderText = props.placeholder || "Please Select";

  useEffect(() => {
    setActiveCountryId(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setActiveCountryId(value);
    setControlled(value !== undefined);
  }, [value]);

  useEffect(() => {
    if (continentList.length > 0 && activeCountryId) {
      for (let i = 0; i < continentList.length; i++) {
        const element = continentList[i];
        const targetCountry = element.baseRegionVOs.find(
          (item) => item.encryptRegionId === activeCountryId
        );
        if (targetCountry) {
          setActiveCountry(targetCountry);
          setActiveTabIndex(i);
          break;
        }
      }
    }
  }, [continentList, activeCountryId]);

  const handleShowDropdown = (open) => {
    // hack方法：antd的Select，底部高度小于下拉内容时组件会自动上浮，对于自定义下拉内容上浮位置有问题
    setOpen(open);
    setTimeout(() => {
      let selectDropdownElement = document.querySelector(
        ".ant-select-dropdown"
      );

      if (parseFloat(selectDropdownElement.style.top) < adjustTop) {
        selectDropdownElement.style.top = `${adjustTop}px`;
      }
    }, 0);
  };

  const handleChange = (region) => {
    let regionId = region.encryptRegionId;
    !controlled && setActiveCountryId(regionId);
    setOpen(false);
    // 之所以这么传参，是为了兼容antd的表单校验框架
    onChange && onChange(regionId, region);
  };

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
  };

  const Tabs = () => {
    return (
      <div
        // 阻止点击默认收起dropdown
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <div className="tab-btns-wrap">
          <ul className="tab-btns">
            {continentList.map((continent, index) => (
              <li
                key={continent.continentNameEn}
                className={
                  "tab-btn" + (activeTabIndex === index ? " active" : "")
                }
                onClick={() => handleTabChange(index)}
              >
                {continent.continentNameEn}
              </li>
            ))}
          </ul>
        </div>
        <div className="tab-panes">
          {continentList.map((continent, index) => (
            <ul
              key={index}
              className="tab-pane"
              style={{ display: activeTabIndex === index ? "block" : "none" }}
            >
              {continent.baseRegionVOs.map((item) => (
                <li
                  key={item.encryptRegionId}
                  className={
                    "tab-pane-item" +
                    (item.encryptRegionId === activeCountryId
                      ? " active"
                      : "") +
                    " flag flag-" +
                    item.regionCode
                  }
                  onMouseDown={() => handleChange(item)}
                >
                  {lang === "zh" ? item.regionNameCn : item.regionNameEn}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    );
  };

  if (continentList.length > 0) {
    return (
      <Select
        {...otherProps}
        ref={ref}
        style={{ width: width }}
        value={activeCountryId || undefined}
        dropdownMatchSelectWidth={false}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        open={open}
        placeholder={placeholderText}
        onDropdownVisibleChange={handleShowDropdown}
        dropdownRender={(menu) => (
          <Fragment>
            {menu}
            <Tabs />
          </Fragment>
        )}
      >
        <Option
          key={activeCountryId || "noselected"}
          value={activeCountryId || ""}
          style={{ display: "none" }}
        >
          {activeCountry ? (
            <span className={"flag flag-" + activeCountry.regionCode}>
              {showType == SHOWTYPE.telCode
                ? `+${activeCountry.telCode}`
                : lang === "zh"
                ? activeCountry.regionNameCn
                : activeCountry.regionNameEn}
            </span>
          ) : (
            placeholderText
          )}
        </Option>
      </Select>
    );
  } else {
    return <Select placeholder={placeholderText}></Select>;
  }
});

export default CountrySelect;
