import { connect } from 'react-redux'
import Home from '../views/home/Home.jsx'
import { updatePageConfig } from '../actions/index'

const mapStateToProps = (state,store) => {
  return {
    theme: state.pageConfig.theme,
    version: state.pageConfig.version,
    htid: state.pageConfig.htid,
    platform: state.pageConfig.platform,
    account: state.pageConfig.account
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