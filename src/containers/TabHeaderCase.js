import { connect } from 'react-redux'

import { updateTabIndex } from '@/actions/tab'
import { updateInterfaceState, resetState } from '@/actions/list'

import TabHeader from '../views/home/tab/TabHeader.jsx'

const mapStateToProps = (state,store) => {
  return {
    HomeTabMenuList: state.tab.tabMenuData.HomeTabMenuList,
    optionalTabMenuList: state.tab.tabMenuData.optionalTabMenuList,
    activeHomeTabIndex: state.tab.tabIndexData.activeHomeTabIndex,
    activeOptionalTabIndex: state.tab.tabIndexData.activeOptionalTabIndex,
    theme: state.pageConfig.theme,
    optionalTeamName: state.pageConfig.optionalTeamName
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateHomeTabIndex: activeHomeTabIndex => dispatch(updateTabIndex({ activeHomeTabIndex })),
    updateOptionalTabIndex: activeOptionalTabIndex => dispatch(updateTabIndex({ activeOptionalTabIndex })),
    updateInterfaceState: whichLoading => dispatch(updateInterfaceState({whichLoading})),
    resetState:()=>dispatch(resetState())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabHeader);