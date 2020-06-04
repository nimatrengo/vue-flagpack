import { imageUrl, isoToCountryCode } from 'flagpack-core';

//

var script = {
  name: 'Flag',
  computed: {
    imageUrl() {
      return imageUrl(isoToCountryCode(this.code).toUpperCase(), this.size.toLowerCase())
    },
    styles() {
      return this.customBorderRadius && {'border-radius': `${this.customBorderRadius}px`}
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
      default: false
    },
    hasBorderRadius: {
      type: Boolean,
      default: true,
    },
    customBorderRadius: {
      type: String,
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

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: [
        "flag",
        "size-" + _vm.size,
        { "border-radius": _vm.hasBorderRadius },
        { border: _vm.hasBorder },
        { "drop-shadow": _vm.hasDropShadow },
        _vm.gradient,
        _vm.className
      ],
      style: [_vm.styles]
    },
    [_c("img", { attrs: { src: _vm.imageUrl } })]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-5af92868_0", { source: ".flag[data-v-5af92868] {\n  display: inline-block;\n  overflow: hidden;\n  position: relative;\n}\n.flag.size-s[data-v-5af92868] {\n  width: 16px;\n  height: 12px;\n}\n.flag.size-s.drop-shadow[data-v-5af92868] {\n  box-shadow: 0 0 1px 0.5px rgba(0, 0, 0, 0.1);\n}\n.flag.size-s.border-radius[data-v-5af92868] {\n  border-radius: 1px;\n}\n.flag.size-m[data-v-5af92868] {\n  width: 20px;\n  height: 15px;\n}\n.flag.size-m.drop-shadow[data-v-5af92868] {\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);\n}\n.flag.size-m.border-radius[data-v-5af92868] {\n  border-radius: 1.5px;\n}\n.flag.size-l[data-v-5af92868] {\n  width: 32px;\n  height: 24px;\n}\n.flag.size-l.drop-shadow[data-v-5af92868] {\n  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);\n}\n.flag.size-l.border-radius[data-v-5af92868] {\n  border-radius: 2px;\n}\n.flag.border[data-v-5af92868]::before {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: block;\n  mix-blend-mode: overlay;\n  width: calc(100% - 2px);\n  height: calc(100% - 2px);\n  border: 1px solid rgba(0, 0, 0, 0.5);\n  mix-blend-mode: overlay;\n}\n.flag.border-radius[data-v-5af92868]::before {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: block;\n  mix-blend-mode: overlay;\n  border-radius: 1px;\n}\n.flag.top-down[data-v-5af92868]::before {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: block;\n  mix-blend-mode: overlay;\n  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 2%, rgba(255, 255, 255, 0.7) 100%);\n}\n.flag.real-linear[data-v-5af92868]::before {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: block;\n  mix-blend-mode: overlay;\n  background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.2) 0%, rgba(39, 39, 39, 0.22) 11%, rgba(255, 255, 255, 0.3) 27%, rgba(0, 0, 0, 0.24) 41%, rgba(0, 0, 0, 0.55) 52%, rgba(255, 255, 255, 0.26) 63%, rgba(0, 0, 0, 0.27) 74%, rgba(255, 255, 255, 0.3) 100%);\n}\n.flag.real-circular[data-v-5af92868]::before {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: block;\n  mix-blend-mode: overlay;\n  background: radial-gradient(50% 36%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.24) 11%, rgba(0, 0, 0, 0.55) 17%, rgba(255, 255, 255, 0.26) 22%, rgba(0, 0, 0, 0.17) 27%, rgba(255, 255, 255, 0.28) 31%, rgba(255, 255, 255, 0) 37%) center calc(50% - 8px)/600% 600%, radial-gradient(50% 123%, rgba(255, 255, 255, 0.3) 25%, rgba(0, 0, 0, 0.24) 48%, rgba(0, 0, 0, 0.55) 61%, rgba(255, 255, 255, 0.26) 72%, rgba(0, 0, 0, 0.17) 80%, rgba(255, 255, 255, 0.28) 88%, rgba(255, 255, 255, 0.3) 100%) center calc(50% - 8px)/600% 600%;\n}\n.flag img[data-v-5af92868] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n/*# sourceMappingURL=Flag.vue.map */", map: {"version":3,"sources":["/Users/donovanroubos/Code/Yummygum/vue-flag-pack/src/Flag.vue","Flag.vue"],"names":[],"mappings":"AA+EA;EACA,qBAAA;EACA,gBAAA;EACA,kBAAA;AC9EA;ADiFA;EACA,WAAA;EACA,YAAA;AC/EA;ADiFA;EACA,4CAAA;AC/EA;ADkFA;EACA,kBAAA;AChFA;ADoFA;EACA,WAAA;EACA,YAAA;AClFA;ADoFA;EACA,0CAAA;AClFA;ADqFA;EACA,oBAAA;ACnFA;ADuFA;EACA,WAAA;EACA,YAAA;ACrFA;ADuFA;EACA,0CAAA;ACrFA;ADwFA;EACA,kBAAA;ACtFA;AD4FA;EAvDA,WAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,cAAA;EACA,uBAAA;EAoDA,uBAAA;EACA,wBAAA;EACA,oCAAA;EACA,uBAAA;ACrFA;AD0FA;EAjEA,WAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,cAAA;EACA,uBAAA;EA8DA,kBAAA;ACnFA;ADwFA;EAxEA,WAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,cAAA;EACA,uBAAA;EAqEA,6FAAA;ACjFA;ADsFA;EA/EA,WAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,cAAA;EACA,uBAAA;EA4EA,kQAAA;AC/EA;ADoFA;EAtFA,WAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,cAAA;EACA,uBAAA;EAmFA,ygBAAA;AC7EA;ADkFA;EACA,cAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AChFA;;AAEA,mCAAmC","file":"Flag.vue","sourcesContent":["<template>\n  <div\n    :style=\"[styles]\"\n    :class=\"[\n      'flag',\n      `size-${size}`,\n      {'border-radius': hasBorderRadius },\n      {'border': hasBorder },\n      {'drop-shadow': hasDropShadow},\n      gradient,\n      className\n    ]\">\n    <img :src=\"imageUrl\">\n  </div>\n</template>\n\n<script>\nimport { isoToCountryCode, imageUrl } from 'flagpack-core'\n\nexport default {\n  name: 'Flag',\n  computed: {\n    imageUrl() {\n      return imageUrl(isoToCountryCode(this.code).toUpperCase(), this.size.toLowerCase())\n    },\n    styles() {\n      return this.customBorderRadius && {'border-radius': `${this.customBorderRadius}px`}\n    }\n  },\n  props: {\n    size: {\n      type: String,\n      default: 'm',\n      validator: value => (\n        ['s', 'm', 'l'].indexOf(value) !== -1\n      ),\n    },\n    code: {\n      type: String,\n      default: '528'\n    },\n    hasDropShadow: {\n      type: Boolean,\n      default: false,\n    },\n    hasBorder: {\n      type: Boolean,\n      default: false\n    },\n    hasBorderRadius: {\n      type: Boolean,\n      default: true,\n    },\n    customBorderRadius: {\n      type: String,\n    },\n    gradient: {\n      type: String,\n      validator: value => (\n        ['top-down', 'real-linear', 'real-circular'].indexOf(value) !== -1\n      ),\n    },\n    className: {\n      type: String\n    }\n  },\n}\n</script>\n\n<style scoped lang=\"scss\">\n@mixin before-styling {\n  content: '';\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: block;\n  mix-blend-mode: overlay;\n}\n\n.flag {\n  display: inline-block;\n  overflow: hidden;\n  position: relative;\n\n  &.size {\n    &-s {\n      width: 16px;\n      height: 12px;\n\n      &.drop-shadow {\n        box-shadow: 0 0 1px 0.5px rgba(0,0,0,0.10);\n      }\n\n      &.border-radius {\n        border-radius: 1px;\n      }\n    }\n\n    &-m {\n      width: 20px;\n      height: 15px;\n\n      &.drop-shadow {\n        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.10);\n      }\n\n      &.border-radius {\n        border-radius: 1.5px;\n      }\n    }\n\n    &-l {\n      width: 32px;\n      height: 24px;\n\n      &.drop-shadow {\n        box-shadow: 0 2px 3px 0 rgba(0,0,0,0.10);\n      }\n\n      &.border-radius {\n        border-radius: 2px;\n      }\n    }\n  }\n\n  &.border {\n    &::before {\n      @include before-styling();\n      width: calc(100% - 2px);\n      height: calc(100% - 2px);\n      border: 1px solid rgba(0, 0, 0, .5);\n      mix-blend-mode: overlay;\n    }\n  }\n\n  &.border-radius {\n    &::before {\n      @include before-styling();\n      border-radius: 1px;\n    }\n  }\n\n  &.top-down {\n    &::before {\n      @include before-styling();\n      background-image: linear-gradient(0deg, rgba(0,0,0,0.30) 2%, rgba(255,255,255,0.70) 100%);\n    }\n  }\n\n  &.real-linear {\n    &::before {\n      @include before-styling();\n      background-image: linear-gradient(45deg, rgba(0,0,0,0.20) 0%, rgba(39,39,39,0.22) 11%, rgba(255,255,255,0.30) 27%, rgba(0,0,0,0.24) 41%, rgba(0,0,0,0.55) 52%, rgba(255,255,255,0.26) 63%, rgba(0,0,0,0.27) 74%, rgba(255,255,255,0.30) 100%);\n    }\n  }\n\n  &.real-circular {\n    &::before {\n      @include before-styling();\n      background: radial-gradient(50% 36%, rgba(255,255,255,0.30) 0%, rgba(0,0,0,0.24) 11%, rgba(0,0,0,0.55) 17%, rgba(255,255,255,0.26) 22%, rgba(0,0,0,0.17) 27%, rgba(255,255,255,0.28) 31%, rgba(255,255,255,0.00) 37%) center calc(50% - 8px) / 600% 600%,\n                  radial-gradient(50% 123%, rgba(255,255,255,0.30) 25%, rgba(0,0,0,0.24) 48%, rgba(0,0,0,0.55) 61%, rgba(255,255,255,0.26) 72%, rgba(0,0,0,0.17) 80%, rgba(255,255,255,0.28) 88%, rgba(255,255,255,0.30) 100%) center calc(50% - 8px) / 600% 600%;\n    }\n  }\n\n  img {\n    display: block;\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n}\n</style>\n",".flag {\n  display: inline-block;\n  overflow: hidden;\n  position: relative;\n}\n.flag.size-s {\n  width: 16px;\n  height: 12px;\n}\n.flag.size-s.drop-shadow {\n  box-shadow: 0 0 1px 0.5px rgba(0, 0, 0, 0.1);\n}\n.flag.size-s.border-radius {\n  border-radius: 1px;\n}\n.flag.size-m {\n  width: 20px;\n  height: 15px;\n}\n.flag.size-m.drop-shadow {\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);\n}\n.flag.size-m.border-radius {\n  border-radius: 1.5px;\n}\n.flag.size-l {\n  width: 32px;\n  height: 24px;\n}\n.flag.size-l.drop-shadow {\n  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);\n}\n.flag.size-l.border-radius {\n  border-radius: 2px;\n}\n.flag.border::before {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: block;\n  mix-blend-mode: overlay;\n  width: calc(100% - 2px);\n  height: calc(100% - 2px);\n  border: 1px solid rgba(0, 0, 0, 0.5);\n  mix-blend-mode: overlay;\n}\n.flag.border-radius::before {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: block;\n  mix-blend-mode: overlay;\n  border-radius: 1px;\n}\n.flag.top-down::before {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: block;\n  mix-blend-mode: overlay;\n  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 2%, rgba(255, 255, 255, 0.7) 100%);\n}\n.flag.real-linear::before {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: block;\n  mix-blend-mode: overlay;\n  background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.2) 0%, rgba(39, 39, 39, 0.22) 11%, rgba(255, 255, 255, 0.3) 27%, rgba(0, 0, 0, 0.24) 41%, rgba(0, 0, 0, 0.55) 52%, rgba(255, 255, 255, 0.26) 63%, rgba(0, 0, 0, 0.27) 74%, rgba(255, 255, 255, 0.3) 100%);\n}\n.flag.real-circular::before {\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: block;\n  mix-blend-mode: overlay;\n  background: radial-gradient(50% 36%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.24) 11%, rgba(0, 0, 0, 0.55) 17%, rgba(255, 255, 255, 0.26) 22%, rgba(0, 0, 0, 0.17) 27%, rgba(255, 255, 255, 0.28) 31%, rgba(255, 255, 255, 0) 37%) center calc(50% - 8px)/600% 600%, radial-gradient(50% 123%, rgba(255, 255, 255, 0.3) 25%, rgba(0, 0, 0, 0.24) 48%, rgba(0, 0, 0, 0.55) 61%, rgba(255, 255, 255, 0.26) 72%, rgba(0, 0, 0, 0.17) 80%, rgba(255, 255, 255, 0.28) 88%, rgba(255, 255, 255, 0.3) 100%) center calc(50% - 8px)/600% 600%;\n}\n.flag img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n/*# sourceMappingURL=Flag.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-5af92868";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

var main = {
  install: function install(Vue, options) {
    Vue.component(options.name || 'vue-flag-pack', __vue_component__);
  }
};

export default main;
export { __vue_component__ as Flag };
