<template>
  <Modal v-model:show="isShow" header="投げ銭" @close="isShow = false">
    <div class="text-left">
      <div class="mb-4">
        <p>投げ銭いただける方は以下の方法でお願いします。</p>
        <ul>
          <li>
            <a
              href="https://www.amazon.jp/hz/wishlist/ls/1KZSJAJS1ETW4?ref_=wl_share"
              target="_blank"
              >Amazonほしいものリスト</a
            >
          </li>
          <li>
            <a href="https://www.amazon.co.jp/dp/B004N3APGO" target="_blank"
              >Amazonギフト券（Eメールタイプ）</a
            >
            <ul>
              <li>
                受取人に「wolfortあっとgooglegroups.com」を指定してください（あっとのところは@に変えてください）
              </li>
            </ul>
          </li>
          <li>
            <a href="https://ort.fanbox.cc/" target="_blank">Pixiv Fanbox</a>
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
