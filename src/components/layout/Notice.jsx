import React, { Component } from 'react';
import PropTypes from 'prop-types'
// css
import './Notice.scss'
import { goToFunction, goToAPP } from '../../utils/common';

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isAnimate: false
    };
  }
  componentDidMount() {
    const noticeList = this.props.noticeList
    const list = noticeList.length !== 1 ? noticeList.map(item => item) : [...noticeList, ...noticeList]
    this.setState({ list },()=>{
      setTimeout(()=>{
        this.handleNoticeList()
      }, 4800) 
    })
  }
  handleNoticeList() {
    this.setState({isAnimate: true})
    let newList = this.state.list.map(item=>item)
    if( newList.length>0 ){
      setTimeout(() => {
        newList.push(newList[0])
        newList.shift()
        this.setState({
          list: newList
        })
        this.setState({isAnimate: false})
        setTimeout(()=>{
          this.handleNoticeList()
        }, 4800) 
      }, 500)
    }

  }
  render() {
    const noticeIconClass = this.props.theme === 'red' ? 'notice-icon red' : 'notice-icon'
    return (
      <div className='notice-component top-border' onClick={()=>goToFunction('10196')}>
        <div className={noticeIconClass}></div>
        <div className='notice-content'>
          <div className={this.state.isAnimate?'anim':''}>
            {this.state.list.map((item,index)=>{
              return( <div className='notice-item' onClick={(e)=>{e.stopPropagation();goToAPP(item,'notice')}} key={index}>{item.Title}</div> )
            })}
          </div>
        </div>
        <div className='right-icon'></div>
      </div> 
    )
  }
}
Notice.propTypes = {
  noticeList: PropTypes.array,
}
export default Notice;