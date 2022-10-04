<template>
  <Modal
    ref="modal"
    v-model:show="isShowModal"
    :header="`個人メモ ${name}`"
    close-button-name="閉じる"
    @close="closeModal"
    @hide="save"
  >
    <p class="text-left mb-2">
      部屋割り表示時の文字色: <FormColorPicker v-model:value="color" />
    </p>
    <Textarea v-model="memo" class="w-full" rows="10" autofocus />
  </Modal>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import {
  getParticipantMemo,
  saveParticipantMemo
} from '~/components/state/memo/participant-memo'

const village = useVillage().value!
const modal = ref()
const isShowModal = ref(false)
const openModal = () => {
  isShowModal.value = true
}
const closeModal = () => {
  isShowModal.value = false
}

// participant
const participant: Ref<VillageParticipant | null> = ref(null)
const name = computed((): string => {
  if (participant == null) return ''
  const roomNumber = participant.value?.room?.number
  const shortName = participant.value?.charaName.shortName
  const name = participant.value?.charaName.name
  return `[${roomNumber}${shortName}] ${name}`
})

const memo = computed({
  get: () => {
    const id = participant?.value?.id
    if (!id) return ''
    return getParticipantMemo(id)?.memo || ''
  },
  set: (value: string) => {
    const id = participant?.value?.id
    if (!id) return
    const participantMemo = getParticipantMemo(id)
    if (!participantMemo) return
    participantMemo.memo = value
  }
})

const color = computed({
  get: () => {
    const id = participant?.value?.id
    if (!id) return ''
    return getParticipantMemo(id)?.color || ''
  },
  set: (value: string) => {
    const id = participant?.value?.id
    if (!id) return
    const participantMemo = getParticipantMemo(id)
    if (!participantMemo) return
    participantMemo.color = value
  }
})

const open = (participantId: number) => {
  participant.value = village.participants.list.find(
    (p: VillageParticipant) => p.id === participantId
  )
  openModal()
}

const save = () => saveParticipantMemo()

defineExpose({
  open
})
</script>
