import {
  UPDATE_LOADING_STATE,
  UPDATE_DATA_STATE,
  UPDATE_INTERFACE_STATE,
  UPDATE_LIST_DATA,
  UPDATE_INTERFACE_PARAMS,
  RESET_STATE,
} from './actionType'

// 更新loading状态
export function updateLoadingState(loadingState) {
  return {
    type: UPDATE_LOADING_STATE,
    loadingState
  };
}

// 更新data状态
export function updateDataState(dataState) {
  return {
    type: UPDATE_DATA_STATE,
    dataState
  };
}

// 更新接口状态
export function updateInterfaceState(interfaceState) {
  return {
    type: UPDATE_INTERFACE_STATE,
    interfaceState
  };
}

// 更新列表数据
export function updateListData(listData) {
  return {
    type: UPDATE_LIST_DATA,
    listData
  };
}
// 更新列表数据
export function updateInterfaceParams(interfaceParams) {
  return {
    type: UPDATE_INTERFACE_PARAMS,
    interfaceParams
  };
}

// 重置list状态
export function resetState() {
  return {
    type: RESET_STATE
  };
}