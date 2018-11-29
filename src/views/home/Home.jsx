import React, { Component } from 'react';
import './Home.scss'

// subComponent
import Header from '../../components/layout/Header'
import Nav from '../../components/layout/Nav'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topLineList:[]
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
        <Header/>
        <section>
        </section>
        <footer>
        </footer>
        <Nav/>
      </div>
    ) 
  }
}
export default Home