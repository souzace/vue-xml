<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">Voltar para Listagem</button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2>Editar Locação</h2>
      <form id="create-post-form" @submit.prevent="editLeasedDevice">
        <div class="form-group col-md-12">
          <label for="status">Status da Locação</label>
          <input
            type="text"
            id="status"
            v-model="leasedDevice.status"
            name="status"
            class="form-control"
            placeholder="Nome"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="devolutionDate">Data de Devolução</label>
          <input
            type="text"
            id="devolutionDate"
            v-model="leasedDevice.devolutionDate"
            name="devolutionDate"
            class="form-control"
            placeholder="Data de Devolução"
          />
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { server } from "../../helper";
import router from "../../router/index";
import * as Parser from "fast-xml-parser";

export default {
  data() {
    return {
      id: 0,
      leasedDevice: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getLeasedDevice();
  },
  methods: {
    editLeasedDevice() {
      let leasedDeviceData = {
        id: this.$route.params.id,
        status: this.leasedDevice.status,
        devolutionDate: this.leasedDevice.devolutionDate
      };
      axios
        .put(`${server.baseURL}/leasedDevices/${this.$route.params.id}`, leasedDeviceData)
        .then(() => {
          router.push({ name: "leasedDevices" });
        });
    },
    getLeasedDevice() {
      axios
        .get(`${server.baseURL}/leasedDevices/${this.$route.params.id}`, { responseType: 'document'})
        .then(data => {
          
          let leasedDevicesXml =  new XMLSerializer().serializeToString(data.data);
          
          let leasedDevicesObj = Parser.parse(leasedDevicesXml);

          //console.log(leasedDevicesObj);

          this.leasedDevice = leasedDevicesObj.leasedDevice.leasedDevice;

        });
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>