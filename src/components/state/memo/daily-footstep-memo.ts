export const initDailyFootstepMemos = (
  daySituations: Array<VillageDaySituation>
) => {
  // TODO: RTDBからの取得処理

  // TODO: 日付が増えていた場合の考慮
  useDailyFootstepMemos(
    daySituations.map((daySituation) => {
      return {
        day: daySituation.day,
        footsteps: daySituation.footsteps.map((f, index) => {
          return {
            footstep: f,
            color: getColor(index),
            show: true,
            memo: ''
          }
        })
      }
    })
  )
}

export const getDailyFootstepMemos = (day: number): Array<DayFootstep> => {
  return useDailyFootstepMemos().value!.find((dm) => dm.day === day)!.footsteps
}

export const showAll = (day: number) => {
  const footsteps = getDailyFootstepMemos(day)
  footsteps.forEach((f) => {
    f.show = true
  })
}

export const hideAll = (day: number) => {
  const footsteps = getDailyFootstepMemos(day)
  footsteps.forEach((f) => {
    f.show = false
  })
}

export const reverseAll = (day: number) => {
  const footsteps = getDailyFootstepMemos(day)
  footsteps.forEach((f) => {
    f.show = !f.show
  })
}

export const saveDailyFootstepMemo = () => {
  // TODO: RTDBに保存
}

const getColor = (index: number): string => {
  return index % 7 === 0
    ? 'ff0000'
    : index % 7 === 1
    ? '00ff00'
    : index % 7 === 2
    ? '00aaff'
    : index % 7 === 3
    ? 'ffaa00'
    : index % 7 === 4
    ? 'ffff00'
    : index % 7 === 5
    ? 'ffffff'
    : 'ff00ff'
}
