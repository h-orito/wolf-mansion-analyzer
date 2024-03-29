<template>
  <Modal v-model:show="isShow" header="説明書" @close="isShow = false">
    <div class="text-left">
      <div class="mb-4">
        <label>前提</label>
        <ul>
          <li>Google Chromeで動作確認しています</li>
          <li>
            WOLF MANSIONのアカウントでログインすることで使用可能になります
          </li>
          <li>ログイン状態は1ヶ月保持されます</li>
          <li>
            1画面の情報量が多いため、FullHD（1920x1080）で表示することを前提とします
          </li>
          <li>
            入力したメモを保存することができます（WOLF
            MANSIONのアカウントに紐付けて保存するため、端末を変えても情報は引き継がれます）
          </li>
          <li>
            メモは以下のタイミングで保存されます
            <ul>
              <li>メモ保存ボタンを押したとき</li>
              <li>
                全体メモ、デイリーメモ、足音メモ入力フォームからフォーカスアウトしたとき（＝別の要素をクリックしたとき）
              </li>
              <li>個人メモモーダルを閉じたとき</li>
              <li>
                ※つまり、入力後に別の要素をクリックせずにページを閉じてしまうと保存されません
              </li>
            </ul>
          </li>
          <li>
            その村に参加していても、自身しか得られない情報は取得されません
          </li>
          <li>
            現状は無料ですが、公開を取りやめたり、有料での公開となる可能性があります
          </li>
        </ul>
      </div>
      <div class="mb-4">
        <label>機能</label>
        <ul>
          <li>
            村一覧
            <ul>
              <li>村を選択すると、村の詳細情報を表示することができます</li>
              <li>検索窓で村番号や村名で絞り込みが可能です</li>
              <li>
                村詳細を開いた後は、右上の「村変更」でまた村一覧を開くことができます
              </li>
            </ul>
          </li>
          <li>
            村詳細
            <ul>
              <li>各項目の仕切り線をドラッグすると、表示領域を調整できます</li>
              <li>
                日付毎の情報
                <ul>
                  <li>
                    上部の日付ボタンを選択することで日付を切り替えられます
                  </li>
                  <li>部屋割が表示されます</li>
                  <li>
                    足音が線で表示されます
                    <ul>
                      <li>隣の部屋と繋がっていない足音は丸で表示されます</li>
                      <li>L字になっている足音は点線で表示されます</li>
                    </ul>
                  </li>
                  <li>
                    部屋割のうち、参加者がいる部屋をクリックすると、参加者メモを登録できます
                    <ul>
                      <li>先頭20文字程度が部屋割にも表示されます</li>
                      <li>部屋割での表示色を変更できます</li>
                      <li>参加者メモは全日を通して共通です</li>
                    </ul>
                  </li>
                  <li>
                    足音一覧
                    <ul>
                      <li>
                        チェックボックスのチェックにより、部屋割の足音表示非表示を切り替えることができます
                      </li>
                      <li>
                        足音右の色を選択すると、足音の表示色を変更することができます
                      </li>
                      <li>足音メモを登録できます</li>
                      <li>
                        「その日にセットした足音」でなく「その日に鳴った足音」が表示されます
                      </li>
                    </ul>
                  </li>
                  <li>
                    デイリーメモ
                    <ul>
                      <li>日付ごとのメモを登録できます</li>
                      <li>
                        右下の「全デイリーメモ確認」をクリックすると、全日程のデイリーメモを一括表示することができます
                      </li>
                      <li>
                        全デイリーメモのダイアログは周辺クリックで閉じないため、表示したまま他の操作を行うこともできます
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                全日程を通しての情報
                <ul>
                  <li>
                    投票一覧
                    <ul>
                      <li>
                        参加者名をクリックすると、その人への投票をハイライト表示することができます
                      </li>
                      <li>
                        日付をクリックすると、その日の被投票数が多い順に並び替えることができます
                      </li>
                      <li>
                        表の日付は「投票結果が開示された日」でなく、「投票した日」です
                      </li>
                    </ul>
                  </li>
                  <li>
                    全体メモ
                    <ul>
                      <li>全日程を通してのメモを登録することができます</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
interface Props {
  show: boolean
}
const props = defineProps<Props>()

const isShow = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value)
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): boolean
}>()
</script>
