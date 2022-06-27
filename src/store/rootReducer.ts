import newsSlice from './newsSlice'
import { combineReducers } from '@reduxjs/toolkit'

const reducer = combineReducers({
  newsSlice,
})

export type ReducerType = ReturnType<typeof reducer>
export default reducer
