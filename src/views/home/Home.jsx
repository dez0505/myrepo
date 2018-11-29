import React, { Component } from 'react';
import './Home.scss'
import { Button, WhiteSpace } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
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
        <header>
          头部
        </header>
        <section>
          主体部分 hahah
          <Button>primary</Button><WhiteSpace />
          <Button type="primary">primary</Button><WhiteSpace />
          <Button loading>loading button</Button><WhiteSpace />
          <Button icon="check-circle-o">with icon</Button><WhiteSpace />
        </section>
        <footer>
          这是一个脚
        </footer>
      </div>
    ) 
  }
}
export default Home