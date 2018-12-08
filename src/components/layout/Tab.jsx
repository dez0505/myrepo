import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateTabIndex } from '../../actions/tab'

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = (state,store) => {
  return {
    HomeTabMenuList: state.tab.HomeTabMenuList,
    optionalTabMenuList: state.tab.optionalTabMenuList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateHomeTabIndex: activeHomeTabIndex => dispatch(updateTabIndex({ activeHomeTabIndex })),
    updateOptionalTabIndex: activeOptionalTabIndex => dispatch(updateTabIndex({ activeOptionalTabIndex }))
  }
}

connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab)
export default Tab;