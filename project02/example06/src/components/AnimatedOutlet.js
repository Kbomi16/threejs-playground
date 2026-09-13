//! 중첩 라우트 + Framer Motion 페이지 전환일 때만 필요
// key={location.pathname} — /seoul → /로 바뀌면 이 컴포넌트가 새로 생김
// 그러면 AnimatePresence가 예전 Seoul을 잠시 유지하고 exit을 재생한 뒤 없앱니다.

import { useState } from 'react'
import { useOutlet } from 'react-router-dom'

const AnimatedOutlet = () => {
  const o = useOutlet() // 현재 라우트의 출력 컴포넌트
  const [outlet] = useState(o) // 현재 라우트의 출력 컴포넌트를 상태로 관리

  return <>{outlet}</> // 현재 라우트의 출력 컴포넌트를 반환
}

export default AnimatedOutlet
