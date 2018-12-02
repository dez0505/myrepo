import React, { Component } from 'react';
import './Home.scss'

// subComponent
import Header from '../../components/layout/Header'
import Nav from '../../components/layout/Nav'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topLineList:[
        {name:'zuowang',age:23},
        {name:'zhangyang',age:22},
        {name:'chenhao',age:21},
      ]
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
      <div className='home-warpper'>
        <Header mameList={this.state.topLineList}/>
        <Nav/>
      </div>
    ) 
  }
}
export default Home