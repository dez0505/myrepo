import React, { Component } from 'react';
import './Nav.scss'
import { getIconData } from '../../api/home'

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navList: []
    }
  }
  componentDidMount(){
    console.log('props', this.props)
    this.getIconList({version:'7.00',platform:'android'})
  }
  iconFormat(){
    this.setState({

    })
  }
  async getIconList(param){
    try {
      const { data } = await getIconData(param)
      let list = data.Funlist.filter((item)=>{
        return item.IconType == 1
      })
      console.log(222,list)    
      this.setState({
        navList: list
      })
    } catch(err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div className='nav-warpper'>
        <div className="navlist">
          {
            this.state.navList.map((item,index)=>{
                return(
                    <div className="navitem" data-id={index} key={index}>
                        <img src={item.ImageUrl} alt=""/>
                        <div>{item.Funname}</div>
                    </div>
                ) 
            })
          }
        </div>
      </div>
    ) 
  }
}
export default Nav