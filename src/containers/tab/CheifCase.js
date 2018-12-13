import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCheifData } from '../../api/cheif'
class CheifCase extends Component {
  componentDidMount() {
    console.log('cheif', this.props)
  }
  componentWillReceiveProps (props) {
    console.log('cheif', props)
    if (props.whichLoading === 'topLine') {
      
    }
  }
  render() {
    return (
      <div>
          CheifCase
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
)(CheifCase);