import { UPDATE_NATIVE_DATA } from './actionType.js'
export function updateNativeData(data) {
  return {
    type: UPDATE_NATIVE_DATA,
    payload: data
  };
}

