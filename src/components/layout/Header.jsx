import React, { Component } from 'react';
import './Header.scss'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topLineList:[1,2,3,4,5]
    }
  }
  componentDidMount(){
    console.log('props', this.props)
    // this.setState({addTodoList:this.props.todos()})
  }
  updateList = (val) =>{
    this.setState({addTodoList:this.props.todos()})
    this.props.updateList(this.state.topLineList)
  }
  render() {
    return (
      <div className='header-box'>
        <div>客服</div>
        <div className='input-box'>
          <input className='input' placeholder='代码 / 简拼 / 常用功能'></input> 
          <div className='search-icon'></div> 
        </div>
        <div className='scan-icon'></div>
        <div className='message-icon'></div>
      </div>
    ) 
  }
}
export default Home