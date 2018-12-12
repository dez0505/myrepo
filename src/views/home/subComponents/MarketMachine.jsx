import React, { Component } from 'react';
import './MarketMachine.scss'
import Title from '../../../components/layout/Title'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// utils
import { goToFunction } from '@/utils/common.js'
// const marketPic1 = require('../../../images/machine-images/today_date.png')
// const marketPic3 = require('../../../images/machine-images/today_stop.png')
// const marketPic2 = require('../../../images/machine-images/allman_make.png')
// const marketPic4 = require('../../../images/machine-images/myself_change.png')
class MarketMachine extends Component {
	static propTypes = {
		optionaChange:PropTypes.object
	}
	
	constructor(props) {
		super(); //可以不给props
		this.state = {
				todayDateObj: {},
				xunGunObj: {},
				zhangTingObj: {
					count: '',
					copanyName: ''
				},
			}
	}
	componentDidMount() {
		console.log('market', this.props)
	}
	handleMyGunChange (val) {
		if (val.indexOf('%') >= 0) {
			return `<span>涨幅<span class='list-key' style="color:#fd8c2e;">${val}</span></span>`
		} else if (val.indexOf('手') >= 0) {
			return `<span><span class='list-key' style="color:#fd8c2e;">${val}</span></span>`
		} else {
			return `<span>价格<span class='list-key' style="color:#fd8c2e;">${val}</span></span>`
		}
	}
	render() {
		return (
			<div className='market-box'>
				<div className='split-line'></div>
				<Title title='市场机会' />
				<div className="market-machine">
				<div className="market-list-box">
					<div className="market-list bot-border" onClick={()=>{goToFunction('10035@more')}}>
						<div>
							<div className="list-title">
								今日投资日历
							</div>
							<div className="list-content">
								<span className="list-label">新股<span className="list-key">{this.state.todayDateObj.newStockNum}</span></span>
								<span className="list-label">新债<span className="list-key">{this.state.todayDateObj.newBondNum}</span></span>
								<span className="list-label">分红送转<span className="list-key">{this.state.todayDateObj.FHNum}</span></span>
								<span className="list-label">停复<span className="list-key">{this.state.todayDateObj.TFPNum}</span></span>
							</div>
						</div>
						<div className="right-icon icon1">
						</div>
					</div>
					<div className="market-list bot-border" onClick={()=>goToFunction('10203@more')}>
						<div>
							<div className="list-title">
								大家都在用
							</div>
							<div className="list-content">
								<span className="list-label"><span className="list-key">{this.state.xunGunObj.name}</span>选股策略</span>
								<span className="list-label"><span className="list-key">{this.state.xunGunObj.count}</span>股入选</span>
							</div>
						</div>
						<div className="'right-icon icon2">
						</div>
					</div>
					<div style={{display:this.props.stockname&&this.props.signalname&&this.props.signalvalue?'block':'none'}} className="market-list bot-border" onClick={()=>goToFunction('10084')}>
						<div>
							<div className="list-title">
								个股发生异动
							</div>
							<div className="list-content">
								<span className="list-label"><span className="list-key">{this.props.optionaChange.stockname}</span>{this.props.optionaChange.signalname}</span>
								<span className="list-label list-key">{this.handleMyGunChange(this.props.optionaChange.signalvalue)}</span>
							</div>
						</div>
						<div className="'right-icon icon3">
						</div>
					</div>
					<div className="market-list" onClick={()=>goToFunction('10127')}>
						<div>
							<div className="list-title">
								今日板块涨停
							</div>
							<div className="list-content">
								<span className="list-label">共<span className="list-key">{this.state.zhangTingObj.count}</span>家涨停</span>
								<span className="list-label"><span className="list-key">{this.state.zhangTingObj.copanyName}</span>板块排名第一</span>
							</div>
						</div>
						<div className="'right-icon icon4">
						</div>
				</div>
			</div>
			</div>
			</div>
		)
	}
}
const mapStateToProps = (state) => ({
	optionaChange: state.nativeData.optionaChange
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketMachine)
