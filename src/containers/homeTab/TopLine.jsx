import React, { Component } from 'react'
import PropTypes from 'prop-types'
// css
import './TopLine.scss'

class TopLine extends Component {
  constructor(props) {
    super()
  }
  targetStock (e,item) {
    e.stopPropagation()
    window.location.href = '@stk=' + item
  }
  dealWithTime(pushTime) {
    if(!pushTime) return
    let time = pushTime
      if (new Date(time).getDate() === new Date().getDate() && new Date(time).getMonth() === new Date().getMonth() && new Date(time).getFullYear() ===
          new Date().getFullYear()
      ) {
        return time.slice(11, 16)
      } else {
        return time.slice(5, 10).replace('-', '月') + '日'
      }
  }
  goToApp(item) {
    let url = item.FromSource === 'SQLSERVER_HTSELFEDITNews' ? item.Url : item.DetailUrl
    let href = `@redirect=recommendInfo&url=${encodeURIComponent(url)}&title=${item.Title}&id=${item.Id}&CreatedDate=${item.PubDate}&FrontCover=${encodeURIComponent(item.ImageUrl)}`
    window.location.href = href
  }
  renderStock(item){
    if(!item.Stocks.length || !item.Stocks) return
    let stockClassName = 'key-word stock-box '
    if(parseFloat(item.stocksNum)>=0){
      stockClassName += 'up'
    } else if (parseFloat(item.stocksNum)<0) {
      stockClassName += 'down'
    }
    return (
      <div className={stockClassName} onClick={(e)=>{this.targetStock(e,item.Stocks[0].Symbol)}}>
        <span className="up-icon"></span>
        <span>
          <span>{item.Stocks[0].Name}</span>
          <span style={{display:item.stocksNum!==''?'':'none'}} className="rate">{item.stocksNum}</span>
        </span>
      </div>
    )
  }
  render() {
    return (
      <div className='tab-list'>
        {
          this.props.topLineList.map((item) => {
            return (
              <div className="list-item bot-border" onClick={()=>this.goToApp(item)} key={item.Id} >
                <div className="title">
                  {item.Title}
                </div>
                <div className="content">
                  <div className="content-left">
                    <div className="label" style={{display:item.Category!==''?'block':'none'}}>
                      {item.Category}
                    </div>
                    <div className="origin">
                    {item.MediaName ? <span className="media">{item.MediaName}</span> : null}
                    {this.dealWithTime(item.PubDate)}
                    </div>
                  </div>
                  {
                    this.renderStock(item)
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
TopLine.propTypes = {
  topLineList: PropTypes.array
}
export default TopLine