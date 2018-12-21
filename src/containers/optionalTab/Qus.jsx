import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Qus.scss'
// utils
import  { targetStock } from './_utils.js'
export class Qus extends Component {
  handleTime (time) {
    if(!time) return
    const index = time.indexOf('年')
    return time.slice(index + 1)
  }
  render() {
    const itemContentClassName = this.props.theme!=='night' ? 'item-content' : 'item-content night'
    return (
      <div className='qus-box'>
      {
        this.props.list.map((item,index)=>{
          const stockClassName = parseFloat(item.stockNum)>=0 ? 'stock-num up' : 'stock-num down'
          return(
            <div className="qus-item bot-border" key={index}>
              <div className="item-stock" onClick={(e)=>targetStock(e,item.tradingCode)}>
                <span className="stock-name">
                  {item.askWho + ' ' + item.tradingCode.slice(2)}
                </span>
                <span className={stockClassName} style={{ display: item.stockNum ? null : 'none' }}>
                    {item.stockPrice + ' ' + item.stockNum}
                </span>
              </div>
              <div className={itemContentClassName}>
                <div className="content-qus">
                  <div className="qus-icon"></div>
                  <span className="qus-people">{item.questioner}：</span>
                  <span className="qus-content">
                    {item.question}
                  </span>
                </div>
                <div className="content-ans">
                  <div className="ans-icon"></div>
                  <span className="ans-people">{item.answerer}：</span>
                  <span className="ans-content">
                    {item.answer}
                  </span>
                </div>
              </div>
              <div className="item-desc">
                答复于 <span className="desc-time">{this.handleTime(item.answerTime)}</span>
              </div>
            </div>
          )
        })
      }
      </div>
    )
  }
}
Qus.propTypes = {
  list: PropTypes.array
}
const mapStateToProps = (state) => ({
  theme: state.pageConfig.theme
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Qus)
