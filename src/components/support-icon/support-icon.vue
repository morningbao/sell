<template>
  <span class="support-icon" :class="iconClass"></span>
</template>

<script>
export default {
  name: 'support-icon',
  props: {
    size: {
      tyoe: Number
    },
    type: {
      type: Number
    }
  },
  computed: {
    iconClass() {
      const classMap = [
        'decrease',
        'discount',
        'special',
        'invoice',
        'guarantee'
      ]
      return `icon-${this.size} ${classMap[this.type]}`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin';

$path = 'img/'

.support-icon {
  display: inline-block;
  background-repeat: no-repeat;
}

.icon-1 {
  width: 12px;
  height: 12px;
  background-size: 12px 12px;

  &.decrease {
    bg-image($path + 'decrease_1');
  }

  &.discount {
    bg-image($path + 'discount_1');
  }

  &.guarantee {
    bg-image($path + 'guarantee_1');
  }

  &.invoice {
    bg-image($path + 'invoice_1');
  }

  &.special {
    bg-image($path + 'special_1');
  }
}

.icon-2 {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;

  &.decrease {
    bg-image($path + 'decrease_2');
  }

  &.discount {
    bg-image($path + 'discount_2');
  }

  &.guarantee {
    bg-image($path + 'guarantee_2');
  }

  &.invoice {
    bg-image($path + 'invoice_2');
  }

  &.special {
    bg-image($path + 'special_2');
  }
}

.icon-3 {
  width: 12px;
  height: 12px;
  background-size: 12px 12px;

  &.decrease {
    bg-image($path + 'decrease_3');
  }

  &.discount {
    bg-image($path + 'discount_3');
  }

  &.guarantee {
    bg-image($path + 'guarantee_3');
  }

  &.invoice {
    bg-image($path + 'invoice_3');
  }

  &.special {
    bg-image($path + 'special_3');
  }
}

.icon-4 {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;

  &.decrease {
    bg-image($path + 'decrease_4');
  }

  &.discount {
    bg-image($path + 'discount_4');
  }

  &.guarantee {
    bg-image($path + 'guarantee_4');
  }

  &.invoice {
    bg-image($path + 'invoice_4');
  }

  &.special {
    bg-image($path + 'special_4');
  }
}
</style>
