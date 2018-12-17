import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { updateInterfaceState, updateLoadingState, updateDataState, updateListData } from '@/actions/list'
// api
import { getOptionalBigEvent } from '@/api/topLine'


class bigEventBox extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}


const mapStateToProps = (state,store) => {
  return {
    refreshLoading: state.list.loadingState.refreshLoading,
    isNoData: state.list.dataState.isNoData,
    whichLoading: state.list.interfaceState.whichLoading,
    whichLoadedFail: state.list.interfaceState.whichLoadedFail,
    listData: state.list.listData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateLoadingState: loadingState => dispatch(updateLoadingState(loadingState)),
    updateDataState: dataState => dispatch(updateDataState(dataState)),
    updateListData: listData => dispatch(updateListData({ listData })),
    updateInterfaceState: interfaceState => dispatch(updateInterfaceState(interfaceState))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(bigEventBox);