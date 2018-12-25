import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Event.scss'
import  { targetStock } from './_utils.js'
import { parseTime } from '../../utils/common'

export class Event extends Component {
  constructor(props) {
    super(); //可以不给props
    this.state = {
      eventList: [],
    }
  }
  // static contextTypes = {
  //   store: PropTypes.object,
  // }
  componentDidMount(props) {
    // console.log(this)
    this.handleList(this.props)
  }
  componentWillReceiveProps(props) {
    if(props.list!==this.props.list && props.list.length){
      this.handleList(props)
    }
  }
  handleList(props) {
    if(!props.list && props.list.length === 0) return
    console.log(111)
    const list = props.list.map((item)=>item)
    console.log(222,list)
    const dateArray = list.map(item => item.date)
    console.log(333,dateArray)
    const noRepeatDateArray = dateArray.filter((x, index, self) => self.indexOf(x) === index)
    console.log(444,noRepeatDateArray)
    const eventList = []
    noRepeatDateArray.forEach(element => {
      const array = list.filter(item => {
        return element === item.date
      })
      eventList.push({ date: element, content: array })
    });
    this.setState({
      eventList
    },()=>{
      console.log(555,this.state.eventList)
    })
  }
  handleDate (time) {
    if(!time) return
    const newTime = time.replace(/-/g, '/')
    return parseTime(new Date(newTime), '{m}-{d}')
  }
  handleYear (time) {
    if(!time) return
    const newTime = time.replace(/-/g, '/')
    return parseTime(new Date(newTime), '{y}')
  }
  render() {
    console.log(1111)
    const itemContentClassName = this.props.theme!=='night' ? 'item-content' : 'item-content night'
    const pointClassName = this.props.theme!=='night' ? 'point' : 'point night'
    const itemDateClassName = this.props.theme!=='night' ? 'item-date' : 'item-date night'
    console.log(8888,this.props)
    return (
      <div className='event-box'>
        {this.state.eventList.map((item,index)=>{
         console.log(99999,item)
          return(
            <div className="event-item" key={index}>
              <div className="item-left">
                <span className={itemDateClassName}>{this.handleDate(item.date)}</span>
                <div className="item-year">{this.handleYear(item.date)}</div>
              </div>
              <div className={itemContentClassName}>
                <div className={pointClassName}>
                  <div className="inner-point"></div>
                </div>
                {item.content.map((oneItem,oneIndex)=>{
                  console.log(48948394)
                  const stockClassName = parseFloat(oneItem.stockNum)>=0 ? 'stock-num up' : 'stock-num down'
                  console.log(5545454)
                  return(
                    <div className="one-event" key={oneIndex}>
                      <div className="item-stock" onClick={(e)=>targetStock(e,oneItem.tradingCode)}>
                        <span className="stock-name">
                          {oneItem.secuAbbr + ' ' + oneItem.tradingCode.slice(2)}
                        </span>
                        <span className={stockClassName} style={{ display: oneItem.stockNum ? null : 'none' }}>
                            {oneItem.stockPrice + ' ' + oneItem.stockNum}
                        </span>
                      </div>
                      <div className="title">{oneItem.title}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
Event.propTypes = {
  list: PropTypes.array,
  theme: PropTypes.string,
}
const mapStateToProps = (state) => ({
  theme: state.pageConfig.theme
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)
