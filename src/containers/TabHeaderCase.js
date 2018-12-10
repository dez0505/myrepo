import { connect } from 'react-redux'

import { updateTabIndex } from '../actions/tab'

import TabHeader from '../views/home/tab/TabHeader.jsx'

const mapStateToProps = (state,store) => {
  return {
    HomeTabMenuList: state.tab.tabMenuData.HomeTabMenuList,
    optionalTabMenuList: state.tab.tabMenuData.optionalTabMenuList,
    activeHomeTabIndex: state.tab.tabIndexData.activeHomeTabIndex,
    activeOptionalTabIndex: state.tab.tabIndexData.activeOptionalTabIndex,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateHomeTabIndex: activeHomeTabIndex => dispatch(updateTabIndex({ activeHomeTabIndex })),
    updateOptionalTabIndex: activeOptionalTabIndex => dispatch(updateTabIndex({ activeOptionalTabIndex }))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabHeader);