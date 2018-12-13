import React, { Component } from 'react'
import PropTypes from 'prop-types'
// // redux
import { connect } from 'react-redux'
import { getTopLineList } from '@/actions/topLine'
// component
import TopLine from '@/views/home/tab/subComponents/TopLine.jsx'
// // api
// import { getTopLineData, getZhiDinData } from '../../api/topLine'
// // utils
// import { getStore, setStore } from '@/utils/common'

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
    this.props.getTopLineList()
  }
  componentWillReceiveProps (props) {
    console.log(11111, props.listData)
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
