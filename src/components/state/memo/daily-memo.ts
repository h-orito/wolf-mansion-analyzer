export const initDailyMemos = (memos: PlayerMemo | null, village: Village) => {
  if (!!memos) {
    useDailyMemos(
      village.days.list
        .filter((d) => d.day >= 1)
        .map((d) => {
          const existing =
            memos!.dailyMemos?.find((dm) => dm.day === d.day) ?? null
          return existing || getInitial(d.day)
        })
    )
    return
  }

  useDailyMemos(
    village.days.list.filter((d) => d.day >= 1).map((d) => getInitial(d.day))
  )
}

const getInitial = (day: number): DailyMemo => ({
  day,
  memo: ''
})

export const clearDailyMemos = () => useDailyMemos([])

export const getDailyMemo = (day: number): DailyMemo | null => {
  return useDailyMemos().value?.find((dm) => dm.day === day) || null
}

export const setDailyMemo = (day: number, memo: DailyMemo) => {
  const updated = useDailyMemos().value!.map((dm) => {
    return dm.day === day ? memo : dm
  })
  useDailyMemos(updated)
}

export const getWholeDailyMemos = () => {
  return useDailyMemos().value!
}
