import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Notice.scss'
// utils
import { parseTime} from '../../utils/common'
import goToApp, { targetStock } from './_utils.js'
export class Notice extends Component {
  goToApp(item){
    goToApp('optionAnnsInfo', item.id, item.title, item.url, item.time, item.secuAbbr)
  }
  handleTime (time) {
    if(!time) return
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
        this.props.list.map((item, index)=>{
          const stockClassName = parseFloat(item.stockNum)>=0 ? 'stock-num up' : 'stock-num down'
          return(
            <div className="notice-item bot-border" key={index} onClick={() =>{this.goToApp(item)}}>
              <div className="item-stock" onClick={(e)=>targetStock(e,item.tradingCode)}>
                <span className="stock-name">
                  {item.secuAbbr + ' ' + item.tradingCode.slice(2)}
                </span>
                <span className={stockClassName} style={{ display: item.stockNum ? null : 'none' }}>
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
Notice.propTypes = {
  list: PropTypes.array
}
const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Notice)
