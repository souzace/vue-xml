import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home';
import UserList from '../views/user/List';
import UserCreateComponent from '../views/user/Create';
import UserEditComponent from '../views/user/Edit';
import DeviceList from '../views/device/List';
import DeviceCreateComponent from '../views/device/Create';
import DeviceEditComponent from '../views/device/Edit';
import LeasedDeviceList from '../views/leasedDevices/List';
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
  { path: '/users/create', name: 'userCreate', component: UserCreateComponent },
  { path: '/users/edit/:id', name: 'userEdit', component: UserEditComponent },
  
  { path: '/devices', name: 'devices', component: DeviceList },
  { path: '/devices/create', name: 'deviceCreate', component: DeviceCreateComponent },
  { path: '/devices/edit/:id', name: 'deviceEdit', component: DeviceEditComponent },
  
  { path: '/leasedDevices', name: 'leasedDevices', component: LeasedDeviceList },
  { path: '/leasedDevices/create', name: 'leasedDeviceCreate', component: LeasedDeviceCreateComponent },
  { path: '/leasedDevices/edit/:id', name: 'leasedDeviceEdit', component: LeasedDeviceEditComponent },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
