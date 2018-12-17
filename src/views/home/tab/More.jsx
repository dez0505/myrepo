import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class More extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    return (
      <div>
          More
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(More)
