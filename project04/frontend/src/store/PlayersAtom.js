import { atom } from 'jotai'

// 모든 플레이어들
export const PlayersAtom = atom([])

// 내 socket 정보
export const MeAtom = atom(undefined)

// 캐릭터 선택이 완료되었는지,
export const CharacterSelectFinishedAtom = atom(false)

// 현재 선택된 캐릭터 종류
export const SelectedCharacterGlbNameIndexAtom = atom(0)

// 현재 완료된 퀘스트 목록
export const PlayerCompletedQuestsAtom = atom([])

// 현재 플레이어의 인벤토리
export const PlayerInventoryAtom = atom([])

// 운동장에 배치된 오브젝트들의 경계선 정보
export const PlayGroundStructuresBoundingBoxAtom = atom([])

// 운동장에 배치된 오브젝트들의 경계선 꼭짓점 정보
export const PlayerGroundStructuresFloorPlaneCornersAtom = atom((get) => {
  const pb = get(PlayGroundStructuresBoundingBoxAtom)
  return pb.map((item) => {
    return {
      name: item.name,
      corners: [
        {
          x: item.box.max.x + item.position.x,
          z: item.box.max.z + item.position.z,
        },
        {
          x: item.box.max.x + item.position.x,
          z: item.box.min.z + item.position.z,
        },
        {
          x: item.box.min.x + item.position.x,
          z: item.box.min.z + item.position.z,
        },
        {
          x: item.box.min.x + item.position.x,
          z: item.box.max.z + item.position.z,
        },
      ],
      position: item.position,
    }
  })
})

/** @deprecated use PlayerGroundStructuresFloorPlaneCornersAtom */
export const PlayerGroundStructuresFloorPlaneCornersSelector =
  PlayerGroundStructuresFloorPlaneCornersAtom

// 초기 모델링 로드가 완료되었는가 여부
export const IsLoadCompletedAtom = atom(false)

// 현재 있는 맵 정보
export const CurrentMapAtom = atom('GROUND')

// 현재 들어가있는 마이룸의 주인 유저 정보
export const CurrentMyRoomPlayerAtom = atom(undefined)

// 모든 채팅 정보
export const ChatsAtom = atom([])

// 최근 채팅 정보
export const RecentChatsAtom = atom([])

// 이미 표시된 최근 채팅 정보
export const AlreadyDisplayedRecentChatsAtom = atom([])

// 입장 공지 정보
export const EnteredPlayerNoticeAtom = atom(undefined)

// 퇴장 공지 정보
export const ExitedPlayerNoticeAtom = atom(undefined)

//  현재 배치중인 기술스택박스 이름
export const CurrentPlacingMyRoomSkillAtom = atom(undefined)

// 현재 배치중인 가구 이름
export const CurrentPlacingMyRoomFurnitureAtom = atom(undefined)

// 현재 배치중인 메모 정보
export const CurrentPlacingMyRoomMemoAtom = atom(undefined)

// 현재 팝업에 띄워진 메모 정보
export const CurrentSelectedMemoAtom = atom(undefined)

// 현재 선택된 마이룸 내 배치된 오브젝트 정보
export const CurrentSelectedMyRoomObjectAtom = atom(undefined)

//  현재 회전중인 가구
export const CurrentRotationingMyRoomObjectAtom = atom(undefined)

// 현재 회전된 각
export const CurrentRotationAtom = atom(undefined)

// 미니게임(사격게임) 관련
export const IsMiniGameStartedAtom = atom(false)

// 현재 미니게임이 끝났는지 여부
export const IsMiniGameClearedAtom = atom(false)

// 현재 맞춘 표적 수
export const HitCountAtom = atom(0)

// 현재 남은 총알 개수
export const BulletCountAtom = atom(15)

// 현재 발사된 총의 남은 쿨타임
export const CoolTimeAtom = atom(undefined)
