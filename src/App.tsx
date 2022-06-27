import { Container } from '@mui/material'
import Header from './component/Header'
import Home from './routes/Home'

import { Routes, Route } from 'react-router-dom'
import { Clip } from './routes/Clip'
import PageNotFound from './routes/PageNotFound'

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/clip' element={<Clip />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </Container>
  )
}

export default App
