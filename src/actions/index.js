import { UPDATE_PAGECONFIG, UPDATE_LOADED_STATE } from './actionType.js'

export function updatePageConfig(pageConfig) {
  return {
    type: UPDATE_PAGECONFIG,
    pageConfig
  };
}
export function updateLoadedState(loadedState) {
  return {
    type: UPDATE_LOADED_STATE,
    payload: loadedState
  };
}