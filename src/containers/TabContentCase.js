import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Cheif from './tab/CheifCase'
// api
export class TabContentCase extends Component {
  static propTypes = {
    whichLoading: PropTypes.string
  }
  componentDidMount () {
    console.log('tabContent', this.props)
  }
  componentWillReceiveProps(newProps) {
    this.getInterfaceData(newProps.whichLoading)
  }
  getInterfaceData (whichLoading) {
    switch (whichLoading) {
      case 'topLine':
          this.getTopLineData('init')
          break
        case 'cheif':
          this.getCheifData('init')
          break
        case 'liveA':
          this.getLiveDate({ type: 'init', tabType: 'A' })
          break
        case 'liveAll':
          this.getLiveDate({ type: 'init', tabType: 'All' })
          break
        case 'news':
          this.getOptionalNews('init')
          break
        case 'qus':
          this.getOptionalQus('init')
          break
        case 'bigEvent':
          this.getOptionalBigEvent('init')
          break
        case 'notice':
          this.getOptionalNotice('init')
          break
        case 'report':
          this.getOptionalReport('init')
          break
        default:
          break
      }
  }


  render() {
    return (
      <div>
        
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
    whichLoading: state.list.interfaceState.whichLoading
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TabContentCase)
