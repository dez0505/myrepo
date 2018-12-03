import { connect } from 'react-redux'
import Home from '../views/home/Home.jsx'
import { updateTheme } from '../actions/index'

const mapStateToProps = (state,store) => {
  return {
    theme: state.pageConfig.theme
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateTheme: theme => dispatch(updateTheme(theme))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)