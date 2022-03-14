import React, { useState } from "react";
import { Input } from "antd";
import "./index.less";

const Captcha = React.forwardRef((props, ref) => {
	const { className = "", imgSrc, onReload, onChange, ...otherProps } = props;

	const [value, setValue] = useState();

	const handleReload = () => {
		setValue(undefined);
		onChange && onChange(undefined);
		onReload && onReload();
	};
	const handleChange = (e) => {
		let val = e.target.value;
		setValue(val)
		onChange && onChange(val);
	};

	// 暴露reload方法
	Captcha.reload = handleReload;

	return (
		<div
			ref={ref}
			className={`captcha-input-wrap ${className}`}
			{...otherProps}
		>
			<Input
				addonAfter={<img src={imgSrc} onClick={handleReload} />}
				onChange={handleChange}
				value={value}
			/>
			{/* <Icon
				type='refresh'
				onClick={handleClick}
				style={{paddingLeft:10, cursor: 'pointer',lineHeight:'30px', fontSize:16}}
			/> */}
			<span
				className="icon-wrap"
				title="Get a new challenge"
				onClick={handleReload}
			></span>
		</div>
	);
});

export default Captcha;

