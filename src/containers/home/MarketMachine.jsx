import React, { Component } from 'react';
import './MarketMachine.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// api
import { getDateData, getMd5Data, getSelectStockData, getHardenData } from '../../api/marketMachine'
// utils
import { goToFunction, sendIOSMessage, encryptByDES } from '../../utils/common.js'
class MarketMachine extends Component {
	static propTypes = {
		optionalChange:PropTypes.object
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
	async	getMarketMachineData() {
		if (window.quote && window.quote.requestShortTermElves) {
			window.quote.requestShortTermElves()
		} else {
			sendIOSMessage('requestShortTermElves', {})
		}
		try {
			// 日历
			const {
				data: riNiData
			} = await getDateData()
			this.dealTodayDate(riNiData)
			// 选股 加密
			const { // 先要进行加密操作
				data: mdData
			} = await getMd5Data()
			if (!mdData || !mdData.dateStatus) return
			let param = encryptByDES(JSON.stringify({
				dateStatus: mdData.dateStatus
			}), 'e9facf+2$2d81&4243^b16a=2f45e639e53d')
			//  选股 接口
			const {
				data: xunGunData
			} = await getSelectStockData({ param })
			this.dealXunGun(xunGunData)
      // 涨停
			const {
				data: zhangTingData
			} = await getHardenData()
			this.dealZhangTing(zhangTingData)
		} catch (error) {
			console.log(error)
		}
	}
	 // 处理涨停
	 dealZhangTing (zhangTingData) {
		if (zhangTingData.retCode === '0000') {
			const count = zhangTingData.content.hardenBlockInfos.zt
			const array = zhangTingData.content.hardenBlockInfos.blockInfos // 第一个可能为null,所以可以选择第二个
			const zhangTingObj = {
				count,
				copanyName : array[0].bkmc ? array[0].bkmc : array[1].bkmc
			}
			this.setState({
				zhangTingObj
			})
		} else {
			console.log(zhangTingData.retMsg)
		}
	}
	// 处理选股的函数
	dealXunGun (xunGunData) {
		if (xunGunData.retCode === '0000') {
			let randomNum = Math.floor(Math.random() * 4)
			const xunGunObj = xunGunData.content[randomNum]
			this.setState({ xunGunObj })
		} else {
			console.log(xunGunData.retMsg)
		}
	}
	// 处理今日数据
	dealTodayDate (riNiData) {    
		if (riNiData.code === 0) {
			const todayDateObj = {}
			riNiData.content.dataField.forEach((item, index) => {
				todayDateObj[item] = riNiData.content.dataRecord[0][index]
			})
			this.setState({ todayDateObj })
		} else {
			console.log(riNiData.message)
		}
	}
	componentDidMount() {
		this.getMarketMachineData()
	}
	handleMyGunChange (val) {
		if (val.indexOf('%') >= 0) {
			return <span>涨幅<span className='list-key'>{val}</span></span>
		} else if (val.indexOf('手') >= 0) {
			return <span><span className='list-key'>{val}</span></span>
		} else {
			return <span>价格<span className='list-key'>{val}</span></span>
		}
	}
	render() {
		const { signalname, signalvalue, stockname } = this.props.optionalChange
		return (
			<div className='market-box'>
				<div className='split-line'></div>
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
					<div style={{display:stockname&&signalname&&signalvalue?'':'none'}} className="market-list bot-border" onClick={()=>goToFunction('10084')}>
						<div>
							<div className="list-title">
								个股发生异动
							</div>
							<div className="list-content">
								<span className="list-label"><span className="list-key">{stockname}</span>{signalname}</span>
								<span className="list-label list-key">{this.handleMyGunChange(signalvalue)}</span>
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
	optionalChange: state.nativeData.optionalChange
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketMachine)
