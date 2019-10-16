<template>
  <div id="app">
    <!-- <test></test> -->
    <v-header :seller="seller"></v-header>
    <div class="v-content-wrapper">
      <v-content :tabs="tabs"></v-content>
    </div>
    <!-- <v-content :tabs='tabs' :default-label='tabs[0].label'></v-content> -->
  </div>
</template>

<script>
import { getSeller } from 'api'
import VHeader from 'components/v-header/v-header'
import VContent from 'components/v-content/v-content'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
// import Test from 'components/test/test'

export default {
  name: 'app',
  data: function () {
    return {
      seller: {}
    }
  },
  computed: {
    tabs: function () {
      return [
        {
          label: '商品',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评论',
          component: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '详情',
          component: Seller,
          data: {
            seller: this.seller
          }
        }
      ]
    }
  },
  components: {
    VHeader,
    VContent
    // Test
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      getSeller({
        id: this.seller.id
      }).then(seller => {
        // vue不能检测对象属性的添加和删除（已创建的实例上动态添加和修改根级响应式属性）
        this.seller = Object.assign({}, this.seller, seller)
      })
    }
  }
}
</script>
<style lang="stylus">
#app
  .v-content-wrapper
    position fixed
    top 136px
    left 0
    right 0
    bottom 0
</style>
