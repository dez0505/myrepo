import React, { Component } from 'react';
import './Home.scss'
import '../../styles/homeTheme.scss'

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
    const random = Math.floor(Math.random()*2);
    console.log(random)
    if(random === 1){
      this.props.updateTheme({theme:'white'})
    }else{
      this.props.updateTheme({theme:'black'})
    }
    console.log(this.props.theme)
    // this.setState({addTodoList:this.props.todos()})
  }
  updateList = (val) =>{
    this.setState({addTodoList:this.props.todos()})
    this.props.updateList(this.state.topLineList)
  }
  render() {
    return (
      <div className={`home-warpper ${this.props.theme==='white'?'white':'black'}`}>
        <Header/>
        <Nav/>
      </div>
    ) 
  }
}
export default Home