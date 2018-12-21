import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// utils
import { goToFunction } from '../../utils/common';
import './More.scss'
export class More extends Component {
  constructor(props) {
    super()
    this.state = {
      moreList: [
      {
        url: require('../../images/tab-images/more_caihong.png'),
        title: '彩虹内参',
        code: '10006',
        content: ['早安谍报、事件驱动、涨停榜单', '海通为您提供专业的决策内参']
      },
      {
        url: require('../../images/tab-images/more_methods.png'),
        title: '港股策略',
        code: '10038',
        content: ['大事直播、港股淘金', '把最新最全的港股通资讯']
      },
      {
        url: require('../../images/tab-images/more_autor.png'),
        title: '主编精选',
        code: '10114',
        content: ['一流国际化财经媒体', '为您提供全球市场专业级资讯']
      }
     ]
    }
  }

  render() {
    const iconClass = this.props.theme ? 'right-icon dark' : 'right-icon light'
    return (
      <div className='more-list'>
      {
        this.state.moreList.map((item,index)=>{
          return(
            <div className="more-item bot-border" key={index}
              onClick={()=>goToFunction(item.code)}>
              <div className="left-area" style={{ backgroundImage:`url(${item.url})`, backgroundRepeat:'no-repeat', backgroundSize:'100% 100%', backgroundPosition: 'center'}}>
              </div>
              <div className="section-area">
                <div className="title">{item.title}</div>
                <div className="desc">{item.content[0]}</div>
                <div className="desc">{item.content[1]}</div>
              </div>
              <div className={iconClass}>
              </div>
            </div>
          )
        })
      }
      </div>
    )
  }
}
More.propTypes = {
  theme: PropTypes.string
}
const mapStateToProps = (state) => ({
  theme: state.pageConfig.theme
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(More)
