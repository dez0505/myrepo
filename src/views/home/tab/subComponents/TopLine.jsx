import React, { Component } from 'react'
import PropTypes from 'prop-types'
// css
import './TopLine.scss'

class TopLine extends Component {
  static propTypes = {
    topLineList: PropTypes.array
  }
  constructor(props) {
    super()
  }
  componentDidMount() {
  }
  dealWithTime(pushTime) {
    let time = pushTime
      if (new Date(time).getDate() === new Date().getDate() && new Date(time).getMonth() === new Date().getMonth() && new Date(time).getFullYear() ===
          new Date().getFullYear()
      ) {
        return time.slice(11, 16)
      } else {
        return time.slice(5, 10).replace('-', '月') + '日'
      }
  }
  isLoadStock(item){
    if(!item.Stocks.length || !item.Stocks) return
    let stockClassName = 'key-word stock-box'
    if(parseFloat(item.stockNum)>=0){
      stockClassName += 'up'
    } else if (parseFloat(item.stockNum)<0) {
      stockClassName += 'down'
    }
    return (
      <div className={stockClassName}>
        <span className="up-icon"></span>
        <span>{item.Stocks[0].Name}</span>
        <span style={{display:item.stocksNum!==''?'block':'none'}} className="rate">{item.stocksNum}
        </span>
      </div>
    )
  }
  render() {
    return (
      <div className='tab-list'>
        {
          this.props.topLineList.map((item, index) => {
            return (
              <div className="list-item bot-border" key={index} >
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
                    this.isLoadStock(item)
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
export default TopLine