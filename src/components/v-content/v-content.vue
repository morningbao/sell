<template>
  <div class="content">
    <cube-tab-bar
      :data="tabs"
      :use-transition="false"
      v-model="currentLabel"
      :show-slider="true"
      ref="tabBar"
    ></cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="currentIndex"
        :options="slideOptions"
        ref="slide"
        @scroll="onScroll"
        @change="onChange"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component ref="component" :is="tab.component" :data-obj="tab.data" :current-flag="index==currentIndex"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>
<script>
export default {
  name: 'v-content',
  props: {
    tabs: {
      type: Array,
      required: true,
      validator: function (arr) {
        if (arr.length <= 0) {
          return false
        }
        for (let item in arr) {
          if (!arr[item].hasOwnProperty('label')) {
            return false
          }
        }
        return true
      }
    },
    defaultLabel: {
      default: function () {
        for (let item in this.tabs) {
          return this.tabs[item].label
        }
      }
    }
  },
  data() {
    return {
      currentLabel: this.defaultLabel,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  mounted() {
    this.onChange(this.currentIndex)
  },
  computed: {
    currentIndex: {
      get: function () {
        return this.tabs.findIndex((value) => {
          return value.label === this.currentLabel
        })
      },
      set: function (newVal) {
        this.currentLabel = this.tabs[newVal].label
      }
    },
    tabBarWidth: function () {
      return this.$refs.tabBar.$el.clientWidth
    },
    slideWidth: function () {
      return this.$refs.slide.slide.scrollerWidth
    }
  },
  methods: {
    onScroll: function ({ x, y }) {
      this.$refs.tabBar.setSliderTransform(-x / this.slideWidth * this.tabBarWidth)
    },
    onChange: function (index) {
      this.currentIndex = index
      const instance = this.$refs.component[this.currentIndex]
      if (instance && instance.fetch) {
        instance.fetch()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.content
  display flex
  flex-direction column
  height 100%
  >>> .cube-tab
    padding 10px 0
  .slide-wrapper
    flex 1
    overflow hidden
</style>
