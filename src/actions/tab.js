import {
  UPDATE_TAB_INDEX,
} from './actionType'

// 更新tabIndex状态
export function updateTabIndex(index) { //{activeHomeTabIndex:,activeOptionalTabIndex}
  return {
    type: UPDATE_TAB_INDEX,
    index
  };
}
