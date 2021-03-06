import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from 'components/header-detail/header-detail'
import ShopCart from 'components/shop-cart/shop-cart'
import ShopCartList from 'components/shop-cart-list/shop-cart-list'
import ShopCartStikcy from 'components/shop-cart-sticky/shop-cart-sticky'
import Food from 'components/food/food'
import Ball from 'components/ball/ball'

createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopCart)
createAPI(Vue, ShopCartList)
createAPI(Vue, ShopCartStikcy)
createAPI(Vue, Food)
createAPI(Vue, Ball)
