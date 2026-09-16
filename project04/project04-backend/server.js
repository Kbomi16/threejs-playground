const { Server } = require('socket.io')

const io = new Server({
  cors: {
    origin: '*',
    credentials: true,
  },
})

io.listen(4000)

// 접속 중인 플레이어 목록. 서버 메모리에만 있음
const players = []

// ! 1. 클라이언트 소켓이 연결되면 시작
io.on('connection', (socket) => {
  console.log('연결됨!')

  // 접속 직후: 현재 접속자 목록을 전원에게 동기화
  io.emit('players', players)

  // ! 2. 클라이언트가 닉네임/직업/캐릭터를 보내면 플레이어로 등록
  socket.on(
    'initialize',
    ({ tempNickname, tempJobPosition, selectedCharacterGlbNameIndex }) => {
      const newPlayer = {
        id: socket.id,
        position: [0, 0, 0],
        nickname: tempNickname,
        jobPosition: tempJobPosition,
        selectedCharacterGlbNameIndex,
        myRoom: {
          objects: [],
        },
      }
      players.push(newPlayer)

      // 본인에게만: 방금 만든 내 플레이어 정보
      socket.emit(
        'initialize',
        players.find((p) => p.id === socket.id),
      )
      // 전원에게: 누가 들어왔는지 알림
      io.emit('enter', {
        id: socket.id,
        nickname: newPlayer.nickname,
        jobPosition: newPlayer.jobPosition,
      })
      // 전원에게: 갱신된 전체 플레이어 목록
      io.emit('players', players)
    },
  )

  // ! 3. 클라이언트가 위치를 보내면 해당 플레이어 position을 덮어쓰고 목록 재방송
  socket.on('move', (position) => {
    console.log('players', players)
    const player = players.find((player) => player.id === socket.id)
    if (player) {
      player.position = position
      io.emit('players', players)
    }
  })

  // ! 4. 채팅: 보낸 사람 정보 + 텍스트를 전원에게 방송
  socket.on('newText', (text) => {
    const sender = players.find((player) => player.id === socket.id)
    if (sender) {
      const { id, nickname, jobPosition } = sender
      if (nickname && jobPosition) {
        io.emit('newText', {
          senderId: id,
          senderNickname: nickname,
          senderJobPosition: jobPosition,
          text,
          timestamp: new Date(),
        })
      }
    }
  })

  // ! 5. 내 방 배치가 바뀌면, 대상 플레이어의 myRoom을 갱신하고 목록 재방송
  // otherPlayerId가 있으면 그 사람 방, 없으면 내 방
  socket.on('myRoomChange', (myRoom, otherPlayerId) => {
    console.log('방이 바뀌었나?')
    console.log('otherPlayerId', otherPlayerId)
    console.log('socket.id', socket.id)
    const id = otherPlayerId ?? socket.id
    const player = players.find((player) => player.id === id)
    console.log('myRoom', myRoom)
    player.myRoom = myRoom
    io.emit('players', players)
  })

  // ! 6. 연결이 끊기기 직전: 아직 players에 남아 있으므로 퇴장 알림을 먼저 보냄
  socket.on('disconnecting', () => {
    console.log('연결이 끊어지는 중!')
    const player = players.find((p) => p.id === socket.id)
    if (player) {
      io.emit('exit', {
        id: socket.id,
        nickname: player.nickname,
        jobPosition: player.jobPosition,
      })
    }
  })

  // ! 7. 연결 종료 완료: 목록에서 제거하고 갱신된 목록을 전원에게 보냄
  socket.on('disconnect', () => {
    console.log('연결이 끊어짐!')

    players.splice(
      players.findIndex((player) => player.id === socket.id),
      1,
    )
    io.emit('players', players)
  })
})
