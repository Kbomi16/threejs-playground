import MainCanvas from './components/MainCanvas'
import styled from 'styled-components'

function App() {
  return (
    <Wrapper>
      <MainCanvas />
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`
