import { Button, Card, CardContent, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NewsType } from '../NewsType'
import { removeClip } from '../store/newsSlice'

export const Clip = () => {
  const newsClips = useSelector((state: any) => state.newsSlice.clips)
  const dispatch = useDispatch()
  return (
    <div>
      {newsClips.map((item: NewsType) => {
        return (
          <Card key={item.pub_date}>
            <CardContent>
              <Typography variant='h4' style={{ fontWeight: 'bold' }}>
                {item.headline.main}
              </Typography>
              <Typography>{item.abstract}</Typography>
              <Typography>{item.pub_date}</Typography>
              <Button
                variant='contained'
                onClick={() => dispatch(removeClip(item._id))}
              >
                UnClip
              </Button>
              <Button variant='contained'>
                <a href={item.web_url}>Detail</a>
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default Clip
