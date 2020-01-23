import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home';
import UserList from '../views/user/List';
import UserCreateComponent from '../views/user/Create';
import UserEditComponent from '../views/user/Edit';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/users',
    name: 'users',
    component: UserList
  },
  { path: '/users/create', name: 'Create', component: UserCreateComponent },
  { path: '/users/edit/:id', name: 'Edit', component: UserEditComponent },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
