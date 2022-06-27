import { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { NewsType } from '../NewsType'
import { useDispatch } from 'react-redux'
import { addHistory } from '../store/newsSlice'

const getDatahooks = (
  search: string,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const API_KEY = import.meta.env.VITE_API_KEY

  const [news, setNews] = useState<NewsType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [hasMore, setHasMore] = useState<boolean>(false)

  const observer = useRef<HTMLDivElement | any>(null)

  const dispatch = useDispatch()

  const lastNewsElRef = useCallback(
    (node: any) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1)
          getData()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore]
  )

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('keywords') || '[]')
  )
  const getData = async () => {
    setIsLoading(true)
    const res = await axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&api-key=${API_KEY}&q=${search}&page=${page}`
      )
      .then((res) => {
        setNews((prev) => [...new Set([...prev, ...res.data.response.docs])])
        setIsLoading(false)
        setHasMore(res.data.response.docs.length > 0)
        console.log('page', page)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  //검색어 추가
  const handleAddHistory = (text: string) => {
    console.log('text', text)
    const newKeyword = {
      id: Date.now(),
      text,
    }
    dispatch(addHistory(newKeyword))
  }

  useEffect(() => {
    setNews([])
  }, [search])

  useEffect(() => {
    console.log(isLoading, search)
    if (search !== '') {
      //inputValue가 있는 경우
      console.log('1')
      const setTime = setTimeout(() => {
        if (!isLoading) {
          getData()
          setPage(1)
          handleAddHistory(search)
        }
      }, 500) //0.5동안 입력 없을 경우
      return () => {
        clearTimeout(setTime)
      }
    }
  }, [search])

  return { news, isLoading, lastNewsElRef }
}

export default getDatahooks
