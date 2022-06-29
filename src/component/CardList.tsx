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
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import Masonry from '@mui/lab/Masonry'

import { Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addClip, removeClip } from '../store/newsSlice'

interface Props {
  news: NewsType[]
  lastNewsElRef: (node: any) => void
}

const CardList = ({ news, lastNewsElRef }: Props) => {
  const newsClips = useSelector((state: any) => state.newsSlice.clips)

  const dispatch = useDispatch()
  const handleClip = (item: NewsType) => {
    if (newsClips.length === 0) {
      dispatch(addClip(item))
    } else {
      if (newsClips.some((data: any) => data._id === item._id)) {
        dispatch(removeClip(item._id))
      } else {
        dispatch(addClip(item))
      }
    }
  }

  return (
    <Container>
      {news.map((item: NewsType, index) => {
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

                <Button variant='contained' onClick={() => handleClip(item)}>
                  {newsClips.some((data: any) => data._id === item._id)
                    ? 'UnClip'
                    : 'Clip'}
                </Button>
                <Link href={item.web_url}>Detail</Link>
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
                  onClick={() => handleClip(item)}
                >
                  {newsClips.some((data: any) => data._id === item._id)
                    ? 'UnClip'
                    : 'Clip'}
                </Button>
                <Button variant='contained'>
                  <a href={item.web_url}>Detail</a>
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
