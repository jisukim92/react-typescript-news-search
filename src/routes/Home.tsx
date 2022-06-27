import { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import CardList from '../component/CardList'
import Search from '../component/Search'
import History from '../component/History'
import { NewsType } from '../NewsType'
import getDatahooks from '../hooks/getDatahooks'

import { Container } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

export const Home = () => {
  const API_KEY = import.meta.env.VITE_API_KEY

  const [search, setSearch] = useState<string>('')
  const [inputFocus, setInputFocus] = useState(false)

  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState<boolean>(false)

  const { news, isLoading, lastNewsElRef } = getDatahooks(search, page, setPage)
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('keywords') || '[]')
  )

  //검색어 추가
  const handleAddHistory = (text: string | number) => {
    console.log('text', text)
    const newKeyword = {
      id: Date.now(),
      text: text,
    }

    let getHistory: Array<string> = JSON.parse(
      localStorage.getItem('keywords') || '[]'
    )

    if (getHistory && getHistory.length === 5) {
      getHistory.pop()
    }

    setHistory([newKeyword, ...getHistory])
  }

  return (
    <>
      <Search
        setSearch={setSearch}
        handleAddHistory={handleAddHistory}
        search={search}
        setInputFocus={setInputFocus}
      />
      <History inputFocus={inputFocus} />
      {isLoading && (
        <CircularProgress
          sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto',
          }}
        />
      )}
      <CardList news={news} lastNewsElRef={lastNewsElRef} />
    </>
  )
}

export default Home
