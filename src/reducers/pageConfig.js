import {
  UPDATE_THEME,
} from '../actions/actionType'

const initialState = {
  theme: ''
}
export default function todos(state = initialState, action) {
  switch (action.type) {
    case UPDATE_THEME:
      /*const mapDispatchToProps = dispatch => {
        return {
          updateTheme: theme => dispatch(updateTheme(theme))
          updateTheme: (theme) => { return dispath( updateTheme(theme) )}
        }
      }*/
      /*export function updateTheme(theme) {
        return {
          type: 'UPDATE_THEME',
          theme
        };
      }*/
      // action:{ theme: {theme: "white"}, type: "UPDATE_THEME"}
      return  { ...state, ...action.theme } // ===> Object.assign({theme: ''},{theme: 'whitle'}) 
    default:
      return state
  }
}
