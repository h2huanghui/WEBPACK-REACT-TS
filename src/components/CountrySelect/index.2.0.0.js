import React, { Fragment, useState, useEffect } from "react";
import { Select } from "antd";
import CountryTabs from "./CountryTabs.1.1.0";
import { SHOWTYPE } from "./constants";
import '@/styles/components/CountrySelect/index.less';
const { Option } = Select;

const CountrySelect = React.forwardRef((props, ref) => {
	const [open, setOpen] = useState(false);

	const [activeCountry, setActiveCountry] = useState();
	const [activeTabIndex, setActiveTabIndex] = useState();

	const width = props.width || 260;
	const adjustTop = props.adjustTop || 28.9844;
	const placeholderText = props.placeholder || "Please Select";

	const { continentList = [], onChange, value, showType, ...otherProps } = props;

	useEffect(() => {
		if (continentList.length > 0 && value) {
			for (let i = 0; i < continentList.length; i++) {
				const element = continentList[i];
				const targetCountry = element.baseRegionVOs.find(
					(item) => item.regionId === value
				);
				if (targetCountry) {
					setActiveCountry(targetCountry);
					setActiveTabIndex(i);
					break;
				}
			}
		}
	}, [continentList, value]);

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
		let regionId = region.regionId;
		setOpen(false);
		// 之所以这么传参，是为了兼容antd的表单校验框架
		onChange && onChange(regionId, region);
	};

	if (continentList.length > 0) {
		return (
			<Select
				{...props}
				ref={ref}
				style={{ width: width }}
				value={value || ""}
				dropdownMatchSelectWidth={false}
				getPopupContainer={(triggerNode) => triggerNode.parentNode}
				open={open}
				placeholder={placeholderText}
				onDropdownVisibleChange={handleShowDropdown}
				dropdownRender={(menu) => (
					<Fragment>
						{menu}
						<CountryTabs
							{...otherProps}
							showType={showType}
							selectedCountryId={value}
							activeTabIndex={activeTabIndex}
							continentList={continentList}
							onChange={handleChange}
						/>
					</Fragment>
				)}
			>
				<Option
					key={value || "noselected"}
					value={value || ""}
					style={{ display: "none" }}
				>
					{activeCountry ? (
						<span className={"flag flag-" + activeCountry.regionCode}>{showType == SHOWTYPE.telCode ? `+${activeCountry.telCode}` : activeCountry.regionNameEn}</span>
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
