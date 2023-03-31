(function (flagpackCore, vue) {
  'use strict';

  var script = {
    name: 'Flag',
    computed: {
      imageUrl () {
        const url = flagpackCore.imageUrl(flagpackCore.isoToCountryCode(this.code).toUpperCase(), this.size.toLowerCase());
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
    return (vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass([
        'flag',
        `size-${$props.size}`,
        {'border-radius': $props.hasBorderRadius },
        {'border': $props.hasBorder },
        {'drop-shadow': $props.hasDropShadow},
        $props.gradient,
        $props.className
      ])
    }, [
      vue.createElementVNode("img", { src: $options.imageUrl }, null, 8 /* PROPS */, _hoisted_1)
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

})(flagpackCore, Vue);
