<template>
  <span :class="className" :style="styleName"></span>
</template>

<script setup lang="ts">
// props
interface Props {
  index: number
  direction: string
  isRound: boolean
  color: string
}
const props = defineProps<Props>()

const className = computed(() => {
  return props.direction === 'dot'
    ? `dot-${props.index}`
    : `line-${props.direction}-${props.index} ${props.isRound ? 'dashed' : ''}`
})

const styleName = computed(() => {
  if (props.direction === 'dot') {
    return `background-color: #${props.color}`
  } else return `border-color: #${props.color}`
})
</script>

<style lang="scss">
@for $i from 0 to 10 {
  .line-up-#{$i * 2},
  .line-up-#{$i * 2 + 20} {
    width: 50px - 4px * $i;
    height: 51px - 4px * $i;
    position: absolute;
    right: 0;
    top: 0;
    border: 0;
    border-left: 2px solid;
    z-index: 5;

    &.dashed {
      border-style: dashed;
    }
  }

  .line-right-#{$i * 2},
  .line-right-#{$i * 2 + 20} {
    width: 50px - 4px * $i;
    height: 51px - 4px * $i;
    position: absolute;
    right: 0;
    top: 0;
    border: 0;
    border-bottom: 2px solid;
    z-index: 5;

    &.dashed {
      border-style: dashed;
    }
  }

  .line-down-#{$i * 2},
  .line-down-#{$i * 2 + 20} {
    width: 51px + 4px * $i;
    height: 50px + 4px * $i;
    position: absolute;
    left: 0;
    bottom: 0;
    border: 0;
    border-right: 2px solid;
    z-index: 5;

    &.dashed {
      border-style: dashed;
    }
  }

  .line-left-#{$i * 2},
  .line-left-#{$i * 2 + 20} {
    width: 51px + 4px * $i;
    height: 50px + 4px * $i;
    position: absolute;
    left: 0;
    bottom: 0;
    border: 0;
    border-top: 2px solid;
    z-index: 5;

    &.dashed {
      border-style: dashed;
    }
  }

  .dot-#{$i * 2},
  .dot-#{$i * 2 + 20} {
    width: 12px;
    height: 12px;
    position: absolute;
    left: 44px + 4px * $i;
    top: 44px - 4px * $i;
    border-radius: 10px;
    z-index: 5;
  }
}

@for $i from 0 to 10 {
  .line-up-#{$i * 2 + 1},
  .line-up-#{$i * 2 + 21} {
    width: 54px + 4px * $i;
    height: 55px + 4px * $i;
    position: absolute;
    right: 0;
    top: 0;
    border: 0;
    border-left: 2px solid;
    z-index: 5;

    &.dashed {
      border-style: dashed;
    }
  }

  .line-right-#{$i * 2 + 1},
  .line-right-#{$i * 2 + 21} {
    width: 54px + 4px * $i;
    height: 55px + 4px * $i;
    position: absolute;
    right: 0;
    top: 0;
    border: 0;
    border-bottom: 2px solid;
    z-index: 5;

    &.dashed {
      border-style: dashed;
    }
  }

  .line-down-#{$i * 2 + 1},
  .line-down-#{$i * 2 + 21} {
    width: 47px - 4px * $i;
    height: 46px - 4px * $i;
    position: absolute;
    left: 0;
    bottom: 0;
    border: 0;
    border-right: 2px solid;
    z-index: 5;

    &.dashed {
      border-style: dashed;
    }
  }

  .line-left-#{$i * 2 + 1},
  .line-left-#{$i * 2 + 21} {
    width: 47px - 4px * $i;
    height: 46px - 4px * $i;
    position: absolute;
    left: 0;
    bottom: 0;
    border: 0;
    border-top: 2px solid;
    z-index: 5;

    &.dashed {
      border-style: dashed;
    }
  }

  .dot-#{$i * 2 + 1},
  .dot-#{$i * 2 + 21} {
    width: 12px;
    height: 12px;
    position: absolute;
    left: 40px - 4px * $i;
    top: 40px + 4px * $i;
    border-radius: 10px;
    z-index: 5;
  }
}
</style>
