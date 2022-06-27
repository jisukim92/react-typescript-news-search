import { Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Container sx={{ textAlign: 'center', fontSize: 40, mb: 20 }}>
      News Search
      <Link to='/'>
        <Button variant='contained'>Main</Button>
      </Link>
      <Link to='/clip'>
        <Button variant='contained'>Clip</Button>
      </Link>
    </Container>
  )
}

export default Header
