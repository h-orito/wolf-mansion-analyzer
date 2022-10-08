export const initDailyFootstepMemos = (
  memos: PlayerMemo | null,
  daySituations: Array<VillageDaySituation>
) => {
  if (!!memos) {
    useDailyFootstepMemos(
      daySituations.map((daySituation) => {
        const existing = memos!.dailyFootstepMemos.find(
          (dfm) => dfm.day === daySituation.day
        )
        return existing || mapFootstepMemo(daySituation)
      })
    )
    return
  }

  useDailyFootstepMemos(
    daySituations.map((daySituation) => mapFootstepMemo(daySituation))
  )
}

const mapFootstepMemo = (
  daySituation: VillageDaySituation
): DailyFootstepMemo => {
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
}

export const clearDailyFootstepMemos = () => useDailyFootstepMemos([])

export const getDailyFootstepMemos = (day: number): Array<DayFootstep> => {
  return (
    useDailyFootstepMemos().value?.find((dm) => dm.day === day)?.footsteps || []
  )
}

export const setDailyFootstepMemos = (
  day: number,
  memos: Array<DayFootstep>
) => {
  const updated = useDailyFootstepMemos().value!.map((dm) => {
    return dm.day === day ? { day, footsteps: memos } : dm
  })
  useDailyFootstepMemos(updated)
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
