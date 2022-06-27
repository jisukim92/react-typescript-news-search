import { Button, Card, CardContent, Typography } from '@mui/material'
import React, { useState } from 'react'

export const Clip = () => {
  const [clipItem, setClipItem] = useState(
    JSON.parse(localStorage.getItem('clipItem') || '[]')
  )
  console.log(clipItem)
  return (
    <div>
      {clipItem.map((item: any) => {
        return (
          <Card key={item.pub_date}>
            <CardContent>
              <Typography variant='h4' style={{ fontWeight: 'bold' }}>
                {item.headline.main}
              </Typography>
              <Typography>{item.abstract}</Typography>
              <Typography>{item.pub_date}</Typography>
              <Button variant='contained'>UnClip</Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default Clip
