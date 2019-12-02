import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home';
import EditComponent from '../components/Edit';
import CreateComponent from '../components/Create';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  { path: '/create', name: 'Create', component: CreateComponent },
  { path: '/edit/:id', name: 'Edit', component: EditComponent },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
