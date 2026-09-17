import MainCanvas from './canvas/MainCanvas'
import { useAtomValue } from 'jotai'
import { CharacterSelectFinishedAtom, MeAtom } from '../../store/PlayersAtom'
import CanvasLayout from './canvasLayout/Layout'
import Lobby from './lobby/Lobby'

export default function Content() {
  const characterSelectFinished = useAtomValue(CharacterSelectFinishedAtom)
  const me = useAtomValue(MeAtom)

  if (characterSelectFinished && me) {
    return (
      <CanvasLayout>
        <MainCanvas />
      </CanvasLayout>
    )
  }
  return <Lobby />
}
