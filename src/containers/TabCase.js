import { connect } from 'react-redux'

import { updateTabIndex } from '../actions/tab'

import TabBox from '../views/home/tab/TabBox.jsx'

const mapStateToProps = (state,store) => {
  return {
    HomeTabMenuList: state.tab.tabMenuData.HomeTabMenuList,
    optionalTabMenuList: state.tab.tabMenuData.optionalTabMenuList
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
)(TabBox);