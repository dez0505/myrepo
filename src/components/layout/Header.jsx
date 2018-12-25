import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Header.scss'
import { goToFunction } from '@/utils/common.js'
class Header extends Component {
  constructor(props) {
    super(); //可以不给props
  }
  componentDidMount() {
  }
  render() {
    const headerStyle = {
      height: this.props.titleheight || 48
    }
    return (
      <div className='header-box bot-border' style={headerStyle}>
        <div onClick={() => goToFunction(80004)}>客服</div>
        <div className='input-box' onClick={() => goToFunction(10134)}>
          <div className='search-icon'></div> 
          <div className='input'>代码/简拼/功能/资讯/数据</div> 
        </div>
        <div className='scan-icon' onClick={() => goToFunction(10129)}></div>
        <div className='message-icon' onClick={() => goToFunction(10067)}></div>
      </div>
    ) 
  }
}
Header.propTypes = {
  titleheight: PropTypes.number,
}
const mapStateToProps = (state) => ({
  titleheight: state.pageConfig.titleheight
})


export default connect(mapStateToProps)(Header)