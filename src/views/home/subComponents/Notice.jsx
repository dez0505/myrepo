import React, { Component } from 'react';
// css
import './Notice.scss'

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isAnimate: false
    };
  }
  componentDidMount() {
    this.setState({list: this.props.noticeList.map(item => item)},()=>{
      setInterval(()=>{
        this.handleNoticeList()
      },3000) 
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
      },1000)
    }

  }
  render() {
    const noticeIconClass = this.props.theme === 'red' ? 'notice-icon red' : 'notice-icon'
    return (
      <div className='notice-box top-border'>
        <div className={noticeIconClass}></div>
        <div className='notice-content'>
          <div className={this.state.isAnimate?'anim':''}>
            {this.state.list.map((item,index)=>{
              return( <div className='notice-item'  key={index}>{item.Title}</div> )
            })}
          </div>
        </div>
        <div className='right-icon'></div>
      </div> 
    )
  }
}
export default Notice;