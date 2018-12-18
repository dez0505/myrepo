import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Notice.scss'
// utils
import { parseTime} from '@/utils/common'
import goToApp, { targetStock } from './optional.js'
export class Notice extends Component {
  static propTypes = {
    list: PropTypes.array
  }
  goToApp(item){
    goToApp('optionAnnsInfo', item.id, item.title, item.url, item.time, item.secuAbbr)
  }
  handleTime (time) {
    const newTime = time.replace(/-/g, '/')
    if (new Date(newTime).getFullYear() === new Date().getFullYear()) {
      return parseTime(new Date(newTime), '{m}-{d} {h}:{i}')
    } else {
      return parseTime(new Date(newTime), '{y}-{m}-{d} {h}:{i}')
    }
  }
  render() {
    return (
      <div className='notice-tab-box'>
      {
        this.props.list.map((item,index)=>{
          const stockClassName = parseFloat(item.stockNum)>=0 ? 'stock-num up' : 'stock-num down'
          return(
            <div className="notice-item bot-border" key={index} onClick={() =>{this.goToApp(item)}}>
              <div className="item-stock" onClick={()=>targetStock(item.tradingCode)}>
                <span className="stock-name">
                  {item.secuAbbr + ' ' + item.tradingCode.slice(2)}
                </span>
                <span className={stockClassName} style={{ display: item.tradingCode ? null : 'none' }}>
                    {item.stockPrice + ' ' + item.stockNum}
                </span>
              </div>
              <div className="item-title">
                {item.title}
              </div>
              <div className="item-desc">
                  <span className="origin" style={{ display: item.label ? null : 'none' }}>
                    {item.label}
                  </span>
                  <span className='desc-time'>
                    {this.handleTime(item.time)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Notice)
