import React from 'react';

class CountryTabs extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeCountryId: props.selectedCountryId,
			activeTabIndex: props.activeTabIndex
		};
	}

	handleChangeTab(index) {
		this.setState({
			activeTabIndex: index
		});
	}

	handleSelect(region) {
		let regionId = region.regionId;
		this.setState({
			activeCountryId: regionId
		});

		if (this.props.onChange) {
			this.props.onChange(region);
		}
	}

	render() {
		const { continentList } = this.props;
		const { activeCountryId, activeTabIndex } = this.state;
		return (
			<div
				onMouseDown={e => {
					{
						/* 阻止点击默认收起dropdown */
					}
					e.preventDefault();
				}}
			>
				<div className='tab-btns-wrap'>
					<ul className='tab-btns'>
						{continentList.map((continent, index) => (
							<li
								key={continent.continentNameEn}
								className={
									'tab-btn' + (activeTabIndex === index ? ' active' : '')
								}
								onClick={this.handleChangeTab.bind(this, index)}
							>
								{continent.continentNameEn}
							</li>
						))}
					</ul>
				</div>
				<div className='tab-panes'>
					{continentList.map((continent, index) => (
						<ul
							key={index}
							className='tab-pane'
							style={{ display: activeTabIndex === index ? 'block' : 'none' }}
						>
							{continent.baseRegionVOs.map(item => (
								<li
									key={item.regionId}
									className={
										'tab-pane-item' +
										(item.regionId === activeCountryId
											? ' active'
											: '') +
										' flag flag-' +
										item.regionCode
									}
									onMouseDown={this.handleSelect.bind(
										this,
										item
									)}
								>
									{item.regionNameEn}
								</li>
							))}
						</ul>
					))}
				</div>
			</div>
		);
	}
}

export default CountryTabs;
