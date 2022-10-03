<template>
  <Modal
    ref="modal"
    v-model:show="isShowModal"
    :header="`個人メモ ${name}`"
    close-button-name="閉じる"
    @close="closeModal"
  >
    <p class="text-left mb-2">
      部屋割り表示時の文字色: <FormColorPicker v-model:value="color" />
    </p>
    <Textarea v-model="memo" class="w-full" rows="10" autofocus />
  </Modal>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
// props
interface Props {
  participantMemos: Array<ParticipantMemo>
  village: Village
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:participant-memos', value: Array<ParticipantMemo>): void
}>()

const modal = ref()
const isShowModal = ref(false)
const openModal = () => {
  isShowModal.value = true
}
const closeModal = () => (isShowModal.value = false)

// participant
const participant: Ref<VillageParticipant | null> = ref(null)
const name = computed((): string => {
  if (participant == null) return ''
  const roomNumber = participant.value?.room?.number
  const shortName = participant.value?.charaName.shortName
  const name = participant.value?.charaName.name
  return `[${roomNumber}${shortName}] ${name}`
})

// memo
const memos = computed({
  get: () => props.participantMemos,
  set: (value: Array<ParticipantMemo>) =>
    emit('update:participant-memos', value)
})

const memo = computed({
  get: () => {
    const participantMemo = memos.value.find(
      (p: ParticipantMemo) => p.participantId === participant?.value?.id
    )
    return participantMemo ? participantMemo.memo : ''
  },
  set: (value: string) => {
    const participantMemo = memos.value.find(
      (p: ParticipantMemo) => p.participantId === participant?.value?.id
    )
    if (participantMemo) {
      participantMemo.memo = value
    }
  }
})

const color = computed({
  get: () => {
    const participantMemo = memos.value.find(
      (p: ParticipantMemo) => p.participantId === participant?.value?.id
    )
    return participantMemo ? participantMemo.color : ''
  },
  set: (value: string) => {
    const participantMemo = memos.value.find(
      (p: ParticipantMemo) => p.participantId === participant?.value?.id
    )
    if (participantMemo) {
      participantMemo.color = value
    }
  }
})

const open = (participantId: number) => {
  participant.value = props.village.participants.list.find(
    (p: VillageParticipant) => p.id === participantId
  )
  openModal()
}

defineExpose({
  open
})
</script>
