import { useBounds } from '@react-three/drei'

export default function FocusWeather({ children }) {
  const bounds = useBounds()

  // clip: 바운딩 박스에 맞춰 카메라 near/far를 조정해 잘림을 방지
  // fit: 바운딩 박스가 화면에 들어오도록 카메라를 이동
  // refresh: 자식 오브젝트 기준으로 바운딩 박스를 다시 계산 (특정 객체만 보려면 인자로 전달)
  const handleClick = (e) => {
    e.stopPropagation()
    bounds.refresh(e.object).clip().fit()
  }

  const handlePointerMissed = (e) => {
    if (e.button !== 0) return // 마우스 왼쪽 버튼이 아니면 리턴
    bounds.refresh().fit()
  }

  return (
    <group onClick={handleClick} onPointerMissed={handlePointerMissed}>
      {children}
    </group>
  )
}
