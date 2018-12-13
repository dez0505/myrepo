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
    console.log(111, this.props)
  }
  isLoadStock(item){
    if(!item.Stocks.length || !item.Stocks) return
    return (
      <div className={{'key-word':true,'up':parseFloat(item.stockNum)>=0,'down':parseFloat(item.stockNum)<0}}>
        <span className="up-icon"></span>
        <span>{item.Stocks[0].Name}</span>
        <span v-show='item.stocksNum' className="rate">{item.stocksNum}
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
              <div className="list-item  bottom-border" key={index} >
                <div className="title">
                  {item.Title}
                </div>
                <div className="content">
                  <div className="content-left">
                    <div className="label">
                      {item.Category}
                    </div>
                    <div className="orign">
                      <span className="media">
                        {item.MediaName}
                      </span>
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