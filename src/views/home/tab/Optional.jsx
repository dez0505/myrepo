import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TabHeaderCase from '../../../containers/TabHeaderCase'

export class Optional extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    return (
      <div>
          <TabHeaderCase type='optional'></TabHeaderCase> 
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Optional)
