<template>
  <div class="h-full overflow-y-auto overflow-x-auto">
    <label>投票</label>
    <div>
      <table>
        <thead>
          <th
            class="border-1 border-bluegray-800 cursor-pointer"
            @click="sortBy('p')"
          >
            投票者
          </th>
          <th
            v-for="day in voteDays"
            :key="day"
            class="border-1 border-bluegray-800 cursor-pointer"
            @click="sortBy(day.toString())"
          >
            {{ `${day - 1}d` }}
          </th>
        </thead>
        <tbody>
          <tr
            v-for="participantVotes in votes"
            :key="`vote_p${participantVotes.participantId}`"
          >
            <td
              class="border-1 border-bluegray-800 p-1 cursor-pointer"
              @click="highlight(participantVotes.participantId)"
            >
              {{ participantVotes.name }}
            </td>
            <td
              v-for="(target, d) in participantVotes.targets"
              :key="`vote_p${participantVotes.participantId}_d${d}`"
              class="border-1 border-bluegray-800 p-1 cursor-pointer"
              :class="`${target.highlighted ? 'bg-blue-500' : ''}`"
              @click="highlight(target.targetParticipantId)"
            >
              {{ target.targetName }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'

// props
interface Props {
  daySituations: Array<VillageDaySituation>
  charaIdToParticipantId: any
}
const props = defineProps<Props>()

const village = computed(() => useVillage().value!)
const voteDays = computed(() => {
  return props.daySituations.map((d) => d.day).filter((day) => day >= 3)
})
const votes: Ref<Array<ParticipantVotes>> = ref([])

onMounted(() => {
  votes.value = initialVotes.value
})

watch(
  () => village.value.id,
  () => {
    votes.value = initialVotes.value
  }
)

watch(
  () => voteDays.value.length,
  () => {
    votes.value = initialVotes.value
  }
)

const initialVotes = computed((): Array<ParticipantVotes> => {
  return village.value.participants.list
    .map((p: VillageParticipant) => {
      const roomNumber = p.room ? leftPadRoomNumber(p.room.number) : ''
      const name = `${roomNumber}${p.charaName.shortName}`
      return {
        participantId: p.id,
        name: `${roomNumber}${p.charaName.shortName}`,
        targets: voteDays.value.map((day) => {
          const vote = props.daySituations
            .find((ds) => ds.day === day)!
            .votes.find((v) => v.charaId === p.chara.id)
          const target: VillageParticipant | null = vote
            ? participantByCharaId(vote?.targetCharaId)
            : null
          const targetRoomNumber = target?.room
            ? leftPadRoomNumber(target.room.number)
            : ''
          const targetName = target
            ? `${targetRoomNumber}${target.charaName.shortName}`
            : null
          return {
            day,
            participantId: p.id,
            name,
            targetParticipantId: target?.id || null,
            targetName,
            highlighted: false
          }
        })
      }
    })
    .sort((p1: ParticipantVotes, p2: ParticipantVotes) => {
      return p1.name.localeCompare(p2.name)
    })
})

const sortBy = (key: string) => {
  votes.value.sort((p1: ParticipantVotes, p2: ParticipantVotes) => {
    if (key === 'p') return p1.name.localeCompare(p2.name)

    const day = parseInt(key)
    const targetName1 = p1.targets.find((t) => t.day === day)!.targetName
    const targetName2 = p2.targets.find((t) => t.day === day)!.targetName
    if (targetName1 == null && targetName2 != null) return 1
    if (targetName1 != null && targetName2 == null) return -1
    if (targetName1 == null && targetName2 == null)
      return votesCount(p2) - votesCount(p1)

    const dayVotes = votes.value
      .flatMap((pv) => pv.targets)
      .filter((t) => t.day === day)
    const count1 = dayVotes.filter((v) => v.targetName === targetName1).length
    const count2 = dayVotes.filter((v) => v.targetName === targetName2).length
    if (count1 !== count2) return count2 - count1
    if (targetName1 !== targetName2)
      return targetName1!.localeCompare(targetName2!)
    return votesCount(p2) - votesCount(p1)
  })
}

const votesCount = (p: ParticipantVotes): number =>
  p.targets.filter((t) => t.targetParticipantId != null).length

const leftPadRoomNumber = (roomNumber: number): string => {
  if (roomNumber < 10) return ('00' + roomNumber).slice(-2)
  else return roomNumber.toString()
}

const participantByCharaId = (charaId: number): VillageParticipant => {
  return village.value.participants.list.find(
    (p: VillageParticipant) => p.chara.id === charaId
  )!
}

const highlight = (participantId: number | null) => {
  if (participantId == null) return
  votes.value = votes.value.map((participantVotes) => {
    participantVotes.targets = participantVotes.targets.map((t) => {
      t.highlighted = t.targetParticipantId === participantId
      return t
    })
    return participantVotes
  })
}
</script>

<style lang="scss">
th,
td {
  white-space: nowrap;
  padding: 5px;
}
</style>
