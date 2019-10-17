<template>
  <div class="ball-container">
    <transition
      name="drop"
      @after-enter="beginDrop"
      @after-leave="afterDrop"
    >
      <div class="ball" v-show="show" ref='ball'></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ball',
  data() {
    return {
      show: false
    }
  },
  methods: {
    // 初始化小球位置并显示(显示过程不要指定任何动画)
    drop(event) {
      const rect = event.target.getBoundingClientRect()
      this.$refs.ball.style.left = `${rect.left}px`
      this.$refs.ball.style.top = `${rect.top}px`
      this.show = true
    },
    // 开始飞入并隐藏
    beginDrop() {
      this.show = false
    },
    // 飞入动画完成后组件自我销毁
    afterDrop() {
      this.remove()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.ball-container
  .ball
    position: fixed
    z-index: 200
    width: 16px
    height: 16px
    margin: 10px
    border-radius: 50%
    background: $color-blue
    // 只设定消失的动画，因为小球显示是需要立即出现而不需要动画的
    &.drop-leave-active
      // transition可以分别指定变化的属性的时间和速度函数
      // 这里就是把top的变化速度指定为贝塞尔曲线，left变化为线性，我的实现还加上了渐入
      transition: top 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41), left 0.4s linear,opacity 0.2s ease-in 0.2s
    &.drop-leave-to
      // 这里的!important很重要，因为小球的初始位置是又js设置style，styly的优先级比较高，所以一定要这样做才能覆盖
      left: 22px !important
      top: 645px !important
      opacity:0
</style>
