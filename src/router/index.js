import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home';
import UserList from '../views/user/List';
import DeviceList from '../views/device/List';
import LeasedDeviceList from '../views/leasedDevices/List';
import UserCreateComponent from '../views/user/Create';
import UserEditComponent from '../views/user/Edit';
import DeviceCreateComponent from '../views/device/Create';
import DeviceEditComponent from '../views/device/Edit';
import LeasedDeviceCreateComponent from '../views/leasedDevices/Create';
import LeasedDeviceEditComponent from '../views/leasedDevices/Edit';

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
  {
    path: '/devices',
    name: 'devices',
    component: DeviceList
  },
  {
    path: '/leasedDevices',
    name: 'leasedDevices',
    component: LeasedDeviceList
  },
  { path: '/users/create', name: 'Create', component: UserCreateComponent },
  { path: '/users/edit/:id', name: 'Edit', component: UserEditComponent },

  { path: '/devices/create', name: 'Create', component: DeviceCreateComponent },
  { path: '/devices/edit/:id', name: 'Edit', component: DeviceEditComponent },

  { path: '/leasedDevices/create', name: 'Create', component: LeasedDeviceCreateComponent },
  { path: '/leasedDevices/edit/:id', name: 'Edit', component: LeasedDeviceEditComponent },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
