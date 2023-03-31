import { imageUrl, isoToCountryCode } from 'flagpack-core';
import { openBlock, createElementBlock, normalizeClass, createElementVNode } from 'vue';

var script = {
  name: 'Flag',
  computed: {
    imageUrl () {
      const url = imageUrl(isoToCountryCode(this.code).toUpperCase(), this.size.toLowerCase());
      return url
    }
  },
  props: {
    size: {
      type: String,
      default: 'm',
      validator: value => (
        ['s', 'm', 'l'].indexOf(value) !== -1
      ),
    },
    code: {
      type: String,
      default: '528'
    },
    hasDropShadow: {
      type: Boolean,
      default: false,
    },
    hasBorder: {
      type: Boolean,
      default: true
    },
    hasBorderRadius: {
      type: Boolean,
      default: true,
    },
    gradient: {
      type: String,
      validator: value => (
        ['top-down', 'real-linear', 'real-circular'].indexOf(value) !== -1
      ),
    },
    className: {
      type: String
    }
  },
};

const _hoisted_1 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass([
      'flag',
      `size-${$props.size}`,
      {'border-radius': $props.hasBorderRadius },
      {'border': $props.hasBorder },
      {'drop-shadow': $props.hasDropShadow},
      $props.gradient,
      $props.className
    ])
  }, [
    createElementVNode("img", { src: $options.imageUrl }, null, 8 /* PROPS */, _hoisted_1)
  ], 2 /* CLASS */))
}

script.render = render;
script.__scopeId = "data-v-bea46236";
script.__file = "src/Flag.vue";

module.exports = {
  install: function install(Vue, options) {
    Vue.component(options.name || 'vue-flagpack', script);
  }
};
