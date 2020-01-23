<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Dispositivos</h1>
      <div v-if="devices.length === 0">
        <h2>Nenhum dispositivo cadastrado.</h2>
      </div>
    </div>

    <div class>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Tombamento</th>
            <th scope="col">Tipo</th>
            <th scope="col">Nome</th>
            <th scope="col">Fabricante</th>
            <th scope="col">Modelo</th>
            <th scope="col">Sistema Operacional</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in devices" :key="device._id">
            <td>{{ device.id }}</td>
            <td>{{ device.tippingNumber }}</td>
            <td>{{ device.typeDevice }}</td>
            <td>{{ device.name }}</td>
            <td>{{ device.maker }}</td>
            <td>{{ device.model }}</td>
            <td>{{ device.operatingSystem }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{name: 'Edit', params: {id: device.id}}"
                    class="btn btn-sm btn-outline-secondary"
                  >Editar</router-link>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deleteDevice(device.id)"
                  >Excluir</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import * as Parser from "fast-xml-parser";

export default {
  data() {
    return {
      devices: []
    };
  },
  created() {
    this.fetchDevices();
  },
  methods: {
    fetchDevices() {
      axios
        .get(`${server.baseURL}/devices`, { responseType: 'document'})
        .then(data => {

          
          let devicesXml =  new XMLSerializer().serializeToString(data.data);
          
          let devicesObj = Parser.parse(devicesXml);

          //console.log(devicesObj);

          this.devices = devicesObj.devices.device;
        });

    },
    deleteDevice(id) {
      axios
        .delete(`${server.baseURL}/devices/${id}`)
        .then(() => {
          //console.log(data);
          window.location.reload();
        });
    }
  },
  mounted() {
    this.$bus.$on("UpdateDeviceList", device => {
      this.devices.push(device);
      //this.fetchDevices();

    });
  }
};
</script>