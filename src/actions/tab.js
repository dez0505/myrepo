import {
  UPDATE_TAB_INDEX,
} from './actionType'

// 更新tabIndex状态
export function updateHomeIndex(index) { //{activeHomeTabIndex:,activeOptionalTabIndex}
  return {
    type: UPDATE_TAB_INDEX,
    index
  };
}
