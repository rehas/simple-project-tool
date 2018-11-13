import {GET_ALL_TASKS} from '../actions/tasks'

let initialstate = null
export default function (state=initialstate,{type, payload}){
  switch (type) {
    case GET_ALL_TASKS:
      return payload
    default:
      return state
  }

}