import { connect } from 'react-redux'

import { updateInterfaceState, updateLoadingState, updateDataState, updateListData } from '@/actions/list'

import TopLineBox from './tab/TopLineCase.js'
import CheifBox from './tab/CheifCase.js'
import LiveBox from './tab/LiveCase.js'
import NewsBox from './tab/NewsCase.js'
import QusBox from './tab/QusCase.js'
import BigEventBox from './tab/BigEventCase.js'
import NoticeBox from './tab/NoticeCase.js'
import ReportBox from './tab/ReportCase.js'

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
)(TopLineBox);
// , CheifBox, LiveBox, NewsBox, QusBox, BigEventBox, NoticeBox, ReportBox