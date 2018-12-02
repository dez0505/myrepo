import React, { Component } from 'react';
import './Home.scss'
import '../../styles/homeTheme.scss'

// subComponent
import Header from '../../components/layout/Header'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer';
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
      <div className={`home-warpper ${this.props.theme==='white'?'white':'black'}`}>
        <Header mameList={this.state.topLineList}/>
        <Nav/>
        <Footer/>
      </div>
    ) 
  }
}
export default Home