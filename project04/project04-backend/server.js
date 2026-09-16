const { Server } = require('socket.io')

const io = new Server({
  cors: {
    origin: '*',
  },
})

io.listen(4000)

io.on('connection', (socket) => {
  console.log('연결됨!')

  socket.on('disconnecting', () => {
    console.log('연결 해제 중!')
  })

  socket.on('disconnect', () => {
    console.log('연결 해제 완료!')
  })
})
