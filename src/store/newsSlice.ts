import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { NewsType } from '../NewsType'
import { HistoryItem } from '../component/History'

interface ClipType {
  clips: NewsType[]
  history: HistoryItem[]
}
const initialState: ClipType = {
  clips: [],
  history: [],
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  // 스토어의 액션들을 수행하도록 해주는 함수
  reducers: {
    // 클립 추가
    addClip: (state: ClipType, action: PayloadAction<NewsType>) => {
      const newClip = action.payload // 기사에 대한 정보 전체를 받아온다.
      return {
        ...state,
        clips: [newClip, ...state.clips],
      }
    },
    // 클립 제거
    removeClip: (state: ClipType, action: PayloadAction<string>) => {
      const clipItems = current(state.clips)
      return {
        ...state,
        clips: [
          ...clipItems.filter((news: NewsType) => news._id !== action.payload),
        ],
      }
    },
    addHistory: (state: ClipType, action: PayloadAction<HistoryItem>) => {
      let newHistory = current(state.history)

      newHistory = newHistory.filter((e) => e.text != action.payload.text)
      if (newHistory.length === 5) {
        newHistory.pop()
      }
      return {
        ...state,
        history: [action.payload, ...newHistory],
      }
    },
  },
})

export const { addClip, removeClip, addHistory } = newsSlice.actions
export default newsSlice.reducer
