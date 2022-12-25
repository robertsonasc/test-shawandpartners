import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router/paths'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).use(router).mount('#app')
