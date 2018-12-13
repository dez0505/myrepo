import React, { Component } from 'react'
import PropTypes from 'prop-types'
// // redux
import { connect } from 'react-redux'
import { getTopLineList } from '@/actions/topLine'
// component
import TopLine from '@/views/home/tab/subComponents/TopLine.jsx'
// api
class TopLineCase extends Component {
  constructor(props) {
    super()
    this.state = {
      lastHashId: ''
    }
  }
  static propTypes = {
    whichLoading: PropTypes.string
  }
  componentDidMount() {
   
  }
  componentWillReceiveProps (props) {
      if (props.htid !== this.props.htid) { //只有htid变化时，这个才执行
        this.props.getTopLineList('init')
      }
  }
  render() {
    return (
      <TopLine topLineList = {this.props.listData}></TopLine>
    )
  }
}
const mapStateToProps = (state,store) => {
  return {
    listData: state.list.listData,
    htid: state.pageConfig.htid
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getTopLineList: type => dispatch(getTopLineList(type)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopLineCase)
