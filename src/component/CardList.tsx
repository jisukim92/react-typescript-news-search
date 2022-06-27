import React, { useEffect, useState } from 'react'
import Search from './Search'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import { NewsType } from '../NewsType'

import { add, differenceInDays, format, sub, parseISO } from 'date-fns'

//자리 잡아주기 위해 사용
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Masonry from '@mui/lab/Masonry'

import { Container } from '@mui/material'

interface Props {
  news: NewsType[]
  lastNewsElRef: (node: any) => void
}

const CardList = ({ news, lastNewsElRef }: Props) => {
  const [clipItem, setClipItem] = useState<NewsType[]>(
    JSON.parse(localStorage.getItem('clipItem') || '[]')
  )
  const handleClip = (
    abstract: string,
    pub_date: string,
    headline: string,
    _id: string
  ) => {
    const newKeyword: NewsType = {
      abstract,
      pub_date,
      headline: { main: headline },
      _id,
    }

    if (clipItem.length === 0) {
      setClipItem([newKeyword])
    } else {
      if (clipItem.some((data) => data._id === _id)) {
        setClipItem([...clipItem.filter((item: NewsType) => item._id !== _id)])
      } else {
        setClipItem([newKeyword, ...clipItem])
      }
    }
  }
  useEffect(() => {
    localStorage.setItem('clipItem', JSON.stringify(clipItem))
  }, [clipItem])

  return (
    <Container>
      {news.map((item, index) => {
        if (news.length === index + 1) {
          return (
            <Card key={item._id} ref={lastNewsElRef}>
              <CardContent>
                <Typography variant='h4' style={{ fontWeight: 'bold' }}>
                  {item.headline.main}
                </Typography>
                <Typography>{item.abstract}</Typography>
                <Typography>{item.pub_date}</Typography>
                <Typography>
                  {differenceInDays(parseISO(item.pub_date), new Date())}
                </Typography>

                <Button
                  variant='contained'
                  onClick={() =>
                    handleClip(
                      item.abstract,
                      item.pub_date,
                      item.headline.main,
                      item._id
                    )
                  }
                >
                  {clipItem.some((data) => data._id === item._id)
                    ? 'UnClip'
                    : 'Clip'}
                </Button>
              </CardContent>
            </Card>
          )
        } else {
          return (
            <Card key={item._id}>
              <CardContent>
                <Typography variant='h4' style={{ fontWeight: 'bold' }}>
                  {item.headline.main}
                </Typography>
                <Typography>{item.abstract}</Typography>
                <Typography>{item.pub_date}</Typography>
                <Typography>
                  {differenceInDays(parseISO(item.pub_date), new Date())}
                </Typography>
                <Button
                  id={item.pub_date}
                  variant='contained'
                  onClick={() =>
                    handleClip(
                      item.abstract,
                      item.pub_date,
                      item.headline.main,
                      item._id
                    )
                  }
                >
                  {clipItem.some((data) => data._id === item._id)
                    ? 'UnClip'
                    : 'Clip'}
                </Button>
              </CardContent>
            </Card>
          )
        }
      })}
    </Container>
  )
}

export default CardList
