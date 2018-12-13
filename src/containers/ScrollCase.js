import { connect } from 'react-redux'

import { updateInterfaceParams } from '@/actions/list'

import TabHeader from '../views/home/tab/TabHeader.jsx'


const mapStateToProps = (state,store) => {
  return {
    loadLoading: state.list.loadingState.loadLoading,
    refreshLoading: state.list.loadingState.refreshLoading,
    isNoData: state.list.dataState.isNoData,
    isNoMoreData: state.list.dataState.isNoMoreData,
    whichLoading: state.list.interfaceState.whichLoading,
    whichLoadedFail: state.list.interfaceState.whichLoadedFail,
    listData: state.list.listData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateInterfaceParams: pageNum => dispatch(updateInterfaceParams({ pageNum })),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabHeader);