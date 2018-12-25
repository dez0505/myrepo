import {
  UPDATE_TAB_INDEX,
} from '../actions/actionType'

const initialState = {
  tabMenuData: {
    homeTabMenuList: [
      '头条',
      '首席',
      '7×24',
      '自选',
      '更多'
    ],
    optionalTabMenuList: [
      '新闻',
      '问董秘',
      '大事',
      '公告',
      '研报',
    ]
  },
  tabIndexData: {
    activeHomeTabIndex: 0,
    activeOptionalTabIndex: -1,
  },
}
export default function tab(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TAB_INDEX:    // 更新loading状态
      const tabIndexData = {...state.tabIndexData,...action.index}
      // console.log(tabIndexData)
      return  { ...state, tabIndexData}
    default:
      return state
  }
}