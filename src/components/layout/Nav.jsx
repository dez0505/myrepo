import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Nav.scss'
import { goToFunction } from '@/utils/common.js'

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterNavMenus: []
    }
  }
  setFilterMenus (navMenus, theme = 'day') {
    if (!navMenus.length) return
    const filterNavMenus = navMenus.filter(item => theme === 'red' ? item.IconType === '2' : item.IconType === '1')
    this.setState({
      filterNavMenus
    })
  }
  // 解决有默认值的情况要在mount中执行
  componentWillMount () {
    if (this.props.navMenus) this.setFilterMenus(this.props.navMenus)
  }
  componentWillReceiveProps(props) {
    this.setFilterMenus(props.navMenus, props.theme)
  }
  render() {
    return (
      <div className='nav-warpper'>
        <div className="nav-list">
          {
            this.state.filterNavMenus.map((item,index)=>{
              return(
                <div className="nav-item" onClick= { () => goToFunction(item.Funid) } data-id={index} key={index}>
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
Nav.propTypes = {
  navMenus: PropTypes.array,
}
export default Nav