<template>
  <div class="star" :class="starType">
    <span
      v-for="(itemClass,index) in itemClasses"
      :class="itemClass"
      class="star-item"
      :key="index"
    ></span>
    <!-- key作用是防止v-for的顺序bug -->
  </div>
</template>

<script>
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    },
    full: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      const score = Math.floor(this.score)
      const hasDecimal = this.score % 1 >= 0.5
      for (let i = 0; i < score; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < this.full) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/mixin.styl'
$path = 'img/'
.star
  display flex
  align-items center
  justify-content center
  .star-item
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
        bg-image($path + 'star48_on')
      &.half
        bg-image($path + 'star48_half')
      &.off
        bg-image($path + 'star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image($path + 'star36_on')
      &.half
        bg-image($path + 'star36_half')
      &.off
        bg-image($path + 'star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image($path + 'star24_on')
      &.half
        bg-image($path + 'star24_half')
      &.off
        bg-image($path + 'star24_off')
</style>
