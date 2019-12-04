import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const bus = new Vue();
Object.defineProperty(Vue.prototype, "$bus", {
  get() {
    return this.$root.bus;
  }
});

new Vue({
  router,
  data: {
    bus
  },
  render: h => h(App)
}).$mount('#app')
