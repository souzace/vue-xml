<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Dispositivos Locados</h1>
    </div>

    <div class>
      <div style="float: left; width: 100%; padding-bottom: 5px;">
        <button style="float: right;" class="btn btn-outline-dark" v-on:click="newLeasedDevice">Nova Locação</button>
      </div>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Data de Locação</th>
            <th scope="col">Tombamento</th>
            <th scope="col">Nome do Colaborador</th>
            <th scope="col">Status da Locação</th>
            <th scope="col">Data da Devolução</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="leasedDevice in leasedDevices" :key="leasedDevice.id">
            <td>{{ leasedDevice.leaseDate }}</td>
            <td>{{ leasedDevice.tippingNumber }}</td>
            <td>{{ leasedDevice.collaboratorName }}</td>
            <td>{{ leasedDevice.status }}</td>
            <td>{{ leasedDevice.devolutionDate }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{name: 'leasedDeviceEdit', params: {id: leasedDevice.id}}"
                    class="btn btn-sm btn-outline-secondary"
                  >Editar</router-link>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deleteLeasedDevice(leasedDevice.id)"
                  >Excluir</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="leasedDevices.length === 0">
        <h2>Nenhum dispositivo cadastrado.</h2>
    </div>
  </div>
</template>

<script>
import { server } from "../../helper";
import axios from "axios";
import * as Parser from "fast-xml-parser";
import router from "../../router";

export default {
  data() {
    return {
      leasedDevices: []
    };
  },
  created() {
    this.fetchLeasedDevices();
  },
  methods: {
    newLeasedDevice() {
      router.push({ name: 'leasedDeviceCreate'});
    },
    fetchLeasedDevices() {
      axios
        .get(`${server.baseURL}/leasedDevices`, { responseType: 'document'})
        .then(data => {
          
          if (data.data !== null) {
            
            let leasedDevicesXml =  new XMLSerializer().serializeToString(data.data);
            let leasedDevicesObj = Parser.parse(leasedDevicesXml);
            
            if (Array.isArray(leasedDevicesObj.leasedDevices.device)) {
              this.leasedDevices = leasedDevicesObj.leasedDevices.device;
            } else {
              this.leasedDevices.push(leasedDevicesObj.leasedDevices.device);
            }
          } 


        });

    },
    deleteLeasedDevice(id) {
      axios
        .delete(`${server.baseURL}/leasedDevices/${id}`)
        .then(() => {
          //console.log(data);
          window.location.reload();
        });
    }
  },
  mounted() {
    /*this.$bus.$on("UpdateDeviceList", device => {
     // this.leasedDevices.push(device);
      //this.fetchLeasedDevices();

    });*/
  }
};
</script>