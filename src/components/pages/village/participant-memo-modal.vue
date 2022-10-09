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
  setParticipantMemo
} from '~/components/state/memo/participant-memo'
import { saveMemos } from '~/components/state/memo/memo'

const village = computed(() => useVillage().value!)
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

const participantMemo = computed({
  get: () => {
    const id = participant?.value?.id
    if (!id) return null
    return getParticipantMemo(id)
  },
  set: (value: ParticipantMemo | null) => {
    const id = participant?.value?.id
    if (!id || !value) return
    setParticipantMemo(id, value)
  }
})

const memo = computed({
  get: () => participantMemo.value?.memo || '',
  set: (value: string) => {
    if (!participantMemo.value) return
    participantMemo.value.memo = value
  }
})

const color = computed({
  get: () => participantMemo.value?.color || '',
  set: (value: string) => {
    if (!participantMemo.value) return
    participantMemo.value.color = value
  }
})

const open = (participantId: number) => {
  participant.value = village.value.participants.list.find(
    (p: VillageParticipant) => p.id === participantId
  )
  openModal()
}

const save = () => {
  saveMemos()
}

defineExpose({
  open
})
</script>
