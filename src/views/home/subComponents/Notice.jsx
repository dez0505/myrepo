import React, { Component } from 'react';
// css
import './Notice.scss'

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidMount() {
    console.log(this.props)
    this.setState({list: this.props.noticeList.map(item => item)},()=>{
      setInterval(()=>{
        this.handleNoticeList()
      },1500) 
    })
  }
  handleNoticeList() {
    console.log(this.state)
    let newList = this.state.list
    if( newList.length>0 ){
      const popData = newList.shift()
      newList.push(popData)
      setTimeout(() => {
        this.setState({
          list: newList
        })
      },1000)
    }

  }
  render() {
    return (
      <div className='notice-box top-border'>
        <div className='notice-icon'></div>
        <div className='notice-content'>
          {this.state.list.map((item,index)=>{
            return(<div key={index}> 
              <div className='notice-item'>{item.Title}</div>
              {/* <div className='notice-item'>{item.Title}</div> */}
            </div>)
          })}
        </div>
        <div className='right-icon'></div>
      </div> 
    )
  }
}
export default Notice;