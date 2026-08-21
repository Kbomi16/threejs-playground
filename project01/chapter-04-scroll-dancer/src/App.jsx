import MainCanvas from './components/MainCanvas'
import styled from 'styled-components'
import { RecoilRoot } from 'recoil-next'

function App() {
  return (
    <RecoilRoot>
      <Wrapper>
        <MainCanvas />
      </Wrapper>
    </RecoilRoot>
  )
}

export default App

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`
