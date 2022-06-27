import styled from '@emotion/styled'
import { TextField, Button } from '@mui/material'

const Form = styled.form`
  width: 400px;
`

const InputField = styled.input`
  &:focus {
    background-color: red;
  }
`

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>
  handleAddHistory: (text: string | number) => void
  search: string
  setInputFocus: React.Dispatch<React.SetStateAction<boolean>>
}
const Search = ({
  setSearch,
  handleAddHistory,
  search,
  setInputFocus,
}: Props) => {
  return (
    <Form>
      <InputField
        type='text'
        placeholder='Search...'
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      />
      <Button variant='contained' type='submit'>
        Search
      </Button>
    </Form>
  )
}

export default Search
