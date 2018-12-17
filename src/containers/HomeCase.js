import { connect } from 'react-redux'
import Home from '../views/home/Home.jsx'
import { updatePageConfig } from '../actions/index'
import { updateLoadingState } from '../actions/list'

const mapStateToProps = (state,store) => {
  return {
    theme: state.pageConfig.theme,            // 主题
    version: state.pageConfig.version,        // 版本
    htid: state.pageConfig.htid,              // 用户id
    platform: state.pageConfig.platform,      // 安卓或ios
    account: state.pageConfig.account,        // account 没用到
    ifRefresh: state.pageConfig.ifRefresh     // 控制是否执行刷新
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updatePageConfig: theme => dispatch(updatePageConfig(theme)),
    updateLoadingState: loadingState => dispatch(updateLoadingState(loadingState))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)