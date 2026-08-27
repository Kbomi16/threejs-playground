import MainCanvas from './components/MainCanvas'
import styled from 'styled-components'
import { RecoilRoot } from 'recoil-next'
import FixedDom from './components/dom/FixedDom'

function App() {
  return (
    <RecoilRoot>
      <Wrapper>
        <MainCanvas />
        <FixedDom />
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
