import { connect } from 'react-redux'
import Home from '../views/home/Home.jsx'
import { updatePageConfig } from '../actions/index'

const mapStateToProps = (state,store) => {
  return {
    theme: state.pageConfig.theme,            // 主题
    version: state.pageConfig.version,        // 版本
    htid: state.pageConfig.htid,              // 用户id
    platform: state.pageConfig.platform,      // 安卓或ios
    account: state.pageConfig.account         //  account 没用到
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updatePageConfig: theme => dispatch(updatePageConfig(theme))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)