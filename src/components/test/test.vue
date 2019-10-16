<template>
  <div>
    <button @click="go">go</button>
    <button @click="go">go</button>
    <button @click="go">go</button>
    <button @click="go">go</button>
    <button @click="go">go</button>
    <transition @before-enter="init" v-on:after-enter="afterEnter" @leave="leave" name="move">
      <div v-show="ball.show" class="test" ref="ball"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ball: {
        show: false,
        left: "200px",
        top: "500px"
      }
    }
  },
  methods: {
    go(el) {
      const rect = el.target.getBoundingClientRect()
      this.ball.left = rect.left + "px"
      this.ball.top = rect.top + "px"
      this.ball.show = true
    },
    afterEnter() {
      this.ball.show = false 
    },
    leave() {
      this.$refs.ball.style.left = "200px"
      this.$refs.ball.style.top = "500px"
    },
    init(el) {
      el.style.left = this.ball.left
      el.style.top = this.ball.top
    }
  }
}
</script>

<style lang="stylus" scoped>
button
  display block
  margin-top 20px
  margin-left 20px
.test
  position fixed
  z-index 200
  left 0px
  top 0px
  width 20px
  height 20px
  border-radius 50%
  background-color blue
  &.move-leave-active
    -webkit-transition top 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41), left 0.5s linear
  // transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
  &.move-leave-to
    left 200px
    top 500px
</style>
