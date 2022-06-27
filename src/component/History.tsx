import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

interface Props {
  inputFocus: boolean
}

export interface HistoryItem {
  id: number
  text: string
}

const History = ({ inputFocus }: Props) => {
  const history = useSelector((state: RootState) => state.newsSlice.history)
  return (
    <>
      {inputFocus && (
        <div>
          {history.map((key: HistoryItem) => {
            return <div key={key.id}>{key.text}</div>
          })}
        </div>
      )}
    </>
  )
}

export default History
