import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Live.scss'
// redux
import { refreshListEvent } from '../../actions/home'
import { updateInterfaceState } from '../../actions/list'
export class Live extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newLiveList: []
    }
  }
  componentDidMount() {
    this.getEachItemIfTooLong(this.props)
  }
  componentWillUpdate(props) {
    if( props.liveList !== this.props.liveList) {
      this.getEachItemIfTooLong(props)
    }
  }
  // 根据下标改变nav
  handleClick (index) {
    if ((index === 0 && this.props.whichLoading === 'liveA') || (index === 1 && this.props.whichLoading === 'liveAll')) return
    if (index === 0) {
      this.props.updateInterfaceState('liveA')
      this.props.refreshListEvent();
    } else {
      this.props.updateInterfaceState('liveAll')
      this.props.refreshListEvent();
    }
  }
  getEachItemIfTooLong (props) {
    if (props.liveList.length > 0) {
      const newLiveList = [].concat(props.liveList)
      newLiveList.forEach(element => {
        element.isTooLongText=this.checkIfTooLong(element.title)
        element.isSpread=this.checkIfTooLong(element.title)
      });
      this.setState({
        newLiveList
      })
    }
  }
  shouldComponentUpdate(props, state) {
   return state.newLiveList!==this.state.newLiveList ? true : false
  }
  checkIfTooLong (text) {
    text = String(text)
    // 去掉所有的html标记
    let newText = text.replace(/<[^>]+>/g, '')
    if (newText.length >= 88) {
      return true
    } else {
      return false
    }
  }
    // 展开更多的文字
    showMoreClick (activeIndex) {
      const newLiveList = this.state.newLiveList.map((item)=>item)
      newLiveList[activeIndex].isSpread=!newLiveList[activeIndex].isSpread
      this.setState({
        newLiveList
      })
    }
  render() {
    const theme = this.props.theme
    const activeTextColor = theme === 'red' ? '#ea3e34' : '#2e90e5'
    const whichLoading = this.props.whichLoading
    const liveAClass = theme === 'red' ? 'icon red' : 'icon'
    const liveAllClass = theme === 'red' ? 'icon allicon red' : 'icon allicon'
    const lineClass = theme === 'night' ? 'line night' : 'line'
    return (
      <div className='live-box'>  
        <div className="tab-title">
          <div className="left-title" onClick={()=>this.handleClick(0)} style = {{color:whichLoading === 'liveA'? activeTextColor : null}}>
            <span className={liveAClass}></span>A股直播
          </div>
          <div className={lineClass}></div>
          <div className="right-title" onClick={()=>this.handleClick(1)} style = {{color:whichLoading === 'liveAll'? activeTextColor : null}}>
             <span className={liveAllClass}></span>全球直播
          </div>
        </div>
        <div className="live-list">
          <div className="desc">
            <div className="time">
              {this.props.liveTabTime}
            </div>
            <div className="orgin">
              *实时来自资讯来自选股宝APP
            </div>
          </div>
          {
            this.props.liveList.map((item, index)=>{
              const contentClass = item.isSpread?"too-long":"no-too-long"
              return (
                <div className="live-item" key={index}>
                  <div className="point">
                    <div className="inner-point"></div>
                  </div>
                  <div className="content">
                    <div className={contentClass} dangerouslySetInnerHTML={{__html:item.title}}></div>
                    <div className="time">
                      {item.time}
                    </div>
                    <div className="more" style={{display:item.isTooLongText?'block':'none'}} onClick={()=>this.showMoreClick(index)}> {item.isSpread? '展开':'收起'}
                    </div>
                  </div>
                </div>
              )
            })
          }
          
        </div>
      </div>
    )
  }
}
Live.propTypes = {
  liveList: PropTypes.array,
  theme: PropTypes.string,
  whichLoading: PropTypes.string,
  liveTabTime: PropTypes.string,
}
const mapStateToProps = (state) => ({
  liveTabTime: state.pageConfig.liveTabTime,
  theme: state.pageConfig.theme,
  whichLoading: state.list.interfaceState.whichLoading,
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateInterfaceState: whichLoading => dispatch(updateInterfaceState({whichLoading})),
    refreshListEvent:()=>{dispatch(refreshListEvent())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Live)
