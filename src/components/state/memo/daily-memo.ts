export const initDailyMemos = (village: Village) => {
  // TODO: RTDBからの取得処理

  // TODO: 日付が増えていた場合の考慮
  useDailyMemos(
    village.days.list
      .filter((d) => d.day >= 2)
      .map((d) => {
        return {
          day: d.day,
          memo: ''
        }
      })
  )
}

export const getDailyMemo = (day: number): DailyMemo => {
  return useDailyMemos().value?.find((dm) => dm.day === day)!
}

export const saveDailyMemo = () => {
  // TODO: RTDBに保存
}
