import { connect } from 'react-redux'
import Home from '../view/home/Home.jsx'
import { updateList } from '../actions/topLine'
export default connect(
  (state,store) => {
    console.log(222,state);
    return {
      topLineListData: ()=> {
        return state.updateList
      }
    }
  },
  dispatch => {
    return {
      updateListEvent: list => dispatch(updateList(list))
    }
  }
)(Home)