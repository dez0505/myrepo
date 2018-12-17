import React, { Component } from 'react'
import PropTypes from 'prop-types'
// // redux
import { connect } from 'react-redux'
import { getTopLineList } from '@/actions/topLine'
// component
import TopLine from '@/views/home/tab/subComponents/TopLine.jsx'
import NoData from '@/views/home/tab/NoData.jsx'
// api
class TopLineCase extends Component {
  constructor(props) {
    super()
    this.state = {
      lastHashId: ''
    }
  }
  static propTypes = {
    whichLoading: PropTypes.string
  }
  componentDidMount() {
   
  }
  componentWillReceiveProps (props) {
      if (props.htid !== this.props.htid || (props.refreshLoading === true && props.refreshLoading !== this.props.refreshLoading )){ //只有htid变化时，这个才执行
        this.props.getTopLineList('init')
      } else if (props.loadLoading === true && props.loadLoading !== this.props.loadLoading ) {
        console.log(88888)
        this.props.getTopLineList('load')
      }
  }
  render() {
    const listData = this.props.listData
    return (
      <div>
        { listData.length>0 ?  <TopLine topLineList = {listData}> : </TopLine> : <NoData tabType='topLine'></NoData> }
      </div>
    )
  }
}
const mapStateToProps = (state,store) => {
  return {
    listData: state.list.listData,
    htid: state.pageConfig.htid,
    refreshLoading: state.list.loadingState.refreshLoading, //根据refreshloading来进行列表刷新
    loadLoading: state.list.loadingState.loadLoading        //根据loadLoading来进行加载更多
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getTopLineList: type => dispatch(getTopLineList(type)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopLineCase)
