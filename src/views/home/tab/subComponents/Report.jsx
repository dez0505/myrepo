import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Report.scss'
// utils
import { parseTime} from '@/utils/common'
import goToApp, { targetStock } from './optional.js'
export class Report extends Component {
  static propTypes = {
    list: PropTypes.array
  }
  goToApp(item){
    goToApp('optionResearchInfo', item.id, item.reportTitle, item.url, item.date, item.secuAbbr)
  }
  handleTime (time) {
    if(!time) return
    const newTime = time.replace(/-/g, '/')
    if (new Date(newTime).getFullYear() === new Date().getFullYear()) {
      if (new Date(newTime).getHours() === 0 && new Date(newTime).getMinutes() === 0) {
        return parseTime(new Date(newTime), '{m}-{d}')
      } else {
        return parseTime(new Date(newTime), '{m}-{d} {h}:{i}')
      }
    } else {
      if (new Date(newTime).getHours() === 0 && new Date(newTime).getMinutes() === 0) {
        return parseTime(new Date(newTime), '{y}-{m}-{d}')
      } else {
        return parseTime(new Date(newTime), '{y}-{m}-{d} {h}:{i}')
      }
    }
  }
  render() {
    return (
      <div className='report-box'>
      {
        this.props.list.map((item,index)=>{
          const stockClassName = parseFloat(item.stockNum)>=0 ? 'stock-num up' : 'stock-num down'
          return(
            <div className="report-item bot-border" key={index} onClick={() =>{this.goToApp(item)}}>
              <div className="item-stock" onClick={(e)=>targetStock(e,item.tradingCode)}>
                <span className="stock-name">
                  {item.secuAbbr + ' ' + item.tradingCode.slice(2)}
                </span>
                <span className={stockClassName} style={{ display: item.stockNum ? null : 'none' }}>
                    {item.stockPrice + ' ' + item.stockNum}
                </span>
              </div>
              <div className="item-title">
                {item.reportTitle}
              </div>
              <div className="item-desc">
                  <span className="label" style={{ display: item.invRatingDesc ? null : 'none' }} >{item.invRatingDesc}</span>
                  <span className="origin" style={{ display: item.comName ? null : 'none' }}>
                    {item.comName}
                  </span>
                  <span className='desc-time'>
                    {this.handleTime(item.date)}
                  </span>
                  <span className='rt' style={{ display: item.targetPrice ? null : 'none' }}>
                    目标价：<span>{item.targetPrice}</span>
                  </span>
                </div>
            </div>
          )
        })
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
