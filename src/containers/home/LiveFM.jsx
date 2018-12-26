import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './LiveFM.scss'
// utils
import { goToFunction } from '../../utils/common'

class LiveFM extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
  }
  render() {
    const theme = this.props.theme
    const liveFmList = this.props.liveFmList
    const lineClass = theme === 'night' ? 'line night' : 'line'
    const liveStyle = {
      backgroundImage: `url(${liveFmList[0].ImageUrl})`,
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
    const fmStyle = {
      backgroundImage: `url(${liveFmList[1].ImageUrl})`,
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
    return (
      <div>
        <div className='split-line'></div>  
        <div className='live-fm-box'>
          <div className="live-radio" style={liveStyle} onClick={() => goToFunction(liveFmList[0].FunctionTypeId)}>
          </div>
          {
            <div className={lineClass}></div>
          }
          <div className="fm-radio" style={fmStyle} onClick={() => goToFunction(liveFmList[1].FunctionTypeId)}>
          </div>
        </div>
      </div>
    )
  }
}
LiveFM.propTypes = {
  liveFmList:PropTypes.array,
  theme: PropTypes.string,
}
export default LiveFM