import React, { Component } from 'react'
import { goToFunction } from '@/utils/common'
import PropTypes from 'prop-types'


import './LiveFM.scss'
export default class LiveFM extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    liveFmList:PropTypes.array,
    theme: PropTypes.string,
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
        <div className='live-fm-box' onClick={() => goToFunction(liveFmList[0].FunctionTypeId)}>
          <div className="live-radio" style={liveStyle}>
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
