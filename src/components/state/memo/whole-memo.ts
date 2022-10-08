export const initWholeMemo = (memos: PlayerMemo | null) => {
  if (!!memos) useWholeMemo(memos.wholeMemo)
  else useWholeMemo('')
}

export const clearWholeMemo = () => useWholeMemo('')
