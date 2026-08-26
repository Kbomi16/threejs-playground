import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 강의 프로젝트와 동일하게 React Compiler 미사용
// (three.scene 등 R3F 객체 직접 변경이 Compiler/린트와 충돌함)
export default defineConfig({
  plugins: [react()],
})
