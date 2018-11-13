import {GET_ALL_SECTIONS} from '../actions/sections'

let initialstate = null
export default function (state=initialstate,{type, payload}){
  switch (type) {
    case GET_ALL_SECTIONS:
      return payload
    default:
      return state
  }
}