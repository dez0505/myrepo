import { connect } from 'react-redux'
import Home from '../components/home/Home.jsx'
import { updateList } from '../actions/topLine'
export default connect(
  (state,store) => {
    console.log(222,state);
    return {
      todos: ()=> {
        return state.todos
      }
    }
  },
  dispatch => {
    return {
      updateList: list => dispatch(updateList(list))
    }
  }
)(Home)