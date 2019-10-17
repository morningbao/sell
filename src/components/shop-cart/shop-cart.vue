<template>
  <div>
    <transition name="cart">
      <div class="shopcart" v-show="show">
        <div class="content" @click="toggleList">
          <div class="content-left">
            <div class="logo-wrapper">
              <div class="logo" :class="{'highlight':totalCount>0}">
                <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
              </div>
              <div class="num" v-show="totalCount>0">
                <bubble :num="totalCount"></bubble>
              </div>
            </div>
            <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
            <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
          </div>
          <div class="content-right" @click="pay">
            <div class="pay" :class="payClass">{{payDesc}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Bubble from 'components/bubble/bubble'

export default {
  name: 'shop-cart',
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    },
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      show: true,
      listShow: false
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.seller.minPrice}元起送`
      } else if (this.totalPrice < this.seller.minPrice) {
        let diff = this.seller.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (!this.totalCount || this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  methods: {
    toggleList() {
      this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
        $props: {
          selectFoods: 'selectFoods'
        }
      })
      if (this.listShow) {
        this.shopCartListComp.hide()
      } else {
        this.shopCartListComp.show()
      }
      this.listShow = !this.listShow

    },
    pay(e) {
      if (this.totalPrice < this.minPrice) {
        return
      }
      this.$createDialog({
        title: '支付',
        content: `您需要支付${this.totalPrice}元`
      }).show()
      e.stopPropagation()
    },
    _showShopCartList() {
      this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
        $props: {
          selectFoods: 'selectFoods'
        },
        $events: {
        }
      })
      this.shopCartListComp.show()
    },
    _hideShopCartList() {
      const list = this.shopCartListComp
      list.hide && list.hide()
    }
  },
  watch: {
    fold(newVal) {
      this.listFold = newVal
    },
    totalCount(count) {
      if (!this.fold && count === 0) {
        this._hideShopCartList()
      }
    }
  },
  components: {
    Bubble
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.shopcart
  position: absolute
  left: 0
  bottom: 0
  z-index: 999
  width: 100%
  height: 48px
  &.cart-enter-active, &.cart-leave-active
    transition: bottom 0.1s linear
  &.cart-enter, &.cart-leave-to
    bottom: -60px
  .content
    display: flex
    background: $color-background
    font-size: 0
    color: $color-light-grey
    .content-left
      flex: 1
      .logo-wrapper
        display: inline-block
        vertical-align: top
        position: relative
        top: -10px
        margin: 0 12px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing: border-box
        border-radius: 50%
        background: $color-background
        .logo
          width: 100%
          height: 100%
          border-radius: 50%
          text-align: center
          background: $color-dark-grey
          &.highlight
            background: $color-blue
          .icon-shopping_cart
            line-height: 44px
            font-size: $fontsize-large-xxx
            color: $color-light-grey
            &.highlight
              color: $color-white
        .num
          position: absolute
          top: 0
          right: 0
      .price
        display: inline-block
        vertical-align: top
        margin-top: 12px
        line-height: 24px
        padding-right: 12px
        box-sizing: border-box
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        font-weight: 700
        font-size: $fontsize-large
        &.highlight
          color: $color-white
      .desc
        display: inline-block
        vertical-align: top
        margin: 12px 0 0 12px
        line-height: 24px
        font-size: $fontsize-small-s
    .content-right
      flex: 0 0 105px
      width: 105px
      .pay
        height: 48px
        line-height: 48px
        text-align: center
        font-weight: 700
        font-size: $fontsize-small
        &.not-enough
          background: $color-dark-grey
        &.enough
          background: $color-green
          color: $color-white
</style>
